<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-13 13:55:35
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-15 15:16:43
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/dynamicsJ/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <a-tabs class="!px-2 dynamics-tabs" v-model:activeKey="activeKey" @change="handleTabsChange">
      <template v-for="item in secondLevelList" :key="item.secondLevel">
        <a-tab-pane :tab="item.secondLevel">
          <TabsList
            @change="handleChange"
            routerName="StatuteListView"
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
  import TabsList from '../dynamics/module/TabsList.vue';
  import { domesGeneralInfoDoListApi } from '/@/api/doInfo/synthesize/index';
  import { toRefs } from '@vueuse/shared';

  export default defineComponent({
    components: {
      TabsList,
      PageWrapper,
      ATabs: Tabs,
      ATabPane: TabPane,
    },
    setup() {
      const list = ref([]);
      const secondLevelList: any = ref([]);
      const activeKey = ref('全部');
      const page = reactive({
        pageSize: 10,
        pageNo: 1,
        total: 0,
      });

      const domesGeneralInfoDoList = async (obj) => {
        let res = await domesGeneralInfoDoListApi(obj);
        page.total = res.total;
        list.value = res.list;
        secondLevelList.value = [{ secondLevel: '全部' }, ...res.secondLevelList];
      };
      domesGeneralInfoDoList({ firstLevel: '典型案例', ...page });

      const handleTabsChange = () => {
        page.pageNo = 1;
        domesGeneralInfoDoList({
          firstLevel: '典型案例',
          secondLevel: activeKey.value != '全部' ? activeKey.value : undefined,
          ...page,
        });
      };

      const handleChange = (num) => {
        page.pageNo = num;
        domesGeneralInfoDoList({
          firstLevel: '典型案例',
          secondLevel: activeKey.value != '全部' ? activeKey.value : undefined,
          ...page,
        });
      };

      return {
        list,
        ...toRefs(page),
        activeKey,
        secondLevelList,
        handleChange,
        handleTabsChange,
      };
    },
  });
</script>

<style lang="less">
  .dynamics-tabs {
    .ant-tabs-tab {
      width: 100px;
      justify-content: center;
    }
  }
</style>
