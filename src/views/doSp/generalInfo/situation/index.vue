<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-13 13:55:35
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-20 14:32:03
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/dynamicsJ/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground v-loading="loadingRef">
    <div class="p-2 op-task-search">
      <SearchWrap placeholder="请输入文献名称" :searchList="searchArr" @search="handleSearch" />
    </div>
    <a-tabs class="!px-2 dynamics-tabs" v-model:activeKey="activeKey" @change="handleTabsChange">
      <template v-for="item in secondLevelList" :key="item.secondLevel">
        <a-tab-pane :tab="item.secondLevel">
          <TabsList
            @change="handleChange"
            routerName="GeneralInfoSituationView"
            :list="list"
            :pageNo="pageNo"
            :pageSize="pageSize"
            :total="total"
          />
        </a-tab-pane>
      </template>
    </a-tabs>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { SearchWrap } from '/@/components/SearchWrap';
  import TabsList from '../dynamics/module/TabsList.vue';
  import { domesGeneralInfoDoListApi } from '/@/api/doInfo/synthesize/index';
  import { toRefs } from '@vueuse/shared';
  import { searchArr } from './config';

  export default defineComponent({
    name: 'GeneralInfoSituation',
    components: {
      TabsList,
      PageWrapper,
      SearchWrap,
      ATabs: Tabs,
      ATabPane: TabPane,
    },
    setup() {
      const list = ref([]);
      const loadingRef = ref(false);
      const secondLevelList: any = ref([]);
      const activeKey = ref('全部');
      const searchParams = reactive({
        titleQueryLike: undefined,
      });
      const page = reactive({
        pageSize: 10,
        pageNo: 1,
        total: 0,
      });

      const domesGeneralInfoDoList = async (obj) => {
        loadingRef.value = true;
        let res = await domesGeneralInfoDoListApi(obj);
        page.total = res.total;
        list.value = res.list;
        secondLevelList.value = [{ secondLevel: '全部' }, ...res.secondLevelList];
        loadingRef.value = false;
      };
      domesGeneralInfoDoList({ firstLevel: '科研态势', ...page });

      const handleTabsChange = () => {
        page.pageNo = 1;
        domesGeneralInfoDoList({
          firstLevel: '科研态势',
          secondLevel: activeKey.value != '全部' ? activeKey.value : undefined,
          ...page,
          ...searchParams,
        });
      };

      const handleChange = (num) => {
        page.pageNo = num;
        domesGeneralInfoDoList({
          firstLevel: '科研态势',
          secondLevel: activeKey.value != '全部' ? activeKey.value : undefined,
          ...page,
          ...searchParams,
        });
      };

      const handleSearch = (inputvalue, searchList) => {
        searchParams.titleQueryLike = inputvalue;
        if (searchList.length > 0) {
          searchList.forEach((item) => {
            searchParams[item.field] = item.value;
          });
        }
        handleChange(1);
      };

      return {
        searchArr,
        list,
        loadingRef,
        ...toRefs(page),
        activeKey,
        secondLevelList,
        handleChange,
        handleTabsChange,
        handleSearch,
      };
    },
  });
</script>

<style lang="less" scoped>
  .op-task-search {
    border-bottom: 16px solid #f0f2f5;
  }
  .dynamics-tabs {
    :deep(.ant-tabs-tab) {
      min-width: 80px;
      justify-content: center;
      padding: 10px 15px;
      & + .ant-tabs-tab {
        margin-left: 15px;
      }
    }
  }
</style>
