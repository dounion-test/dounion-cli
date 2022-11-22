<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 11:01:25
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 18:03:29
 * @FilePath: /rural-revitalization/src/views/doOp/task/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <div class="p-2 op-task-search">
      <SearchWrap placeholder="请输入调研表名" :searchList="searchArr" @search="handleSearch" />
    </div>
    <div class="p-2">
      <a-tabs v-model:activeKey="activeKey" size="small">
        <a-tab-pane key="52019-10" :tab="`待发布 ( ${totalNumObj.num} )`" force-render>
          <TaskTable
            activeKey="52019-10"
            :columns="waitColumns"
            :isRefresh="isRefresh"
            :searchParams="searchParams"
            @change="handleChange"
          />
        </a-tab-pane>
        <a-tab-pane key="52019-20" :tab="`调研中 ( ${totalNumObj.num1} )`" force-render>
          <TaskTable
            activeKey="52019-20"
            :columns="columns"
            :isRefresh="isRefresh"
            :searchParams="searchParams"
            @change="handleChange"
          />
        </a-tab-pane>
        <a-tab-pane key="52019-30" tab="已结束">
          <TaskTable
            activeKey="52019-30"
            :columns="endColumns"
            :isRefresh="isRefresh"
            :searchParams="searchParams"
            @change="handleChange"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, provide } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { SearchWrap } from '/@/components/SearchWrap';
  import TaskTable from './module/TaskTable.vue';
  import { searchArr } from './config/index';
  import { waitColumns, columns, endColumns } from './config/index';

  export default defineComponent({
    components: {
      PageWrapper,
      SearchWrap,
      TaskTable,
      ATabs: Tabs,
      ATabPane: TabPane,
    },
    setup() {
      const activeKey = ref('52019-10');
      const isRefresh = ref(false);
      const searchParams = reactive({
        surNameQueryLike: undefined,
        yearsQueryIn: undefined,
        surTypeQueryIn: undefined,
      });

      const handleChange = () => {
        isRefresh.value = !isRefresh.value;
      };

      const handleSearch = (inputvalue, searchList) => {
        searchList?.forEach((item) => {
          searchParams[item.field] = item.value;
        });
        if (inputvalue) {
          searchParams.surNameQueryLike = inputvalue;
        }
      };
      provide('searchParams', searchParams);

      const totalNumObj = reactive({ num: 0, num1: 0 });
      provide('tableTotalNum', totalNumObj);

      return {
        activeKey,
        searchArr,
        isRefresh,
        columns,
        endColumns,
        waitColumns,
        searchParams,
        handleSearch,
        handleChange,
        totalNumObj,
      };
    },
  });
</script>

<style lang="less" scoped>
  .op-task-search {
    border-bottom: 16px solid #f0f2f5;
  }

  :deep(.ant-tabs-nav) {
    margin: 0;
  }

  :deep(.ant-tabs-small) {
    & > .ant-tabs-nav .ant-tabs-tab {
      padding: 8px 15px;
    }
  }
</style>
