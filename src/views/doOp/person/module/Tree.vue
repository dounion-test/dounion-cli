<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-07 14:21:07
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-12 10:37:38
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
    >
      <template #title="item">
        <div class="w-full" @contextmenu="(e) => handleContext(e, item)">{{ item.nodeName }}</div>
      </template>
    </BasicTree>
    <AreaModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, nextTick } from 'vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import AreaModal from './AreaModal.vue';
  import { useContextMenu } from '/@/hooks/web/useContextMenu';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { domesOpOrgTreeApi } from '/@/api/doOp/person';
  import { useModal } from '/@/components/Modal';
  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree, AreaModal },
    emits: ['select'],
    setup(_, { emit }) {
      const treeLoading = ref(false);
      const treeData = ref<TreeItem[]>([]);
      const [createContextMenu] = useContextMenu();
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      const fetch = async () => {
        treeLoading.value = true;
        treeData.value = (await domesOpOrgTreeApi({
          executiveLevelQuery: '52048-30',
        })) as unknown as TreeItem[];
        nextTick(() => {
          treeLoading.value = false;
        });
      };

      function handleContext(e: MouseEvent, node) {
        createContextMenu({
          event: e,
          items: [
            {
              label: '新增',
              icon: 'ant-design:plus-outlined',
              handler: () => {
                openModal(true, { node });
              },
            },
            {
              label: '编辑',
              icon: 'eva:edit-2-outline',
              handler: () => {
                openModal(true, { node, isUpdate: true, id: node.id });
              },
            },
          ],
        });
      }

      function handleSelect(_, { node }) {
        emit('select', node.id);
      }

      const handleSuccess = () => {
        fetch();
      };

      onMounted(() => {
        fetch();
      });
      return {
        treeLoading,
        treeData,
        registerModal,
        handleContext,
        handleSelect,
        handleSuccess,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-tree__title';
  .org-tree {
    .personTree-name {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .@{prefix-cls} {
      &:first-child {
        max-width: 100%;
      }
    }

    :deep(.ant-spin-nested-loading) {
      height: 100%;
    }

    :deep(.ant-spin-container) {
      height: 100%;
    }

    // :deep(.scrollbar) {
    //   overflow: initial;
    // }

    // :deep(.scrollbar__wrap) {
    //   overflow-x: initial;
    // }
  }
</style>
