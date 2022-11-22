<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-24 09:37:03
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-31 09:25:37
 * @FilePath: /rural-revitalization/src/views/doUcenter/systemCode/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <BasicTable @register="registerTable" class="!p-0" :searchInfo="searchInfo">
      <!-- <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
        <a-button type="primary" @click="handleRefresh"> 更新缓存 </a-button>
      </template> -->
      <!-- <template #action="{ record }">
        <TableAction
          @click.stop
          :actions="[
            {
              icon: 'eva:edit-2-outline',
              tooltip: '修改',
              onClick: handleEdit.bind(null, record),
            },
          ]"
        />
      </template> -->
    </BasicTable>
    <SysParameterModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import SysParameterModal from './SysParameterModal.vue';
  import { columns } from '../config/index';
  import { dosysSysParameterListApi, dosysSysParameterRefreshApi } from '/@/api/doSys/sysParameter';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'SystemCode',
    components: {
      BasicTable,
      TableAction,
      SysParameterModal,
    },
    props: {
      orgId: Number,
    },
    setup(props) {
      const searchInfo = reactive<Recordable>({
        orgId: props.orgId,
      });
      const { createMessage } = useMessage();
      const [registerModal, { openModal }] = useModal();
      /**
       * table 列表
       */
      const [registerTable, { reload, setLoading }] = useTable({
        api: dosysSysParameterListApi,
        rowKey: 'id',
        columns,
        immediate: false,
        useSearchForm: false,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: false,
        bordered: true,
        // actionColumn: {
        //   width: 100,
        //   title: '操作',
        //   dataIndex: 'action',
        //   slots: { customRender: 'action' },
        // },
      });

      // 新增
      const handleCreate = (record) => {
        if (!props.orgId) {
          createMessage.warning('请先选择部门');
          return false;
        }
        openModal(true, { isUpdate: false, record: { orgId: props.orgId, setType: 1 } });
      };

      // 编辑
      const handleEdit = (record) => {
        openModal(true, { isUpdate: true, record });
      };

      // 更新缓存
      const handleRefresh = async () => {
        if (!props.orgId) {
          createMessage.warning('请先选择部门');
          return false;
        }
        await dosysSysParameterRefreshApi({ orgId: props.orgId, setType: 1 });
        createMessage.success('操作成功');
        handleSuccess();
      };

      // 删除
      const handleDelete = async (record) => {};

      const handleSuccess = () => {
        setLoading(true);
        reload();
      };

      watch(
        () => props.orgId,
        (val) => {
          searchInfo.orgId = val;
          reload();
        },
        { immediate: true },
      );

      return {
        searchInfo,
        registerModal,
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleRefresh,
      };
    },
  });
</script>

<style scoped></style>
