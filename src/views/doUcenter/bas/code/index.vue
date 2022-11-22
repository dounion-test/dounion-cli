<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-24 09:37:03
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-07 13:51:38
 * @FilePath: /rural-revitalization/src/views/doUcenter/systemCode/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" :searchInfo="searchParams" class="!p-0">
      <template #form-custom>
        <a-form-item-rest>
          <SearchWrap
            placeholder="请输入名称或代码"
            :searchList="searchArr"
            @search="handleSearch"
          />
        </a-form-item-rest>
      </template>
      <template #isSys="{ record }">
        <div>{{ record.isSys ? '系统' : '用户' }}</div>
      </template>
      <!-- <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template> -->
      <!-- <template #action="{ record }">
        <TableAction
          @click.stop
          :actions="[
            {
              icon: 'eva:edit-2-outline',
              tooltip: '修改',
              disabled: record.isSys ? true : false,
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'fluent:delete-28-regular',
              color: 'error',
              tooltip: '删除',
              disabled: record.isSys ? true : false,
              popConfirm: {
                title: '是否确认删除',
                placement: 'bottomRight',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template> -->
    </BasicTable>
    <SysCodeModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { SearchWrap } from '/@/components/SearchWrap';
  import SysCodeModal from './module/SysCodeModal.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, getFormConfig, searchArr } from './config/index';
  import { getUcenterCodeListApi, getUcenterCodeDeleteApi } from '/@/api/testDemo/sysCode';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'SystemCode',
    components: {
      PageWrapper,
      SearchWrap,
      BasicTable,
      TableAction,
      SysCodeModal,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const router = useRouter();
      const [registerModal, { openModal }] = useModal();
      const { createMessage } = useMessage();
      const searchParams = reactive({
        codeOrNameQueryLike: undefined,
        codeQueryLike: undefined,
        nameQueryLike: undefined,
        snameQueryLike: undefined,
        isSys: undefined,
      });
      /**
       * table 列表
       */
      const [registerTable, { reload, setLoading }] = useTable({
        api: getUcenterCodeListApi,
        rowKey: 'id',
        columns,
        formConfig: getFormConfig(),
        useSearchForm: true,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
        // actionColumn: {
        //   width: 100,
        //   title: '操作',
        //   dataIndex: 'action',
        //   slots: { customRender: 'action' },
        // },
        customRow: (record) => {
          return {
            onClick: () => {
              router.push({ name: 'UcenterCodeView', params: { id: record.value } });
            },
          };
        },
      });

      // 新增
      const handleCreate = () => {
        openModal(true, { isUpdate: false });
      };

      // 编辑
      const handleEdit = (record) => {
        openModal(true, { isUpdate: true, record });
      };

      // 删除
      const handleDelete = async (record) => {
        await getUcenterCodeDeleteApi({ values: record.value });
        createMessage.success('操作成功');
        setLoading(true);
        reload();
      };

      // 添加/编辑
      const handleSuccess = () => {
        setLoading(true);
        reload();
      };

      // 搜索
      const handleSearch = (inputvalue, searchList) => {
        searchParams.codeOrNameQueryLike = inputvalue;
        if (searchList.length) {
          searchList.forEach((item) => {
            searchParams[item.field] = item.value;
          });
        }
        setLoading(true);
        reload();
      };

      return {
        searchArr,
        searchParams,
        registerModal,
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSearch,
      };
    },
  });
</script>

<style lang="less" scoped>
  :deep(.systemCode-name) {
    cursor: pointer;
    color: @primary-color;
    font-size: @font-size-b2;
  }
</style>
