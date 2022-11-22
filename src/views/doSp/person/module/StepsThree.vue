<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:57:02
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-07 11:13:31
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/StepsOne.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="width: 90%" class="mt-8 m-auto step-form-wrap">
    <BasicForm @register="registerForm">
      <template #marks="{ model, field }">
        <a-row>
          <a-col :span="20">
            <a-select
              labelInValue
              v-model:value="model[field]"
              mode="multiple"
              :options="tagOptions"
              :showSearch="false"
              :fieldNames="{
                label: 'speMarkName',
                value: 'id',
              }"
              dropdownClassName="expert-select-hide"
              placeholder="请选择下方的标签"
              @change="handleSelectChange"
            />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="20">
            <a-checkable-tag
              v-for="item in tagOptions"
              :key="item.id"
              v-model:checked="item.checked"
            >
              {{ item.speMarkName }}
            </a-checkable-tag>
          </a-col>
        </a-row>
      </template>
      <template #researchFieldList="{ field }">
        <AppendInput :field="field" @change="handleChange" placeholder="例如：动物生物环境工程" />
      </template>
      <template #subjectList="{ field }">
        <AppendInput
          :field="field"
          @change="handleChange"
          placeholder="例如：2002年度国家级星火计划项目“华北型连栋塑料温室示范与推广”，项目编号：2002EA105011，负责人"
        />
      </template>
    </BasicForm>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, inject } from 'vue';
  import { Select, Tag, Row, Col } from 'ant-design-vue';
  import AppendInput from './AppendInput.vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemasThree } from '../config/add';
  import { spMarkComboxApi } from '/@/api/doSp/person';

  export default defineComponent({
    components: {
      BasicForm,
      AppendInput,
      ASelect: Select,
      ACheckableTag: Tag.CheckableTag,
      ARow: Row,
      ACol: Col,
    },
    setup() {
      const tagOptions: any = ref([]);
      const editInfo: any = inject('editInfo');
      const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
        layout: 'vertical',
        schemas: schemasThree,
        showResetButton: false,
        showSubmitButton: false,
        actionColOptions: {
          span: 24,
        },
      });

      // 获取标签
      const spMarkCombox = async () => {
        let res = await spMarkComboxApi();
        res.forEach((item) => {
          item.checked = false;
        });
        tagOptions.value = res;
      };
      spMarkCombox();

      const handleChange = async (field, list) => {
        let data = await getFieldsValue();
        data[field] = list;
        await setFieldsValue(data);
      };

      const handleSelectChange = (e) => {
        let ids = e.map((item) => item.value);
        tagOptions.value.forEach((item: any) => {
          item.checked = false;
          if (ids.indexOf(item.id) != -1) {
            item.checked = true;
          }
        });
      };

      watch(
        () => tagOptions.value,
        () => {
          let ids: any = [];
          tagOptions.value.forEach((item: any) => {
            item.checked && ids.push({ label: item.speMarkName, key: item.id, value: item.id });
          });
          setFieldsValue({ marks: ids });
        },
        { deep: true },
      );

      watch(
        () => editInfo,
        () => {
          let marks: any = [];
          let ids = editInfo.value.marks.map((item) => item.markId);
          tagOptions.value.forEach((item: any) => {
            if (ids.indexOf(item.id) != -1) {
              item.checked = true;
              marks.push({ label: item.speMarkName, key: item.id, value: item.id });
            }
          });
          setFieldsValue({ marks });
        },
        { deep: true },
      );

      return {
        tagOptions,
        registerForm,
        getFieldsValue,
        handleChange,
        handleSelectChange,
      };
    },
  });
</script>

<style lang="less">
  .expert-select-hide {
    display: none !important;
  }
</style>
