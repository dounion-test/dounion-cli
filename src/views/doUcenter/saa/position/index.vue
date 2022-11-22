<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" class="!p-0" :searchInfo="searchParams">
      <template #form-custom>
        <a-form-item-rest>
          <SearchWrap
            placeholder="请输入名称或代码"
            :searchList="searchArr"
            @search="handleSearch"
          />
        </a-form-item-rest>
      </template>
      <template #toolbar>
        <Authority value="UcenterPositionAdd">
          <a-button type="primary" @click="handleCreate">新增</a-button>
        </Authority>
      </template>
      <template #action="{ record }">
        <TableAction
          @click.stop
          :actions="[
            {
              icon: 'eva:edit-2-outline',
              tooltip: '编辑',
              label: '编辑',
              auth: 'UcenterPositionEdit',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'fluent:delete-28-regular',
              color: 'error',
              tooltip: '删除',
              label: '删除',
              auth: 'UcenterPositionDelete',
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
    <PositionModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import PositionModal from './module/PositionModal.vue';
  import { Authority } from '/@/components/Authority';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, getFormConfig, searchArr } from './config/index';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    ucenterUcenterPositionListApi,
    ucenterUcenterPositionDeleteApi,
  } from '/@/api/testDemo/position';
  export default defineComponent({
    name: 'UcenterPositionList',
    components: {
      PositionModal,
      Authority,
      BasicTable,
      TableAction,
      PageWrapper,
      SearchWrap,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const unReadCount = ref(0);
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const searchParams = reactive({
        nameOrCodeQueryLike: undefined,
        topicLike: undefined,
        personNameLike: undefined,
        receiveStartTime: undefined,
        receiveEndTime: undefined,
      });
      /**
       * table 列表
       */
      const [registerTable, { reload, setLoading }] = useTable({
        api: ucenterUcenterPositionListApi,
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
      });

      // 新增
      const handleCreate = () => {
        openModal(true, { isUpdate: false });
      };

      // 编辑
      const handleEdit = (record) => {
        openModal(true, { isUpdate: true, record });
      };

      /**
       * 删除
       */
      const handleDelete = async (record) => {
        await ucenterUcenterPositionDeleteApi({ ids: record.id });
        createMessage.success('操作成功');
        reload();
      };

      /**
       * 搜索
       */
      const handleSearch = (inputvalue, searchList) => {
        searchParams.nameOrCodeQueryLike = inputvalue;
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

      // 添加/编辑回调
      const handleSuccess = () => {
        setLoading(true);
        reload();
      };

      return {
        unReadCount,
        searchArr,
        searchParams,
        registerModal,
        registerTable,
        handleCreate,
        handleEdit,
        handleSearch,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
