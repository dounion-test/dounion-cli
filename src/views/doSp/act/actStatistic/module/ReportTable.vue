<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-10 17:12:22
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-07 15:57:10
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/module/ActivityItemTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="ts">
  import { defineComponent, nextTick, watch } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';

  export default defineComponent({
    components: {
      BasicTable,
    },
    props: {
      columns: {
        type: Array,
        default: () => [],
      },
      tableData: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const [registerTable, { setTableData, setColumns }] = useTable({
        rowKey: 'id',
        columns: [],
        size: 'small',
        inset: true,
        canResize: false,
        striped: false,
        bordered: true,
        immediate: false,
        pagination: false,
        showIndexColumn: false,
        isCanResizeParent: true,
      });

      watch(
        () => props.tableData,
        () => {
          nextTick(() => {
            setColumns(props.columns as BasicColumn[]);
            setTableData(props.tableData);
          });
        },
      );

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
      // padding: 4px !important;
    }
  }
</style>
