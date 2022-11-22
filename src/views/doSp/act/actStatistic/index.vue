<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-10 15:23:24
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-25 11:45:58
 * @FilePath: /rural-revitalization/src/views/expstore/activity/report/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper
    title="活动统计"
    contentFullHeight
    contentBackground
    contentClass="p-4 flex"
    class="page-title-line"
  >
    <div class="w-1/2 mr-8 statistic-table">
      <div class="flex items-center mb-4">
        <a-date-picker
          valueFormat="YYYY"
          :allowClear="false"
          v-model:value="selectValue"
          style="width: 120px"
          @change="handleChange"
          picker="year"
        />

        <div class="text-xl ml-4 font-bold">{{ yearFmt(selectValue) }}年活动统计报表</div>
      </div>
      <ReportTable :tableData="tableData" :columns="tableColumns" />
    </div>
    <div class="w-1/2">
      <ReportCharts :pieData="pieData" :tableData="tableData" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { DatePicker } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import ReportTable from './module/ReportTable.vue';
  import ReportCharts from './module/ReportCharts.vue';
  import { getSpSciActActStatisticApi, getSpSciActPieChartApi } from '/@/api/doSp/act/actStatistic';
  import dayjs from 'dayjs';

  export default defineComponent({
    name: 'SpSciActReport',
    components: {
      PageWrapper,
      ReportTable,
      ReportCharts,
      ADatePicker: DatePicker,
    },
    setup() {
      const selectValue = ref(dayjs());
      const tableData = ref([]);
      const tableColumns = ref([]);
      const pieData = ref([]);
      const curYear = ref(dayjs().format('YYYY'));

      const handleChange = () => {
        getData();
      };
      const yearFmt = (val) => {
        return dayjs(val).format('YYYY');
      };

      const getData = async () => {
        await getSpSciActActStatistic();
        await getSpSciActPieChart();
      };

      const getSpSciActActStatistic = async () => {
        let res = await getSpSciActActStatisticApi({
          year: dayjs(selectValue.value).format('YYYY'),
        });
        res.titleList.forEach((item) => {
          if (item.dataIndex == 'totalCount') {
            item.width = 90;
          } else {
            item.width = 80;
          }
        });
        tableColumns.value = res.titleList;
        tableData.value = res.countList.map((item) => {
          return {
            ...item,
            date: item.date.slice(5),
          };
        });
        console.log(tableData.value, 'tableData.value');
      };

      const getSpSciActPieChart = async () => {
        let res = await getSpSciActPieChartApi({
          year: dayjs(selectValue.value).format('YYYY'),
        });
        pieData.value = res;
      };

      getData();

      return {
        pieData,
        tableData,
        tableColumns,
        selectValue,
        handleChange,
        yearFmt,
      };
    },
  });
</script>

<style lang="less" scoped>
  .statistic-table {
    min-height: 740px;
  }
</style>
