<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:57:02
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-22 09:58:01
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/StepsOne.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="width: 90%" class="mt-8">
    <BasicForm @register="registerForm" autoFocusFirstItem>
      <template #pictures="{ model, field }">
        <ImageUpload
          accept=".png,.jpeg,.jpg"
          @change="handleChange"
          groupName="52030-240"
          :field="field"
          :multiple="true"
        />
      </template>
    </BasicForm>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, inject } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { ImageUpload } from '/@/components/ImageUpload';
  import { schemasOne } from '../config/add';

  export default defineComponent({
    components: {
      BasicForm,
      ImageUpload,
    },
    setup() {
      const editInfo: any = inject('editInfo');
      const [registerForm, { validateFields, getFieldsValue, setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: schemasOne,
        showResetButton: false,
        showSubmitButton: false,
      });

      const handleChange = (list) => {
        setFieldsValue({ pictures: list });
      };

      watch(
        () => editInfo,
        () => {
          let schemasOneData: any = {};
          schemasOne.forEach((item: any) => {
            if (item.field != 'pictures') {
              if (item.field == '[startDate, endDate]') {
                schemasOneData[item.field] = [
                  editInfo.value['startDate'],
                  editInfo.value['endDate'],
                ];
              } else {
                schemasOneData[item.field] = editInfo.value[item.field];
              }
            }
          });
          setFieldsValue(schemasOneData);
        },
        { deep: true },
      );

      return {
        registerForm,
        validateFields,
        getFieldsValue,
        handleChange,
      };
    },
  });
</script>

<style scoped></style>
