<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 11:01:25
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-14 17:54:13
 * @FilePath: /rural-revitalization/src/views/doOp/task/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <div class="p-2 op-task-search">
      <SearchWrap placeholder="请输入调研表名" :searchList="[]" @search="handleSearch" />
    </div>
    <div class="p-2">
      <BasicTable @register="registerTable" class="!p-0" :searchInfo="searchParams" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { columns } from './config';

  export default defineComponent({
    components: {
      BasicTable,
      PageWrapper,
      SearchWrap,
    },
    setup() {
      const searchParams = reactive({
        surNameQueryLike: undefined,
        yearsQueryIn: undefined,
        surTypeQueryIn: undefined,
      });

      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        // api: domesOpTaskListApi,
        rowKey: 'id',
        columns,
        immediate: false,
        useSearchForm: false,
        canResize: false,
        showTableSetting: false,
        showIndexColumn: true,
        bordered: false,
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      const handleSearch = (inputvalue, searchList) => {
        searchParams.surNameQueryLike = inputvalue;
        if (searchList.length > 0) {
          searchList.forEach((item) => {
            searchParams[item.field] = item.value;
          });
        }
      };

      return {
        registerTable,
        searchParams,
        handleSearch,
      };
    },
  });
</script>

<style lang="less" scoped>
  .op-task-search {
    border-bottom: 16px solid #f0f2f5;
  }
</style>
