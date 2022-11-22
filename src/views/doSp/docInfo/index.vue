<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" :search-info="searchParams" class="!p-0">
      <template #form-custom>
        <a-form-item-rest>
          <SearchWrap
            placeholder="请输入文献名称"
            :searchList="searchArr"
            maxLength="10"
            @search="handleSearch"
          />
        </a-form-item-rest>
      </template>
      <template #toolbar>
        <Authority value="InfoDocAdd">
          <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        </Authority>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'eva:edit-2-outline',
              label: '编辑',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
              ifShow: hasPermission('InfoDocEdit'),
            },
            {
              icon: 'akar-icons:eye',
              label: '查看',
              tooltip: '查看详情',
              onClick: handleView.bind(null, record),
              onDblclick: (e) => e.stopPropagation(),
              ifShow: hasPermission('InfoDocView'),
            },
            // {
            //   icon: 'fluent:delete-28-regular',
            //   color: 'error',
            //   tooltip: '删除',
            //   popConfirm: {
            //     title: '是否确认删除',
            //     placement: 'bottomRight',
            //     confirm: handleDelete.bind(null, record),
            //     onDblclick: (e) => e.stopPropagation(),
            //   },
            // },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { searchArr, columns, getFormConfig } from './config/index';
  import { useRouter } from 'vue-router';
  import { Form } from 'ant-design-vue';
  import { infoDocList, infoDocDelete } from '/@/api/doInfo/index';
  import { Authority } from '/@/components/Authority';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'InfoDocList',
    components: {
      PageWrapper,
      SearchWrap,
      BasicTable,
      AFormItemRest: Form.ItemRest,
      TableAction,
      Authority,
    },
    setup() {
      const { hasPermission } = usePermission();
      const { createMessage } = useMessage();
      const router = useRouter();
      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        api: infoDocList,
        rowKey: 'id',
        columns,
        formConfig: getFormConfig(),
        useSearchForm: true,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
        ellipsis: false,
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        customRow: (record) => {
          return {
            onDblclick: () => handleEdit(record),
          };
        },
      });

      const state = reactive({
        pageNo: 1,
        pageSize: 10,
        searchParams: {
          nameQueryLike: undefined,
          datePicker: undefined,
          docTypeQueryIn: undefined,
          firstLevel: undefined,
          createTimeQueryGe: undefined,
          createTimeQueryLe: undefined,
        },
      });
      const handleSearch = (inputvalue, searchList) => {
        if (searchList.length) {
          searchList.forEach((item) => {
            if (item.type == 'rangePicker') {
              state.searchParams.createTimeQueryGe = item.value ? item.value[0] : undefined;
              state.searchParams.createTimeQueryLe = item.value ? item.value[1] : undefined;
            } else {
              state.searchParams[item.field] = item.value;
            }
          });
        }
        if (inputvalue) {
          state.searchParams.nameQueryLike = inputvalue;
        }

        reload();
      };
      const handleCreate = () => {
        router.push('/doSp/docInfoSys/docInfo/add');
      };

      const handleEdit = ({ id }) => {
        if (!hasPermission('InfoDocEdit')) {
          createMessage.warning('对不起， 您暂无编辑权限！');
          return;
        }
        router.push({
          name: 'InfoDocEdit',
          params: { type: 'edit', id },
        });
      };

      const handleDelete = ({ id }) => {
        infoDocDelete({ ids: id + '' }).then(() => {
          reload();
        });
      };

      const handleView = ({ id }) => {
        router.push({
          name: 'InfoDocView',
          params: { type: 'view', id },
        });
      };
      return {
        searchArr,
        searchParams: state.searchParams,
        handleSearch,
        registerTable,
        handleCreate,
        handleEdit,
        handleView,
        handleDelete,
        hasPermission,
      };
    },
  });
</script>
