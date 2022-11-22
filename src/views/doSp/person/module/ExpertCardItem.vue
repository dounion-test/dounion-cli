<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-08 17:02:03
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 10:33:54
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/ExpertCardItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <a-card :hoverable="isHoverable" class="w-full relative card-person-wrap">
      <div class="flex mb-2 user-baseinfo">
        <img
          v-if="record.headImgFile && record.headImgFile.length"
          class="img"
          :src="`${VITE_GLOB_DOFILE_URL}${record.headImgFile[0].filePath}`"
        />
        <!-- <img
          v-if="
            record.headImgFile &&
            record.headImgFile.length == 0 &&
            record.pictures &&
            record.pictures.length > 0
          "
          class="img"
          :src="`${VITE_GLOB_DOFILE_URL}${record.pictures[0].filePath}`"
        /> -->
        <img v-else class="img" :src="defaultAvatar" />
        <div class="info">
          <h3 @click="hanldeView(record.id)" :class="{ alink: hasPermission('SpPersonVIew') }"
            ><span class="name" :title="record.name">{{ record.name }}</span
            ><b v-if="record.educationName">（{{ record.educationName }}）</b></h3
          >
          <p v-if="record.school">{{ record.school }}</p>
          <p v-if="record.certSdate">入驻时间：{{ record.certSdate }}</p>
          <p
            >技术职称：{{
              record.jobTitleId === '52052-1011' || record.jobTitleId === '52052-2601'
                ? record.otherJobTitle
                : record.jobTitleIdName || '-'
            }}</p
          >
          <p v-if="isShowTel">手机：{{ record.mobile }}</p>
        </div>
      </div>
      <div class="other">
        <p>专家编码：{{ record.spNumber || '-' }}</p>
        <p>单位：{{ record.companyName || '-' }}</p>
        <div v-if="record.labels" @click.stop>
          <a-menu mode="horizontal" class="tags-bar">
            <a-menu-item
              class="rounded-sm"
              v-for="(item, index) in record.labels"
              :key="`${index}-${item}`"
            >
              {{ item }}
            </a-menu-item>
          </a-menu>
        </div>
      </div>
      <div class="flex items-center right-top">
        <span
          class="flex items-center"
          :class="{ 'mr-1': isShowBtn && record.status == '52002-20' }"
        >
          <Icon class="new-icon" v-if="!record.certSdate" icon="ic:round-fiber-new" />
          <a-tooltip>
            <template #title>外网注册</template>
            <Icon
              v-if="record.certSdate && record.sourceType == '52001-10'"
              icon="ant-design:global-outlined"
              class="inner-icon"
            />
          </a-tooltip>
          <a-tooltip>
            <template #title>内网录入</template>
            <Icon
              v-if="record.certSdate && record.sourceType == '52001-20'"
              icon="teenyicons:send-outline"
              class="out-icon"
            />
          </a-tooltip>
        </span>
        <a-dropdown class="menu-dropdown" v-if="isShowBtn && record.status != '52002-20'">
          <a @click.prevent.stop>
            <Icon class="more" icon="bx:dots-vertical-rounded" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item v-if="!record.certSdate" @click.stop="handleLetterEmail(record)">
                <a href="javascript:;">发电子聘书</a>
              </a-menu-item>
              <a-menu-item v-if="!record.certSdate" @click.stop="handleInviteEmail(record)">
                <a href="javascript:;">发邀请函</a>
              </a-menu-item>
              <a-menu-item v-if="hasPermission('SpPersonEdit')" @click.stop="handleEdit(record.id)">
                <a href="javascript:;">编辑信息</a>
              </a-menu-item>
              <a-menu-item
                v-if="hasPermission('SpPersonDelete')"
                @click.stop="handleRemove(record.id)"
              >
                <a href="javascript:;">移除专家</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-card>
    <EmailModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Card, Dropdown, Menu, Tooltip } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import EmailModal from './EmailModal.vue';
  import { useRouter } from 'vue-router';
  import { getAppEnvConfig } from '/@/utils/env';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import defaultAvatar from '/@/assets/images/default-avatar.jpg';
  import {
    spPersonRemoveApi,
    spPersonSendLetterApi,
    spPersonSendLetterViewApi,
    spPersonSendInvitationLetterApi,
    spPersonSendInvitationLetterViewApi,
  } from '/@/api/doSp/person';

  export default defineComponent({
    components: {
      Icon,
      EmailModal,
      ACard: Card,
      ADropdown: Dropdown,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      ATooltip: Tooltip,
    },
    props: {
      record: {
        type: Object,
        default: () => {},
      },
      isHoverable: Boolean,
      isShowBtn: Boolean,
      isShowTel: Boolean,
    },
    emits: ['refresh'],
    setup(_, { emit }) {
      const router = useRouter();
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const { createMessage, createConfirm } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const { hasPermission } = usePermission();

      // 编辑
      const handleEdit = (id) => {
        router.push({ name: 'SpPersonEdit', params: { type: 'edit', id } });
      };

      // 查看
      const hanldeView = (id) => {
        if (hasPermission('SpPersonVIew')) {
          router.push({ name: 'SpPersonVIew', params: { type: 'view', id } });
        }
      };

      // 移除
      const handleRemove = (id) => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会移除该专家, 是否继续?',
          onOk() {
            spPersonRemove(id);
          },
        });
      };

      const spPersonRemove = async (id) => {
        await spPersonRemoveApi({ ids: id });
        createMessage.success('移除成功');
        emit('refresh');
      };

      // 发送邀请函
      const handleInviteEmail = (record) => {
        openModal(true, {
          title: '发送邀请函',
          api: spPersonSendInvitationLetterViewApi,
          type: 1,
          id: record.id,
        });
      };

      // 发送电子聘书
      const handleLetterEmail = (record) => {
        openModal(true, {
          title: '发送电子聘书',
          api: spPersonSendLetterViewApi,
          type: 4,
          id: record.id,
        });
      };

      // 邮件确认回调
      const handleSuccess = (sendData, data) => {
        if (data.type == 1) {
          spPersonSendInvitationLetter(sendData);
        } else {
          spPersonSendLetter(sendData);
        }
      };

      // 邮件邀请接口
      const spPersonSendInvitationLetter = async (data) => {
        await spPersonSendInvitationLetterApi(data);
        createMessage.success('发送成功');
        emit('refresh');
      };

      // 电子聘书接口
      const spPersonSendLetter = async (data) => {
        await spPersonSendLetterApi(data);
        createMessage.success('发送成功');
        emit('refresh');
      };

      return {
        registerModal,
        VITE_GLOB_DOFILE_URL,
        handleEdit,
        hanldeView,
        handleRemove,
        handleInviteEmail,
        handleLetterEmail,
        handleSuccess,
        defaultAvatar,
        hasPermission,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/do-sp.less';

  .card-person-wrap {
    min-height: 205px;
    cursor: default;
  }
</style>
