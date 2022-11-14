<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-25 11:40:39
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-07 13:52:44
 * @FilePath: /rural-revitalization/src/views/doUcenter/logManager/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" :searchInfo="searchParams" class="!p-0">
      <template #form-custom>
        <a-form-item-rest>
          <SearchWrap placeholder="请输入账号" :searchList="searchArr" @search="handleSearch" />
          <!-- :hasCondition="false" -->
        </a-form-item-rest>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns, getFormConfig, searchArr } from './config/index';
  import { getUcenterLogListApi } from '/@/api/testDemo/logManager';

  export default defineComponent({
    components: {
      PageWrapper,
      SearchWrap,
      BasicTable,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const searchParams = reactive({
        accountQueryLike: undefined,
        timeQueryGe: undefined,
        timeQueryLe: undefined,
      });
      /**
       * table 列表
       */
      const [registerTable, { reload, setLoading }] = useTable({
        api: getUcenterLogListApi,
        rowKey: 'id',
        columns,
        formConfig: getFormConfig(),
        useSearchForm: true,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
      });

      /**
       * 搜索
       */
      const handleSearch = (inputvalue, searchList) => {
        searchParams.accountQueryLike = inputvalue;
        if (searchList.length > 0) {
          searchList.forEach((item) => {
            if (item.type == 'rangePicker') {
              searchParams.timeQueryGe = item.value ? item.value[0] : undefined;
              searchParams.timeQueryLe = item.value ? item.value[1] : undefined;
            } else {
              searchParams[item.field] = item.value;
            }
          });
        }
        setLoading(true);
        reload();
      };
      return {
        searchArr,
        searchParams,
        registerTable,
        handleSearch,
      };
    },
  });
</script>

<style scoped></style>
