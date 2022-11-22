<template>
  <PageWrapper contentFullHeight contentBackground>
    <div class="op-task-search search-bar">
      <SearchWrap placeholder="请输入成果标题" :searchList="searchArr" @search="handleSearch" />
    </div>
    <div class="content">
      <a-tabs v-model:activeKey="tabsActiveKey" @change="tabChange">
        <a-tab-pane key="1" tab="全部" />
        <a-tab-pane key="2" tab="已认定" />
      </a-tabs>

      <BasicTable @register="registerTable" class="func-tabs">
        <template #toolbar>
          <Authority value="MySpSciApplyAdd">
            <a-button class="ml-4" v-if="tabsActiveKey == 1" type="primary" @click="handleCreate"
              >新增</a-button
            >
          </Authority>
          <!-- <a-button type="primary" @click="handleCreate">删除</a-button> -->
        </template>

        <template #applyFile="{ record }">
          <span
            class="col-annex"
            @click="openPreviewModal(record)"
            v-if="Object.keys(record.applyFile).length"
          >
            <Icon icon="subway:pin" />1
          </span>
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
                icon: 'ant-design:check-outlined',
                label: '提交',
                tooltip: '提交申请',
                onClick: handleShowApplyModal.bind(null, record),
                onDblclick: (e) => e.stopPropagation(),
                disabled: record.status !== '52032-10',
                ifShow: hasPermission('MySpSciApplySubmit'),
              },
              {
                icon: 'eva:edit-2-outline',
                tooltip: '编辑资料',
                label: '编辑',
                onClick: handleEdit.bind(null, record),
                disabled: record.status !== '52032-10',
                ifShow: hasPermission('MySpSciApplyEdit'),
              },
              {
                icon: 'akar-icons:eye',
                tooltip: '查看详情',
                label: '查看',
                onClick: handleView.bind(null, record),
                onDblclick: (e) => e.stopPropagation(),
                ifShow: hasPermission('MySpSciApplyView'),
              },
              {
                icon: 'fluent:delete-28-regular',
                color: 'error',
                label: '删除',
                tooltip: '删除',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'bottomRight',
                  confirm: handleDelete.bind(null, record),
                  onDblclick: (e) => e.stopPropagation(),
                },
                disabled: record.status !== '52032-10',
                ifShow: hasPermission('MySpSciApplyDelete'),
              },
            ]"
          />
        </template>
      </BasicTable>
    </div>

    <BasicModal
      @register="registerModal"
      :width="800"
      :title="modalTitle"
      @ok="handleOk"
      :titleIcon="titleIcon"
    >
      <!-- lucide:file-edit -->
      <!-- fluent:document-add-24-regular -->
      <BasicForm
        auto-focus-first-item
        :actionColOptions="{ span: 16 }"
        @register="register"
        class="width-80"
      />
    </BasicModal>

    <UploadPreviewModal :value="fileList" :isView="true" @register="registerPreviewModal" />

    <WorkFlow
      @submit="getWorkFlow"
      @cancel="cancelWorkFlow"
      :clickApply="clickApply"
      :confirmLoading="confirmLoading"
      :isApply="true"
    />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, nextTick, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, basicSchemas, statusObj, searchArr } from './config/index';
  import { PageWrapper } from '/@/components/Page';
  import { Authority } from '/@/components/Authority';
  import { Tabs, TabPane, Tag } from 'ant-design-vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Icon } from '/@/components/Icon';
  import { WorkFlow } from '/@/components/WorkFlow';
  import UploadPreviewModal from '/@/components/Upload/src/UploadPreviewModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { usePermission } from '/@/hooks/web/usePermission';
  import {
    mySpSciApplyList,
    mySpSciApplyAdd,
    mySpSciApplyEdit,
    mySpSciApplyDelete,
    spSciApplySubmit,
  } from '/@/api/testDemo/scientific';
  export default defineComponent({
    name: 'MySpSciApplyList',
    components: {
      BasicTable,
      TableAction,
      PageWrapper,
      SearchWrap,
      Authority,
      ATabs: Tabs,
      ATabPane: TabPane,
      BasicModal,
      BasicForm,
      Icon,
      UploadPreviewModal,
      WorkFlow,
      ATag: Tag,
    },
    setup() {
      const { hasPermission } = usePermission();
      const state = reactive({
        pageNo: 1,
        pageSize: 10,
        searchParams: {
          titleQueryLike: '',
          statusQueryIn: '',
          categoryType: '',
        },
      });
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
      const titleIcon = ref('');
      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        api: mySpSciApplyList,
        rowKey: 'id',
        columns,
        useSearchForm: false,
        canResize: false,
        showTableSetting: true,
        bordered: true,
        actionColumn: {
          width: 260,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
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
      const handleView = ({ id }) => {
        if (!hasPermission('MySpSciApplyView')) {
          createMessage.warning('对不起，您暂无查看权限！');
          return false;
        }
        router.push({
          name: 'MySpSciApplyView',
          params: { id },
        });
      };

      const clickApply = ref(false);
      const currentClickRowId = ref('');
      const handleShowApplyModal = ({ id }) => {
        currentClickRowId.value = id;
        clickApply.value = true;
      };

      const handleCreate = () => {
        modalTitle.value = '新增认定成果';
        titleIcon.value = 'fluent:document-add-24-regular';
        selectRowId.value = null;
        openModal();

        nextTick(() => resetFields());
      };

      const handleOk = async () => {
        await validateFields();
        // 获取表单
        const form = await getFieldsValue();
        console.log(form, 'form');
        form.applyFile = form.applyFile?.length ? JSON.stringify(form.applyFile[0]) : [];
        submitForm(form);
        closeModal();
      };
      const submitForm = (form) => {
        let API = new Function();
        if (selectRowId.value) {
          API = mySpSciApplyEdit;
          Object.assign(form, { id: selectRowId.value });
        } else {
          API = mySpSciApplyAdd;
        }

        API(form).then((res) => {
          reload();
        });
      };
      const handleEdit = (record) => {
        if (!hasPermission('MySpSciApplyEdit')) {
          createMessage.warning('对不起，您暂无编辑权限！');
          return false;
        }
        modalTitle.value = '编辑认定成果';
        titleIcon.value = 'lucide:file-edit';
        selectRowId.value = record.id;
        openModal();
        nextTick(() => {
          resetFields();
          // 处理附件
          if (Object.keys(record.applyFile)?.length) {
            record.applyFile = [record.applyFile];
          } else {
            record.applyFile = [];
          }

          setFieldsValue(record);
        });
      };

      const fileList = ref([]);
      const [registerPreviewModal, { openModal: openPreviewModal2 }] = useModal();
      const openPreviewModal = ({ applyFile }) => {
        if (Object.keys(applyFile)?.length) {
          fileList.value = [applyFile];
        } else {
          fileList.value = [];
        }

        console.log(fileList.value, 'applyFile');

        openPreviewModal2(true);
      };

      const handleDelete = ({ id }) => {
        mySpSciApplyDelete({ ids: id + '' }).then(() => {
          reload();
        });
      };

      const { createMessage } = useMessage();
      const confirmLoading = ref(false);
      const getWorkFlow = (data) => {
        const { approvalModel } = data;
        console.log(data, 'data');
        let params = {
          ids: currentClickRowId.value + '',
          approvalModel: JSON.stringify(approvalModel),
        };
        confirmLoading.value = true;
        spSciApplySubmit(params)
          .then((res) => {
            confirmLoading.value = false;
            createMessage.success('申请成功');
            reload();
            clickApply.value = false;
          })
          .catch(() => (confirmLoading.value = false));
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
        state.searchParams.statusQueryIn = tabsActiveKey.value == '2' ? '52032-40' : '';
        reload({ searchInfo: state.searchParams });
      };

      // 搜索
      const handleSearch = (inputvalue, searchList) => {
        searchList.forEach((item) => {
          state.searchParams[item.field] = item.value;
        });
        if (inputvalue) {
          state.searchParams.titleQueryLike = inputvalue;
        }
        reload({
          searchInfo: state.searchParams,
        });
      };

      return {
        hasPermission,
        tabsActiveKey,
        searchValue,
        fileList,
        clickApply,
        statusObj,
        modalTitle,
        titleIcon,
        confirmLoading,
        searchArr,
        tabChange,
        onSearch,
        registerTable,
        handleView,
        handleShowApplyModal,
        handleCreate,
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

        handleSearch,
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

  /deep/.ant-tabs-tab {
    padding: 5px 15px;
  }

  .search-box {
    background-color: #fff;
    text-align: right;
    padding: 10px;
    margin-bottom: 10px;
  }

  .search-bar {
    padding: 12px 10px 10px;
    border-bottom: 16px solid #f0f2f5;
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
