<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-01 18:16:06
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-27 11:40:02
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
  import { dosysSysParameterSaveApi } from '/@/api/doSys/sysParameter';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const itemInfo: any = ref({});

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
        itemInfo.value = data.record;
        if (unref(isUpdate)) {
          setFieldsValue(data.record);
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

      const handleSubmit = async () => {
        const formData = await validateFields();
        unref(isUpdate) && Object.assign(itemInfo.value, formData);
        setModalProps({ confirmLoading: true });
        const data = {
          orgId: itemInfo.value.orgId || 1,
          setType: itemInfo.value.setType,
          parameters: unref(isUpdate)
            ? JSON.stringify([itemInfo.value])
            : JSON.stringify([formData]),
        };
        await dosysSysParameterSaveApi(data);
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
