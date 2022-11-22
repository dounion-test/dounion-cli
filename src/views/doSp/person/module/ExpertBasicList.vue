<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-08 16:42:25
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 18:04:06
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/ExpertBasicList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-tabs class="tabs-wrap" v-model:activeKey="activeKey" @change="handleChange">
    <a-tab-pane key="52002-10" :tab="`全部(${statisticsCount.checkedInCount || 0})`">
      <ExpertBasicItem
        @refresh="handleRefresh"
        :tableData="tableData"
        v-if="tableData && tableData.length"
      />
      <a-empty v-else />
    </a-tab-pane>
    <a-tab-pane key="52002-30" :tab="`待审核(${statisticsCount.checkPendingCount || 0})`"
      ><ExpertBasicItem
        @refresh="handleRefresh"
        :tableData="tableData"
        v-if="tableData && tableData.length" />
      <a-empty v-else
    /></a-tab-pane>
    <a-tab-pane key="52002-20" :tab="`已退库(${statisticsCount.removedCount || 0})`"
      ><ExpertBasicItem
        @refresh="handleRefresh"
        :tableData="tableData"
        v-if="tableData && tableData.length" />
      <a-empty v-else
    /></a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { Tabs, TabPane, Empty } from 'ant-design-vue';
  import ExpertBasicItem from './ExpertBasicItem.vue';

  export default defineComponent({
    components: {
      ExpertBasicItem,
      ATabs: Tabs,
      ATabPane: TabPane,
      AEmpty: Empty,
    },
    props: {
      status: String,
      btnActiveKey: Number,
      tableData: {
        type: Array,
        default: () => [],
      },
      statisticsCount: {
        type: Object,
        default: () => {},
      },
    },
    emits: ['change', 'refresh'],
    setup(props, { emit }) {
      const activeKey = ref('52002-10');

      const handleChange = () => {
        emit('change', activeKey.value, 2);
      };

      const handleRefresh = () => {
        emit('refresh');
      };

      watch(
        () => props.status,
        () => {
          if (props.btnActiveKey == 1) {
            activeKey.value = props.status as string;
          }
        },
      );

      return {
        activeKey,
        handleChange,
        handleRefresh,
      };
    },
  });
</script>

<style lang="less" scoped>
  .tabs-wrap {
    margin-top: -20px;
    overflow: visible;
  }
</style>
