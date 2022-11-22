<!--
 * @Author: your name
 * @Date: 2022-05-23 14:48:56
 * @LastEditTime: 2022-11-07 10:49:34
 * @LastEditors: 江雪松 576053154@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vben-admin-thin-next-main/src/views/systemManager/ucenterPerson/index.vue
-->
<template>
  <PageWrapper contentFullHeight contentBackground contentClass="flex">
    <PageCollapsed title="行政区域"
      ><template #cLeft><Tree @select="handleSelect" /></template>
      <template #cRight
        ><BasicTable @register="registerTable" :searchInfo="searchParams" class="!p-0">
          <template #form-custom>
            <a-form-item-rest>
              <SearchWrap
                placeholder="请输入联络人"
                :searchList="searchArr"
                @search="handleSearch"
              />
            </a-form-item-rest>
          </template>
          <template #toolbar>
            <Authority value="AddressBookAdd">
              <a-button type="primary" @click="handleCreate"> 新增 </a-button>
            </Authority>
          </template>
          <template #action="{ record }">
            <TableAction
              @click.stop
              :actions="[
                {
                  icon: 'eva:edit-2-outline',
                  label: '编辑',
                  tooltip: '编辑',
                  auth: 'AddressBookEdit',
                  onClick: handleEdit.bind(null, record),
                },
                {
                  icon: 'fluent:delete-28-regular',
                  color: 'error',
                  tooltip: '删除',
                  label: '删除',
                  auth: 'AddressBookDelete',
                  popConfirm: {
                    title: '是否确认删除',
                    placement: 'bottomRight',
                    confirm: handleDelete.bind(null, record),
                  },
                },
              ]"
            />
          </template> </BasicTable></template
    ></PageCollapsed>
    <AddressBookModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import Tree from './module/Tree.vue';
  import AddressBookModal from './module/AddressBookModal.vue';
  import { PageWrapper, PageCollapsed } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { Authority } from '/@/components/Authority';
  import { columns, searchArr, getFormConfig } from './config/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { domesAddressBookApi, domesAddressBookDeleteApi } from '/@/api/doOp/addressBook';

  export default defineComponent({
    name: 'UcenterPersonList',
    components: {
      Tree,
      SearchWrap,
      PageWrapper,
      PageCollapsed,
      BasicTable,
      TableAction,
      Authority,
      AddressBookModal,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const { createMessage } = useMessage();
      const { hasPermission } = usePermission();
      const searchParams = reactive({
        orgId: undefined,
        linkerQueryLike: undefined,
        phoneQueryLike: undefined,
        job: undefined,
      });
      const [registerModal, { openModal }] = useModal();
      /**
       * table 列表
       */
      const [registerTable, { reload, setLoading }] = useTable({
        api: domesAddressBookApi,
        rowKey: 'id',
        columns,
        immediate: true,
        formConfig: getFormConfig(),
        useSearchForm: true,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
        actionColumn: {
          width: 90,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        customRow: (record) => {
          return {
            onDblclick: () => {
              if (hasPermission('AddressBookEdit')) {
                handleEdit(record);
              } else {
                createMessage.warning('您暂无编辑权限');
              }
            },
          };
        },
      });

      const handleCreate = () => {
        openModal(true, {
          isUpdate: false,
        });
      };

      const handleEdit = (record) => {
        openModal(true, {
          isUpdate: true,
          record,
        });
      };

      const handleDelete = async (record) => {
        await domesAddressBookDeleteApi({ ids: record.id });
        createMessage.success('操作成功');
        reload();
      };

      const handleSelect = (id) => {
        searchParams.orgId = id;
        setLoading(true);
        reload();
      };

      const handleSearch = (inputvalue, searchList) => {
        searchParams.linkerQueryLike = inputvalue;
        if (searchList.length > 0) {
          searchList.forEach((item) => {
            searchParams[item.field] = item.value;
          });
        }
        reload();
      };

      const handleSuccess = () => {
        reload();
      };

      return {
        searchArr,
        searchParams,
        registerTable,
        registerModal,
        handleCreate,
        handleSelect,
        handleEdit,
        handleDelete,
        handleSearch,
        handleSuccess,
      };
    },
  });
</script>
