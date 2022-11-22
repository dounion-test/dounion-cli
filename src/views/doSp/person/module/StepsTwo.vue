<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:57:02
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-15 19:59:00
 * @FilePath: /rural-revitalization/src/views/expstore/expert/module/StepsOne.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="width: 90%" class="mt-8 m-auto step-form-wrap">
    <BasicForm @register="registerForm">
      <template #eduDetailList="{ field }">
        <AppendInput
          :field="field"
          @change="handleChange"
          placeholder="例如：1985.09-1989.07 北京农业工程大学，农业建筑与生物环境工程专业，工学学士"
        />
      </template>
      <template #workDetailList="{ field }">
        <AppendInput
          :field="field"
          @change="handleChange"
          placeholder="例如：1992.06- 1995.03 北京农业工程大学水利与建筑工程系，助教"
        />
      </template>
      <template #socialDetailList="{ field }">
        <AppendInput
          :field="field"
          @change="handleChange"
          placeholder="例如：中国农业大学北京市富通环境工程公司总经理"
        />
      </template>
    </BasicForm>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import AppendInput from './AppendInput.vue';
  import { schemasTwo } from '../config/add';

  export default defineComponent({
    components: {
      BasicForm,
      AppendInput,
    },
    setup() {
      const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
        layout: 'vertical',
        schemas: schemasTwo,
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

      return {
        registerForm,
        handleChange,
        getFieldsValue,
      };
    },
  });
</script>
