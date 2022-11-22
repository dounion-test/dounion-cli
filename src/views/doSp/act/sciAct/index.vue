<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-12 17:29:25
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-12 17:03:25
 * @FilePath: /rural-revitalization/src/views/doSp/act/sciAct/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper
    title="乡研活动"
    contentClass="bg-white p-4"
    contentFullHeight
    contentBackground
    class="page-title-line"
  >
    <template #headerLeft>
      <span class="total-text"
        >（{{ statisticsCount.year }}年已成功举办<em>{{ statisticsCount.completeCount }}</em
        >次活动）</span
      >
    </template>
    <template #headerContent>
      <div class="flex">
        <SearchWrap placeholder="请输入活动名称" :searchList="searchArr" @search="handleSearch" />
        <Authority value="SpSciActAdd">
          <a-button class="ml-4" @click="handleAdd" type="primary"
            ><Icon icon="ant-design:plus-outlined" />新增活动</a-button
          ></Authority
        >
      </div>
    </template>
    <div v-for="(item, index) in tableData" :key="index">
      <a-typography-title :level="4">{{ item.date }}</a-typography-title>
      <ul class="activity-list">
        <li v-for="(it, ind) in item.actList" :key="ind">
          <ActivityListItem @refresh="handleRefresh" :record="it" />
        </li>
      </ul>
    </div>
    <a-empty :image="simpleImage" v-if="tableData.length == 0" />
    <div class="text-right" v-if="total">
      <a-pagination
        @change="handlePageChange"
        v-model:current="pageNo"
        v-model:page-size="pageSize"
        :total="total"
        size="small"
        show-quick-jumper
        :show-total="(total) => `共 ${total} 条数据`"
      />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, provide } from 'vue';
  import { Typography, Pagination, Empty } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { Authority } from '/@/components/Authority';
  import { PageWrapper } from '/@/components/Page';
  import { SearchWrap } from '/@/components/SearchWrap';
  import ActivityListItem from './module/ActivityListItem.vue';
  import { useRouter } from 'vue-router';
  import { getSpSciActListApi, spSciActStatisticsCountApi } from '/@/api/doSp/act/sciAct';
  import { searchArr } from './config/index';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useLoading } from '/@/components/Loading';

  export default defineComponent({
    name: 'SpSciActList',
    components: {
      Icon,
      Authority,
      PageWrapper,
      SearchWrap,
      ActivityListItem,
      AEmpty: Empty,
      APagination: Pagination,
      ATypographyTitle: Typography.Title,
    },
    setup() {
      const { setAppointTitle } = useTabs();
      const tableData: any = ref([]);
      const router = useRouter();
      const statisticsCount: any = ref({});
      const [openFullLoading, closeFullLoading] = useLoading({});
      const state = reactive({
        pageNo: 1,
        pageSize: 10,
        total: 0,
        searchParams: {
          nameQueryLike: undefined,
          categoryType: undefined,
          startDateQueryGe: undefined,
          endDateQueryLe: undefined,
          statusQueryIn: undefined,
        },
      });

      // 数量统计
      const spSciActStatisticsCount = async () => {
        let res = await spSciActStatisticsCountApi();
        statisticsCount.value = res;
      };
      spSciActStatisticsCount();

      // 获取列表
      const getSpSciActList = async () => {
        openFullLoading();
        let params: any = {
          pageNo: state.pageNo,
          pageSize: state.pageSize,
          ...state.searchParams,
        };
        let res = await getSpSciActListApi(params);
        tableData.value = res.list;
        state.total = res.total;
        closeFullLoading();
      };
      getSpSciActList();

      // 新增
      const handleAdd = async () => {
        await router.push({ name: 'SpSciActAdd', params: { type: 'add' } });
        // await setAppointTitle('新增-123', 'SpSciActAdd');
      };

      // 翻页
      const handlePageChange = () => {
        getSpSciActList();
      };

      // 刷新
      const handleRefresh = () => {
        getSpSciActList();
      };

      // 搜索
      const handleSearch = (inputvalue, searchList) => {
        if (searchList.length) {
          searchList.forEach((item) => {
            if (item.type == 'rangePicker') {
              state.searchParams.startDateQueryGe = item.value ? item.value[0] : undefined;
              state.searchParams.endDateQueryLe = item.value ? item.value[1] : undefined;
            } else {
              state.searchParams[item.field] = item.value;
            }
          });
        }
        if (inputvalue) {
          state.searchParams.nameQueryLike = inputvalue;
        }
        state.pageNo = 1;
        getSpSciActList();
      };

      provide('state', state);

      return {
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
        ...toRefs(state),
        statisticsCount,
        tableData,
        searchArr,
        handleAdd,
        handleSearch,
        handlePageChange,
        handleRefresh,
      };
    },
  });
</script>

<style lang="less" scoped>
  .activity-list {
    li {
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;
    }
  }

  .sciAct-search-btn {
    position: absolute;
    right: 0;
    top: -42px;
  }

  [data-theme='dark'] {
    .activity-list {
      li {
        border-bottom-color: #303030;
      }
    }
  }
</style>
