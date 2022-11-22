<template>
  <PageWrapper class="pb-10" id="pageWrapper" contentFullHeight contentBackground>
    <BasicForm :actionColOptions="{ span: 16 }" @register="registerFive" class="!p-4" />
    <div class="bg-white form-button" style="text-align: right">
      <a-button
        type="primary"
        @click="saveForm(1)"
        :loading="endLoading"
        :disabled="endLoading || saveLoading"
        class="my-4 mr-5"
        >保存并发送</a-button
      >
      <a-button
        type="primary"
        @click="saveForm(0)"
        :loading="saveLoading"
        :disabled="endLoading || saveLoading"
        class="my-4 mr-5"
        >保存</a-button
      >
      <a-button class="my-4 mr-5" @click="goWhere">取消</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { uploadApi } from '/@/api/sys/upload';
  import { PageWrapper } from '/@/components/Page';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { materialSchema1 } from '../config/add';
  import { oamailSaveApi } from '/@/api/doMail/add';
  import { oamailDraftViewApi } from '/@/api/doMail/draft';
  import { oamailSendViewApi } from '/@/api/doMail/send';
  import { oamailReceiveViewApi } from '/@/api/doMail/receive';
  export default defineComponent({
    components: {
      BasicForm,
      PageWrapper,
    },
    setup() {
      const [registerFive, { validateFields, setFieldsValue }] = useForm({
        labelWidth: 100,
        schemas: materialSchema1,
        showActionButtonGroup: false,
      });

      /**
       * 保存/完成课题
       */
      const viewInfo: any = ref({});
      const oldContent = ref('');
      const saveLoading = ref(false);
      const endLoading = ref(false);
      const { createMessage } = useMessage();
      const { close, refreshOtherPage } = useTabs();
      const route = useRoute();
      const router = useRouter();

      // 草稿箱查看
      const getEditView = async () => {
        let res = await oamailDraftViewApi({ id: route.params.id });
        let receiveIds: any = [];
        let receiveIdsArr = res.receiveIds ? res.receiveIds.split(',') : [];
        let receiveNamesArr = res.receiveNames ? res.receiveNames.split(',') : [];
        receiveIdsArr.forEach((item, index) => {
          receiveIds.push({
            label: receiveNamesArr[index],
            value: Number(item),
            key: Number(item),
          });
        });
        let copyIds: any = [];
        let copyIdsArr = res.copyIds ? res.copyIds.split(',') : [];
        let copyNamesArr = res.copyNames ? res.copyNames.split(',') : [];
        copyIdsArr.forEach((item, index) => {
          copyIds.push({ label: copyNamesArr[index], value: Number(item), key: Number(item) });
        });

        let formData = {
          topic: res.topic,
          content: res.content,
          oaAttachment: res.oaAttachmentList,
          copyIds,
          receiveIds,
        };
        setFieldsValue(formData);
      };

      // 发信箱查看
      const getSendView = async () => {
        let res = await oamailSendViewApi({ id: route.params.id });
        let receiveIds: any = [];
        let receiveIdsArr = res.receiveIds ? res.receiveIds.split(',') : [];
        let receiveNamesArr = res.receiveNames ? res.receiveNames.split(',') : [];
        receiveIdsArr.forEach((item, index) => {
          receiveIds.push({
            label: receiveNamesArr[index],
            value: Number(item),
            key: Number(item),
          });
        });
        let copyIds: any = [];
        let copyIdsArr = res.copyIds ? res.copyIds.split(',') : [];
        let copyNamesArr = res.copyNames ? res.copyNames.split(',') : [];
        copyIdsArr.forEach((item, index) => {
          copyIds.push({ label: copyNamesArr[index], value: Number(item), key: Number(item) });
        });

        let formData = {
          topic: res.topic,
          content: res.content,
          oaAttachment: res.oaAttachmentList,
          copyIds,
          receiveIds,
        };
        setFieldsValue(formData);
      };

      // 收信箱查看
      const getReplyView = async () => {
        let res = await oamailReceiveViewApi({ id: route.params.id });
        viewInfo.value = res;
        let receiveIds = [
          {
            label: res.personName,
            value: res.personId,
            key: res.personId,
          },
        ];

        oldContent.value = `
          <p />
          <p />
          <div style="font-size: 12px;">------------ 原始邮件 ------------</div>
          <div style="padding: 8px 21px; line-height: 1.8; white-space: normal; background-color: #f4f4f4;">
            <div style="font-size: 12px;"><strong>发件人</strong>： ${res.personName}</div>
            <div style="font-size: 12px;"><strong>发送时间</strong>： ${res.sendDate}</div>
            <div style="font-size: 12px;"><strong>收件人</strong>： ${
              res.receiveNames ? res.receiveNames : ''
            }</div>
            <div style="font-size: 12px;"><strong>抄送</strong>： ${
              res.copyNames ? res.copyNames : ''
            }</div>
            <div style="font-size: 12px;"><strong>主题</strong>： ${res.topic}</div>
          </div>
          ${res.content}
        `;
        if (route.params.type == 'reply') {
          let topic = `回复：${res.topic}`;
          setFieldsValue({ content: oldContent.value, topic, receiveIds });
        }
        if (route.params.type == 'forward') {
          let topic = `转发：${res.topic}`;
          setFieldsValue({ content: oldContent.value, topic });
        }
      };

      // 保存
      const saveForm = async (type = 0) => {
        const formData = await validateFields();
        let receiveIds: any = [];
        let receiveNames: any = [];
        let copyIds: any = [];
        let copyNames: any = [];
        if (formData.receiveIds && formData.receiveIds.length > 0) {
          formData.receiveIds.forEach((item) => {
            receiveIds.push(item.value);
            receiveNames.push(item.label);
          });
        }
        if (formData.copyIds && formData.copyIds.length > 0) {
          formData.copyIds.forEach((item) => {
            copyIds.push(item.value);
            copyNames.push(item.label);
          });
        }
        const sendData = {
          id: route.params.type == 'edit' ? route.params.id : undefined,
          parentId: route.params.type == 'reply' ? viewInfo.value.id : undefined,
          forwardId: route.params.type == 'forward' ? viewInfo.value.id : undefined,
          isSend: type,
          topic: formData.topic,
          content: formData.content,
          oldContent:
            route.params.type == 'reply' || route.params.type == 'forward'
              ? oldContent.value
              : undefined,
          oaAttachment: formData.oaAttachment
            ? JSON.stringify(formData.oaAttachment)
            : JSON.stringify([]),
          receiveIds: receiveIds.length > 0 ? receiveIds.join(',') : undefined,
          receiveNames: receiveNames.length > 0 ? receiveNames.join(',') : undefined,
          copyIds: copyIds.length > 0 ? copyIds.join(',') : undefined,
          copyNames: copyNames.length > 0 ? copyNames.join(',') : undefined,
        };
        setBthStatus(true, type);
        oamailSave(sendData, type);
      };

      // 保存接口
      const oamailSave = async (data, type) => {
        await oamailSaveApi(data);
        createMessage.success('操作成功');
        setBthStatus(false, type);
        goWhere();
      };

      // loading
      const setBthStatus = (status, type) => {
        if (type == 1) {
          endLoading.value = status;
        } else {
          saveLoading.value = status;
        }
      };

      const goWhere = () => {
        switch (route.params.type) {
          case 'edit':
            goBack(true, 'XcmailDraftList');
            break;
          case 'edit_send':
            goBack(true, 'XcmailSendList');
            break;
          case 'reply':
            goBack(true, 'XcmailReceiveList');
            break;
          case 'forward':
            goBack(true, 'XcmailReceiveList');
            break;

          default:
            close();
            break;
        }
      };

      const goBack = (status = false, name) => {
        close(router.currentRoute.value);
        if (status) {
          refreshOtherPage(name);
        } else {
          router.push({ name });
        }
      };

      // 编辑回填
      onMounted(() => {
        if (route.params.type == 'edit') {
          getEditView();
        }
        if (route.params.type == 'edit_send') {
          getSendView();
        }
        if (route.params.type == 'reply' || route.params.type == 'forward') {
          getReplyView();
        }
      });

      return {
        uploadApi: uploadApi as any,
        saveLoading,
        endLoading,
        registerFive,
        saveForm,
        goWhere,
      };
    },
  });
</script>

<style lang="less" scoped>
  :deep(.ant-anchor-ink::before) {
    background-color: #fff !important;
  }

  .form-button {
    width: 90%;
    padding-top: 20px;
    max-width: 1162px;
  }
</style>
