<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-17 16:15:35
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-03 09:30:10
 * @FilePath: /vben-ucenter/src/views/doUcenter/org/OrgModal.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicModal
    @register="registerModal"
    :width="800"
    :title="isUpdate ? '修改' : '新增'"
    :titleIcon="isUpdate ? 'lucide:file-edit' : 'fluent:document-add-24-regular'"
    @ok="handleOk"
  >
    <BasicForm @register="registerForm" :showResetButton="false" :showSubmitButton="false">
      <template #remoteSearch="{ model, field }">
        <ApiTreeSelect
          style="width: 50%"
          :api="getUcenterFunctionListTreeApi"
          showSearch
          label-in-value
          v-model:value="model[field]"
          :filterOption="false"
          :immediate="false"
          :fieldNames="{ key: 'id', label: 'name', value: 'id', children: 'subFunction' }"
          :params="searchParams"
          treeNodeFilterProp="name"
          :afterFetch="(res) => handleAfterFetch(res)"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiTreeSelect } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { schemas } from '../config/add';
  import {
    ucenterFunctionAddApi,
    getUcenterFunctionListTreeApi,
    ucenterFunctionviewApi,
    ucenterFunctionEditApi,
  } from '/@/api/testDemo/function';
  export default defineComponent({
    components: {
      BasicModal,
      BasicForm,
      ApiTreeSelect,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const editId = ref(0);
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      const searchParams = ref<any>({});
      const [registerForm, { validateFields, setFieldsValue, resetFields }] = useForm({
        labelWidth: 100,
        schemas: schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data) => {
        resetFields();
        isUpdate.value = !!data?.isUpdate;
        searchParams.value = { projectId: data.projectId };
        if (unref(isUpdate)) {
          editId.value = data.id;
          getView(data.id);
        }
      });
      const getView = async (id) => {
        const getViewParams = { id };
        const data = await ucenterFunctionviewApi(getViewParams);
        data.parentId = {
          label: data.parentName,
          value: data.parentId,
        };
        setFieldsValue(data);
      };
      const handleSubmit = async (data) => {
        try {
          setModalProps({ confirmLoading: true });
          Object.assign(data, unref(isUpdate) ? { id: editId.value } : {});
          const api = unref(isUpdate) ? ucenterFunctionEditApi : ucenterFunctionAddApi;
          await api(data);
          closeModal();
          setModalProps({ confirmLoading: false });
          createMessage.success('操作成功');
          emit('success');
        } catch {
          setModalProps({ confirmLoading: false });
        }
      };
      const handleOk = async () => {
        try {
          const res = await validateFields();
          const parentId = res.parentId;
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
      return {
        isUpdate,
        searchParams,
        registerForm,
        registerModal,
        handleOk,
        handleAfterFetch,
        getUcenterFunctionListTreeApi,
      };
    },
  });
</script>
