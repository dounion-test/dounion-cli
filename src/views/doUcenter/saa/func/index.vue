<template>
  <PageWrapper contentFullHeight contentClass="flex">
    <PageCollapsed title="选项列表" width="250">
      <!-- 部门树 -->
      <template #cLeft>
        <a-tabs v-model:activeKey="activeKey" type="card" size="small" class="!mr-0 bg-white">
          <a-tab-pane key="10079-40" tab="按用户" force-render>
            <Tree
              @select="handleSelect"
              :api="userTree.api"
              :params="userTree.params"
              tab="1"
              :replaceFields="{ key: 'id', title: 'cname' }"
            />
          </a-tab-pane>
          <a-tab-pane key="10079-30" tab="按角色" force-render>
            <Tree
              @select="handleSelect"
              :api="roleTree.api"
              :params="roleTree.params"
              tab="2"
              :replaceFields="{ key: 'id', title: 'name' }"
            />
          </a-tab-pane>
          <a-tab-pane key="10079-10" tab="按部门" force-render>
            <Tree
              @select="handleSelect"
              :api="orgTree.api"
              :params="orgTree.params"
              tab="3"
              :replaceFields="{ key: 'id', title: 'cname' }"
            />
          </a-tab-pane>
        </a-tabs>
      </template>
      <!-- 搜索、表格、分页 -->
      <template #cRight>
        <div class="funcTabs bg-white">
          <FuncBasicTable :objId="treeObjId" :objType="activeKey" />
        </div>
      </template>
    </PageCollapsed>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper, PageCollapsed } from '/@/components/Page';
  import Tree from './module/Tree.vue';
  import FuncBasicTable from './module/FuncBasicTable.vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { getUcenterRoleList } from '/@/api/testDemo/role';
  import { getUcenterOrgPersonTree, getUcenterOrgTree } from '/@/api/testDemo/dept';

  const userTree: any = {
    api: getUcenterOrgPersonTree,
  };

  const roleTree: any = {
    api: getUcenterRoleList,
  };

  const orgTree: any = {
    api: getUcenterOrgTree,
    params: {
      compType: '10027-10',
    },
  };
  export default defineComponent({
    name: 'UcenterOrgList',
    components: {
      PageWrapper,
      PageCollapsed,
      Tree,
      FuncBasicTable,
      ATabs: Tabs,
      ATabPane: TabPane,
    },
    setup() {
      const activeKey = ref('10079-40');
      const treeObjId = ref<string | number>(0);
      // tree选择
      const handleSelect = (keys) => {
        treeObjId.value = keys;
      };
      return {
        handleSelect,
        treeObjId,
        activeKey,
        userTree,
        orgTree,
        roleTree,
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
    margin-bottom: 12px;
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
  .funcTabs {
    .ant-row .ant-col-24 {
      height: 0;
    }

    .ant-form {
      border-bottom: none;
    }
  }
</style>
