<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-24 09:37:03
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-07 13:54:03
 * @FilePath: /rural-revitalization/src/views/doUcenter/systemCode/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" :searchInfo="searchParams" class="!p-0">
      <template #statusName="{ record }">
        <a-tag :color="statusObj[record.status]">{{ record.statusName }}</a-tag>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns, statusObj } from './config/index';
  import { domesMesOaFlowListApi } from '/@/api/testDemo/case';
  import { Tag } from 'ant-design-vue';

  export default defineComponent({
    name: 'SystemCode',
    components: {
      PageWrapper,
      BasicTable,
      ATag: Tag,
    },
    setup() {
      const searchParams = reactive({});
      /**
       * table 列表
       */
      const [registerTable] = useTable({
        api: domesMesOaFlowListApi,
        rowKey: 'id',
        columns,
        useSearchForm: false,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
      });

      return {
        searchParams,
        registerTable,
        statusObj,
      };
    },
  });
</script>
