<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-19 17:08:36
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 14:48:46
 * @FilePath: /rural-revitalization/src/views/doMail/send.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" class="!p-0" :searchInfo="searchParams">
      <template #form-custom>
        <a-form-item-rest>
          <div class="flex">
            <SearchWrap
              placeholder="请输入主题或发件人"
              :searchList="searchArr"
              @search="handleSearch"
            />
          </div>
        </a-form-item-rest>
      </template>
      <template #toolbar>
        <a-button
          v-if="hasPermission('XcmailDelEmpty')"
          class="ml-2"
          type="primary"
          @click="handleClear"
          >清空</a-button
        >
      </template>
      <template #topic="{ record }">
        <span
          :class="{ 'email-topic': hasPermission('XcmailDelView') }"
          @click="handleView(record)"
          >{{ record.topic }}</span
        >
      </template>
      <template #oaAttachmentList="{ record }">
        <div>
          <Icon v-if="record.oaAttachmentList.length > 0" icon="ant-design:paper-clip-outlined" />
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
              icon: 'ant-design:reload-outlined',
              tooltip: '恢复',
              label: '恢复',
              auth: 'XcmailDelRevert',
              popConfirm: {
                title: '是否确认恢复',
                placement: 'bottomRight',
                confirm: handleReload.bind(null, record),
              },
            },
            {
              icon: 'fluent:delete-28-regular',
              color: 'error',
              tooltip: '彻底删除',
              label: '彻底删除',
              auth: 'XcmailDelDeletef',
              popConfirm: {
                title: '是否确认彻底删除',
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
  import { defineComponent, reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Icon } from '/@/components/Icon';
  import { SearchWrap } from '/@/components/SearchWrap';
  import {
    oamailDeleteListApi,
    oamailDeleteRevertApi,
    oamailDeleteEmptyApi,
    oamailDeleteDeleteForeverApi,
  } from '/@/api/doMail/delete';
  import { PageWrapper } from '/@/components/Page';
  import { columns, searchArr, getFormConfig } from '../config/delete';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';
  import { usePermission } from '/@/hooks/web/usePermission';
  export default defineComponent({
    name: 'XcmailDelList',
    components: {
      Icon,
      BasicTable,
      TableAction,
      PageWrapper,
      SearchWrap,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const router = useRouter();
      const { createMessage, createConfirm } = useMessage();
      const searchParams = reactive({
        topicOrPersonName: undefined,
        topicLike: undefined,
        personNameLike: undefined,
        startDate: undefined,
        endDate: undefined,
      });
      const { hasPermission } = usePermission();
      const hasAuth = [hasPermission('XcmailDelView')];
      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        api: oamailDeleteListApi,
        rowKey: 'id',
        columns,
        formConfig: getFormConfig(),
        useSearchForm: true,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        customRow: (record) => {
          return {
            onDblclick: () => {
              if (hasAuth[0]) {
                router.push({
                  name: 'XcmailDelView',
                  params: { id: record.id, type: `delete_${record.deleteType}` },
                });
              } else {
                createMessage.warning('您暂无查看权限');
              }
            },
          };
        },
      });

      //查看
      const handleView = (record) => {
        if (hasAuth[0]) {
          router.push({
            name: 'XcmailDelView',
            params: { id: record.id, type: `delete_${record.deleteType}` },
          });
        } else {
          return;
        }
      };

      /**
       * 恢复
       */
      const handleReload = async (record) => {
        await oamailDeleteRevertApi(
          record.deleteType === 'RECEIVE' ? { receiveIds: record.id } : { sendIds: record.id },
        );
        createMessage.success('操作成功');
        reload();
      };

      /**
       * 删除
       */
      const handleDelete = async (record) => {
        await oamailDeleteDeleteForeverApi(
          record.deleteType === 'RECEIVE' ? { receiveIds: record.id } : { sendIds: record.id },
        );
        createMessage.success('操作成功');
        reload();
      };

      /**
       * 清空
       */
      const handleClear = () => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: `确定清空已删除列表？`,
          onOk() {
            oamailDeleteEmpty();
          },
        });
      };

      const oamailDeleteEmpty = async () => {
        await oamailDeleteEmptyApi();
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
              searchParams.startDate = item.value ? item.value[0] : undefined;
              searchParams.endDate = item.value ? item.value[1] : undefined;
            } else {
              searchParams[item.field] = item.value;
            }
          });
        }
        reload();
      };

      return {
        searchArr,
        searchParams,
        registerTable,
        handleView,
        handleReload,
        handleDelete,
        handleSearch,
        handleClear,
        hasPermission,
      };
    },
  });
</script>

<style lang="less" scoped>
  :deep(.ant-table-thead) {
    tr {
      :nth-child(2)::before {
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
