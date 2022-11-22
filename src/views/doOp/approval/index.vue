<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 11:01:25
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 18:02:36
 * @FilePath: /rural-revitalization/src/views/doOp/task/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <div class="p-2 op-task-search">
      <SearchWrap
        style="width: 550px"
        placeholder="请输入流程名称"
        :searchList="[]"
        @search="handleSearch"
      />
    </div>
    <div class="p-2">
      <a-tabs v-model:activeKey="activeKey" size="small">
        <a-tab-pane key="1" :tab="`待办列表 ( ${totalNumObj.num} )`" force-render>
          <ApprovalTable
            activeKey="1"
            :columns="waitColumns"
            :isRefresh="isRefresh"
            :searchParams="searchParams"
            @change="handleChange"
          />
        </a-tab-pane>
        <a-tab-pane key="2" tab="已办列表">
          <ApprovalTable
            activeKey="2"
            :columns="doneColumns"
            :isRefresh="isRefresh"
            :searchParams="searchParams"
            @change="handleChange"
          />
        </a-tab-pane>
        <a-tab-pane key="3" tab="办结列表">
          <ApprovalTable
            activeKey="3"
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
  import ApprovalTable from './module/ApprovalTable.vue';
  import { searchArr } from './config/index';
  import { waitColumns, saveColumns, doneColumns, endColumns } from './config/index';

  export default defineComponent({
    name: 'OpApprovalList',
    components: {
      PageWrapper,
      SearchWrap,
      ApprovalTable,
      ATabs: Tabs,
      ATabPane: TabPane,
    },
    setup() {
      const activeKey = ref('1');
      const isRefresh = ref(false);
      const searchParams = reactive({
        contentLike: undefined,
        yearsQueryIn: undefined,
        surTypeQueryIn: undefined,
      });

      const handleChange = () => {
        isRefresh.value = !isRefresh.value;
      };

      const handleSearch = (inputvalue, searchList) => {
        searchParams.contentLike = inputvalue;
        if (searchList.length > 0) {
          searchList.forEach((item) => {
            searchParams[item.field] = item.value;
          });
        }
      };
      provide('searchParams', searchParams);

      const totalNumObj = reactive({ num: 0 });
      provide('tableTotalNum', totalNumObj);

      return {
        activeKey,
        searchArr,
        isRefresh,
        doneColumns,
        saveColumns,
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
