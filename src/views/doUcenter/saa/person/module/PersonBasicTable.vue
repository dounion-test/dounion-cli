<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-15 11:51:51
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 14:55:20
 * @FilePath: /vben-ucenter/src/views/doUcenter/person/components/PersonTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicTable
    @register="registerTable"
    @resize-column="handleResizeColumn"
    ref="tableRef"
    :searchInfo="searchParams"
    class="!p-0"
  >
    <!-- 搜索区域 -->
    <template #form-custom>
      <a-form-item-rest>
        <div class="flex">
          <SearchWrap
            placeholder="请输入姓名或账号"
            :hasCondition="false"
            :searchList="searchArr"
            @search="handleSearch"
          />
        </div>
      </a-form-item-rest>
    </template>
    <!-- table标题 -->
    <template #tableTitle v-if="showTitle">
      <BasicTableTitle :title="tableTitle" :parentId="treeParentId" :id="tableId" :total="total" />
    </template>
    <template #name="{ record }">
      <div @click.stop="toDetail(record)" :title="record.name" class="flex">
        <span class="person-name">{{ record.name }}</span>
        <Icon v-if="record.sex == '10004-10'" color="#1296db" icon="ant-design:man-outlined" />
        <Icon v-if="record.sex == '10004-20'" color="#FFC1CB" icon="ant-design:woman-outlined" />
      </div>
    </template>
    <template #account="{ record }">
      <div>
        {{ record.account }}
        <LockOutlined v-if="record.accountStatus == 2" style="color: #f56c6c" />
        <PoweroffOutlined v-if="record.accountStatus == 3" style="color: #f56c6c" />
      </div>
    </template>
    <!-- 操作按钮 -->
    <template #toolbar v-if="showToolbar">
      <Authority value="UcenterPersonAdd">
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </Authority>
      <Authority value="UcenterPersonEdit">
        <a-button type="primary" @click="handleEdit"> 修改 </a-button>
      </Authority>
      <Authority value="UcenterPersonDelete">
        <a-button type="primary" @click="handleDelete"> 删除 </a-button>
      </Authority>
    </template>
    <!-- 为空时占位 -->
    <template #emptyText>
      <a-empty :image="simpleImage" :description="emptyDesc" />
    </template>
    <!-- table操作 -->
    <template #action="{ record }">
      <TableAction
        @click.stop
        :actions="[
          {
            icon: 'heroicons-outline:lock-closed',
            tooltip: '锁定',
            label: '锁定',
            auth: 'UcenterPersonLock',
            ifShow: record.accountStatus != 2,
            onClick: handleLockClick.bind(null, record),
          },
          {
            icon: 'heroicons-outline:lock-open',
            tooltip: '解锁',
            label: '解锁',
            color: 'success',
            auth: 'UcenterPersonUnlock',
            ifShow: record.accountStatus == 2,
            onClick: handleUnLockClick.bind(null, record),
          },
          {
            icon: 'ant-design:poweroff-outlined',
            tooltip: '注销',
            label: '注销',
            auth: 'UcenterPersonDestroy',
            onClick: handleDestroyClick.bind(null, record),
          },
          {
            icon: 'ant-design:reload-outlined',
            tooltip: '重置密码',
            label: '重置密码',
            auth: 'UcenterPersonResetPwd',
            onClick: handleResetPwdClick.bind(null, record),
          },
        ]"
      />
    </template>
  </BasicTable>
</template>

<script lang="ts">
  import { Empty, Form } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { LockOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
  import { computed, defineComponent, reactive, ref, unref, watch } from 'vue';
  import {
    BasicTable,
    useTable,
    TableActionType,
    TableAction,
    PaginationProps,
  } from '/@/components/Table';
  import {
    ucenterPersonNewListApi,
    ucenterPersonDeleteApi,
    ucenterPersonNewLockApi,
    ucenterPersonNewUnlockApi,
    ucenterPersonNewDestroyApi,
    ucenterPersonResetPwdApi,
  } from '/@/api/testDemo/person';
  import { Authority } from '/@/components/Authority';
  import { SearchWrap } from '/@/components/SearchWrap';
  import BasicTableTitle from './BasicTableTitle.vue';
  import { searchArr, getFormConfig } from '../config/index';
  import { BasicColumn } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    components: {
      Icon,
      Authority,
      SearchWrap,
      BasicTable,
      TableAction,
      BasicTableTitle,
      LockOutlined,
      PoweroffOutlined,
      AEmpty: Empty,
      AFormItemRest: Form.ItemRest,
    },
    props: {
      pathIds: String,
      tableTitle: String,
      tableId: Number,
      treeParentId: Number,
      roleIdQuery: Number,
      columns: Array,
      // 立即请求
      immediate: {
        type: Boolean,
        default: () => true,
      },
      // 自适应高度
      canResize: {
        type: Boolean,
        default: () => true,
      },
      // 隐藏操作栏
      hideAction: {
        type: Boolean,
        default: () => false,
      },
      // 隐藏table title
      showTitle: {
        type: Boolean,
        default: () => true,
      },
      // 隐藏工具栏操作
      showToolbar: {
        type: Boolean,
        default: () => true,
      },
      // 隐藏搜索
      useSearchForm: {
        type: Boolean,
        default: () => true,
      },
      // 隐藏工具栏
      showTableSetting: {
        type: Boolean,
        default: () => true,
      },
      // 点击是否选择
      clickToRowSelect: {
        type: Boolean,
        default: () => true,
      },
      // 隐藏勾选框
      rowSelection: {
        type: Object,
        default: () => {},
      },
      emptyDesc: {
        type: String,
        default: () => '暂无数据',
      },
    },
    setup(props) {
      const router = useRouter();
      const { hasPermission } = usePermission();
      const { createMessage, createConfirm } = useMessage();
      const searchParams: any = reactive({
        nameOrAccountQueryLike: undefined,
        nameQueryLike: undefined,
        sex: undefined,
        marriage: undefined,
        education: undefined,
        jobTitleId: undefined,
        roleIdQuery: undefined,
        pathIds: undefined,
      });
      const tableRef = ref<Nullable<TableActionType>>(null);
      const [
        registerTable,
        {
          reload,
          getColumns,
          setColumns,
          getSelectRowKeys,
          setSelectedRowKeys,
          clearSelectedRowKeys,
          getPaginationRef,
        },
      ] = useTable({
        rowKey: 'id',
        api: ucenterPersonNewListApi,
        columns: props.columns as BasicColumn[],
        canResize: props.canResize,
        immediate: props.immediate,
        useSearchForm: props.useSearchForm,
        showTableSetting: props.showTableSetting,
        clickToRowSelect: props.clickToRowSelect,
        pagination: { pageSize: 10 },
        rowSelection: props.rowSelection,
        fetchSetting: { pageField: 'pageNo', listField: 'list' },
        formConfig: getFormConfig(),
        actionColumn: {
          width: 220,
          title: '操作',
          dataIndex: 'action',
          defaultHidden: props.hideAction,
          slots: { customRender: 'action' },
        },
        customRow: (record) => {
          return {
            onClick: () => {
              const checkedKeys = ref(getSelectRowKeys());
              let index = checkedKeys.value.indexOf(record.id);
              if (index != -1) {
                checkedKeys.value.splice(index, 1);
              } else {
                checkedKeys.value.push(record.id);
              }
              setSelectedRowKeys(checkedKeys.value);
            },
            onDblclick: () => {
              if (hasPermission('UcenterPersonEdit')) {
                router.push({
                  name: 'UcenterPersonEdit',
                  params: { type: 'edit', id: record.id },
                });
              } else if (hasPermission('UcenterPersonView')) {
                router.push({
                  name: 'UcenterPersonView',
                  params: { id: record.id },
                });
              } else {
                createMessage.warning('对不起， 您暂无编辑和查看详情权限！');
              }
            },
          };
        },
      });
      // 进入详情
      const toDetail = (item) => {
        if (!hasPermission('UcenterPersonView')) {
          createMessage.warning('对不起， 您暂无查看详情权限！');
          return false;
        }
        router.push({
          name: 'UcenterPersonView',
          params: { id: item.id },
        });
      };
      // 新增
      const handleCreate = () => {
        router.push({
          name: 'UcenterPersonAdd',
          params: { type: 'add' },
        });
      };
      // 修改
      const handleEdit = () => {
        const checkedKeys = getSelectRowKeys();
        if (checkedKeys.length == 1) {
          router.push({
            name: 'UcenterPersonEdit',
            params: { type: 'edit', id: checkedKeys[0] },
          });
        } else if (checkedKeys.length == 0) {
          createMessage.warning('请选择一条数据');
        } else {
          createMessage.warning('只能选择一条数据');
        }
      };
      // 删除
      const handleDelete = () => {
        const checkedKeys = getSelectRowKeys();
        if (checkedKeys.length == 0) {
          createMessage.warning('请选择一条数据');
          return false;
        }
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会删除该人员, 是否继续?',
          onOk() {
            deletePublishCancel(checkedKeys);
          },
        });
      };
      const deletePublishCancel = async (selectRowKeys) => {
        const idQueryIn = selectRowKeys.join(',');
        await ucenterPersonDeleteApi({ idQueryIn }).then(() => {
          createMessage.success('删除成功');
          reload();
        });
      };
      // 锁定
      const handleLockClick = (record) => {
        if (!record.account || record.account == '') {
          createMessage.warning('请选择已分配账号的数据');
          return;
        }
        if (record.accountStatus == '2') {
          createMessage.warning('请选择账号未锁定的数据');
          return;
        }
        if (record.accountStatus == '3') {
          createMessage.warning('请选择账号未注销的数据');
          return;
        }
        const ids = record.id;
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '账号将要被锁定, 请确认是否继续？',
          onOk() {
            lock({ ids });
          },
        });
      };
      const lock = async (ids) => {
        await ucenterPersonNewLockApi(ids).then(() => {
          createMessage.success('锁定成功！');
          clearSelectedRowKeys();
          reload();
        });
      };
      // 解锁
      const handleUnLockClick = (record) => {
        if (!record.account || record.account == '') {
          createMessage.warning('请选择已分配账号的数据');
          return;
        }
        if (record.accountStatus == '1') {
          createMessage.warning('请选择账号已锁定的数据');
          return;
        }
        if (record.accountStatus == '3') {
          createMessage.warning('请选择账号未注销的数据');
          return;
        }
        const ids = record.id;
        unLock({ ids });
      };
      const unLock = async (ids) => {
        await ucenterPersonNewUnlockApi(ids).then(() => {
          createMessage.success('解锁成功！');
          clearSelectedRowKeys();
          reload();
        });
      };
      // 注销
      const handleDestroyClick = (record) => {
        if (!record.account || record.account == '') {
          createMessage.warning('请选择已分配账号的数据');
          return;
        }
        if (record.accountStatus == '3') {
          createMessage.warning('请选择账号未注销的数据');
          return;
        }
        const ids = record.id;
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '账号将要被注销, 请确认是否继续？',
          onOk() {
            destroy({ ids });
          },
        });
      };
      const destroy = async (ids) => {
        await ucenterPersonNewDestroyApi(ids).then(() => {
          createMessage.success('注销成功！');
          clearSelectedRowKeys();
          reload();
        });
      };
      // 重置密码
      const handleResetPwdClick = (record) => {
        if (!record.account || record.account == '') {
          createMessage.warning('当前记录未分配账号，请刷新后重试');
          return;
        }
        if (record.accountStatus == '1') {
          createMessage.warning('当前记录账号状态异常，请刷新后重试');
          return;
        }
        const account = record.account;
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: `账号${account}的密码将要被重置，请确认是否继续？`,
          onOk() {
            reset({ account });
          },
        });
      };
      const reset = async (account) => {
        await ucenterPersonResetPwdApi(account).then(() => {
          createMessage.success('密码重置成功！');
          clearSelectedRowKeys();
          reload();
        });
      };
      // 拖动列
      const handleResizeColumn = (w, col) => {
        const arr = getColumns();
        arr.forEach((item) => {
          if (item.dataIndex == col.dataIndex) {
            item.width = w;
          }
        });
        setColumns(arr);
      };
      // 搜索
      const handleSearch = (inputvalue, searchList) => {
        searchParams.nameOrAccountQueryLike = inputvalue;
        if (searchList.length > 0) {
          searchList.forEach((item) => {
            searchParams[item.field] = item.value;
          });
        }
        reload();
        clearSelectedRowKeys();
      };

      watch(
        () => props.pathIds,
        (val) => {
          searchParams.pathIds = val;
          reload();
        },
      );
      watch(
        () => props.roleIdQuery,
        (val) => {
          searchParams.roleIdQuery = val;
          reload();
        },
      );
      return {
        tableRef,
        searchParams,
        searchArr,
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleLockClick,
        handleUnLockClick,
        handleDestroyClick,
        toDetail,
        handleSearch,
        handleResizeColumn,
        handleResetPwdClick,
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
        total: computed(() => {
          const getPagination = unref(getPaginationRef());
          return (getPagination as PaginationProps).total;
        }),
      };
    },
  });
</script>

<style lang="less" scoped>
  .name {
    color: @primary-color;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .person-name {
    display: inline-block;
    max-width: 80px;
    color: @primary-color;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :deep(.ant-table-cell) {
    white-space: pre-line;
  }
</style>
