<!--
 * @Author: your name
 * @Date: 2022-05-23 14:48:56
 * @LastEditTime: 2022-11-07 10:47:01
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
                placeholder="请输入用户账号"
                :searchList="searchArr"
                @search="handleSearch"
              />
            </a-form-item-rest>
          </template>
          <template #toolbar>
            <Authority value="OpPersonAdd">
              <a-button type="primary" @click="handleCreate"> 新增 </a-button>
            </Authority>
            <Authority value="OpPersonBatchimport">
              <a-button type="primary" @click="handleImport"> 批量导入 </a-button>
            </Authority>
          </template>
          <template #account="{ record }">
            <div class="name flex items-center">
              <div :title="record.account" class="flex-1 name-ellipsis">{{ record.account }}</div>
              <Icon
                v-if="record.accountStatus == 2"
                icon="ant-design:lock-outlined"
                color="#f56c6c"
              />
            </div>
          </template>
          <template #isBusinessAcct="{ record }">
            <div>{{ record.isBusinessAcct ? '是' : '否' }}</div>
          </template>
          <template #isMonitorUser="{ record }">
            <div>{{ record.isMonitorUser ? '是' : '否' }}</div>
          </template>
          <template #action="{ record }">
            <TableAction
              @click.stop
              :actions="[
                {
                  icon: 'eva:edit-2-outline',
                  label: '编辑',
                  tooltip: '编辑',
                  auth: 'OpPersonEdit',
                  onClick: handleEdit.bind(null, record),
                },
                {
                  icon: 'heroicons-outline:lock-closed',
                  label: '锁定',
                  tooltip: '锁定',
                  auth: 'OpPersonLock',
                  ifShow: record.accountStatus != 2,
                  popConfirm: {
                    title: '是否确认锁定',
                    placement: 'bottomRight',
                    confirm: handleLock.bind(null, record),
                  },
                },
                {
                  icon: 'heroicons-outline:lock-open',
                  tooltip: '解锁',
                  label: '解锁',
                  auth: 'OpPersonUnlock',
                  color: 'success',
                  ifShow: record.accountStatus == 2,
                  popConfirm: {
                    title: '是否确认解锁',
                    placement: 'bottomRight',
                    confirm: handleUnLock.bind(null, record),
                  },
                },
              ]"
            />
          </template> </BasicTable></template
    ></PageCollapsed>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, getCurrentInstance } from 'vue';
  import { Form } from 'ant-design-vue';
  import Tree from './module/Tree.vue';
  import { Icon } from '/@/components/Icon';
  import { PageWrapper, PageCollapsed } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { Authority } from '/@/components/Authority';
  import { columns, searchArr, getFormConfig } from './config/index';
  import { useRouter } from 'vue-router';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    domesOpPersonListApi,
    domesOpPersonLockApi,
    domesOpPersonUnLockApi,
    domesOpPersonDeleteApi,
  } from '/@/api/doOp/person';

  export default defineComponent({
    name: 'OpPersonList',
    components: {
      Tree,
      Icon,
      SearchWrap,
      PageWrapper,
      PageCollapsed,
      BasicTable,
      TableAction,
      Authority,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      console.log(getCurrentInstance(), 'getCurrentInstance');

      const router = useRouter();
      const { createMessage } = useMessage();
      const { hasPermission } = usePermission();
      const searchParams = reactive({
        opOrgIdQuery: undefined,
        accountQueryLike: undefined,
        nameQueryLike: undefined,
        isMonitorUser: undefined,
        businessType: undefined,
      });
      /**
       * table 列表
       */
      const [registerTable, { reload, setLoading }] = useTable({
        api: domesOpPersonListApi,
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
          width: 140,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        customRow: (record) => {
          return {
            onDblclick: () => {
              if (hasPermission('OpPersonEdit')) {
                handleEdit(record);
              } else {
                createMessage.warning('您暂无编辑权限');
              }
            },
          };
        },
      });

      const handleCreate = () => {
        router.push({ name: 'OpPersonAdd', params: { type: 'add' } });
      };

      const handleEdit = (record) => {
        router.push({ name: 'OpPersonEdit', params: { type: 'edit', id: record.id } });
      };

      const handleLock = async (record) => {
        await domesOpPersonLockApi({ ids: record.id });
        createMessage.success('操作成功');
        reload();
      };

      const handleUnLock = async (record) => {
        await domesOpPersonUnLockApi({ ids: record.id });
        createMessage.success('操作成功');
        reload();
      };

      const handleDelete = async (record) => {
        await domesOpPersonDeleteApi({ ids: record.id });
        createMessage.success('操作成功');
        reload();
      };

      const handleSelect = (id) => {
        searchParams.opOrgIdQuery = id;
        setLoading(true);
        reload();
      };

      const handleSearch = (inputvalue, searchList) => {
        searchParams.accountQueryLike = inputvalue;
        if (searchList.length > 0) {
          searchList.forEach((item) => {
            searchParams[item.field] = item.value;
          });
        }
        reload();
      };

      const handleImport = () => {
        router.push({ name: 'OpPersonBatchimport' });
      };

      return {
        searchArr,
        searchParams,
        registerTable,
        handleCreate,
        handleSelect,
        handleEdit,
        handleLock,
        handleUnLock,
        handleDelete,
        handleSearch,
        handleImport,
      };
    },
  });
</script>

<style lang="less" scoped>
  .name-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
