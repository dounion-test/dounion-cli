<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-16 09:58:15
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-18 09:27:50
 * @FilePath: /rural-revitalization/src/views/doSp/report/module/LiteratureLeft.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="LiteratureLeft">
    <a-range-picker
      v-model:value="selectValue"
      style="width: 200px"
      :allowClear="false"
      picker="year"
      valueFormat="YYYY"
      @change="handleChange"
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
  import { infoDocDocIncrementApi } from '/@/api/doSp/report';
  import { getYearBetween } from '/@/utils/dateUtil';

  export default defineComponent({
    components: {
      BasicTable,
      ARangePicker: DatePicker.RangePicker,
    },
    setup() {
      const list = ref([]);
      const headerList = ref([]);
      const selectValue = ref([dayjs().add(-2, 'year'), dayjs()]);
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const [registerTable, { setColumns, setTableData }] = useTable({
        rowKey: 'id',
        immediate: false,
        useSearchForm: false,
        canResize: false,
        showTableSetting: false,
        showIndexColumn: false,
        bordered: true,
        pagination: false,
      });

      const getInfoDocDocIncrement = async () => {
        let years = await getYearBetween(
          dayjs(selectValue.value[0]).format('YYYY'),
          dayjs(selectValue.value[1]).format('YYYY'),
        );
        let res = await infoDocDocIncrementApi({ years: years.join(',') });
        let columns: any = [];
        headerList.value = res.headerList;
        res.headerList.forEach((item) => {
          columns.push({
            title: item.colValue,
            dataIndex: item.colKey,
          });
        });
        list.value = res.infoList;
        await setColumns(columns);
        await setTableData(list.value);
      };

      const toSetOptions = async () => {
        let dataObj = await filterData();
        await setOptions({
          title: [
            {
              text: '文献量统计',
              top: '0',
              left: '40%',
            },
          ],
          tooltip: {},
          xAxis: {
            type: 'category',
            data: dataObj.xData,
          },
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
        headerList.value.forEach((item: any) => {
          let data: any = [];
          list.value.forEach((it: any) => {
            data.push(it[item.colKey]);
          });
          if (item.colKey == 'docType') {
            dataObj.xData = data;
          } else {
            dataObj.years.push({ data, type: 'bar', name: item.colKey });
          }
        });
        return dataObj;
      };

      const handleChange = async () => {
        await getInfoDocDocIncrement();
        await toSetOptions();
      };

      onMounted(async () => {
        await getInfoDocDocIncrement();
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
</style>
