<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-16 09:58:15
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-16 13:15:17
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
  import { LiteratureRightColumns } from '../config';

  export default defineComponent({
    components: {
      BasicTable,
      ARangePicker: DatePicker.RangePicker,
    },
    setup() {
      const selectValue = ref(dayjs());
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const [registerTable, { reload }] = useTable({
        rowKey: 'id',
        columns: LiteratureRightColumns,
        immediate: false,
        useSearchForm: false,
        canResize: false,
        showTableSetting: false,
        showIndexColumn: true,
        bordered: true,
      });

      const handleChange = () => {};

      onMounted(() => {
        setOptions({
          title: [
            {
              text: '文献类型统计',
              top: '0',
              left: '40%',
            },
          ],
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['前沿动态', '科研态势', '经典案例', '专家机构'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [120, 200, 150, 80],
              type: 'bar',
            },
            {
              data: [12, 100, 50, 120],
              type: 'bar',
            },
            {
              data: [40, 30, 150, 60],
              type: 'bar',
            },
            {
              data: [120, 210, 150, 80],
              type: 'bar',
            },
          ],
        });
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
