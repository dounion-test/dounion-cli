<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:57:02
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-22 10:00:17
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/StepsOne.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="width: 90%" class="mt-8">
    <BasicForm @register="registerForm">
      <template #pictures="{ model, field }">
        <ImageUpload
          accept=".png,.jpeg,.jpg"
          @change="handleChange"
          groupName="52030-220"
          :field="field"
        />
      </template>
    </BasicForm>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, watch } from 'vue';
  import { ImageUpload } from '/@/components/ImageUpload';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemasFive } from '../config/add';

  export default defineComponent({
    components: {
      BasicForm,
      ImageUpload,
    },
    setup() {
      const editInfo: any = inject('editInfo');
      const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: schemasFive,
        showResetButton: false,
        showSubmitButton: false,
        actionColOptions: {
          span: 24,
        },
      });

      const handleChange = (list) => {
        setFieldsValue({ pictures: list });
      };

      watch(
        () => editInfo,
        () => {
          setFieldsValue({ attachments: editInfo.value.attachments });
        },
        { deep: true },
      );

      return {
        registerForm,
        getFieldsValue,
        handleChange,
      };
    },
  });
</script>

<style scoped></style>
