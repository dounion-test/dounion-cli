<template>
  <PageWrapper fixedHeight contentFullHeight>
    <div class="search-box">
      <a-input-search
        v-model:value="searchValue"
        placeholder="请输入成果描述信息进行检索"
        style="width: 300px"
        @search="onSearch"
      />
    </div>

    <div class="content">
      <a-tabs v-model:activeKey="tabsActiveKey">
        <a-tab-pane key="1" tab="全部" />

        <a-tab-pane key="2" tab="待审批" />

        <a-tab-pane key="3" tab="已认定" />

        <a-tab-pane key="4" tab="申请记录" />
      </a-tabs>

      <BasicTable @register="registerTable" class="funcTabs">
        <template #toolbar>
          <a-button type="primary" @click="handleCreate">新增</a-button>
          <!-- <a-button type="primary" @click="handleCreate">删除</a-button> -->
        </template>
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                tooltip: '撤销申请',
                icon: 'ant-design:rollback-outlined',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'ant-design:check-outlined',
                tooltip: '提交申请',
                onClick: handleShowApplyModal.bind(null, record),
              },
              {
                icon: 'eva:edit-2-outline',
                tooltip: '编辑资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'fluent:delete-28-regular',
                color: 'error',
                tooltip: '删除',
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
    </div>

    <BasicModal @register="registerModal" :width="800" title="新增认定成果" @ok="handleOk" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns } from './config/index';
  import { getSpSciSubjectList } from '/@/api/testDemo/scientific';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs, InputSearch } from 'ant-design-vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  export default defineComponent({
    name: 'Recognition',
    components: {
      BasicTable,
      TableAction,
      PageWrapper,
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
      AInputSearch: InputSearch,
      BasicModal,
    },
    setup() {
      /**
       * tabs key
       */
      const tabsActiveKey = ref<string>('1');
      /**
       * 搜索 value和 事件
       */
      const searchValue = ref<string>('');
      const onSearch = () => {};

      /**
       * 申报课题
       */
      const [registerModal, { openModal, closeModal }] = useModal();
      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        api: getSpSciSubjectList,
        rowKey: 'id',
        columns,
        isTreeTable: true,
        childrenColumnName: 'subFunction',
        useSearchForm: false,
        pagination: false,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        customRow: (record) => {
          return {
            onDblclick: () => {},
          };
        },
      });

      const handleView = () => {};

      const handleShowApplyModal = () => {};

      const handleCreate = () => {
        openModal(true, { isUpdate: true });
      };

      const handleOk = () => {
        closeModal(false);
      };

      const handleEdit = () => {};

      const handleDelete = () => {};

      return {
        tabsActiveKey,
        searchValue,
        onSearch,
        registerTable,
        handleView,
        handleShowApplyModal,
        handleCreate,
        registerModal,
        handleOk,
        handleEdit,
        handleDelete,
      };
    },
  });
</script>

<style scoped lang="less">
  [data-theme='dark'] {
    .search-box,
    .content {
      background-color: #151515;
    }
  }

  .search-box {
    background-color: #fff;
    text-align: right;
    padding: 10px;
    margin-bottom: 10px;
  }

  .content {
    background-color: #fff;
  }

  :deep(.ant-tabs) {
    padding: 6px;

    .ant-tabs-nav {
      margin-bottom: 0 !important;
    }
  }
</style>
