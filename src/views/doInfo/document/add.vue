<template>
  <PageWrapper contentBackground>
    <div class="pl-3 pt-3 pr-3 h-150 wrap">
      <BasicForm @register="register" />

      <BasicForm :key="formKey" @register="varietyForm[0]">
        <template #country="{ model, field }">
          <a-input-group compact>
            <a-input class="area-input" v-model:value="model['arear']" />
            <a-input class="area-input" v-model:value="model[field]" />
          </a-input-group>
        </template>
      </BasicForm>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onUnmounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { basicSchema, type, formMap } from './config/add';
  import { infoDocAdd, infoDocEdit, infoDocView } from '/@/api/doInfo/index';
  export default defineComponent({
    components: {
      PageWrapper,
      BasicForm,
    },
    setup() {
      const activeKey = ref('0');

      const [register, { validateFields, getFieldsValue, setFieldsValue }] = useForm({
        labelWidth: 100,
        schemas: basicSchema,
        showActionButtonGroup: false,
      });

      const formKey = ref(0);

      const updateFormKey = () => {
        ++formKey.value;
      };

      const goBack = () => {};

      const saveForm = async () => {
        const [
          _,
          {
            validateFields: validateFieldsOther,
            getFieldsValue: getFieldsValueOther,
            setFieldsValue: setFieldsValueOther,
          },
        ] = varietyForm.value;

        await validateFields();
        await validateFieldsOther();

        let formData = getFieldsValue(),
          otherFormData = getFieldsValueOther();

        // 处理关键词;
        otherFormData = transArrayToString(otherFormData);
        otherFormData = transArrayToJSON(otherFormData);
        console.log(formData, otherFormData);

        Object.assign(formData, otherFormData);

        try {
          infoDocAdd(formData);
        } catch {}
      };

      const transArrayToString = (data) => {
        const keys = ['keyword', 'keywordEn'];
        keys.forEach((key) => {
          if (Array.isArray(data[key]) && data[key].length) {
            data[key] = data[key].join();
          }
        });
        return data;
      };

      const transArrayToJSON = (data) => {
        const keys = ['originalAttachments'];
        keys.forEach((key) => {
          if (Array.isArray(data[key]) && data[key].length) {
            data[key] = JSON.stringify(data[key]);
          }
        });
        return data;
      };

      const saveLoading = ref(false);

      const varietyForm = computed(() => {
        updateFormKey();
        return useForm({
          labelWidth: 100,
          schemas: formMap.get(type.value) || [],
          showActionButtonGroup: false,
        });
      });

      onUnmounted(() => (type.value = ''));

      return {
        activeKey,
        register,
        goBack,
        saveForm,
        saveLoading,
        varietyForm,
        formKey,
        type,
      };
    },
  });
</script>

<style lang="less" scoped>
  .area-input {
    width: 120px;
    margin-left: 10px;
    &:first-child {
      margin-left: 0;
    }
  }
</style>
