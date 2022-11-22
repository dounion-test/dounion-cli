<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-08 15:59:22
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-11-07 14:45:07
 * @FilePath: /rural-revitalization/src/views/doExpert/expert/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper title="专家库" contentClass="flex" contentFullHeight class="page-title-line">
    <template #headerLeft>
      <span class="total-text"
        >（已有<em>{{ statisticsCount.checkedInCount }}</em
        >位专家入驻专家库，<em>{{ statisticsCount.checkPendingCount }}</em
        >位待审核）</span
      >
    </template>
    <template #headerContent>
      <div class="flex">
        <SearchWrap placeholder="请输入姓名" :searchList="searchArr" @search="handleSearch" />
        <Authority value="SpPersonBatchimport">
          <a-button @click="hanldeImport" class="ml-4 mr-2" type="primary"
            ><Icon icon="ant-design:download-outlined" />导入</a-button
          ></Authority
        >
        <Authority value="SpPersonAdd">
          <a-button @click="handleAdd" type="primary"
            ><Icon icon="ant-design:plus-outlined" />新增专家</a-button
          >
        </Authority>
      </div>
    </template>
    <div style="width: 100%">
      <a-row :span="24" :gutter="[16, 16]" class="main-con-wrap">
        <a-col :span="17">
          <div class="bg-white list-wrap">
            <div class="flex justify-between hd"
              ><h2>专家列表</h2>
              <a-radio-group @change="change" v-model:value="activeKey">
                <a-radio-button :value="1">
                  <Icon icon="ant-design:table-outlined" />
                </a-radio-button>
                <a-radio-button :value="2">
                  <Icon icon="ant-design:unordered-list-outlined" />
                </a-radio-button>
              </a-radio-group>
            </div>
            <div class="relative">
              <ExpertCardList
                @refresh="handleRefresh"
                @change="handleChange"
                :tableData="tableData"
                :btnActiveKey="activeKey"
                :status="searchParams.status"
                :statisticsCount="curCount"
                :class="{ positionAbsolute: activeKey == 2 }"
              />
              <ExpertBasicList
                @refresh="handleRefresh"
                @change="handleChange"
                :tableData="tableData"
                :btnActiveKey="activeKey"
                :status="searchParams.status"
                :statisticsCount="curCount"
                :class="{ positionAbsolute: activeKey == 1 }"
              />
            </div>

            <div class="mt-8 text-right">
              <a-pagination
                v-if="!!total"
                @change="handlePageChange"
                v-model:current="pageNo"
                v-model:page-size="pageSize"
                :total="total"
                size="small"
                show-quick-jumper
                :show-total="(total) => `共 ${total} 条数据`"
              />
            </div>
          </div>
        </a-col>
        <a-col :span="7">
          <RightCharts />
        </a-col>
      </a-row>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue';
  import { Radio, Pagination, Row, Col } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Icon } from '/@/components/Icon';
  import { Authority } from '/@/components/Authority';
  import RightCharts from './module/RightCharts.vue';
  import ExpertBasicList from './module/ExpertBasicList.vue';
  import ExpertCardList from './module/ExpertCardList.vue';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { getSpPersonListApi, spPersonStatisticsCountApi } from '/@/api/doSp/person';
  import { useRouter } from 'vue-router';
  import { searchArr } from './config/index';
  import { useLoading } from '/@/components/Loading';

  type ICountObj = {
    [propName: string]: number;
  };

  export default defineComponent({
    name: 'SpPersonList',
    components: {
      Icon,
      Authority,
      PageWrapper,
      SearchWrap,
      RightCharts,
      ExpertBasicList,
      ExpertCardList,
      ARadioButton: Radio.Button,
      ARadioGroup: Radio.Group,
      APagination: Pagination,
      ARow: Row,
      ACol: Col,
    },
    setup() {
      const activeKey = ref(1);
      const router = useRouter();
      const tableData = ref([]);
      const statisticsCount: any = ref({});
      const curCount = ref<ICountObj>({});
      const [openFullLoading, closeFullLoading] = useLoading({});
      const state = reactive({
        pageNo: 1,
        pageSize: 12,
        total: 0,
        searchParams: {
          status: '52002-10',
          markIdQueryIn: undefined,
          nameQueryLike: undefined,
          sex: undefined,
          political: undefined,
          isWork: undefined,
          jobTitleId: undefined,
          detailAddressQueryLike: undefined,
          companyNameQueryLike: undefined,
        },
      });

      const change = () => {
        activeKey.value;
      };

      // 数量统计
      const spPersonStatisticsCount = async (init, params = {}) => {
        let res = await spPersonStatisticsCountApi(params);
        if (init) {
          statisticsCount.value = res;
        }
        curCount.value = res;
      };
      spPersonStatisticsCount(true);

      // 获取列表
      const getSpPersonList = async () => {
        openFullLoading();
        let params: any = {
          pageNo: state.pageNo,
          pageSize: state.pageSize,
          ...state.searchParams,
        };
        let res = await getSpPersonListApi(params);
        tableData.value = res.list;
        state.total = res.total;
        closeFullLoading();
      };
      getSpPersonList();

      // 翻页
      const handlePageChange = () => {
        getSpPersonList();
      };

      // 切换全部/已移除
      const handleChange = (key) => {
        state.searchParams.status = key;
        state.pageNo = 1;
        getSpPersonList();
      };

      // 新增
      const handleAdd = () => {
        router.push({ name: 'SpPersonAdd', params: { type: 'add' } });
      };

      // 刷新
      const handleRefresh = () => {
        getSpPersonList();
        spPersonStatisticsCount(true);
      };

      // 批量导入
      const hanldeImport = () => {
        router.push({ name: 'SpPersonBatchimport' });
      };

      // 搜索
      const handleSearch = (inputvalue, searchList) => {
        if (searchList.length) {
          searchList.forEach((item) => {
            state.searchParams[item.field] = item.value;
          });
        }
        if (inputvalue) {
          state.searchParams.nameQueryLike = inputvalue;
        }
        state.pageNo = 1;
        spPersonStatisticsCount(false, state.searchParams);
        getSpPersonList();
      };

      return {
        ...toRefs(state),
        statisticsCount,
        curCount,
        tableData,
        activeKey,
        searchArr,
        handleAdd,
        handleChange,
        handlePageChange,
        handleRefresh,
        handleSearch,
        change,
        hanldeImport,
      };
    },
  });
</script>

<style lang="less" scoped>
  .list-wrap {
    min-height: 100%;
    padding: 16px;

    .hd {
      padding-bottom: 10px;
    }

    h2 {
      font-size: @font-size-b2;
      font-weight: 700;
    }

    .ant-radio-button-wrapper {
      padding: 0 5px;
      border: 0 none;
    }

    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before {
      background: none;
    }
  }

  :deep(.ant-form-item-control-input-content) {
    text-align: left;
    margin-left: 8px;
  }

  .SearchWrap-btn {
    position: absolute;
    right: 0;
    top: -55px;
  }

  .main-con-wrap {
    min-height: 100%;
  }

  .positionAbsolute {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
</style>
