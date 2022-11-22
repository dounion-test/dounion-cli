<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-10 16:22:56
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-25 16:38:26
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/module/ActivityListItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-row class="activity-con" :gutter="[16, 16]" justify="space-between">
    <a-col :span="14">
      <div class="flex base-info">
        <div class="pic">
          <img
            v-if="record.pictures && record.pictures.length"
            :src="`${VITE_GLOB_DOFILE_URL}${record.pictures[0].filePath}`"
          />
          <template v-else>
            <div class="flex items-center justify-center no-pic">
              <SvgIcon name="logo" :size="80" />
            </div>
          </template>
        </div>

        <div class="ml-4 info">
          <h3 @click="handleView(record.id)" :class="{ alink: hasPermission('SpSciActView') }"
            ><span v-if="record.categoryTypeName">【{{ record.categoryTypeName }}】</span
            >{{ record.name }}</h3
          >
          <p> 特邀专家：{{ record.invents || '-' }} </p>
          <p>
            <Icon class="mr-1" icon="bxs:map" />
            <span>{{ record.address }}</span>
          </p>
          <p>
            <Icon class="mr-1" icon="bxs:time-five" />
            <span>{{ record.startDate }}至{{ record.endDate }}</span>
          </p>
        </div>
      </div>
    </a-col>
    <a-col :span="6">
      <ActivityItemTable :planList="record.planList" class="act-table" />
    </a-col>
    <a-col :span="3">
      <div class="act-status">
        <div class="status-box">
          <p class="c-green" v-if="record.status == '52004-50'"
            ><SvgIcon size="60" name="tag-bg" /><span class="bg-white">未发布</span></p
          >
          <p class="c-brown" v-if="record.status == '52004-10'"
            ><SvgIcon size="60" name="tag-bg" /><span class="bg-white">未开始</span></p
          >
          <p class="c-orange" v-if="record.status == '52004-20'"
            ><SvgIcon size="60" name="tag-bg" /><span class="bg-white">进行中</span></p
          >
          <p class="c-gray" v-if="record.status == '52004-30'"
            ><SvgIcon size="60" name="tag-bg" /><span class="bg-white">已结束</span></p
          >
          <p class="c-gray" v-if="record.status == '52004-40'"
            ><SvgIcon size="60" name="tag-bg" /><span class="bg-white">已取消</span></p
          >
        </div>
        <div class="mt-10">
          <a-button
            v-if="record.status == '52004-50'"
            @click.stop="handleSend(record)"
            type="primary"
            size="small"
            class="mr-2"
            >发布</a-button
          >
          <Authority value="SpSciActEdit">
            <a-button
              v-if="record.status == '52004-50'"
              @click.stop="handleEdit(record.id)"
              type="primary"
              size="small"
              class="mr-2"
              >修改活动</a-button
            >
          </Authority>
          <Authority value="SpSciActAdd">
            <a-button
              v-if="record.status == '52004-10' || record.status == '52004-20'"
              @click.stop="handleCancel(record.id)"
              size="small"
              >取消活动</a-button
            >
          </Authority>
          <Authority value="SpSciActSummary">
            <a-button
              v-if="record.status == '52004-30'"
              @click.stop="handleSummary(record.id)"
              size="small"
              type="primary"
              >活动总结</a-button
            >
          </Authority>
        </div>
      </div>
    </a-col>
    <EmailModal @register="registerModal" @success="handleSuccess" style="width: 700px" />
  </a-row>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue';
  import { Row, Col } from 'ant-design-vue';
  import { Icon, SvgIcon } from '/@/components/Icon';
  import { Authority } from '/@/components/Authority';
  import EmailModal from '../../../person/module/EmailModal.vue';
  import ActivityItemTable from './ActivityItemTable.vue';
  import { useRouter } from 'vue-router';
  import { getAppEnvConfig } from '/@/utils/env';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { propTypes } from '/@/utils/propTypes';
  import {
    spSciActCancelApi,
    spSciActPublishApi,
    spSciActCancelViewApi,
    spSciActPublishListViewApi,
  } from '/@/api/doSp/act/sciAct';

  export default defineComponent({
    components: {
      Icon,
      EmailModal,
      SvgIcon,
      ARow: Row,
      ACol: Col,
      ActivityItemTable,
      Authority,
    },
    props: {
      record: propTypes.object,
    },
    emits: ['refresh'],
    setup(_, { emit }) {
      const router = useRouter();
      const state: any = inject('state');
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const { hasPermission } = usePermission();

      // 发布
      const handleSend = async (record) => {
        if (!record.invents) {
          createMessage.warning('请先邀请专家');
          return false;
        }
        openModal(true, {
          title: '发送活动邀请',
          api: spSciActPublishListViewApi,
          type: 5,
          id: record.id,
        });
      };

      // 编辑
      const handleEdit = (id) => {
        router.push({ name: 'SpSciActEdit', params: { type: 'edit', id } });
      };

      // 取消
      const handleCancel = (id) => {
        openModal(true, { title: '取消活动', api: spSciActCancelViewApi, type: 3, id });
      };

      // 总结
      const handleSummary = (id) => {
        router.push({ name: 'SpSciActSummary', params: { type: 'summary', id } });
      };

      // 查看
      const handleView = (id) => {
        sessionStorage.setItem(`SCIACT_STATE_${id}`, JSON.stringify(state));
        router.push({ name: 'SpSciActView', params: { type: 'view', id } });
      };

      const handleSuccess = (data, modelData) => {
        if (modelData.type == 5) {
          spSciActPublish(data);
        } else {
          spSciActCancel(data);
        }
      };

      // 发布
      const spSciActPublish = async (data) => {
        await spSciActPublishApi(data);
        createMessage.success('发布成功');
        emit('refresh');
      };

      // 取消活动
      const spSciActCancel = async (data) => {
        await spSciActCancelApi(data);
        createMessage.success('取消成功');
        emit('refresh');
      };

      return {
        registerModal,
        VITE_GLOB_DOFILE_URL,
        handleEdit,
        handleCancel,
        handleSummary,
        handleView,
        handleSend,
        handleSuccess,
        hasPermission,
      };
    },
  });
</script>

<style lang="less" scoped>
  .info {
    h3 {
      font-size: @font-size-b4;
      font-weight: 600;
    }

    p {
      margin-top: 10px;
      display: flex;
      align-items: center;
      padding-left: 8px;

      .anticon {
        color: #77797b;
      }
    }
  }

  .pic {
    min-width: 240px;
    width: 240px;
    height: 154px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .no-pic {
    height: 100%;
    color: #666;
    background: #e8e8e8;

    img {
      max-height: 60%;
      object-fit: contain;
    }
  }

  .act-table {
    min-width: 255px;
  }

  .act-status {
    min-width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .status-box {
    width: 60px;

    p {
      position: relative;
    }

    span {
      position: absolute;
      top: 21px;
      left: -2px;
      transform: rotate(-30deg);
      font-size: @font-size-b2;
      padding: 0 10px;
      width: 66px;
    }

    .c-green {
      color: #87d068;
    }

    .c-brown {
      color: #c88740;
    }

    .c-orange {
      color: #ffaa2b;
    }

    .c-gray {
      color: #999;
    }
  }
</style>
