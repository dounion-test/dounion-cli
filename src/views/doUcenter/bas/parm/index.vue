<!--
 * @Author: your name
 * @Date: 2022-05-23 14:48:56
 * @LastEditTime: 2022-11-02 15:30:17
 * @LastEditors: 江雪松 576053154@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vben-admin-thin-next-main/src/views/systemManager/ucenterPerson/index.vue
-->
<template>
  <PageWrapper contentFullHeight contentClass="flex">
    <PageCollapsed title="部门列表" width="250">
      <template #cLeft>
        <DeptTree
          @select="handleSelect"
          :showDropdown="true"
          :replaceFields="{ key: 'pathIds', title: 'cname' }"
        />
      </template>
      <template #cRight>
        <div class="bg-white pl-3 pr-3 pt-1">
          <a-tabs v-model:activeKey="activeKey" size="small">
            <a-tab-pane key="1" tab="系统运行参数" force-render>
              <SysParameterTable :orgId="treeID" />
            </a-tab-pane>
          </a-tabs>
        </div>
      </template>
    </PageCollapsed>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { PageWrapper, PageCollapsed } from '/@/components/Page';
  import DeptTree from './module/DeptTree.vue';
  import SysParameterTable from './module/SysParameterTable.vue';

  export default defineComponent({
    components: {
      SysParameterTable,
      PageWrapper,
      PageCollapsed,
      DeptTree,
      ATabs: Tabs,
      ATabPane: TabPane,
    },
    setup() {
      const activeKey = ref('1');
      const treeID = ref(1);

      // 选择部门
      const handleSelect = (id) => {
        treeID.value = id;
      };

      return {
        treeID,
        activeKey,
        handleSelect,
      };
    },
  });
</script>
