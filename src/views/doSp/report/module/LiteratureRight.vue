<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-16 09:58:15
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-18 15:15:17
 * @FilePath: /rural-revitalization/src/views/doSp/report/module/LiteratureLeft.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="LiteratureLeft">
    <a-date-picker
      valueFormat="YYYY"
      :allowClear="false"
      v-model:value="selectValue"
      style="width: 120px"
      @change="handleChange"
      picker="year"
    />
    <div ref="chartRef" style="height: 400px"></div>
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, onMounted } from 'vue';
  import { DatePicker } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import dayjs from 'dayjs';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { LiteratureRightColumns } from '../config';
  import { infoDocLevelReportApi } from '/@/api/doSp/report';

  export default defineComponent({
    components: {
      BasicTable,
      ADatePicker: DatePicker,
    },
    setup() {
      const selectValue = ref(dayjs());
      const list: any = ref([]);
      const tableData: any = ref([]);
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const [registerTable, { setTableData }] = useTable({
        rowKey: 'id',
        columns: LiteratureRightColumns,
        immediate: false,
        useSearchForm: false,
        canResize: false,
        showTableSetting: false,
        showIndexColumn: true,
        bordered: true,
        pagination: false,
      });

      const getInfoDocLevelReport = async () => {
        list.value = await infoDocLevelReportApi({ year: dayjs(selectValue.value).format('YYYY') });
        let tableDatas: any = [];
        list.value.forEach((item) => {
          item.children.forEach((it) => {
            tableDatas.push(it);
          });
        });
        tableData.value = tableDatas;
        setTableData(tableDatas);
      };

      const handleChange = async () => {
        await getInfoDocLevelReport();
        await toSetOptions();
      };

      const toSetOptions = async () => {
        let dataObj = await filterData();
        await setOptions({
          title: [
            {
              text: '文献类型统计',
              top: '0',
              left: '40%',
            },
          ],
          tooltip: {
            show: true,
            formatter: (params) => {
              return `${params.seriesName}：${params.value}`;
            },
          },
          xAxis: [
            {
              type: 'category',
              data: dataObj.xData,
            },
          ],
          yAxis: {
            type: 'value',
          },
          series: dataObj.years,
        });
      };

      const filterData = () => {
        let dataObj: any = {
          xData: [],
          years: [],
        };
        list.value.forEach((item, index) => {
          dataObj.xData.push(item.firstLevel);
          item.children.forEach((it) => {
            let arr = new Array(list.value.length).fill(0);
            arr[index] = it.amount;
            dataObj.years.push({
              data: arr,
              type: 'bar',
              name: it.secondLevel,
            });
          });
        });
        return dataObj;
      };

      onMounted(async () => {
        await getInfoDocLevelReport();
        await toSetOptions();
      });

      return {
        chartRef,
        selectValue,
        registerTable,
        handleChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .LiteratureLeft {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    padding: 10px;
  }
  [data-theme='dark'] {
    .LiteratureLeft {
      border-color: #303030;
    }
  }
</style>
