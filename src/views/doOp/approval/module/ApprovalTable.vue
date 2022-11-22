<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 11:24:45
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 13:56:47
 * @FilePath: /rural-revitalization/src/views/doOp/task/module/TaskTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicTable
    @register="registerTable"
    :fetch-success="getData"
    class="!p-0"
    :searchInfo="searchInfo"
  >
    <template #action="{ record }">
      <TableAction
        @click.stop
        :actions="[
          {
            icon: 'akar-icons:eye',
            label: '查看',
            tooltip: '查看详情',
            auth: 'OpPersonEdit',
            onClick: goView.bind(null, record),
          },
        ]"
      />
    </template>
  </BasicTable>
</template>

<script lang="ts">
  import { defineComponent, watch, reactive, inject } from 'vue';
  import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { domesApprovalListApi } from '/@/api/doOp/approval';

  export default defineComponent({
    components: {
      BasicTable,
      TableAction,
    },
    props: {
      activeKey: String,
      columns: Array,
      isRefresh: Boolean,
      searchParams: Object,
    },
    emits: ['change'],
    setup(props, { emit }) {
      const router = useRouter();
      const searchInfo = reactive({
        approvalQueryType: props.activeKey,
        bizTypes: '52037-20,52037-30,52037-40,52037-50,52037-60,52037-70,52037-80,52037-90',
        contentLike: (props.searchParams as any).contentLike,
        yearsQueryIn: (props.searchParams as any).yearsQueryIn,
        surTypeQueryIn: (props.searchParams as any).surTypeQueryIn,
      });
      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        api: domesApprovalListApi,
        rowKey: 'id',
        columns: props.columns as BasicColumn[],
        immediate: true,
        useSearchForm: false,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: false,
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        customRow: (record) => {
          return {
            onDblclick: () => goView(record),
          };
        },
      });

      const goView = ({ bizId, bizType }) => {
        router.push({ name: 'OpApprovalView', params: { id: bizId }, query: { bizType } });
      };

      // 刷新
      const handleRefresh = () => {
        reload();
      };

      //获取表格total
      const totalNum: any = inject('tableTotalNum');
      const getData = ({ total }) => {
        if (props.activeKey == '1') {
          totalNum.num = total;
        }
      };

      watch(
        () => props.isRefresh,
        () => {
          handleRefresh();
        },
      );

      watch(
        () => props.searchParams,
        (val: any) => {
          searchInfo.contentLike = val.contentLike;
          searchInfo.yearsQueryIn = val.yearsQueryIn;
          searchInfo.surTypeQueryIn = val.surTypeQueryIn;
          reload();
        },
        { deep: true },
      );

      return {
        searchInfo,
        registerTable,
        goView,
        getData,
      };
    },
  });
</script>

<style scoped></style>
