<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" class="receive-Tabs">
      <template #form-custom>
        <a-form-item-rest>
          <div class="flex">
            <SearchWrap
              placeholder="请输入课题名称"
              :searchList="searchArr"
              @search="handleSearch"
            />
          </div>
        </a-form-item-rest>
      </template>

      <template #toolbar>
        <a-button class="m-4" type="primary" @click="handleCreate">新增</a-button>
      </template>

      <template #declareAttachments="{ record }">
        <span
          class="col-annex"
          @click="openPreviewModal(record)"
          v-if="record.declareAttachments && record.declareAttachments.length"
        >
          <Icon icon="subway:pin" />{{ record.declareAttachments.length }}
        </span>
      </template>
      <template #applyResult="{ record }">
        <a-tag
          :color="
            record.parentUnit == '52041-10' && record.publishUnit == '52041-10' ? '#87d068' : 'red'
          "
          >{{
            record.parentUnit == '52041-10' && record.publishUnit == '52041-10' ? '通过' : '未通过'
          }}</a-tag
        >
      </template>
      <template #statusName="{ record }">
        1111
        <a-tag :color="statusObj[record.status]">{{ record.statusName }}</a-tag>
      </template>
      <template #name="{ record }">
        <span v-html="record.name"></span>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'eva:edit-2-outline',
              label: '编辑',
              tooltip: '编辑资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'akar-icons:eye',
              label: '查看',
              tooltip: '查看详情',
              onClick: handleView.bind(null, record),
              onDblclick: (e) => e.stopPropagation(),
            },
            {
              icon: 'fluent:delete-28-regular',
              color: 'error',
              tooltip: '删除',
              label: '删除',
              popConfirm: {
                title: '是否确认删除',
                placement: 'bottomRight',
                confirm: handleDelete.bind(null, record),
                onDblclick: (e) => e.stopPropagation(),
              },
            },
          ]"
        />
      </template>
    </BasicTable>

    <BasicModal
      @register="registerModal"
      :width="800"
      :height="700"
      :centered="true"
      :title="modalTitle"
      okText="保存"
      @ok="handleOk"
      :titleIcon="titleIcon"
    >
      <div class="p-3">
        <BasicForm :actionColOptions="{ span: 16 }" @register="register" autoFocusFirstItem />
      </div>
    </BasicModal>

    <!-- <BasicModal @register="registerViewModal" :width="800" title="申报查看" @ok="closeViewModal">
      <Description class="mt-4" :column="2" :data="viewData" :schema="viewSchema" />
    </BasicModal> -->

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
  import { defineComponent, ref, nextTick, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, basicSchemas, statusObj, searchArr, getFormConfig } from './config/index';
  import { PageWrapper } from '/@/components/Page';
  import { Tag, Form } from 'ant-design-vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Icon } from '/@/components/Icon';
  import { WorkFlow } from '/@/components/WorkFlow';
  import UploadPreviewModal from '/@/components/Upload/src/UploadPreviewModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Description } from '/@/components/Description/index';
  import { viewSchema } from './config/view';

  import { SearchWrap } from '/@/components/SearchWrap';
  import {
    spSciDeclareList,
    spSciDeclareAdd,
    spSciDeclareEdit,
    spSciDeclareDelete,
    spSciApplySubmit,
  } from '/@/api/testDemo/scientific';
  export default defineComponent({
    name: 'SpSciDeclareList',
    components: {
      BasicTable,
      TableAction,
      PageWrapper,
      SearchWrap,
      BasicModal,
      BasicForm,
      Icon,
      UploadPreviewModal,
      WorkFlow,
      ATag: Tag,
      Description,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const state = reactive({
        pageNo: 1,
        pageSize: 10,
        searchParams: {
          nameQueryLike: '',
          subType: '',
        },
      });
      const titleIcon = ref('');
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
       * 查看页弹窗
       */
      const [registerViewModal, { openModal: openViewModal, closeModal: closeViewModal }] =
        useModal();
      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        api: spSciDeclareList,
        rowKey: 'id',
        columns,
        formConfig: getFormConfig(),
        useSearchForm: true,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        customRow: (record) => {
          return {
            onDblclick: () => {
              handleEdit(record);
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
      const viewData = ref({});
      const handleView = (data) => {
        const { id } = data;
        router.push({
          name: 'SpSciDeclareView',
          params: { id },
        });
        // openViewModal(true, { isUpdate: true });
        // viewData.value = data;
      };

      const clickApply = ref(false);
      const currentClickRowId = ref('');

      const handleCreate = () => {
        modalTitle.value = '新增申报';
        titleIcon.value = 'fluent:document-add-24-regular';
        selectRowId.value = null;
        openModal(true, { isUpdate: true });

        nextTick(() => resetFields());
      };

      const handleOk = async () => {
        await validateFields();
        // 获取表单
        const form = await getFieldsValue();
        form.declareAttachments = JSON.stringify(form.declareAttachments);
        submitForm(form);
        closeModal();
      };
      const submitForm = (form) => {
        let API = new Function();
        if (selectRowId.value) {
          API = spSciDeclareEdit;
          Object.assign(form, { id: selectRowId.value });
        } else {
          API = spSciDeclareAdd;
        }

        API(form).then(() => {
          reload({
            searchInfo: state.searchParams,
          });
        });
      };
      const handleEdit = (record) => {
        modalTitle.value = '编辑申报';
        titleIcon.value = 'lucide:file-edit';
        selectRowId.value = record.id;
        openModal(true, { isUpdate: true });
        nextTick(() => {
          resetFields();

          setFieldsValue(record);
        });
      };

      const fileList = ref([]);
      const [registerPreviewModal, { openModal: openPreviewModal2 }] = useModal();
      const openPreviewModal = ({ declareAttachments }) => {
        fileList.value = declareAttachments;
        openPreviewModal2(true);
      };

      const handleDelete = ({ id }) => {
        spSciDeclareDelete({ ids: id + '' }).then(() => {
          reload({
            searchInfo: state.searchParams,
          });
        });
      };

      const { createMessage } = useMessage();
      const getWorkFlow = (data) => {
        clickApply.value = false;
        const { approvalModel } = data;
        let params = { ids: currentClickRowId.value + '', approvalModel };
        spSciApplySubmit(params).then((res) => {
          createMessage.success('申请成功');
          reload({
            searchInfo: state.searchParams,
          });
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

      // 搜索
      const handleSearch = (inputvalue, searchList) => {
        searchList.forEach((item) => {
          state.searchParams[item.field] = item.value;
        });
        if (inputvalue) {
          state.searchParams.nameQueryLike = inputvalue;
        }
        reload({
          searchInfo: state.searchParams,
        });
      };

      return {
        tabsActiveKey,
        searchValue,
        fileList,
        clickApply,
        statusObj,
        modalTitle,
        viewSchema,
        viewData,
        searchArr,
        onSearch,
        registerTable,
        handleView,
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
        registerViewModal,
        closeViewModal,

        handleSearch,
        titleIcon,
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

  .receive-Tabs {
    padding: 0;
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

  .table-left {
    height: 40px;
  }
</style>
