<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-24 09:37:03
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 18:10:35
 * @FilePath: /rural-revitalization/src/views/doUcenter/systemCode/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" class="!p-0" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns } from './config/index';
  import { domesOaFlowDefineListApi } from '/@/api/testDemo/processDefine';

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
        api: domesOaFlowDefineListApi,
        rowKey: 'id',
        columns,
        useSearchForm: false,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
      });

      return {
        registerTable,
      };
    },
  });
</script>
