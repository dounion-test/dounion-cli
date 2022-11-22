<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-01 18:16:06
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-01 16:01:58
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/AccountModal.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle.name"
    :titleIcon="getTitle.icon"
    @ok="handleSubmit"
  >
    <BasicForm :autoFocusFirstItem="true" @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas } from '../config/add';
  import {
    ucenterUcenterPositionAddApi,
    ucenterUcenterPositionViewApi,
    ucenterUcenterPositionEditApi,
  } from '/@/api/testDemo/position';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, resetFields, validateFields }] = useForm({
        labelWidth: 80,
        schemas: schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          getView(data.record.id);
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate)
          ? { name: '新增职务', icon: 'fluent:document-add-24-regular' }
          : { name: '编辑职务', icon: 'lucide:file-edit' },
      );

      const getView = async (id) => {
        let res = await ucenterUcenterPositionViewApi({ id });
        setFieldsValue(res);
      };

      const handleSubmit = async () => {
        const data = await validateFields();
        Object.assign(data, unref(isUpdate) ? { id: rowId.value } : {});
        const api = unref(isUpdate) ? ucenterUcenterPositionEditApi : ucenterUcenterPositionAddApi;
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

<style lang="less" scoped>
  :deep(.ant-input-number) {
    width: 100%;
  }
</style>
