<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-07 14:21:07
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-11-02 15:30:50
 * @FilePath: /vben-ucenter/src/views/doUcenter/org/DeptTree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="!p-2 overflow-hidden bg-white">
    <BasicTree
      toolbar
      search
      :checkStrictly="true"
      :expandOnSearch="true"
      :clickRowToExpand="false"
      :treeData="treeData"
      ref="asyncExpandTreeRef"
      :fieldNames="{ key: 'pathIds', title: 'cname' }"
      @select="handleSelect"
      class="org-tree"
    >
      <template #title="item">
        <div class="flex">
          <span class="personTree-name" :title="item.cname">{{ item.cname }}</span>
        </div>
      </template>
    </BasicTree>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, watch, unref, nextTick } from 'vue';

  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';
  import { getUcenterOrgTree } from '/@/api/testDemo/dept';
  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree },
    props: {
      isRender: {
        type: Boolean,
      },
    },

    emits: ['select'],
    setup(props, { emit }) {
      const treeData = ref<TreeItem[]>([]);
      const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
      const getTree = () => unref(asyncExpandTreeRef);
      const fetch = async () => {
        treeData.value = (await getUcenterOrgTree({
          compType: '10027-10',
        })) as unknown as TreeItem[];
        nextTick(() => {
          getTree()?.expandAll(true);
        });
      };

      function handleSelect(keys, { node }) {
        keys && emit('select', node.id);
      }

      onMounted(() => {
        fetch();
      });
      watch(
        () => props.isRender,
        () => fetch(),
      );
      return { treeData, handleSelect, asyncExpandTreeRef };
    },
  });
</script>
