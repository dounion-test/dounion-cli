<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-10-11 10:01:18
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-11 10:50:40
 * @FilePath: /rural-revitalization/src/views/demo/testTable/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #headerCell="{ column }">
        <div v-if="column.dataIndex == 'topic1'">
          <div>123</div>
          <div class="table-move"></div>
        </div>
        <div v-else-if="column.dataIndex == 'topic2'">
          <div>234</div>
          <div class="table-move"></div>
        </div>
        <div v-else>{{ column.customTitle || column.title }}</div>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';

  export const columns: BasicColumn[] = [
    {
      title: '发件人',
      dataIndex: 'personName',
      align: 'left',
    },
    {
      title: '主题',
      dataIndex: 'topic',
      align: 'left',
    },
    {
      title: '',
      dataIndex: 'writeDateFormat',
      width: 180,
      align: 'left',
      children: [
        {
          title: '主题1',
          dataIndex: 'topic1',
          align: 'left',
          ellipsis: false,
        },
        {
          title: '主题21231',
          dataIndex: 'topic212313',
          align: 'left',
          ellipsis: false,
        },
        {
          title: '',
          dataIndex: 'topic2123',
          align: 'left',
          children: [
            {
              title: '主题2',
              dataIndex: 'topic2',
              align: 'left',
              ellipsis: false,
            },
            {
              title: '大小',
              dataIndex: 'emailSize',
              width: 80,
              align: 'left',
            },
          ],
        },
      ],
    },
  ];

  export default defineComponent({
    components: {
      BasicTable,
    },
    setup() {
      const [registerTable, { reload }] = useTable({
        rowKey: 'id',
        columns,
        useSearchForm: false,
        canResize: false,
        showTableSetting: false,
        showIndexColumn: false,
        bordered: true,
      });
      return {
        registerTable,
      };
    },
  });
</script>

<style lang="less" scoped>
  .table-move {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #fafafa;
  }

  [data-theme='dark'] .table-move {
    background: #1d1d1d;
  }
</style>
