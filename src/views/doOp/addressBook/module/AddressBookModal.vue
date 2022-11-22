<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-01 18:16:06
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-10 16:14:04
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
    <BasicForm @register="registerForm" autoFocusFirstItem />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas } from '../config/add';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { domesAddressBookEditApi, domesAddressBookAddApi } from '/@/api/doOp/addressBook';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const { createMessage } = useMessage();
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
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate)
          ? { name: '新增联络人', icon: 'fluent:document-add-24-regular' }
          : { name: '编辑联络人', icon: 'lucide:file-edit' },
      );
      async function handleSubmit() {
        try {
          const data = await validateFields();
          setModalProps({ confirmLoading: true });
          Object.assign(data, unref(isUpdate) ? { id: rowId.value } : {});
          const api = unref(isUpdate) ? domesAddressBookEditApi : domesAddressBookAddApi;
          await api(data);
          closeModal();
          setModalProps({ confirmLoading: false });
          createMessage.success('操作成功');
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
