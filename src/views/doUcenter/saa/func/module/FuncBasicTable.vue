<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-15 14:31:46
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 18:07:22
 * @FilePath: /vben-ucenter/src/views/doUcenter/func/FuncBasicTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicTable
    @register="registerTable"
    :searchInfo="searchInfo"
    class="funcTabs !p-0"
    ref="tableRef"
  >
    <template #emptyText>
      <a-empty :image="simpleImage" :description="emptyDesc" />
    </template>
    <template #form-custom>
      <div v-if="showTitle" class="tableTitle">权限列表</div>
      <a-tabs v-model:activeKey="projectKey" @change="handelTabsChange">
        <a-tab-pane v-for="item in appList" :key="item.id" :tab="item.name" />
      </a-tabs>
    </template>
    <template #toolbar>
      <a-button type="primary" @click="expandAll()"> 打开权限树 </a-button>
      <a-button type="primary" @click="collapseAll()"> 关闭权限树 </a-button>
      <Authority vlaue="UcenterObjFuncSave">
        <a-button @click="handleSave" type="primary"> 保存 </a-button>
      </Authority>
      <a-button @click="reload()"> 取消 </a-button>
    </template>
    <template #action="{ record }">
      <a-row @click.stop>
        <a-col :span="8" v-for="item in record.menuBox" :key="item.id">
          <a-checkbox @change="handleCheckbox(item)" v-model:checked="item.isSelect">{{
            item.name
          }}</a-checkbox>
        </a-col>
      </a-row>
    </template>
  </BasicTable>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref, watch, nextTick } from 'vue';
  import { BasicTable, useTable, TableActionType } from '/@/components/Table';
  import { Authority } from '/@/components/Authority';
  import { columns, getFormConfig } from '../config/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Row, Col, Tabs, TabPane, Checkbox, Empty } from 'ant-design-vue';
  import { getUcenterRoleList } from '/@/api/testDemo/role';
  import { usePermissionStore } from '/@/store/modules/permission';
  import { getUcenterObjFuncList } from '/@/api/testDemo/func';
  import { functionSave } from '/@/api/testDemo/func';
  import { getUcenterOrgPersonTree, getUcenterOrgTree } from '/@/api/testDemo/dept';

  const userTree = {
    api: getUcenterOrgPersonTree,
  };

  const roleTree = {
    api: getUcenterRoleList,
  };

  const orgTree = {
    api: getUcenterOrgTree,
    params: {
      compType: '10027-10',
    },
  };
  export default defineComponent({
    name: 'UcenterOrgList',
    components: {
      BasicTable,
      Authority,
      ARow: Row,
      ACol: Col,
      ATabs: Tabs,
      ATabPane: TabPane,
      ACheckbox: Checkbox,
      AEmpty: Empty,
    },
    props: {
      objId: Number || String,
      objType: String,
      showTitle: {
        type: Boolean,
        default: () => true,
      },
      emptyDesc: {
        type: String,
        default: () => '暂无数据',
      },
    },
    setup(props) {
      const activeKey = ref('10079-10');
      const searchInfo = reactive<Recordable>({});
      let isRender = ref(false);
      const tableRef = ref<Nullable<TableActionType>>(null);
      const permissionStore = usePermissionStore();
      const { createMessage } = useMessage();
      const projectKey = ref(permissionStore.currentAppID);
      const type4Ids = ref<number[]>([]);
      const type4ParentIds = ref<number[]>([]);
      const treeSelectedIds = ref<string[]>([]);
      const [
        registerTable,
        {
          reload,
          expandAll,
          collapseAll,
          colseExpandRows,
          getSelectRowKeys,
          getSelectRows,
          setSelectedRowKeys,
          clearSelectedRowKeys,
        },
      ] = useTable({
        api: getUcenterObjFuncList,
        rowKey: 'id',
        columns,
        formConfig: getFormConfig(),
        immediate: false,
        isTreeTable: true,
        useSearchForm: true,
        pagination: false,
        showTableSetting: false,
        showIndexColumn: false,
        bordered: true,
        canResize: false,
        rowClassName: (record: any) => {
          if (type4Ids.value.some((id) => id == record.id)) {
            return 'row-hidden';
          }
          if (type4ParentIds.value.some((id) => id == record.id)) {
            return 'expand-icon-hidden';
          }
          return '';
        },
        rowSelection: {
          type: 'checkbox',
          checkStrictly: false,
          onSelect: (record, selected) => handleOnSelect(record, selected),
          onSelectAll: (selected, selectedRows, changeRows) =>
            handleOnSelectAll(selected, selectedRows, changeRows),
        },
        afterFetch: (res) => handleAfterFetch(res),
        customRow: (record) => {
          return {
            onClick: () => {
              colseExpandRows(record.id);
            },
          };
        },
      });
      // tabs切换
      const handelTabsChange = () => {
        searchInfo.projectId = projectKey.value;
        searchInfo.objId && reload();
      };
      // table选择
      const handleOnSelect = (_record, selected) => {
        setMenuBoxSelectd(_record, selected);
      };
      const setMenuBoxSelectd = (record, selected) => {
        record.children?.map((item) => {
          item?.menuBox?.map((v) => (v.isSelect = selected));

          item.children?.length && setMenuBoxSelectd(item, selected);
        });

        record?.menuBox?.map((v) => (v.isSelect = selected));
      };
      // table全选
      const handleOnSelectAll = (selected, _selectedRows, changeRows) => {
        changeRows.forEach((item) => {
          item.menuBox?.forEach((it) => {
            it.isSelect = selected;
          });
        });
      };
      // 选择checkbox
      const handleCheckbox = (row) => {
        const { id, isSelect, parentsIds } = row;
        let keys = getSelectRowKeys();
        if (isSelect) {
          keys.push(id);
        } else {
          parentsIds.push(id);
          keys = keys.filter((item) => {
            let index = parentsIds.findIndex((id) => id == item);
            return index === -1;
          });
        }
        setSelectedRowKeys([...keys]);
      };
      // 获取list后处理数据
      const handleAfterFetch = async (res) => {
        treeSelectedIds.value = [];
        // children 替换 subFunction
        res = JSON.parse(JSON.stringify(res).replace(/subFunction/g, 'children'));

        await flatten(res[0]);

        nextTick(() => {
          setSelectedRowKeys([...treeSelectedIds.value]);
        });
        console.log(res, 'arr');
        return res[0].children;
      };
      // 遍历树型结构数组
      const flatten = (arr, parentsIds = []) => {
        arr.children?.map((item) => {
          // 记录当前节点上面所有父级id的集合
          item.parentsIds = [];
          item.parentsIds.push(item.parentId, ...parentsIds);
          // 当前节点是否选中
          item.isSelect = item.isSelect ? true : false;
          if (item.children.length) {
            item.children.forEach((it) => {
              if (!it.isSelect) {
                item.isSelect = false;
              }
            });
          }
          item.isSelect && treeSelectedIds.value.push(item.id);
          if (item.type == 4) {
            if (!arr.hasOwnProperty('menuBox')) {
              // 右侧表格操作的按钮列表
              arr.menuBox = [];
            }
            arr.menuBox.push(item);
            // type4Ids 用于隐藏type == 4 的所有行
            type4Ids.value.push(item.id);
            if (arr.menuBox.length === arr.children.length) {
              type4ParentIds.value.push(arr.id);
            }
          } else {
            if (!item.children.length) {
              type4ParentIds.value.push(item.id);
            }
          }
          item.children.length && flatten(item, item.parentsIds);
        });
      };
      // 保存
      const handleSave = () => {
        if (!searchInfo.objId) {
          createMessage.warning('请选择人员、角色或者部门');
          return;
        }
        let SelectRows: any[] = getSelectRows();
        let setIds = new Set();
        SelectRows.forEach((item) => {
          setIds.add(item.id);
          item.parentsIds.forEach((it) => {
            if (it) {
              setIds.add(`${it}`);
            }
          });
        });
        let params = {
          funcIds: Array.from(setIds).join(','),
          objType: searchInfo.objType,
          objId: searchInfo.objId,
          projectId: projectKey.value,
        };
        save(params);
      };
      const save = async (params) => {
        await functionSave(params);
        createMessage.success('操作成功');
      };
      watch(
        () => props.objId,
        (val) => {
          searchInfo.objType = props.objType;
          searchInfo.objId = val;
          searchInfo.projectId = projectKey.value;
          clearSelectedRowKeys();
          reload();
        },
      );
      return {
        tableRef,
        reload,
        expandAll,
        collapseAll,
        registerTable,
        handelTabsChange,
        handleOnSelect,
        handleOnSelectAll,
        handleCheckbox,
        handleSave,
        searchInfo,
        isRender,
        activeKey,
        userTree,
        orgTree,
        roleTree,
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
        appList: computed(() => {
          return permissionStore.appList;
        }),
        projectKey,
      };
    },
  });
</script>

<style lang="less" scoped>
  .tableTitle {
    font-size: 16px;
    font-weight: 500;
    color: #000;
    cursor: pointer;
  }

  :deep(.ant-form) {
    margin-bottom: 0;
    padding: 12px 10px 0;
  }

  :deep(.ant-tabs-nav) {
    margin: 0;
  }

  :deep(.@{namespace}-tree-header) {
    border-bottom: none;
  }

  :deep(.ant-tabs-content) {
    height: 100%;
  }

  :deep(.ant-checkbox-wrapper) {
    margin-left: 0;
    margin-right: 6px;
  }

  :deep(.ant-table-content) {
    overflow: initial !important;

    .row-hidden {
      display: none;
    }

    .expand-icon-hidden {
      > td:nth-child(2) {
        button {
          opacity: 0;
        }
      }
    }
  }
</style>

<style lang="less">
  .funcTabs .ant-row .ant-col-24 {
    height: 0;
  }
</style>
