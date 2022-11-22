<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" class="receive-Tabs" :searchInfo="searchParams">
      <template #form-custom>
        <a-form-item-rest>
          <SearchWrap
            placeholder="请输入主题或发件人"
            :searchList="searchArr"
            @search="handleSearch"
          />
        </a-form-item-rest>
      </template>
      <template #tableTitle>
        <div v-if="unReadCount"
          >有{{ unReadCount }}封未读，<span @click="handleAllread" class="icon-color cursor-pointer"
            >全部标记为已读</span
          ></div
        >
      </template>
      <template #topic="{ record }">
        <span
          :class="{ 'email-topic': hasPermission('XcmailReceiveView') }"
          @click="handleView(record.id)"
          >{{ record.topic }}</span
        >
      </template>
      <template #receiveStatus="{ record }">
        <div>
          <a-tooltip>
            <template #title>{{ record.receiveStatusName }}</template>
            <Icon v-if="!record.emailOpState" color="#fa8c16" icon="ic:round-email" />
            <Icon
              v-if="record.emailOpState && record.receiveStatus == '21007-60'"
              class="icon-color"
              icon="ic:baseline-forward"
            />
            <Icon
              v-if="record.emailOpState && record.receiveStatus == '21007-70'"
              color="#67c23a"
              icon="ic:baseline-reply"
            />
            <div class="relative" v-if="record.emailOpState && record.receiveStatus == '21007-80'">
              <Icon class="icon-color icon-top" icon="ic:baseline-forward" />
              <Icon class="icon-bottom" color="#67c23a" icon="ic:baseline-reply" />
            </div>
          </a-tooltip>
        </div>
      </template>
      <template #personName="{ record }">
        <div class="flex items-center">
          <span class="mr-1">{{ record.personName }}</span>
          <Icon v-if="record.oaAttachmentList.length > 0" icon="ant-design:paper-clip-outlined" />
        </div>
      </template>
      <template #isImportant="{ record }">
        <div @click.stop="handleIsImportant(record)" class="cursor-pointer">
          <Icon v-if="record.isImportant" color="#ff0000" icon="ion:flag" />
          <Icon v-else color="#ccc" icon="ion:flag-outline" />
        </div>
      </template>
      <template #emailSize="{ record }">
        <div>{{ (record.emailSize / 1024).toFixed(2) }} K</div>
      </template>
      <template #action="{ record }">
        <TableAction
          @click.stop
          :actions="[
            {
              icon: 'ic:baseline-reply',
              label: '回复',
              tooltip: '回复',
              auth: 'XcmailReceiveReplay',
              onClick: handleReply.bind(null, record),
            },
            {
              icon: 'ic:baseline-forward',
              tooltip: '转发',
              label: '转发',
              auth: 'XcmailReceiveForward',
              onClick: handleForward.bind(null, record),
            },
            {
              icon: 'ic:outline-mark-email-read',
              tooltip: '标记为已读',
              label: '标记为已读',
              auth: 'XcmailReceiveRead',
              ifShow: record.emailOpState != 1,
              onClick: handleRead.bind(null, record),
            },
            {
              icon: 'ic:outline-mark-email-unread',
              tooltip: '标记为未读',
              label: '标记为未读',
              auth: 'XcmailReceiveUnread',
              ifShow: record.emailOpState == 1,
              onClick: handleRead.bind(null, record),
            },
            {
              icon: 'fluent:delete-28-regular',
              color: 'error',
              tooltip: '删除',
              label: '删除',
              auth: 'XcmailReceiveDelete',
              popConfirm: {
                title: '是否确认删除',
                placement: 'bottomRight',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { Form, Tooltip } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, getFormConfig, searchArr } from '../config/receive';
  import {
    oamailReceiveListApi,
    oamailReceiveReadApi,
    oamailReceiveAllreadApi,
    oamailReceiveDeleteApi,
    oamailReceiveImportantApi,
  } from '/@/api/doMail/receive';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';
  import { usePermission } from '/@/hooks/web/usePermission';
  export default defineComponent({
    name: 'XcmailReceiveList',
    components: {
      Icon,
      BasicTable,
      TableAction,
      PageWrapper,
      SearchWrap,
      ATooltip: Tooltip,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const unReadCount = ref(0);
      const router = useRouter();
      const { createMessage } = useMessage();
      const searchParams = reactive({
        topicOrPersonName: undefined,
        topicLike: undefined,
        personNameLike: undefined,
        receiveStartTime: undefined,
        receiveEndTime: undefined,
      });
      const { hasPermission } = usePermission();
      const hasAuth = [hasPermission('XcmailReceiveView')];
      /**
       * table 列表
       */
      const [registerTable, { reload, getRawDataSource }] = useTable({
        api: oamailReceiveListApi,
        rowKey: 'id',
        columns,
        formConfig: getFormConfig(),
        useSearchForm: true,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: false,
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        afterFetch: (res) => handleAfterFetch(res),
        customRow: (record) => {
          return {
            onDblclick: () => {
              if (hasAuth[0]) {
                router.push({
                  name: 'XcmailReceiveView',
                  params: { id: record.id, type: 'receive' },
                });
              } else {
                createMessage.warning('您暂无查看权限');
              }
            },
          };
        },
      });

      /**
       * table数据处理
       */
      const handleAfterFetch = (res) => {
        let result = getRawDataSource();
        unReadCount.value = result.unReadCount;
        return res;
      };

      //查看
      const handleView = (id) => {
        console.log(hasAuth[0], 'hasAuth[0]');
        if (hasAuth[0]) {
          router.push({
            name: 'XcmailReceiveView',
            params: { id, type: 'receive' },
          });
        } else {
          return;
        }
      };

      /**
       * 回复
       */
      const handleReply = (record) => {
        router.push({ name: 'XcmailReceiveReplay', params: { id: record.id, type: 'reply' } });
      };

      /**
       * 转发
       */
      const handleForward = (record) => {
        router.push({ name: 'XcmailReceiveForward', params: { id: record.id, type: 'forward' } });
      };

      /**
       * 标记为已读/未读
       */
      const handleRead = async (record) => {
        await oamailReceiveReadApi(record.emailOpState ? 0 : 1, { ids: record.id });
        createMessage.success('标记成功');
        reload();
      };

      /**
       * 全部标记为已读
       */
      const handleAllread = async () => {
        await oamailReceiveAllreadApi(1);
        createMessage.success('标记已读成功');
        reload();
      };

      /**
       * 标记重要邮件
       */
      const handleIsImportant = async (record) => {
        let opType = record.isImportant ? 0 : 1;
        await oamailReceiveImportantApi(opType, { ids: record.id });
        createMessage.success('操作成功');
        reload();
      };

      /**
       * 删除
       */
      const handleDelete = async (record) => {
        await oamailReceiveDeleteApi({ ids: record.id });
        createMessage.success('操作成功');
        reload();
      };

      /**
       * 搜索
       */
      const handleSearch = (inputvalue, searchList) => {
        searchParams.topicOrPersonName = inputvalue;
        if (searchList.length > 0) {
          searchList.forEach((item) => {
            if (item.type == 'rangePicker') {
              searchParams.receiveStartTime = item.value ? item.value[0] : undefined;
              searchParams.receiveEndTime = item.value ? item.value[1] : undefined;
            } else {
              searchParams[item.field] = item.value;
            }
          });
        }
        reload();
      };

      return {
        unReadCount,
        searchArr,
        searchParams,
        registerTable,
        handleView,
        handleDelete,
        handleSearch,
        handleReply,
        handleForward,
        handleRead,
        handleAllread,
        handleIsImportant,
        hasPermission,
      };
    },
  });
</script>

<style lang="less" scoped>
  .receive-Tabs {
    padding: 0;
  }

  .icon-color {
    color: @primary-color;
  }

  .icon-top {
    margin-left: 3px;
  }

  .icon-bottom {
    position: absolute;
    top: 8px;
    left: 0;
  }

  :deep(.ant-table-thead) {
    tr {
      :first-child::before {
        width: 0 !important;
      }
    }
  }
</style>

<style lang="less">
  .email-topic {
    cursor: pointer;
    color: @primary-color;
  }
</style>
