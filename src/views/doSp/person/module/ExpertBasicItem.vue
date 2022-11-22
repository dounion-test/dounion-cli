<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 11:04:23
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-27 10:35:52
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/ExpertBasicItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-card
    v-for="it in tableData"
    :key="it.id"
    :hoverable="true"
    class="w-full relative card-person-wrap"
  >
    <a-row :span="24" :gutter="[10, 10]">
      <a-col :span="8">
        <div class="flex user-baseinfo">
          <img
            v-if="it.headImgFile.length > 0"
            class="img"
            :src="`${VITE_GLOB_DOFILE_URL}${it.headImgFile[0].filePath}`"
          />
          <img
            v-if="it.headImgFile.length == 0 && it.pictures.length > 0"
            class="img"
            :src="`${VITE_GLOB_DOFILE_URL}${it.pictures[0].filePath}`"
          />
          <img
            v-if="it.headImgFile.length == 0 && it.pictures.length == 0"
            class="img"
            :src="defaultAvatar"
          />
          <div class="info">
            <h3 @click="hanldeView(it.id)" :class="{ alink: hasPermission('SpPersonVIew') }"
              ><span class="name" :title="it.name">{{ it.name }}</span
              ><b v-if="it.educationName">（{{ it.educationName }}）</b></h3
            >
            <p v-if="it.school">{{ it.school }}</p>
            <p v-if="it.certSdate">入驻时间：{{ it.certSdate }}</p>
            <p
              >技术职称：{{
                it.jobTitleId === '52052-1011' || it.jobTitleId === '52052-2601'
                  ? it.otherJobTitle
                  : it.jobTitleIdName || '-'
              }}</p
            >
          </div>
        </div>
        <div class="other">
          <p>专家编码：{{ it.spNumber || '-' }}</p>
          <p>单位：{{ it.companyName || '-' }}</p>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="activity-info">
          <p @click="handleActList" :class="{ alink: hasPermission('SpSciActList') }">
            <Icon icon="bi:balloon" color="#55d187" class="mr-1" />
            <strong
              >乡研活动（{{ it.actList.length }}）<template v-if="it.actList.length"
                >：</template
              ></strong
            >
          </p>
          <ul>
            <li
              v-show="j < 2"
              v-for="(i, j) in it.actList"
              :key="j"
              class="mt-3 bg-white"
              @click="handleActView(i)"
              :class="{ alink: hasPermission('SpSciActView') }"
            >
              <span>{{ i.name }}</span>
              <span class="c-status">【{{ i.statusName }}】</span>
            </li>
          </ul>
        </div>
      </a-col>
      <a-col :span="8">
        <div
          class="other-info"
          @click="hanldeView(it.id)"
          :class="{ alink: hasPermission('SpPersonVIew') }"
        >
          <p>
            <Icon icon="healthicons:register-book-outline" />
            <strong
              >参与的课题/项目<em>（{{ it.subjectCount }}）</em></strong
            >
          </p>
          <p>
            <Icon icon="tabler:award" />
            <strong
              >科研成果<em>（{{ it.achieveCount }}）</em></strong
            >
          </p>
          <a-tag class="rounded-sm" v-show="j < 3" v-for="(i, j) in it.labels" :key="j">{{
            i
          }}</a-tag>
        </div>
      </a-col>
    </a-row>
    <ExpandTransition>
      <div class="mt-2 pt-2 button-bar" v-if="it.status != '52002-20'">
        <a-button
          type="primary"
          @click.stop="handleLetterEmail(it)"
          v-if="!it.certSdate"
          class="mr-2"
          >发电子聘书</a-button
        >
        <a-button @click.stop="handleEmail(it)" v-if="!it.certSdate" class="mr-2" type="primary"
          >发邀请函</a-button
        >
        <Authority value="SpPersonEdit">
          <a-button @click.stop="handleEdit(it.id)" class="mr-2" type="primary">编辑信息</a-button>
        </Authority>
        <Authority value="SpPersonDelete">
          <a-button @click.stop="handleRemove(it.id)" type="primary">移除专家</a-button>
        </Authority>
      </div>
    </ExpandTransition>
    <div class="flex items-center right-top">
      <Icon class="new-icon" v-if="!it.certSdate" icon="ic:round-fiber-new" />
      <a-tooltip>
        <template #title>外网注册</template>
        <Icon
          v-if="it.certSdate && it.sourceType == '52001-10'"
          icon="ant-design:global-outlined"
          class="inner-icon"
        />
      </a-tooltip>
      <a-tooltip>
        <template #title>内网录入</template>
        <Icon
          v-if="it.certSdate && it.sourceType == '52001-20'"
          icon="teenyicons:send-outline"
          class="out-icon"
        />
      </a-tooltip>
    </div>
    <EmailModal @register="registerModal" @success="handleSuccess" />
  </a-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { List, Card, Tag, Row, Col, Tooltip } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { Authority } from '/@/components/Authority';
  import EmailModal from './EmailModal.vue';
  import { ExpandTransition } from '/@/components/Transition';
  import { getAppEnvConfig } from '/@/utils/env';
  import { useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import {
    spPersonRemoveApi,
    spPersonSendLetterApi,
    spPersonSendLetterViewApi,
    spPersonSendInvitationLetterApi,
    spPersonSendInvitationLetterViewApi,
  } from '/@/api/doSp/person';
  import defaultAvatar from '/@/assets/images/default-avatar.jpg';

  export default defineComponent({
    components: {
      Icon,
      EmailModal,
      ExpandTransition,
      [List.name]: List,
      [List.Item.name]: List.Item,
      ACard: Card,
      ATag: Tag,
      ARow: Row,
      ACol: Col,
      Authority,
      ATooltip: Tooltip,
    },
    props: {
      tableData: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
    emits: ['refresh'],
    setup(_, { emit }) {
      const router = useRouter();
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const { createMessage, createConfirm } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const { hasPermission } = usePermission();

      const handleEdit = (id) => {
        router.push({ name: 'SpPersonEdit', params: { type: 'edit', id } });
      };

      const hanldeView = (id) => {
        if (!hasPermission('SpPersonVIew')) return;
        router.push({ name: 'SpPersonVIew', params: { type: 'view', id } });
      };

      const handleActView = (item) => {
        if (!hasPermission('SpSciActView')) return;
        sessionStorage.setItem(
          `SCIACT_STATE_${item.id}`,
          JSON.stringify({ pageNo: 1, pageSize: 10, searchParams: { nameQueryLike: item.name } }),
        );
        router.push({ name: 'SpSciActView', params: { type: 'view', id: item.id } });
      };

      const handleActList = () => {
        if (!hasPermission('SpSciActList')) return;
        router.push({ name: 'SpSciActList' });
      };

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

      // 发送电子聘书
      const handleLetterEmail = (record) => {
        openModal(true, {
          title: '发送电子聘书',
          api: spPersonSendLetterViewApi,
          type: 4,
          id: record.id,
        });
      };

      // 发送邀请函/电子聘书
      const handleEmail = (record) => {
        openModal(true, {
          title: '发送邀请函',
          api: spPersonSendInvitationLetterViewApi,
          type: 1,
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
        defaultAvatar,
        registerModal,
        VITE_GLOB_DOFILE_URL,
        handleEdit,
        hanldeView,
        handleActView,
        handleActList,
        handleRemove,
        handleEmail,
        handleLetterEmail,
        handleSuccess,
        hasPermission,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/do-sp.less';

  .card-person-wrap {
    margin-bottom: 16px;
    cursor: default;

    .other-info {
      p {
        em {
          font-style: normal;
        }

        .app-iconify {
          margin-right: 5px;
          font-size: @font-size-b6;
          color: #27ad9a;
        }
      }

      :deep(.ant-tag) {
        margin-top: 5px;
        background-color: #fff;
      }
    }
  }

  .right-top {
    right: 10px;
  }

  .ebi-status {
    width: 60px;
    position: absolute;
    top: 35px;
    right: 20px;
  }

  .button-bar {
    display: none;
    border-top: 1px dashed #e5e7eb;
  }

  .card-person-wrap:hover {
    .button-bar {
      display: block;
    }
  }
</style>
