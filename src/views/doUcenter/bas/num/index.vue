<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-25 11:40:39
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-07 13:53:14
 * @FilePath: /rural-revitalization/src/views/doUcenter/logManager/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" class="!p-0">
      <template #prefixRule2="{ record }">
        <div>
          <span v-if="record.prefixRule2 == '{YYYY}{NO}'">年-YYYY</span>
          <span v-if="record.prefixRule2 == '{YY}{MM}{NO}'">年月-YYMM</span>
          <span v-if="record.prefixRule2 == '{YYYY}{MM}{NO}'">年月-YYYYMM</span>
          <span v-if="record.prefixRule2 == '{YYYY}{MM}{DD}{NO}'">年月日-YYYYMMDD</span>
          <span v-if="record.prefixRule2 == '{YY}{MM}{DD}{NO}'">年月日-YYMMDD</span>
        </div>
      </template>
      <!-- <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          @click.stop
          :actions="[
            {
              icon: 'eva:edit-2-outline',
              tooltip: '修改',
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
    <NoListModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import NoListModal from './module/NoListModal.vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns } from './config/index';
  import { getDosysSysNoRuleListApi, getDosysSysNoRuleDeleteApi } from '/@/api/doSys/sysNoRule';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
      NoListModal,
      TableAction,
    },
    setup() {
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      /**
       * table 列表
       */
      const [registerTable, { reload, setLoading }] = useTable({
        api: getDosysSysNoRuleListApi,
        rowKey: 'id',
        columns,
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
        await getDosysSysNoRuleDeleteApi({ idQueryIn: record.id });
        createMessage.success('操作成功');
        setLoading(true);
        reload();
      };

      // 添加/编辑回调
      const handleSuccess = () => {
        setLoading(true);
        reload();
      };

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>

<style scoped></style>
