<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 15:24:27
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-24 14:11:34
 * @FilePath: /rural-revitalization/src/views/doOp/opPerson/add.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper class="pb-10" id="pageWrapper" contentFullHeight contentBackground>
    <BasicForm
      :actionColOptions="{ span: 16 }"
      @register="registerForm"
      autoFocusFirstItem
      class="w-4/5 !py-4"
    />
    <div class="bg-white mt-4" style="text-align: right">
      <a-button class="m-3" type="primary" :loading="btnLoading" @click="validateForm"
        >保存</a-button
      >
      <a-button class="mr-3" @click="goBack()">取消</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, onMounted, getCurrentInstance, ref, onActivated } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { schemas } from './config/add';
  import { domesOpOrgTreeApi } from '/@/api/doOp/person';
  import {
    domesOpPersonAddApi,
    domesOpPersonSaveApi,
    domesOpPersonViewApi,
  } from '/@/api/doOp/person';

  export default defineComponent({
    // name: 'OpPersonAdd',
    components: {
      BasicForm,
      PageWrapper,
    },
    setup() {
      onActivated(() => {
        console.log(getCurrentInstance(), 'onActivated');
      });
      onMounted(() => {
        console.log(getCurrentInstance(), 'onMounted');
      });
      const route = useRoute();
      const router = useRouter();
      const personId = ref();
      let btnLoading = ref(false);
      const { createMessage } = useMessage();
      const { close, refreshOtherPage } = useTabs();
      const [registerForm, { validateFields, setFieldsValue, getFieldsValue, updateSchema }] =
        useForm({
          labelWidth: 150,
          schemas,
          showActionButtonGroup: false,
        });

      const getView = async () => {
        let formData = await domesOpPersonViewApi({ id: route.params.id });
        personId.value = formData.personId;
        let nodeCode = formData.village || formData.town || formData.county;
        let treeData = await domesOpOrgTreeApi({ executiveLevelQuery: formData.executiveLevel });
        let selectObj = await flattenSelect(treeData, nodeCode, []);
        updateSchema({
          field: 'viewIds',
          component: 'TreeSelect',
          componentProps: {
            loading: false,
            treeData,
            showSearch: true,
            labelInvalue: true,
            treeNodeFilterProp: 'nodeName',
            fieldNames: { key: 'id', label: 'nodeName', value: 'id' },
            treeDefaultExpandedKeys: ['1'],
          },
        });
        formData.viewIds = {
          label: selectObj[0].nodeName,
          value: selectObj[0].id,
          key: selectObj[0].id,
        };
        setFieldsValue(formData);
      };

      // 保存
      const validateForm = async () => {
        btnLoading.value = true;
        await validateFields();
        const formData = await getFieldsValue();
        let ids = formData.viewIds.value.split('-');
        let treeData = [];
        schemas.forEach((item: any) => {
          if (item.field == 'viewIds') {
            treeData = item.componentProps.treeData;
          }
        });
        let regionArr = await flatten(treeData, ids, []);
        formData.viewIds = undefined;
        const sendData = {
          id: route.params.type == 'edit' ? route.params.id : undefined,
          personId: route.params.type == 'edit' ? personId.value : undefined,
          city: regionArr[0] ? regionArr[0].nodeCode : undefined,
          cityName: regionArr[0] ? regionArr[0].nodeName : undefined,
          county: regionArr[1] ? regionArr[1].nodeCode : undefined,
          countyName: regionArr[1] ? regionArr[1].nodeName : undefined,
          town: regionArr[2] ? regionArr[2].nodeCode : undefined,
          townName: regionArr[2] ? regionArr[2].nodeName : undefined,
          village: regionArr[3] ? regionArr[3].nodeCode : undefined,
          villageName: regionArr[3] ? regionArr[3].nodeName : undefined,
          ...formData,
        };
        route.params.type == 'edit'
          ? await domesOpPersonSaveApi(sendData)
          : await domesOpPersonAddApi(sendData);
        createMessage.success('操作成功');
        goBack(true);
        btnLoading.value = false;
      };

      // 取消
      const goBack = (status = false) => {
        close();
        if (status) {
          refreshOtherPage('OpPersonList');
        } else {
          router.push({ name: 'OpPersonList' });
        }
      };

      /**
       * @description: 遍历树型结构数组并返回省市区县
       * @param {*} arr 需要遍历的数组
       * @param {*} viewIds 选中的id
       * @param {*} ids 返回省市区县数组
       * @return {*} 返回省市区县数组
       */
      const flatten = (arr, viewIds, ids) => {
        let personIds: any = ids;
        for (const item of arr) {
          if (item.children && Array.isArray(item.children)) {
            viewIds.forEach((it) => {
              if (it == item.oldId) {
                personIds.push(item);
              }
            });
            flatten(item.children, viewIds, personIds);
          }
        }
        return personIds;
      };

      /**
       * @description: 遍历树型结构数组并返回选中项
       * @param {*} arr 需要遍历的数组
       * @param {*} nodeCode 选中的nodeCode
       * @param {*} selectArr 返回选中的项
       * @return {*} 返回选中的项
       */
      const flattenSelect = (arr, nodeCode, selectArr) => {
        let personIds: any = selectArr;
        for (const item of arr) {
          if (item.children && Array.isArray(item.children)) {
            item.oldId = item.id;
            item.id = item.parentId ? `${item.parentId}-${item.id}` : `${item.id}`;
            if (item.children.length > 0) {
              item.disabled = true;
            }
            item.children.forEach((it) => {
              it.parentId = item.id;
              if (nodeCode == it.nodeCode) {
                personIds.push(it);
              }
            });
            flattenSelect(item.children, nodeCode, selectArr);
          }
        }
        return personIds;
      };

      onMounted(() => {
        if (route.params.type == 'edit') {
          getView();
        }
      });

      return {
        registerForm,
        validateForm,
        goBack,
        btnLoading,
      };
    },
  });
</script>

<style lang="less">
  .task-form-w {
    width: 50% !important;
  }
</style>
