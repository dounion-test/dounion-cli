<template>
  <div>
    <PageWrapper>
      <CollapseContainer title="基本信息">
        <a-row>
          <a-col :span="16">
            <BasicForm @register="register" :showResetButton="false" :showSubmitButton="false">
              <template #remoteSearch="{ model, field }">
                <ApiTreeSelect
                  style="width: 50%"
                  :api="getUcenterFunctionListTreeApi"
                  showSearch
                  label-in-value
                  v-model:value="model[field]"
                  :filterOption="false"
                  :fieldNames="{ key: 'id', label: 'name', value: 'id', children: 'subFunction' }"
                  :params="searchParams"
                  treeNodeFilterProp="name"
                  :afterFetch="(res) => handleAfterFetch(res)"
                />
              </template>
            </BasicForm>
          </a-col>
        </a-row>
      </CollapseContainer>
    </PageWrapper>

    <PageFooter>
      <a-button type="primary" @click="validateForm" :loading="saveLoading" class="my-2 mr-5"
        >保存</a-button
      >
      <a-button @click="goBack()">取消</a-button>
    </PageFooter>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm, ApiTreeSelect } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper, PageFooter } from '/@/components/Page';
  import { Row, Col } from 'ant-design-vue';
  import {
    ucenterFunctionAddApi,
    getUcenterFunctionListTreeApi,
    ucenterFunctionviewApi,
    ucenterFunctionEditApi,
  } from '/@/api/testDemo/function';
  import { schemas } from './config/add';
  import { useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';

  export default defineComponent({
    name: 'UcenterOrgAdd',
    components: {
      BasicForm,
      ApiTreeSelect,
      CollapseContainer,
      PageWrapper,
      PageFooter,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      const { closeCurrent } = useTabs();
      const [register, { setFieldsValue, validateFields }] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 24,
        },
      });
      const router = useRouter();
      const {
        currentRoute: {
          value: {
            params: { type, id },
            query: { projectId },
          },
        },
      } = router;
      const searchParams = { projectId };
      const isEdit = type === 'edit';
      const { createMessage } = useMessage();
      let saveLoading = ref(false);
      const handleSubmit = async (data) => {
        try {
          Object.assign(data, isEdit ? { id } : {});
          const api = isEdit ? ucenterFunctionEditApi : ucenterFunctionAddApi;
          await api(data);
          createMessage.success('操作成功');
          goBack();
          saveLoading.value = false;
        } catch {
          saveLoading.value = false;
        }
      };
      const validateForm = async () => {
        try {
          const res = await validateFields();
          const parentId = res.parentId;
          saveLoading.value = true;
          res.parentId = parentId.value;
          res.parentName = parentId.label;
          handleSubmit(res);
        } catch (error) {
          console.log('not passing', error);
        }
      };
      const handleAfterFetch = (res) => {
        return res[0].subFunction;
      };
      const goBack = () => {
        closeCurrent();
      };
      // 回填
      const getucenterFunctionview = () => {
        ucenterFunctionviewApi({ id }).then((res) => {
          res.parentId = {
            label: res.parentName,
            value: res.parentId,
          };
          setFieldsValue(res);
        });
      };
      if (isEdit) {
        getucenterFunctionview();
      }
      return {
        register,
        goBack,
        validateForm,
        saveLoading,
        searchParams,
        handleAfterFetch,
        getUcenterFunctionListTreeApi,
      };
    },
  });
</script>
