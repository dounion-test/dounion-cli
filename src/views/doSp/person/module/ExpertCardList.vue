<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-08 16:42:42
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 18:04:21
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/ExpertCardList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <a-tabs
      class="tabs-wrap"
      v-model:activeKey="activeKey"
      @change="handleChange"
      :destroyInactiveTabPane="true"
    >
      <a-tab-pane key="52002-10" :tab="`全部(${statisticsCount.checkedInCount || 0})`">
        <a-row :gutter="[16, 16]" v-if="tableData && tableData.length">
          <template v-for="item in tableData" :key="item.id">
            <a-col :span="8" :xxl="6">
              <ExpertCardItem
                @refresh="handleRefresh"
                :isHoverable="true"
                :isShowBtn="true"
                :record="item"
              />
            </a-col>
          </template>
        </a-row>
        <a-empty v-else />
      </a-tab-pane>
      <a-tab-pane key="52002-30" :tab="`待审核(${statisticsCount.checkPendingCount || 0})`">
        <a-row :gutter="[16, 16]" v-if="tableData && tableData.length">
          <template v-for="item in tableData" :key="item.id">
            <a-col :span="8" :xxl="6">
              <ExpertCardItem
                @refresh="handleRefresh"
                :isHoverable="true"
                :isShowBtn="true"
                :record="item"
              />
            </a-col>
          </template>
        </a-row>
        <a-empty v-else />
      </a-tab-pane>
      <a-tab-pane key="52002-20" :tab="`已退库(${statisticsCount.removedCount || 0})`">
        <a-row :gutter="[16, 16]" v-if="tableData && tableData.length">
          <template v-for="item in tableData" :key="item.id">
            <a-col :span="8" :xxl="6">
              <ExpertCardItem
                @refresh="handleRefresh"
                :isHoverable="true"
                :isShowBtn="true"
                :record="item"
              />
            </a-col>
          </template>
        </a-row>
        <a-empty v-else />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { Row, Col, Tabs, TabPane, Empty } from 'ant-design-vue';
  import ExpertCardItem from './ExpertCardItem.vue';

  export default defineComponent({
    components: {
      ExpertCardItem,
      ARow: Row,
      ACol: Col,
      ATabs: Tabs,
      ATabPane: TabPane,
      AEmpty: Empty,
    },
    props: {
      status: String,
      btnActiveKey: Number,
      tableData: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
      statisticsCount: {
        type: Object,
        default: () => {},
      },
    },
    emits: ['refresh', 'change'],
    setup(props, { emit }) {
      const activeKey = ref('52002-10');

      const handleChange = () => {
        emit('change', activeKey.value, 1);
      };

      const handleRefresh = () => {
        emit('refresh');
      };

      watch(
        () => props.status,
        () => {
          if (props.btnActiveKey == 2) {
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
