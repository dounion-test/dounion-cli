<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 15:24:27
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-27 15:40:28
 * @FilePath: /rural-revitalization/src/views/doOp/opPerson/add.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper id="pageWrapper" contentFullHeight contentBackground v-loading="pageLoading">
    <BasicForm :actionColOptions="{ span: 16 }" @register="registerForm" class="w-4/5 !py-4" />
    <div class="bg-white" style="text-align: right">
      <a-button type="primary" :loading="sendLoading" @click="validateSend">发布</a-button>
      <a-button class="m-3" type="primary" :loading="saveLoading" @click="validateForm"
        >保存</a-button
      >
      <a-button class="mr-3" @click="goBack()">取消</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { schemas } from './config/add';
  import { domesOpPersonTreeApi } from '/@/api/doOp/person';
  import {
    domesOpTaskAddApi,
    domesOpTaskPublishApi,
    domesOpTaskViewApi,
    domesOpTaskEditApi,
    domesOpTaskFillWayApi,
  } from '/@/api/doOp/task';
  import dayjs from 'dayjs';

  export default defineComponent({
    components: {
      BasicForm,
      PageWrapper,
    },
    setup() {
      const sendLoading = ref(false);
      const saveLoading = ref(false);
      const pageLoading = ref(false);
      const route = useRoute();
      const router = useRouter();
      const { createMessage } = useMessage();
      const { close, refreshOtherPage } = useTabs();
      const [registerForm, { validateFields, getFieldsValue, setFieldsValue, updateSchema }] =
        useForm({
          labelWidth: 100,
          schemas,
          showActionButtonGroup: false,
        });

      // 查看
      const getView = async () => {
        pageLoading.value = true;
        let formData = await domesOpTaskViewApi({ id: route.params.id });
        let viewIds = formData.viewIds.split(',');
        getTreeData({ objectType: formData.objectType }, viewIds, formData);
        getBizType(formData.surId);
      };

      // 获取填报单位数据
      const getTreeData = async (objectType, viewIds, formData) => {
        let res = await domesOpPersonTreeApi(objectType);
        let arr = await flattenSelect(res, viewIds, []);
        updateSchema({
          field: 'viewIds',
          component: 'TreeSelect',
          componentProps: {
            loading: false,
            treeData: res,
            showSearch: true,
            labelInValue: true,
            multiple: true,
            treeNodeFilterProp: 'nodeName',
            class: 'task-form-w',
            fieldNames: { key: 'id', label: 'nodeName', value: 'id' },
          },
        });
        formData.surId = Number(formData.surId);
        formData.viewIds = arr;
        formData[`[beginDate, endDate]`] = [formData.beginDate, formData.endDate];
        setFieldsValue(formData);
        pageLoading.value = false;
      };

      // 获取审批类型数据
      const getBizType = async (surId) => {
        const bizTypeArr = await domesOpTaskFillWayApi({ surId });
        updateSchema({
          field: 'bizType',
          component: 'Select',
          componentProps: {
            loading: false,
            options: bizTypeArr,
            fieldNames: { key: 'bizType', label: 'bizTypeName', value: 'bizType' },
          },
        });
      };

      // 保存
      const validateForm = async () => {
        await validateFields();
        const formData = await getFieldsValue();
        let treeData = [];
        let viewIds = formData.viewIds.map((item) => item.value);
        schemas.forEach((item: any) => {
          if (item.field == 'viewIds') {
            treeData = item.componentProps.treeData;
          }
        });
        let personIds = await flattenPersonId(treeData, viewIds, []);
        formData.personIds = personIds.join(',');
        formData.viewIds = viewIds.join(',');
        formData.beginDate = dayjs(formData.beginDate).format('YYYY-MM-DD');
        formData.endDate = dayjs(formData.endDate).format('YYYY-MM-DD');
        const sendData = {
          id: route.params.type == 'edit' ? route.params.id : undefined,
          ...formData,
        };
        saveLoading.value = true;
        route.params.type == 'edit'
          ? await domesOpTaskEditApi(sendData)
          : await domesOpTaskAddApi(sendData);
        saveLoading.value = false;
        createMessage.success('操作成功');
        goBack(true);
      };

      // 发布
      const validateSend = async () => {
        await validateFields();
        const formData = await getFieldsValue();
        let treeData = [];
        let viewIds = formData.viewIds.map((item) => item.value);
        schemas.forEach((item: any) => {
          if (item.field == 'viewIds') {
            treeData = item.componentProps.treeData;
          }
        });
        let personIds = await flattenPersonId(treeData, viewIds, []);
        formData.personIds = personIds.join(',');
        formData.viewIds = viewIds.join(',');
        formData.beginDate = dayjs(formData.beginDate).format('YYYY-MM-DD');
        formData.endDate = dayjs(formData.endDate).format('YYYY-MM-DD');
        const sendData = {
          id: route.params.type == 'edit' ? route.params.id : undefined,
          ...formData,
        };
        sendLoading.value = true;
        await domesOpTaskPublishApi(sendData);
        sendLoading.value = false;
        createMessage.success('操作成功');
        goBack(true);
      };

      // 取消
      const goBack = (status = false) => {
        close();
        if (status) {
          refreshOtherPage('OpTaskList');
        } else {
          router.push({ name: 'OpTaskList' });
        }
      };

      /**
       * @description: 遍历树型结构数组并返回personId
       * @param {*} arr 需要遍历的数组
       * @param {*} viewIds 选中的id
       * @param {*} ids 返回的人员id数组
       * @return {*} 返回人员id数组
       */
      const flattenPersonId = (arr, viewIds, ids) => {
        let personIds: any = ids;
        for (const item of arr) {
          if (item.children && Array.isArray(item.children)) {
            viewIds.forEach((it) => {
              if (`${item.id}`.indexOf(it) != -1) {
                item.personId && personIds.push(item.personId);
              }
            });
            flattenPersonId(item.children, viewIds, personIds);
          }
        }
        return personIds;
      };

      /**
       * @description: 遍历树型结构数组并返回选中项
       * @param {*} arr 需要遍历的数组
       * @param {*} viewIds 选中的id
       * @param {*} seletRows 返回选中项
       * @return {*} 返回选中项
       */
      const flattenSelect = (arr, viewIds, seletRows) => {
        let personIds: any = seletRows;
        for (const item of arr) {
          if (item.children && Array.isArray(item.children)) {
            item.id = item.parentId ? `${item.parentId}-${item.id}` : item.id;
            item.children.forEach((it) => {
              it.parentId = item.id;
            });
            viewIds.forEach((it) => {
              if (it === item.id) {
                personIds.push({
                  label: item.nodeName,
                  value: item.id,
                  key: item.id,
                });
              }
            });
            flattenSelect(item.children, viewIds, seletRows);
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
        sendLoading,
        saveLoading,
        pageLoading,
        registerForm,
        validateForm,
        validateSend,
        getView,
        goBack,
      };
    },
  });
</script>

<style lang="less">
  .task-form-w {
    width: 50% !important;
  }
</style>
