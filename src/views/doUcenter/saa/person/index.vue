<!--
 * @Author: your name
 * @Date: 2022-05-23 14:48:56
 * @LastEditTime: 2022-09-23 14:06:55
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
        <div class="bg-white">
          <PersonBasicTable
            :columns="columns"
            :canResize="false"
            :pathIds="TreepathIds"
            :tableTitle="tableTitle"
            :tableId="tableId"
            :treeParentId="TreeParentId"
            :rowSelection="{ type: 'checkbox' }"
          />
        </div>
      </template>
    </PageCollapsed>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper, PageCollapsed } from '/@/components/Page';
  import DeptTree from './module/DeptTree.vue';
  import { columns } from './config/index';
  import PersonBasicTable from './module/PersonBasicTable.vue';

  export default defineComponent({
    name: 'UcenterPersonList',
    components: {
      PageWrapper,
      PageCollapsed,
      DeptTree,
      PersonBasicTable,
    },
    setup() {
      const tableTitle = ref<string>('人员列表');
      const tableId = ref<number>(0);
      const TreepathIds = ref<string>('');
      const TreeParentId = ref(null);
      // 选择部门
      function handleSelect(pathIds = '', title, id, parentId) {
        tableTitle.value = title;
        tableId.value = id;
        TreeParentId.value = parentId;
        TreepathIds.value = pathIds;
      }

      return {
        tableId,
        TreeParentId,
        tableTitle,
        TreepathIds,
        columns,
        handleSelect,
      };
    },
  });
</script>
