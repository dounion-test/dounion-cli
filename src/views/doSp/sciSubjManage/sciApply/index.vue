<template>
  <PageWrapper contentFullHeight contentBackground>
    <div class="op-task-search search-box">
      <a-input-search
        v-model:value="searchValue"
        placeholder="请输入流程标题"
        style="width: 300px"
        @search="reload(getSearchInfo())"
      />
    </div>
    <div class="content">
      <a-tabs v-model:activeKey="tabsActiveKey" @change="tabChange">
        <a-tab-pane key="1" :tab="`待办列表 ( ${totalNum} )`" force-render />
        <a-tab-pane key="2" tab="已办列表" />
      </a-tabs>

      <BasicTable @register="registerTable" class="func-tabs" :fetch-success="getData">
        <template #applyFile="{ record }">
          <a-button @click="openPreviewModal(record)">
            <Icon icon="mdi:file-document-outline" />
            1
          </a-button>
        </template>
        <template #statusName="{ record }">
          <a-tag :color="statusObj[record.status]">{{ record.statusName }}</a-tag>
        </template>
        <template #name="{ record }">
          <span v-html="record.name"></span>
        </template>
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                icon:
                  record.status !== '21002-40'
                    ? 'material-symbols:touch-app-outline-rounded'
                    : 'akar-icons:eye',
                tooltip: record.status === '21002-40' ? '查看详情' : '审批',
                label: record.status === '21002-40' ? '查看详情' : '审批',
                onClick: handleView.bind(null, record),
                ifShow:
                  record.status === '21002-40'
                    ? hasPermission('SpSciApplyView')
                    : hasPermission('SpSciApplyApproval'),
                onDblclick: (e) => e.stopPropagation(),
              },
            ]"
          />
        </template>
      </BasicTable>
    </div>

    <BasicModal @register="registerModal" :width="800" :title="modalTitle" @ok="handleOk">
      <BasicForm :actionColOptions="{ span: 16 }" @register="register" class="width-80" />
    </BasicModal>

    <UploadPreviewModal :value="fileList" :isView="true" @register="registerPreviewModal" />

    <WorkFlow
      @submit="getWorkFlow"
      @cancel="cancelWorkFlow"
      :clickApply="clickApply"
      :isApply="true"
    />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, basicSchemas, statusObj, searchFormSchema } from './config/index';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs, TabPane, InputSearch, Tag } from 'ant-design-vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Icon } from '/@/components/Icon';
  import { WorkFlow } from '/@/components/WorkFlow';
  import { usePermission } from '/@/hooks/web/usePermission';
  import UploadPreviewModal from '/@/components/Upload/src/UploadPreviewModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { mesOaFlowApprovalist } from '/@/api/common/workFlow';
  import {
    spSciApplyMyList,
    mySpSciApplyAdd,
    mySpSciApplyEdit,
    mySpSciApplyDelete,
    spSciApplySubmit,
  } from '/@/api/testDemo/scientific';
  export default defineComponent({
    name: 'SpSciApplyList',
    components: {
      BasicTable,
      TableAction,
      PageWrapper,
      ATabs: Tabs,
      ATabPane: TabPane,
      AInputSearch: InputSearch,
      BasicModal,
      BasicForm,
      Icon,
      UploadPreviewModal,
      WorkFlow,
      ATag: Tag,
    },
    setup() {
      /**
       *  校验权限
       */
      const { hasPermission } = usePermission();
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
      // 弹窗名称
      const modalTitle = ref('');
      /**
       * table 列表
       */
      const getSearchInfo = () => {
        let searchInfo = {
          bizType: '52037-10',
          approvalQueryType: tabsActiveKey.value,
          titleQueryLike: searchValue.value,
        };

        return { searchInfo };
      };
      const [registerTable, { reload }] = useTable({
        api: mesOaFlowApprovalist,
        rowKey: 'id',
        columns,
        useSearchForm: false,
        canResize: false,
        showTableSetting: true,
        bordered: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        beforeFetch: (params) => {
          return { ...params, ...getSearchInfo().searchInfo };
        },
        customRow: (record) => {
          return {
            onDblclick: () => {
              const { status } = record;
              if (status === '52032-10') {
                handleEdit(record);
              } else {
                handleView(record);
              }
            },
          };
        },
      });

      //获取表格数据
      const totalNum = ref(0);
      const getData = ({ total }) => {
        totalNum.value = total;
      };

      /**
       * 我的成果新增编辑
       */
      const selectRowId = ref(null);
      const [
        register,
        {
          validateFields,
          getFieldsValue,
          setFieldsValue,
          appendSchemaByField,
          removeSchemaByFiled,
          resetFields,
        },
      ] = useForm({
        labelWidth: 100,
        schemas: basicSchemas,
        showActionButtonGroup: false,
      });

      /**
       * 去查看页
       */
      const router = useRouter();
      const handleView = ({ bizId, status }) => {
        if (status == '21002-40' && !hasPermission('SpSciApplyView')) {
          createMessage.warning('对不起，您暂无查看权限！');
          return false;
        }
        if (status != '21002-40' && !hasPermission('SpSciApplyApproval')) {
          createMessage.warning('对不起，您暂无审批权限！');
          return false;
        }
        router.push({
          name: 'SpSciApplyView',
          params: { id: bizId },
        });
      };

      const clickApply = ref(false);
      const currentClickRowId = ref('');
      const handleShowApplyModal = ({ id }) => {
        currentClickRowId.value = id;
        clickApply.value = true;
      };

      const handleOk = async () => {
        // 获取表单
        const form = await getFieldsValue();
        form.applyFile = JSON.stringify(form.applyFile[0]);
        submitForm(form, true);
        closeModal();
      };
      const submitForm = (form, isAdd?) => {
        const Api = isAdd ? mySpSciApplyAdd : mySpSciApplyEdit;

        Api(form).then((res) => {
          reload();
        });
      };
      const handleEdit = (record) => {
        modalTitle.value = '编辑认定成果';
        selectRowId.value = record.id;
        openModal(true, { isUpdate: true });
        nextTick(() => {
          resetFields();
          // 处理附件
          record.applyFile = [record.applyFile];
          setFieldsValue(record);
        });
      };

      const fileList = ref([]);
      const [registerPreviewModal, { openModal: openPreviewModal2 }] = useModal();
      const openPreviewModal = ({ applyFile }) => {
        fileList.value = [applyFile];

        console.log(fileList.value, 'applyFile');

        openPreviewModal2(true);
      };

      const handleDelete = ({ id }) => {
        mySpSciApplyDelete({ ids: id + '' }).then(() => {
          reload();
        });
      };

      const { createMessage } = useMessage();
      const getWorkFlow = (data) => {
        clickApply.value = false;
        const { approvalModel } = data;
        console.log(data, 'data');
        let params = { ids: currentClickRowId.value + '', approvalModel };
        spSciApplySubmit(params).then((res) => {
          createMessage.success('申请成功');
          reload();
        });
      };

      const cancelWorkFlow = () => {
        clickApply.value = false;
      };

      const cancelBtnStatus = ({ status }) => {
        return status !== '52032-20';
      };

      const applyBtnStatus = ({ status }) => {
        return status !== '52032-10';
      };

      const tabChange = () => {
        reload(getSearchInfo());
      };

      return {
        hasPermission,
        tabsActiveKey,
        searchValue,
        fileList,
        clickApply,
        statusObj,
        modalTitle,
        tabChange,
        onSearch,
        registerTable,
        handleView,
        handleShowApplyModal,
        registerModal,
        handleOk,
        handleEdit,
        handleDelete,
        register,
        registerPreviewModal,
        openPreviewModal,
        reload,
        getWorkFlow,
        cancelWorkFlow,
        cancelBtnStatus,
        applyBtnStatus,
        getSearchInfo,
        getData,
        totalNum,
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
    padding: 12px 10px 12px;
    border-bottom: 16px solid #f0f2f5;
  }

  .content {
    background-color: #fff;
  }

  :deep(.ant-tabs) {
    padding: 6px;

    &-nav {
      margin-bottom: 0 !important;
    }

    &-tab {
      padding: 5px 15px;
    }
  }
</style>
