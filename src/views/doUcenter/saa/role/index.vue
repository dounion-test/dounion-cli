<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-01 18:16:06
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 18:07:54
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentClass="flex" contentFullHeight>
    <PageCollapsed title="角色列表" width="250">
      <template #iconLink>
        <a-tooltip class="ml-2 cursor-pointer">
          <template #title>新增角色</template>
          <Icon icon="prime:user-plus" class="icon-primary" @click="handleRoleAdd" size="20" />
        </a-tooltip>
        <a-tooltip class="ml-2 cursor-pointer">
          <template #title>编辑角色</template>
          <Icon icon="prime:user-edit" class="icon-primary" @click="handleRoleEdit" size="20" />
        </a-tooltip>
      </template>
      <template #cLeft>
        <!-- 角色树 -->
        <div class="!mr-0 bg-white">
          <Tree
            ref="treeRef"
            @select="handleSelect"
            :api="roleTree.api"
            :params="roleTree.params"
            tab="2"
            :replaceFields="{ key: 'id', title: 'name' }"
          />
        </div>
      </template>
      <template #cRight>
        <!-- 搜索、表格、分页 -->
        <a-tabs v-model:activeKey="activeKey" size="small" class="!p-2 bg-white">
          <a-tab-pane key="1" tab="角色成员" force-render>
            <PersonBasicTable
              class="rolePersonBasicTable"
              :columns="personColumns"
              :roleIdQuery="roleIdQuery"
              :hideAction="true"
              :canResize="false"
              :immediate="false"
              :showTitle="false"
              :showToolbar="false"
              :useSearchForm="false"
              :showTableSetting="false"
              :clickToRowSelect="false"
              emptyDesc="请选择角色"
            />
          </a-tab-pane>
          <a-tab-pane key="2" tab="功能权限" force-render>
            <FuncBasicTable
              :showTitle="false"
              :objId="roleIdQuery"
              emptyDesc="请选择角色"
              objType="10079-30"
            />
          </a-tab-pane>
        </a-tabs>
      </template>
    </PageCollapsed>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper, PageCollapsed } from '/@/components/Page';
  import Tree from './module/Tree.vue';
  import { Tabs, TabPane, Tooltip } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { personColumns } from './config/index';
  import { getUcenterRoleList } from '/@/api/testDemo/role';
  import PersonBasicTable from '../person/module/PersonBasicTable.vue';
  import FuncBasicTable from '../func/module/FuncBasicTable.vue';

  const roleTree: any = {
    api: getUcenterRoleList,
  };

  export default defineComponent({
    name: 'UcenterRoleList',
    components: {
      PageWrapper,
      PageCollapsed,
      Tree,
      Icon,
      ATabs: Tabs,
      ATabPane: TabPane,
      ATooltip: Tooltip,
      PersonBasicTable,
      FuncBasicTable,
    },
    setup() {
      const activeKey = ref('1');
      const roleIdQuery = ref(0);
      const treeRef = ref<InstanceType<typeof Tree>>();

      // 选择部门
      function handleSelect(pathIds) {
        roleIdQuery.value = pathIds;
      }

      // 新增角色
      const handleRoleAdd = () => {
        treeRef.value?.handleCreate();
      };

      // 编辑角色
      const handleRoleEdit = () => {
        treeRef.value?.handleEdit();
      };

      return {
        activeKey,
        roleTree,
        treeRef,
        roleIdQuery,
        personColumns,
        handleSelect,
        handleRoleAdd,
        handleRoleEdit,
      };
    },
  });
</script>

<style lang="less" scoped>
  .icon-primary {
    color: @primary-color;
  }

  :deep(.dounion-basic-table-form-container) {
    padding: 0;
  }
</style>

<style lang="less">
  .funcTabs {
    .ant-form {
      border-bottom: none;
    }
  }

  .rolePersonBasicTable {
    .ant-table-header {
      top: 0 !important;
    }
  }
</style>
