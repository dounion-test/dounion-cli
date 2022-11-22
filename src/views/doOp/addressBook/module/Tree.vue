<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-07 14:21:07
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-30 18:32:27
 * @FilePath: /vben-ucenter/src/views/doUcenter/org/DeptTree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="overflow-hidden">
    <BasicTree
      toolbar
      search
      :expandedKeys="[1]"
      :loading="treeLoading"
      :checkStrictly="true"
      :expandOnSearch="true"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'nodeName' }"
      @select="handleSelect"
      class="org-tree"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, nextTick } from 'vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { domesOpOrgTreeApi } from '/@/api/doOp/person';
  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree },
    emits: ['select'],
    setup(_, { emit }) {
      const treeLoading = ref(false);
      const treeData = ref<TreeItem[]>([]);
      const fetch = async () => {
        treeLoading.value = true;
        treeData.value = (await domesOpOrgTreeApi({
          executiveLevelQuery: '52048-30',
        })) as unknown as TreeItem[];
        nextTick(() => {
          treeLoading.value = false;
        });
      };

      function handleSelect(_, { node }) {
        emit('select', node.id);
      }

      onMounted(() => {
        fetch();
      });
      return {
        treeLoading,
        treeData,
        handleSelect,
      };
    },
  });
</script>
