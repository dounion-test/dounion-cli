<template>
  <PageWrapper contentFullHeight contentClass="flex">
    <PageCollapsed title="部门组织结构" width="250">
      <!-- 部门树 -->
      <template #cLeft>
        <DeptTree :isRender="isRender" @select="handleSelect" />
      </template>
      <!-- 搜索、表格、分页 -->
      <template #cRight>
        <div class="bg-white">
          <BasicTable @register="registerTable" class="!p-0" :searchInfo="searchInfo">
            <template #toolbar>
              <Authority value="UcenterOrgAdd">
                <a-button type="primary" @click="handleCreate">新增</a-button>
              </Authority>
            </template>
            <template #cname="{ record }">
              <div @click.stop="handleView(record)" class="name">{{ record.cname }}</div>
            </template>
            <template #action="{ record }">
              <TableAction
                :actions="[
                  {
                    icon: 'eva:edit-2-outline',
                    tooltip: '编辑资料',
                    label: '编辑',
                    auth: 'UcenterOrgEdit',
                    onClick: handleEdit.bind(null, record),
                  },
                  {
                    icon: 'fluent:delete-28-regular',
                    color: 'error',
                    tooltip: '删除',
                    label: '删除',
                    auth: 'UcenterOrgDelete',
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
      </template>
    </PageCollapsed>

    <OrgModal @register="registerModal" @success="handleModalSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { PageWrapper, PageCollapsed } from '/@/components/Page';
  import { Authority } from '/@/components/Authority';
  import DeptTree from './module/DeptTree.vue';
  import OrgModal from './module/OrgModal.vue';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useModal } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './config/index';
  import { getUcenterOrgList, delUcenterDept } from '/@/api/testDemo/dept';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';
  export default defineComponent({
    name: 'UcenterOrgList',
    components: {
      PageWrapper,
      Authority,
      PageCollapsed,
      DeptTree,
      BasicTable,
      TableAction,
      OrgModal,
    },
    setup() {
      const { hasPermission } = usePermission();
      const searchInfo = reactive<Recordable>({});
      let isRender = ref(false);
      const treeID = ref();
      const router = useRouter();
      const { refreshPage } = useTabs();
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: '部门列表',
        api: getUcenterOrgList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        pagination: {
          pageSize: 10000,
        },
        canResize: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          return info;
        },
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        customRow: (record) => {
          return {
            onDblclick: () => {
              if (hasPermission('UcenterOrgEdit')) {
                const { id } = record;
                openModal(true, { id, isUpdate: true });
              } else if (hasPermission('UcenterOrgView')) {
                const { id } = record;
                router.push({
                  name: 'UcenterOrgView',
                  params: {
                    id,
                  },
                });
              } else {
                createMessage.warning('对不起， 您暂无编辑和查看详情权限！');
              }
            },
          };
        },
      });

      const handleCreate = () => {
        openModal(true, { treeID: treeID.value, isUpdate: false });
      };

      const handleEdit = (record: Recordable) => {
        if (!hasPermission('UcenterOrgEdit')) {
          createMessage.warning('对不起， 您暂无编辑权限！');
          return false;
        }
        const { id } = record;
        openModal(true, { id, isUpdate: true });
      };

      const handleDelete = async (record: Recordable) => {
        const params = { idQueryIn: record.id };
        await delUcenterDept(params);
        reload();
        isRender.value = !isRender.value;
        createMessage.success('操作成功');
      };

      const handleSuccess = ({ isUpdate, values }) => {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          console.log(result);
        } else {
          reload();
        }
      };

      const handleSelect = (pathIds, _node, id) => {
        treeID.value = id;
        searchInfo.pathIdsQueryLike = pathIds;
        reload();
      };

      const handleView = (record: Recordable) => {
        if (!hasPermission('UcenterOrgView')) {
          createMessage.warning('对不起， 您暂无查看详情权限！');
          return false;
        }
        const { id } = record;
        router.push({
          name: 'UcenterOrgView',
          params: {
            id,
          },
        });
      };

      const handleModalSuccess = () => {
        refreshPage();
      };

      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleView,
        handleModalSuccess,
        registerModal,
        searchInfo,
        isRender,
      };
    },
  });
</script>

<style lang="less" scoped>
  .name {
    color: @primary-color;
    cursor: pointer;
  }

  :deep(.ant-pagination) {
    li {
      display: none;
    }
  }
</style>
