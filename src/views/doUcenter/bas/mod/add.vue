<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-26 16:59:44
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-07 11:17:37
 * @FilePath: /rural-revitalization/src/views/doUcenter/messageTemplate/add.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentBackground class="pb-10">
    <BasicForm :actionColOptions="{ span: 16 }" @register="registerForm" class="w-2/3 !p-4" />
    <template #rightFooter>
      <a-button type="primary" @click="saveForm" :loading="saveLoading" class="my-2 mr-5"
        >保存</a-button
      >
      <a-button @click="goBack()">取消</a-button>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas } from './config/add';
  import { ucenterCodeCombox } from '/@/api/common/index';
  import {
    doremindBasMsgConfigSaveApi,
    doremindBasMsgConfigViewApi,
  } from '/@/api/doRemind/messageTemplate';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRouter, useRoute } from 'vue-router';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicForm,
    },
    setup() {
      const saveLoading = ref(false);
      const router = useRouter();
      const route = useRoute();
      const { createMessage } = useMessage();
      const { close, refreshOtherPage } = useTabs();
      const sendType: any = ref([]);
      const templateMap = new Map();
      const [registerForm, { validateFields, setFieldsValue, appendSchemaByField }] = useForm({
        labelWidth: 120,
        schemas,
        showActionButtonGroup: false,
      });

      const getUcenterCodeCombox = async () => {
        let res = await ucenterCodeCombox({ type: '10001-10042' });
        res.list.forEach((item) => {
          appendSchemaByField(
            {
              field: `${item.value}-title`,
              component: 'Input',
              label: `${item.name}模板标题`,
              colProps: {
                span: 13,
              },
            },
            '',
          );
          appendSchemaByField(
            {
              field: `${item.value}-content`,
              component: 'InputTextArea',
              label: `${item.name}模板内容`,
              colProps: {
                span: 24,
              },
              componentProps: {
                showCount: true,
                maxlength: '100',
              },
            },
            '',
          );
          templateMap.set(item.value, {
            titleKey: `${item.value}-title`,
            contentKey: `${item.value}-content`,
            name: item.name,
          });
          sendType.value.push(item.value);
        });
      };
      getUcenterCodeCombox();

      // 保存
      const saveForm = async () => {
        const formData = await validateFields();
        saveLoading.value = true;
        // 重组数据
        let configs: any = [];
        for (let [key, value] of templateMap) {
          let keysMap = new Map();
          Object.keys(formData)?.forEach((item) => {
            if (item.indexOf(key) != -1) {
              keysMap.set(item, formData[item]);
              delete formData[item];
            }
          });
          let obj = {};
          Object.keys(value)?.forEach((item) => {
            obj[item] = keysMap.get(value[item]);
          });

          configs.push({
            sendType: key,
            ...obj,
          });
        }
        const sendData = {
          bizType: formData.bizType,
          name: formData.name,
          orgId: formData.orgId.value,
          orgName: formData.orgId.label,
          configs: JSON.stringify(configs),
        };
        await doremindBasMsgConfigSaveApi(sendData);
        createMessage.success('操作成功');
        saveLoading.value = false;
        goBack(true);
      };

      const getView = async () => {
        let res = await doremindBasMsgConfigViewApi({ bizType: route.params.id });
        console.log('res', res);
        const formData = {
          bizType: res.bizType,
          name: res.name,
          orgId: {
            label: res.orgName,
            value: res.orgId,
            key: res.orgId,
          },
        };
        res.list.forEach((item) => {
          let title = `${item.sendType}-title`;
          let content = `${item.sendType}-content`;
          formData[title] = item.titleKey;
          formData[content] = item.contentKey;
        });
        setFieldsValue(formData);
      };

      // 取消
      const goBack = (status = false) => {
        close();
        if (status) {
          refreshOtherPage('MessageTemplate');
        } else {
          router.push({ name: 'MessageTemplate' });
        }
      };

      onMounted(() => {
        if (route.params.type == 'edit') {
          getView();
        }
      });

      return {
        saveLoading,
        registerForm,
        saveForm,
        goBack,
      };
    },
  });
</script>

<style scoped></style>
