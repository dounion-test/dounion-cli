<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-11 17:47:56
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 17:57:20
 * @FilePath: /rural-revitalization/src/views/expstore/activity/report/module/ReportCharts.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div ref="chartRef" style="height: 600px"></div>
</template>
<script lang="ts">
  import { defineComponent, ref, Ref, watch, nextTick } from 'vue';

  import { useECharts } from '/@/hooks/web/useECharts';

  export default defineComponent({
    props: {
      pieData: {
        type: Array,
        default: () => [],
      },
      tableData: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      watch(
        () => props.pieData,
        () => {
          let pieData: any = [];
          let tableData: any = [];
          let tableDataXAxis: any = [];
          props.pieData.forEach((item: any) => {
            pieData.push({
              name: item.categoryTypeName,
              value: item.percent,
            });
          });
          props.tableData.forEach((item: any) => {
            tableData.push(item.totalCount);
            tableDataXAxis.push(item.date);
          });
          nextTick(() => {
            setOptions({
              title: [
                {
                  text: '活动次数',
                  top: '0',
                  left: '40%',
                },
                {
                  text: '活动统计',
                  top: '52%',
                  left: '40%',
                },
              ],
              tooltip: {
                trigger: 'item',
              },
              xAxis: {
                type: 'category',
                axisLabel: {
                  rotate: 60,
                },
                data: tableDataXAxis,
              },
              grid: [{ left: '0', top: '8%', width: '90%', height: '40%', containLabel: true }],
              yAxis: {
                type: 'value',
              },
              series: [
                {
                  name: '活动次数',
                  type: 'bar',
                  data: tableData,
                },
                {
                  name: '活动统计',
                  type: 'pie',
                  width: '100%',
                  radius: '28%',
                  center: ['50%', '75%'],
                  data: pieData,
                  label: {
                    formatter: '{b}: {d}%',
                  },
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                  },
                },
              ],
            });
          });
        },
      );

      return { chartRef };
    },
  });
</script>
