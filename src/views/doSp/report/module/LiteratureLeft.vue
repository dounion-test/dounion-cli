<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-16 09:58:15
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-17 15:45:31
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
  import { LiteratureLeftColumns } from '../config';
  import { infoDocReportApi } from '/@/api/doSp/report';

  export default defineComponent({
    components: {
      BasicTable,
      ADatePicker: DatePicker,
    },
    setup() {
      const selectValue = ref(dayjs());
      const list: any = ref([]);
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const [registerTable, { setTableData }] = useTable({
        rowKey: 'id',
        columns: LiteratureLeftColumns,
        immediate: false,
        useSearchForm: false,
        canResize: false,
        showTableSetting: false,
        showIndexColumn: true,
        bordered: true,
        pagination: false,
      });

      const getInfoDocReport = async () => {
        list.value = await infoDocReportApi({ year: dayjs(selectValue.value).format('YYYY') });
        list.value.forEach((item) => {
          item.name = item.docType;
          item.value = item.amount;
        });
        setTableData(list.value);
      };

      const handleChange = async () => {
        await getInfoDocReport();
        await toSetOptions();
      };

      const toSetOptions = () => {
        setOptions({
          title: [
            {
              text: '文献类型统计',
              top: '0',
              left: '40%',
            },
          ],
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              name: '文献类型统计',
              type: 'pie',
              width: '100%',
              radius: ['30%', '60%'],
              center: ['50%', '50%'],
              data: list.value,
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
      };

      onMounted(async () => {
        await getInfoDocReport();
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
