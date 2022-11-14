<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-24 09:37:03
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 17:39:19
 * @FilePath: /rural-revitalization/src/views/doUcenter/systemCode/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" class="!p-0" :searchInfo="searchInfo" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns } from './config/index';
  import { domesApprovalListApi } from '/@/api/doOp/approval';

  export default defineComponent({
    name: 'SystemCode',
    components: {
      PageWrapper,
      BasicTable,
    },
    setup() {
      /**
       * table 列表
       */
      const [registerTable] = useTable({
        api: domesApprovalListApi,
        rowKey: 'id',
        columns,
        useSearchForm: false,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
      });

      const searchInfo = reactive({
        approvalQueryType: '1',
        bizTypes: '52037-20,52037-30,52037-40,52037-50,52037-60,52037-70,52037-80,52037-90',
      });

      return {
        registerTable,
        searchInfo,
      };
    },
  });
</script>
