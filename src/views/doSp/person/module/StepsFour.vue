<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:57:02
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-17 17:44:19
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/StepsOne.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="width: 90%" class="mt-8 m-auto step-form-wrap">
    <BasicForm @register="registerForm">
      <template #sciAchieveList="{ field }">
        <AppendInput
          :field="field"
          @change="handleChange"
          placeholder="例如：对当前农业政策的五个认识，《中国发展观察》2022年第3期，学术论文，【引用日期：2022-01-21】"
        />
      </template>
    </BasicForm>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, watch } from 'vue';
  import AppendInput from './AppendInput.vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemasFour } from '../config/add';

  export default defineComponent({
    components: {
      BasicForm,
      AppendInput,
    },
    setup() {
      const editInfo: any = inject('editInfo');
      const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
        layout: 'vertical',
        schemas: schemasFour,
        showResetButton: false,
        showSubmitButton: false,
        actionColOptions: {
          span: 24,
        },
      });

      const handleChange = async (field, list) => {
        let data = await getFieldsValue();
        data[field] = list;
        await setFieldsValue(data);
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
