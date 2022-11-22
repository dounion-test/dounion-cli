<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #form-custom>
        <a-form-item-rest>
          <SearchWrap
            style="width: 550px"
            placeholder="请输入文献名称"
            :searchList="searchArr"
            @search="handleSearch"
          />
        </a-form-item-rest>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { searchArr, columns, getFormConfig } from './config/index';
  import { useRouter } from 'vue-router';
  import { Form } from 'ant-design-vue';
  import { infoDocList } from '/@/api/doInfo/index';

  export default defineComponent({
    components: {
      PageWrapper,
      SearchWrap,
      BasicTable,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const router = useRouter();
      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        api: infoDocList,
        rowKey: 'id',
        columns,
        formConfig: getFormConfig(),
        useSearchForm: true,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
        customRow: (record) => {
          return {
            onDblclick: () => goView(record),
          };
        },
      });
      const searchInfo = reactive({});
      const handleSearch = () => {};
      const handleCreate = () => {
        router.push('/doSp/docInfo/add');
      };
      const goView = () => {};
      return {
        searchArr,
        searchInfo,
        handleSearch,
        registerTable,
        handleCreate,
      };
    },
  });
</script>
