<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-10 17:12:22
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-17 17:58:43
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/module/ActivityItemTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns } from '../config/index';

  export default defineComponent({
    components: {
      BasicTable,
    },
    props: {
      planList: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const [registerTable, { setTableData }] = useTable({
        rowKey: 'id',
        columns,
        size: 'small',
        striped: false,
        bordered: true,
        immediate: false,
        pagination: false,
        showIndexColumn: false,
        maxHeight: 124,
      });

      onMounted(() => {
        let tableData: any = [];
        props.planList.forEach((item: any) => {
          item.planDetailList.forEach((it: any, ind) => {
            tableData.push({
              id: `planList${ind}`,
              date: item.actDate,
              time: it.actStime,
              content: it.content,
              count: item.planDetailList.length,
              isFirst: ind === 0 ? true : false,
            });
          });
        });
        setTableData(tableData);
      });
      return {
        registerTable,
      };
    },
  });
</script>

<style lang="less" scoped>
  :deep(.ant-table-tbody) {
    td {
      white-space: break-spaces;
      overflow: hidden;
      // padding: 2px !important;
    }
  }

  :deep(.ant-table-body) {
    height: auto !important;
    overflow: auto !important;
  }

  :deep(.ant-empty-normal) {
    margin: 0;
    p {
      margin: 0;
    }
  }

  :deep(.ant-table.ant-table-small .ant-table-thead > tr > th) {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  :deep(.ant-table-empty .ant-table-body) {
    overflow: hidden !important;
  }
</style>
