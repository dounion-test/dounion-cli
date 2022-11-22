<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-10 17:12:22
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-24 18:08:54
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/module/ActivityItemTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicTable @register="registerTable">
    <template #actStime="{ record }">
      <a-time-picker
        v-model:value="record.actStime"
        format="HH:mm"
        valueFormat="HH:mm"
        :minute-step="10"
        dropdownClassName="disable-some-time"
      />
    </template>
    <template #content="{ record }">
      <a-input v-model:value="record.content" />
    </template>
    <template #action="{ index }">
      <Icon class="cursor-pointer" @click="handleAdd" icon="ant-design:plus-circle-outlined" />
      <Icon
        v-if="list.length > 1"
        class="cursor-pointer ml-4"
        icon="ant-design:minus-circle-outlined"
        @click="hanldeDelete(index)"
      />
    </template>
  </BasicTable>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, watch, inject } from 'vue';
  import { Input, DatePicker } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Icon } from '/@/components/Icon';
  import { columns } from '../config/add';
  import { useRoute } from 'vue-router';
  import { createID } from '/@/views/doOp/survey/design/utils/index';

  export default defineComponent({
    components: {
      Icon,
      BasicTable,
      AInput: Input,
      ATimePicker: DatePicker.TimePicker,
    },
    props: {
      indexNum: Number,
    },
    emits: ['change'],
    setup(props, { emit }) {
      const route = useRoute();
      const editInfo: any = inject('editInfo');
      const list: any = ref([]);
      const [registerTable, { setTableData }] = useTable({
        rowKey: 'tableId',
        columns,
        size: 'small',
        inset: true,
        canResize: false,
        striped: false,
        bordered: true,
        immediate: false,
        pagination: false,
        showIndexColumn: false,
        isCanResizeParent: true,
      });

      const handleAdd = () => {
        list.value.push({
          tableId: createID('planDetailList'),
          actStime: undefined,
          content: undefined,
        });
        setTableData(list.value);
      };

      const hanldeDelete = (index) => {
        list.value.splice(index, 1);
        setTableData(list.value);
      };

      onMounted(() => {
        if (route.params.type == 'add') {
          list.value.push({
            tableId: createID('planDetailList'),
            actStime: undefined,
            content: undefined,
          });
        }
        if (route.params.type == 'edit' && editInfo.value.planList[props.indexNum as number]) {
          let planDetailList = JSON.parse(
            editInfo.value.planList[props.indexNum as number].planDetailList,
          );
          planDetailList.forEach((item) => {
            list.value.push({ tableId: createID('planDetailList'), ...item });
          });
        }
        if (route.params.type == 'edit' && !editInfo.value.planList[props.indexNum as number]) {
          list.value.push({
            tableId: createID('planDetailList'),
            actStime: undefined,
            content: undefined,
          });
        }
        setTableData(list.value);
      });

      watch(
        () => list.value,
        () => {
          emit('change', list.value, props.indexNum);
        },
        { deep: true, immediate: true },
      );
      return {
        list,
        registerTable,
        handleAdd,
        hanldeDelete,
      };
    },
  });
</script>

<style lang="less" scoped>
  :deep(.ant-table-tbody) {
    td {
      white-space: break-spaces;
      padding: 2px !important;
    }
  }
</style>

<style lang="less">
  .disable-some-time {
    .ant-picker-content {
      .ant-picker-time-panel-column:nth-child(1) {
        li:nth-child(1),
        li:nth-child(2),
        li:nth-child(3),
        li:nth-child(4),
        li:nth-child(5),
        li:nth-child(6),
        li:nth-child(7) {
          display: none;
        }
      }
    }
  }
</style>
