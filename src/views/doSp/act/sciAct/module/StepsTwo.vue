<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:57:02
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-16 11:24:01
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/StepsOne.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="width: 90%" class="mt-8">
    <BasicForm @register="registerForm">
      <template #planList>
        <a-form-item-rest>
          <div v-for="(item, index) in planList" :key="item.planId" class="mb-4">
            <div class="flex justify-between items-center">
              <a-date-picker
                v-model:value="item.actDate"
                valueFormat="YYYY-MM-DD"
                style="width: 200px"
                class="!mb-2"
                placeholder="请选择行程日期"
              />
              <Icon
                v-if="planList.length > 1"
                class="cursor-pointer"
                icon="fluent:delete-28-regular"
                :size="20"
                color="#eb0b0b"
                @click="handleDelete(index)"
              />
            </div>
            <ActivityAddTable @change="handleChange" :indexNum="index" />
          </div>
          <a-button @click="handleAdd" preIcon="ant-design:plus-outlined" type="primary"
            >新增行程</a-button
          >
        </a-form-item-rest>
      </template>
    </BasicForm>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, watch, inject, nextTick } from 'vue';
  import { Form, DatePicker } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import ActivityAddTable from './ActivityAddTable.vue';
  import { schemasTwo } from '../config/add';
  import { useRoute } from 'vue-router';
  import { createID } from '/@/views/doOp/survey/design/utils/index';

  export default defineComponent({
    components: {
      Icon,
      BasicForm,
      ActivityAddTable,
      ADatePicker: DatePicker,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const route = useRoute();
      const editInfo: any = inject('editInfo');
      const planList: any = ref([]);
      const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: schemasTwo,
        showResetButton: false,
        showSubmitButton: false,
        actionColOptions: {
          span: 24,
        },
      });

      const handleAdd = () => {
        planList.value.push({
          planId: createID('plan'),
          actDate: undefined,
          planDetailList: [],
        });
        setFieldsValue({ planList: planList.value });
      };
      const handleDelete = (index) => {
        planList.value.splice(index, 1);
        setFieldsValue({ planList: planList.value });
      };

      const handleChange = (list, index) => {
        planList.value[index].planDetailList = list;
        setFieldsValue({ planList: planList.value });
      };

      onMounted(() => {
        if (route.params.type == 'add') {
          planList.value.push({
            planId: createID('plan'),
            actDate: undefined,
            planDetailList: [],
          });
        }
        setFieldsValue({ planList: planList.value });
      });

      watch(
        () => editInfo,
        () => {
          let editPlanList: any = [];
          let schemasTwoData: any = {};
          schemasTwo.forEach((item: any) => {
            if (item.field != 'planList') {
              schemasTwoData[item.field] = editInfo.value[item.field];
            }
          });
          editInfo.value.planList.forEach((item) => {
            editPlanList.push({
              planId: createID('plan'),
              actDate: item.actDate,
              planDetailList: [],
            });
          });
          planList.value = editPlanList;
          nextTick(() => {
            setFieldsValue({ planList: planList.value, ...schemasTwoData });
          });
        },
        { deep: true },
      );

      return {
        planList,
        registerForm,
        getFieldsValue,
        handleAdd,
        handleDelete,
        handleChange,
      };
    },
  });
</script>

<style scoped></style>
