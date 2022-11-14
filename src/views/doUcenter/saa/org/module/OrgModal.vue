<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-17 16:15:35
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 10:33:56
 * @FilePath: /vben-ucenter/src/views/doUcenter/org/OrgModal.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicModal
    @register="registerModal"
    :width="800"
    :title="isUpdate ? '修改部门' : '新增部门'"
    :titleIcon="isUpdate ? 'lucide:file-edit' : 'fluent:document-add-24-regular'"
    @ok="handleOk"
    destroyOnClose
  >
    <BasicForm :autoFocusFirstItem="true" @register="registerForm">
      <template #linkId="{ model, field }">
        <ApiTreeSelect
          dropdownClassName="org-module-api-tree-select"
          :api="getUcenterOrgPersonTree"
          showSearch
          label-in-value
          v-model:value="model[field]"
          :filterOption="false"
          :fieldNames="{ key: 'id', label: 'cname', value: 'id' }"
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
    getUcenterDeptPersonAdd,
    getUcenterDeptPersonEdit,
    getUcenterDeptPersonView,
    getUcenterOrgPersonTree,
  } from '/@/api/testDemo/dept';

  export default defineComponent({
    components: {
      ApiTreeSelect,
      BasicModal,
      BasicForm,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const editId = ref(0);
      const isUpdate = ref(true);
      const { createMessage } = useMessage();
      const treeList = ref([]);
      const viewData = ref();
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
        if (data.treeID) {
          setFieldsValue({ parentId: data.treeID });
        }
        if (unref(isUpdate)) {
          editId.value = data.id;
          getView(data.id);
        }
      });

      const getView = async (id) => {
        const getViewParams = { id };
        viewData.value = await getUcenterDeptPersonView(getViewParams);
        if (viewData.value.linkId && treeList.value.length > 0) {
          await flattenOnly(treeList.value);
        }
        setFieldsValue(viewData.value);
      };

      const handleAfterFetch = (res) => {
        treeList.value = res;
        flatten(res);
        return res;
      };

      const handleSubmit = async (data) => {
        try {
          setModalProps({ confirmLoading: true });
          Object.assign(
            data,
            { compType: '10027-20' },
            unref(isUpdate) ? { id: editId.value } : {},
          );
          const api = unref(isUpdate) ? getUcenterDeptPersonEdit : getUcenterDeptPersonAdd;
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
          console.log(res, 'res');
          if (res.linkId) {
            let linkObj = res.linkId;
            res.linkId = linkObj.value.split('-')[1];
            res.linker = linkObj.label;
          }
          handleSubmit(res);
        } catch (error) {
          console.log('not passing', error);
        }
      };

      // 遍历树型结构数组并对数组进行操作
      const flatten = (arr) => {
        for (let item of arr) {
          if (item.children && Array.isArray(item.children) && item.listPerson) {
            item.id = `${item.id}${item.code}`;
            item.disabled = true;
            item.listPerson.forEach((it) => {
              it.id = `${item.id}-${it.id}`;
              it.cname = `${it.name ? it.name : ''} ${it.mobile ? `-${it.mobile}` : ''}`;
              if (
                unref(isUpdate) &&
                viewData.value.linkId &&
                `${item.id}-${viewData.value.linkId}` == it.id
              ) {
                setFieldsValue({
                  linkId: {
                    label: `${it.name ? it.name : ''} ${it.mobile ? `-${it.mobile}` : ''}`,
                    value: `${item.id}-${it.id}`,
                  },
                });
              }
            });
            let newChildren: any = [];
            item.children.forEach((it) => {
              it.children.length > 0 && newChildren.push(it);
            });
            item.children = [...newChildren, ...item.listPerson];
            flatten(item.children);
          }
        }
      };

      // 遍历树型结构数组
      const flattenOnly = (arr) => {
        for (let item of arr) {
          if (item.children && Array.isArray(item.children) && item.listPerson) {
            item.listPerson.forEach((it) => {
              if (it.id == `${item.id}-${viewData.value.linkId}`) {
                viewData.value.linkId = {
                  label: `${it.name}-${it.model}`,
                  value: `${item.id}-${it.id}`,
                };
              }
            });
            item.children = [...item.children];
            flattenOnly(item.children);
          }
        }
      };

      return {
        isUpdate,
        getUcenterOrgPersonTree,
        registerForm,
        registerModal,
        handleOk,
        handleAfterFetch,
      };
    },
  });
</script>

<style lang="less">
  .org-module-api-tree-select {
    .ant-select-tree-node-content-wrapper {
      color: inherit !important;
    }
  }
</style>
