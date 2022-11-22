<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-01 18:16:06
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-25 14:22:42
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/AccountModal.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas } from '../config/add';
  import {
    getUcenterCodeAddApi,
    getUcenterCodeViewApi,
    getUcenterCodeSaveApi,
  } from '/@/api/testDemo/sysCode';
  import { ucenterCodeCombox } from '/@/api/common';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, resetFields, validateFields, updateSchema }] = useForm(
        {
          labelWidth: 80,
          schemas: schemas,
          showActionButtonGroup: false,
          actionColOptions: {
            span: 23,
          },
        },
      );

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          updateSchema([
            { field: 'name', componentProps: { disabled: true } },
            { field: 'code', componentProps: { disabled: true } },
            {
              field: 'type',
              component: 'ApiSelect',
              label: '类别',
              componentProps: {
                api: ucenterCodeCombox,
                params: {
                  typeQueryIsNull: 1,
                },
                resultField: 'list',
                labelField: 'name',
                valueField: 'value',
                disabled: true,
              },
              required: true,
            },
          ]);
          getView(data.record.value);
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      const getView = async (value) => {
        let res = await getUcenterCodeViewApi({ value });
        setFieldsValue(res);
      };

      const handleSubmit = async () => {
        const data = await validateFields();
        Object.assign(data, unref(isUpdate) ? { id: rowId.value } : {});
        const api = unref(isUpdate) ? getUcenterCodeSaveApi : getUcenterCodeAddApi;
        setModalProps({ confirmLoading: true });
        console.log(data, 'data');
        await api(data);
        setModalProps({ confirmLoading: false });
        closeModal();
        emit('success');
      };

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
