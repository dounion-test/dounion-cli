<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-09 09:23:30
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 14:52:55
 * @FilePath: /vben-ucenter/src/views/doUcenter/function/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper>
    <BasicTable
      @register="registerTable"
      class="func-tabs"
      :searchInfo="searchInfo"
      @fetch-success="handelSuccess"
    >
      <template #form-custom>
        <div class="tableTitle">菜单列表</div>
        <a-tabs v-model:activeKey="searchInfo.projectId" @change="handleChange" :animated="false">
          <a-tab-pane v-for="item in appList" :key="item.id" :tab="item.name" />
        </a-tabs>
      </template>
      <template #toolbar>
        <Authority value="UcenterFunctionAdd">
          <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        </Authority>
      </template>
      <template #action="{ record }">
        <TableAction
          v-if="record.type != 1"
          :actions="[
            {
              icon: 'eva:edit-2-outline',
              tooltip: '编辑',
              label: '编辑',
              auth: 'UcenterFunctionEdit',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'fluent:delete-28-regular',
              color: 'error',
              tooltip: '删除',
              label: '删除',
              auth: 'UcenterFunctionDelete',
              onClick: handleDelete.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <FunctionModals @register="registerModal" @success="handleModalSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, computed, reactive, nextTick } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';
  import { Authority } from '/@/components/Authority';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, getFormConfig } from './config/index';
  import {
    getUcenterFunctionListTreeApi,
    ucenterFunctionDeleteApi,
  } from '/@/api/testDemo/function';
  import FunctionModals from './module/FunctionModals.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { usePermissionStore } from '/@/store/modules/permission';

  export default defineComponent({
    components: {
      PageWrapper,
      Authority,
      BasicTable,
      TableAction,
      ATabs: Tabs,
      ATabPane: TabPane,
      FunctionModals,
    },
    setup() {
      const searchInfo = reactive<Recordable>({});
      const permissionStore = usePermissionStore();
      const { hasPermission } = usePermission();
      const { createMessage, createConfirm } = useMessage();
      searchInfo.projectId = permissionStore.currentAppID;
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload, expandAll }] = useTable({
        api: getUcenterFunctionListTreeApi,
        rowKey: 'id',
        columns,
        formConfig: getFormConfig(),
        isTreeTable: true,
        childrenColumnName: 'subFunction',
        useSearchForm: true,
        pagination: false,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: true,
        actionColumn: {
          width: 110,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        afterFetch: (res) => handleAfterFetch(res),
        customRow: (record) => {
          return {
            onDblclick: () => {
              if (!hasPermission('UcenterFunctionEdit')) {
                createMessage.warning('对不起， 您暂无编辑权限！');
                return false;
              }
              if (record.type == 1) return false;
              openModal(true, { isUpdate: true, id: record.id, projectId: searchInfo.projectId });
            },
          };
        },
      });
      // 获取list后处理数据
      const handleAfterFetch = async (res) => {
        await flatten(res[0].subFunction, '');
        return res[0].subFunction;
      };
      // 默认展开
      const handelSuccess = () => {
        nextTick(() => {
          expandAll();
        });
      };
      // 新增
      const handleCreate = () => {
        openModal(true, { isUpdate: false, projectId: searchInfo.projectId });
      };
      // 编辑
      const handleEdit = (record) => {
        openModal(true, { isUpdate: true, id: record.id, projectId: searchInfo.projectId });
      };
      // 删除
      const handleDelete = (record) => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会删除该菜单, 是否继续?',
          onOk() {
            console.log(record, 'record');
            ucenterFunctionDelete(record);
          },
        });
      };
      const ucenterFunctionDelete = (record) => {
        const idQueryIn = record.id;
        ucenterFunctionDeleteApi({ idQueryIn }).then(() => {
          createMessage.success('删除成功');
          reload();
        });
      };
      const handleChange = () => {
        reload();
      };
      // 遍历树型结构数组
      const flatten = (arr, name) => {
        let parentName: string = name;
        for (let item of arr) {
          item.parentName = parentName;
          if (item.subFunction && Array.isArray(item.subFunction) && item.subFunction.length > 0) {
            flatten(item.subFunction, item.name);
          } else {
            delete item.subFunction;
          }
        }
      };
      const handleModalSuccess = () => {
        console.log('11111111');
      };
      return {
        searchInfo,
        registerModal,
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleChange,
        handelSuccess,
        handleModalSuccess,
        appList: computed(() => {
          return permissionStore.appList;
        }),
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-basic-table-form-container';
  .tableTitle {
    font-size: @font-size-b4;
    font-weight: 500;
    color: #000;
    cursor: pointer;
  }

  :deep(.ant-form) {
    margin-bottom: 0;
    padding: 12px 10px 0;
  }

  :deep(.ant-tabs-nav) {
    margin: 0;
  }

  :deep(.@{prefix-cls}) {
    padding: 0;
  }
</style>

<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-form--compact';
  .func-tabs {
    .ant-row .ant-col-24 {
      height: 0;
    }
    .ant-form {
      border-bottom: none;
    }

    .@{prefix-cls} {
      .ant-form-item {
        margin-bottom: 0 !important;
      }
    }
  }
</style>
