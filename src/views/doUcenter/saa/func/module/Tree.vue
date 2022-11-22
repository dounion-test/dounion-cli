<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-07 14:21:07
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-07-01 14:38:01
 * @FilePath: /vben-ucenter/src/views/doUcenter/func/Tree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="overflow-hidden" style="height: 100%">
    <BasicTree
      :loading="treeLoading"
      ref="asyncExpandTreeRef"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="replaceFields"
      @select="handleSelect"
      class="funcTree"
    >
      <template #title="item">
        <div class="funcTree-name" :title="item.cname || item.name">
          <Avatar :size="14" v-if="tab == '1' && item.sex && !item.imgPath">
            <template #icon>
              <UserOutlined />
            </template>
          </Avatar>
          <Avatar
            :size="14"
            v-if="tab == '1' && item.sex && item.imgPath"
            :src="`${VITE_GLOB_DOFILE_URL}${item.imgPath}`"
          />
          {{ item.cname || item.name }}
        </div>
      </template>
    </BasicTree>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, nextTick, PropType } from 'vue';
  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';
  import { UserOutlined } from '@ant-design/icons-vue';
  import { getAppEnvConfig } from '/@/utils/env';
  import { Avatar } from 'ant-design-vue';

  export default defineComponent({
    name: 'DeptTree',
    components: { Avatar, BasicTree, UserOutlined },
    props: {
      api: {
        type: Function as PropType<(...arg: any[]) => Promise<any>>,
        default: null,
      },
      tab: {
        type: String,
        default: () => '',
      },
      params: {
        type: Object,
        default: () => {},
      },
      replaceFields: {
        type: Object,
        default: () => {},
      },
    },
    emits: ['select'],
    setup(props, { emit }) {
      const { api, params } = unref(props);
      const treeData = ref<TreeItem[]>([]);
      const treeLoading = ref(false);
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
      const fetch = async () => {
        treeLoading.value = true;
        if (props.tab == '1') {
          let res = await api(params);
          await flatten(res);
          treeData.value = res;
          nextTick(() => {
            getTree().expandAll(true);
          });
          treeLoading.value = false;
        } else if (props.tab == '2') {
          treeData.value = (await api(params)).list;
          treeLoading.value = false;
        } else {
          treeData.value = await api(params);
          nextTick(() => {
            getTree().expandAll(true);
          });
          treeLoading.value = false;
        }
      };
      const handleSelect = (keys) => {
        if (keys.length == 0) return false;
        if (props.tab == '1' && keys[0].indexOf('-') == -1) return false;
        if (props.tab == '1') {
          let userKeys = keys[0].split('-');
          emit('select', userKeys[1]);
        } else {
          emit('select', keys[0]);
        }
      };
      const getTree = () => {
        const tree = unref(asyncExpandTreeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      };
      // 遍历树型结构数组
      const flatten = (arr) => {
        for (let item of arr) {
          if (item.children && Array.isArray(item.children) && item.listPerson) {
            item.id = `${item.id}${item.code}`;
            item.listPerson.forEach((it) => {
              it.id = `${item.id}-${it.id}`;
              it.cname = it.name;
            });
            item.children = [...item.children, ...item.listPerson];
            flatten(item.children);
          }
        }
      };

      onMounted(() => {
        fetch();
      });

      return {
        treeData,
        handleSelect,
        treeLoading,
        asyncExpandTreeRef,
        VITE_GLOB_DOFILE_URL,
      };
    },
  });
</script>

<style lang="less" scoped>
  .funcTree {
    .funcTree-name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
