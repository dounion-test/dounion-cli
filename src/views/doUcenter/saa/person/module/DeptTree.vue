<!--
 * @Author: your name
 * @Date: 2022-05-24 13:25:14
 * @LastEditTime: 2022-09-21 17:14:30
 * @LastEditors: 江雪松 576053154@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vben-admin-thin-next-main/src/views/systemManager/ucenterPerson/DeptTree.vue
-->
<template>
  <div class="bg-white relative" ref="DeptTreeRef">
    <basic-tree
      search
      :checkStrictly="true"
      :expandOnSearch="true"
      :checkable="checkTree"
      :clickRowToExpand="false"
      :treeData="treeData"
      :checkedKeys="checkeKeys"
      :fieldNames="replaceFields"
      ref="asyncExpandTreeRef"
      @select="handleSelect"
      @check="handleCheck"
      class="personTree"
    >
      <template #title="item">
        <div v-if="showDropdown" class="flex">
          <span class="personTree-name personTree-name-down" :title="item.cname">{{
            item.cname
          }}</span>
          <BasicTableTitle :id="item.id" :parentId="item.parentId" :treeRef="DeptTreeRef" />
        </div>
        <div v-if="!showDropdown" class="flex">
          <span
            class="personTree-name"
            :title="`${item.cname || item.name}${item.orgName ? `-${item.orgName}` : ''}`"
            >{{ item.cname || item.name }}{{ item.orgName ? `-${item.orgName}` : '' }}</span
          >
        </div>
      </template>
    </basic-tree>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, watch, unref, nextTick } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';
  import { doUcenterOrgTree } from '/@/api/common/index';
  import { ucenterRoleComboxApi } from '/@/api/testDemo/person';
  import BasicTableTitle from './BasicTableTitle.vue';

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree, BasicTableTitle },
    props: {
      isAdd: {
        type: Boolean,
        default: false,
      },
      checkTree: {
        type: Boolean,
        default: false,
      },
      showDropdown: {
        type: Boolean,
        default: false,
      },
      checkeKeys: {
        type: Array,
        default: () => [],
      },
      editcheckeKeys: {
        type: Array,
        default: () => [],
      },
      replaceFields: {
        type: Object,
        default: () => {},
      },
    },
    emits: ['select', 'check'],
    setup(props, { emit }) {
      const treeData = ref<TreeItem[]>([]);
      const valKeys = ref<any[]>([]);
      const DeptTreeRef = ref(null);
      const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
      const fetch = async () => {
        treeData.value = props.isAdd
          ? (await ucenterRoleComboxApi({ pageSize: 10000 })).list
          : await doUcenterOrgTree({ compType: '' });
        nextTick(() => {
          getTree().expandAll(true);
        });
      };

      const getTree = () => {
        const tree = unref(asyncExpandTreeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      };

      const handleSelect = (keys, node) => {
        emit(
          'select',
          keys[0],
          node.node.cname?.el.innerText,
          node.node.id,
          node.node.parentId,
          node,
        );
      };

      const handleCheck = (keys, node) => {
        emit('check', keys, node.checkedNodes);
      };
      // 遍历树型结构数组
      const flatten = (arr) => {
        let flatArray: any[] = [];
        for (let item of arr) {
          if (valKeys.value.indexOf(item.id) !== -1) {
            flatArray.push(item);
          }
          if (item.children && Array.isArray(item.children)) {
            flatArray = [...flatArray, ...flatten(item.children)];
          }
        }
        return flatArray;
      };

      onMounted(() => {
        fetch();
      });
      watch(
        () => [props.editcheckeKeys, treeData.value],
        ([val, valData]) => {
          nextTick(() => {
            if (val.length > 0 && valData.length > 0) {
              valKeys.value = val;
              const checkedNodes = flatten(cloneDeep(treeData.value));
              emit('check', '', checkedNodes, true);
            }
          });
        },
      );
      return {
        treeData,
        DeptTreeRef,
        asyncExpandTreeRef,
        handleSelect,
        handleCheck,
      };
    },
  });
</script>

<style lang="less" scoped>
  .DeptTree {
    position: relative;
  }

  .personTree {
    .personTree-name {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;

      &-down {
        max-width: 88% !important;
      }
    }

    :deep(.dounion-tree__title) :first-child {
      max-width: 100%;
    }

    :deep(.ant-spin-nested-loading) {
      height: 100%;
    }

    :deep(.ant-spin-container) {
      height: 100%;
    }
    // 如果需要横向滚动条
    // :deep(.scrollbar) {
    //   overflow: initial;
    // }

    // :deep(.scrollbar__wrap) {
    //   overflow-x: initial;
    // }
  }
</style>
