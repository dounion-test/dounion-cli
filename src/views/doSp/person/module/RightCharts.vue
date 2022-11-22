<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="24">
      <a-card title="领域分布" class="bg-white module-box">
        <div ref="chartTerritoryRef" class="chart-box" :style="{ width, height }"></div>
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card title="居住地分布" class="bg-white module-box">
        <div ref="chartHabitationRef" class="chart-box" :style="{ width, height }"></div>
      </a-card>
    </a-col>
    <a-col :span="24">
      <a-card title="专家任职单位" class="bg-white module-box">
        <div ref="chartRef" class="chart-box" :style="{ width, height }"></div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
  import { defineComponent, ref, Ref, onMounted } from 'vue';
  import { Card, Row, Col } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { spPersonPieChartApi } from '/@/api/doSp/person';

  export default defineComponent({
    components: {
      ACard: Card,
      ARow: Row,
      ACol: Col,
    },
    props: {
      width: {
        type: String as PropType<string>,
      },
      height: {
        type: String as PropType<string>,
      },
    },
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);
      const chartTerritoryRef = ref<HTMLDivElement | null>(null);
      const chartHabitationRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const { setOptions: territorySetOptions } = useECharts(
        chartTerritoryRef as Ref<HTMLDivElement>,
      );
      const { setOptions: habitationSetOptions } = useECharts(
        chartHabitationRef as Ref<HTMLDivElement>,
      );
      const companyList: any = ref([]);
      const companyYAxis: any = ref([]);
      const marksList = ref([]);
      const provinceList = ref([]);

      const spPersonPieChart = async () => {
        let res = await spPersonPieChartApi();
        res.marksList.forEach((item) => {
          item.name = item.markName;
          item.value = item.count;
        });
        res.provinceList.forEach((item) => {
          item.name = item.homeProvinceName;
          item.value = item.count;
        });
        res.companyList.forEach((item) => {
          companyYAxis.value.push({ value: item.companyName });
          companyList.value.push(item.count);
        });
        marksList.value = res.marksList;
        provinceList.value = res.provinceList;
      };

      onMounted(async () => {
        await spPersonPieChart();
        await setOptions({
          tooltip: {
            trigger: 'item',
            formatter: '{b} ({c}人)',
          },
          grid: {
            left: 100,
            right: 10,
            top: 0,
            bottom: 0,
          },
          xAxis: {
            type: 'value',
            show: false,
            axisLine: {
              show: false,
            },
          },
          yAxis: {
            type: 'category',
            axisLabel: {
              show: true,
              formatter: function (val) {
                //折行显示label
                var strs = val.split(''); // 字符串数组
                var str = '';
                for (var i = 0, s; (s = strs[i++]); ) {
                  str += s;
                  if (!(i % 7)) str += '\n';
                }
                return str;
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              //是否显示刻度
              show: false,
            },
            data: companyYAxis.value,
          },
          series: [
            {
              name: '2011',
              type: 'bar',
              data: companyList.value,
              barMaxWidth: 12,
              color: ['#377BBC'],
              itemStyle: {
                borderRadius: [8, 8, 8, 8],
              },
              label: {
                show: true,
                position: [10, 0],
                color: '#fff',
              },
            },
          ],
        });

        await territorySetOptions({
          tooltip: {
            trigger: 'item',
            formatter: '{b} ({c}人)',
          },
          xAxis: {
            type: 'value',
            show: false,
          },
          series: [
            {
              name: '领域分布',
              type: 'pie',
              radius: ['0', '60%'], // 饼图的大小
              center: ['50%', '50%'], // 饼图的位置
              data: marksList.value,
              color: [
                '#5ab0ff',
                '#94deba',
                '#83a6f5',
                '#ffcd78',
                '#7f8ca5',
                '#fc8251',
                '#5470c6',
                '#91cd77',
                '#ef6567',
                '#f9c956',
                '#75bedc',
              ],
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

        await habitationSetOptions({
          tooltip: {
            trigger: 'item',
            formatter: '{b} ({c}人)',
          },
          xAxis: {
            type: 'value',
            show: false,
          },
          series: [
            {
              name: '领域分布',
              type: 'pie',
              radius: ['30%', '60%'],
              center: ['50%', '50%'],
              data: provinceList.value,
              color: [
                '#80d5d7',
                '#63abff',
                '#2a3cff',
                '#b4e369',
                '#ffcd78',
                '#75bedc',
                '#f9c956',
                '#ef6567',
                '#91cd77',
                '#5470c6',
                '#fc8251',
              ],
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
      return { chartRef, chartTerritoryRef, chartHabitationRef };
    },
  });
</script>

<style lang="less" scoped>
  .module-box {
    :deep(.ant-card-body) {
      padding: 20px 0;
    }

    :deep(.ant-card-head) {
      min-height: auto;
      padding: 0 15px;
    }

    :deep(.ant-card-head-title) {
      padding: 5px 0;
    }
  }

  .chart-box {
    min-height: 150px;
    height: 200px;
  }
</style>
