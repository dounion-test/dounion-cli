<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 11:24:45
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-31 13:49:28
 * @FilePath: /rural-revitalization/src/views/doOp/task/module/TaskTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <BasicTable
      @register="registerTable"
      @fetch-success="getData"
      class="!p-0"
      :searchInfo="searchInfo"
    >
      <template #toolbar>
        <Authority value="OpTaskAdd"
          ><a-button v-show="activeKey == '52019-10'" type="primary" @click="handleCreate">
            新增
          </a-button></Authority
        >
      </template>
      <template #countsFillCounts="{ record }">
        {{ record.counts }} / {{ record.fillCounts }}
      </template>
      <template #statusName="{ record }">
        <a-tag :color="statusObj[record.status]">{{ record.statusName }}</a-tag>
      </template>
      <template #action="{ record }">
        <TableAction
          @click.stop
          :actions="[
            {
              icon: 'eva:edit-2-outline',
              tooltip: '编辑',
              label: '编辑',
              auth: 'OpTaskEdit',
              ifShow: activeKey == '52019-10',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'mdi:file-edit-outline',
              tooltip: '试填',
              label: '试填',
              auth: 'OpTaskView',
              ifShow: activeKey == '52019-10',
              onClick: handleTry.bind(null, record),
            },
            {
              icon: 'ant-design:cloud-upload-outlined',
              tooltip: '发布',
              label: '发布',
              auth: 'OpTaskRelease',
              color: 'success',
              ifShow: activeKey == '52019-10',
              popConfirm: {
                title: '是否确认发布',
                placement: 'bottomRight',
                confirm: handleSend.bind(null, record),
              },
            },
            {
              icon: 'ant-design:cloud-upload-outlined',
              tooltip: '正式发布',
              label: '正式发布',
              auth: 'OpTaskRelease',
              color: 'success',
              ifShow: activeKey == '52019-20',
              disabled: record.type == '52018-20',
              popConfirm: {
                title: '是否确认正式发布',
                placement: 'bottomRight',
                confirm: handleFormalSend.bind(null, record),
              },
            },
            {
              icon: 'fluent:select-all-on-24-regular',
              tooltip: '结束调研任务',
              label: '结束',
              auth: 'OpTaskEnd',
              color: 'error',
              ifShow: activeKey == '52019-20',
              disabled: record.type == '52018-30',
              popConfirm: {
                title: '是否确认结束调研任务',
                placement: 'bottomRight',
                confirm: handleEnd.bind(null, record),
              },
            },
            {
              icon: 'akar-icons:eye',
              label: '查看',
              tooltip: '查看详情',
              auth: 'OpPersonEdit',
              onClick: openView.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>

    <BasicModal @register="registerModal" :width="800" title="任务查看" @ok="closeViewModal">
      <Description class="mt-4" :column="2" :data="viewData" :schema="viewSchema" />
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, reactive, ref, nextTick, computed, inject } from 'vue';
  import { BasicTable, useTable, TableAction, BasicColumn } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Authority } from '/@/components/Authority';
  import { Tag } from 'ant-design-vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { Description } from '/@/components/Description';
  import {
    domesOpTaskListApi,
    domesOpTaskBatchPublishApi,
    domesOpTaskFormalPublishApi,
    domesOpTaskBatchFinishApi,
  } from '/@/api/doOp/task';
  import { statusObj, viewSchema } from '../config';

  export default defineComponent({
    components: {
      BasicTable,
      TableAction,
      Authority,
      ATag: Tag,
      BasicModal,
      Description,
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
      const { createMessage } = useMessage();
      const searchInfo = reactive({
        statusQueryIn: props.activeKey,
        surNameQueryLike: (props.searchParams as any).surNameQueryLike,
        yearsQueryIn: (props.searchParams as any).yearsQueryIn,
        surTypeQueryIn: (props.searchParams as any).surTypeQueryIn,
      });
      const getActionColumnWidth = computed(() => {
        return props.activeKey == '52019-10' ? 270 : props.activeKey == '52019-20' ? 250 : 60;
      });
      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        api: domesOpTaskListApi,
        rowKey: 'id',
        columns: props.columns as BasicColumn[],
        immediate: true,
        useSearchForm: false,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
        actionColumn: {
          width: getActionColumnWidth,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      //获取表格total
      const tableTotal: any = inject('tableTotalNum');
      const getData = ({ total }) => {
        if (props.activeKey == '52019-10') {
          tableTotal.num = total;
        }
        if (props.activeKey == '52019-20') {
          tableTotal.num1 = total;
        }
      };

      // 新增
      const handleCreate = () => {
        router.push({ name: 'OpTaskAdd', params: { type: 'add' } });
      };

      const handleEdit = (record) => {
        router.push({ name: 'OpTaskEdit', params: { type: 'edit', id: record.id } });
      };

      // 试填
      const handleTry = ({ surId }) => {
        router.push({ name: 'OpTaskView', params: { id: surId } });
      };

      // 发布
      const handleSend = async (record) => {
        await domesOpTaskBatchPublishApi({ ids: record.id });
        createMessage.success('操作成功');
        emit('change');
      };

      // 正式发布
      const handleFormalSend = async (record) => {
        await domesOpTaskFormalPublishApi({ ids: record.id });
        createMessage.success('操作成功');
        reload();
      };

      // 结束调研任务
      const handleEnd = async (record) => {
        await domesOpTaskBatchFinishApi({ ids: record.id });
        createMessage.success('操作成功');
        emit('change');
      };

      // 刷新
      const handleRefresh = () => {
        reload();
      };

      const [registerModal, { openModal, closeModal }] = useModal();
      const viewData = ref({});
      const closeViewModal = () => {
        closeModal();
      };
      const openView = (data) => {
        openModal();

        nextTick(() => {
          viewData.value = data;
        });
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
          searchInfo.surNameQueryLike = val.surNameQueryLike;
          searchInfo.yearsQueryIn = val.yearsQueryIn;
          searchInfo.surTypeQueryIn = val.surTypeQueryIn;
          reload();
        },
        { deep: true },
      );

      return {
        searchInfo,
        registerTable,
        handleCreate,
        handleEdit,
        handleTry,
        handleSend,
        handleFormalSend,
        handleEnd,
        openView,
        registerModal,
        closeViewModal,
        statusObj,
        viewSchema,
        viewData,
        getData,
      };
    },
  });
</script>

<style scoped></style>
