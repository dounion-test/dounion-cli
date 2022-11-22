<template>
  <PageWrapper contentBackground contentFullHeight>
    <div class="pl-3 pt-3 pr-3 wrap">
      <BasicForm @register="register" />

      <BasicForm :key="formKey" @register="varietyForm[0]">
        <template #country="{ model, field }">
          <a-input-group compact style="display: flex">
            <a-input class="area-input" v-model:value="model[field]" />
            <a-input class="area-input" v-model:value="model.arear" />
          </a-input-group>
        </template>
        <template #cost>
          <a-input type="number" v-model:value="cost">
            <template #addonAfter>
              <a-select v-model:value="costUnit" style="width: 70px">
                <a-select-option
                  v-for="item in costUnitOptions"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.name }}</a-select-option
                >
              </a-select>
            </template>
          </a-input>
        </template>
      </BasicForm>
    </div>
    <div class="text-right form-button" style="text-align: right">
      <a-button class="m-3" type="primary" :loading="btnLoading" @click="saveForm">保存</a-button>
      <a-button class="mr-3" @click="goBack()">取消</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    reactive,
    toRefs,
    computed,
    onUnmounted,
    onMounted,
    nextTick,
  } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { basicSchema, type, formMap } from './config/add';
  import { infoDocAdd, infoDocEdit, infoDocView } from '/@/api/doInfo/index';
  import { useRoute, useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Form, Input, Select, SelectOption } from 'ant-design-vue';
  import { ucenterCodeCombox } from '/@/api/common/index';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicForm,
      AFormItemRest: Form.ItemRest,
      AInputGroup: Input.Group,
      AInput: Input,
      ASelect: Select,
      ASelectOption: SelectOption,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const { createMessage } = useMessage();
      const activeKey = ref('0');

      const { close, refreshOtherPage } = useTabs();

      const [register, { validateFields, getFieldsValue, setFieldsValue }] = useForm({
        labelWidth: 100,
        schemas: basicSchema,
        showActionButtonGroup: false,
      });

      const formKey = ref(0);

      const updateFormKey = () => {
        ++formKey.value;
      };

      const btnLoading = ref(false);
      const saveForm = async () => {
        const [_, { validateFields: validateFieldsOther, getFieldsValue: getFieldsValueOther }] =
          varietyForm.value;

        await validateFields();
        await validateFieldsOther();

        let formData = getFieldsValue(),
          otherFormData = getFieldsValueOther();

        // 处理二级栏目集合
        formData.secondLevelNames = formData.secondLevelNames.join();

        // 处理关键词;
        otherFormData = transArrayToString(otherFormData);
        otherFormData = transArrayToJSON(otherFormData);

        Object.assign(formData, {
          ...otherFormData,
          ...units,
        });
        setBtnStatus(true);
        let API = new Function();
        if (route.params.id) {
          API = infoDocEdit;
          formData.id = route.params.id;
        } else {
          API = infoDocAdd;
        }

        try {
          await API(formData);
          setBtnStatus(false);
          createMessage.success('保存成功');
          goBack(true);
        } catch {
          setBtnStatus(false);
        }
      };

      const setBtnStatus = (status) => {
        setTimeout(() => (btnLoading.value = status), status ? 0 : 500);
      };

      const transArrayToString = (data) => {
        const keys = ['orgIds', 'expertIds', 'keyword', 'keywordEn'];
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

      const transStringToArray = (data) => {
        const keys = ['orgIds', 'expertIds', 'keyword', 'keywordEn', 'secondLevelNames'];
        keys.forEach((key) => {
          if (data[key]?.length) {
            data[key] = data[key].split(',');
          } else {
            data[key] = [];
          }
        });
        return data;
      };

      // const transJSONToArray = (data) => {
      //   const keys = ['originalAttachments'];
      //   keys.forEach((key) => {
      //     if (data[key]?.length) {
      //       data[key] = JSON.parse(data[key]);
      //     }
      //   });
      //   return data;
      // };

      const varietyForm = computed(() => {
        updateFormKey();
        return useForm({
          labelWidth: 100,
          schemas: formMap.get(type.value) || [],
          showActionButtonGroup: false,
        });
      });

      const requestView = async () => {
        try {
          let data = await infoDocView({ id: route.params.id });
          data = transStringToArray(data);
          // data = transJSONToArray(data);

          // 表单回显
          Object.keys(units).forEach((key) => {
            units[key] = data[key];
          });
          setFieldsValue(data);

          const { docType } = data;
          type.value = docType;
          nextTick(() => {
            const { setFieldsValue } = varietyForm.value[1];
            setFieldsValue(data);
          });
        } catch (error) {
          console.log(error);
        }
      };

      const goBack = (status = false) => {
        close(router.currentRoute.value);
        if (status) {
          refreshOtherPage('InfoDocList');
        } else {
          router.push({ name: 'InfoDocList' });
        }
      };

      const costUnitOptions: any = ref([]);
      const units = reactive({ cost: '', costUnit: '' });
      const getUnit = () => {
        ucenterCodeCombox({ type: '10001-52063' }).then((res) => {
          costUnitOptions.value = res?.list;
        });
      };

      onMounted(() => {
        route.params.id && requestView();
        getUnit();
      });

      onUnmounted(() => (type.value = ''));
      return {
        activeKey,
        register,
        saveForm,
        goBack,
        varietyForm,
        formKey,
        type,
        btnLoading,
        costUnitOptions,
        ...toRefs(units),
      };
    },
  });
</script>

<style lang="less" scoped>
  .area-input {
    width: 100%;
    margin-left: 10px;

    &:first-child {
      margin-left: 0;
    }
  }

  .form-button {
    width: 97.5%;
    max-width: 1841px;
    padding-top: 20px;
  }
</style>
