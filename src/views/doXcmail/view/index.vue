<template>
  <PageWrapper contentBackground contentFullHeight contentClass="!mb-16">
    <div class="email-view-info">
      <h1 class="email-view-title">{{ viewInfo.topic }}</h1>
      <div class="mt-1">
        <span>发件人：</span>
        <span>{{ viewInfo.personName }}</span>
      </div>
      <div class="mt-1">
        <span>收件人：</span>
        <span>{{ viewInfo.receiveNames }}</span>
      </div>
      <div class="mt-1">
        <span>抄　送：</span>
        <span>{{ viewInfo.copyNames }}</span>
      </div>
      <div class="mt-1">
        <span>时　间：</span>
        <span>{{
          viewInfo.sendDate
            ? dayjs(viewInfo.sendDate).format('YYYY-MM-DD HH:mm')
            : dayjs(viewInfo.writeDate).format('YYYY-MM-DD (周dd) HH:mm')
        }}</span>
      </div>
      <div
        class="flex mt-1"
        v-if="viewInfo.oaAttachmentList && viewInfo.oaAttachmentList.length > 0"
      >
        <span>附　件：</span>
        <ul>
          <li v-for="it in viewInfo.oaAttachmentList" :key="it.id" class="email-view-li">
            <div>
              <span>{{ it.fileName }}</span>
              <span style="color: #ccc">（{{ renderSize(it.fileSize) }}）</span>
            </div>
            <span class="email-view-down" @click="handleDownloadByUrl(it)">下载</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-white email-view-content" v-html="viewInfo.content"></div>
    <template #rightFooter>
      <div v-if="viewType == 'receive'">
        <a-button @click="topath('XcmailReceiveReplay', 'reply')" class="mr-2" type="primary"
          >回复</a-button
        >
        <a-button @click="topath('XcmailReceiveForward', 'forward')" class="mr-2" type="primary"
          >转发</a-button
        >
        <a-button @click="handleDelete('receive')" class="mr-2" type="primary" danger
          >删除</a-button
        >
        <a-button @click="goBack">返回</a-button>
      </div>
      <div v-if="viewType == 'draft'">
        <a-button @click="topath('XcmailSendReedit', 'edit')" class="mr-2" type="primary"
          >修改</a-button
        >
        <a-button @click="handleDelete('draft')" class="mr-2" type="primary" danger>删除</a-button>
        <a-button @click="handleDeleteForever('draft')" class="mr-2" type="primary" danger
          >彻底删除</a-button
        >
        <a-button @click="goBack">返回</a-button>
      </div>
      <div v-if="viewType == 'send'">
        <a-button @click="topath('XcmailSendReedit', 'edit_send')" class="mr-2" type="primary"
          >再次编辑</a-button
        >
        <a-button @click="handleDelete('send')" class="mr-2" type="primary" danger>删除</a-button>
        <a-button @click="goBack">返回</a-button>
      </div>
      <div v-if="viewType == 'delete'">
        <a-button @click="handleReload" class="mr-2" type="primary">恢复</a-button>
        <a-button @click="handleDeleteForever('delete')" class="mr-2" type="primary" danger
          >彻底删除</a-button
        >
        <a-button @click="goBack">返回</a-button>
      </div>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { oamailReceiveViewApi, oamailReceiveDeleteApi } from '/@/api/doMail/receive';
  import {
    oamailDraftViewApi,
    oamailDraftDeleteApi,
    oamailDraftDeleteForeverApi,
  } from '/@/api/doMail/draft';
  import { oamailSendViewApi, oamailSendDeleteApi } from '/@/api/doMail/send';
  import { oamailDeleteDeleteForeverApi, oamailDeleteRevertApi } from '/@/api/doMail/delete';
  import { useRoute, useRouter } from 'vue-router';
  import { renderSize } from '/@/utils/file/download';
  import { downloadByUrl } from '/@/utils/file/download';
  import { getAppEnvConfig } from '/@/utils/env';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  export default defineComponent({
    name: 'MailView',
    components: {
      PageWrapper,
    },
    setup() {
      dayjs.locale('zh-cn');
      const route = useRoute();
      const router = useRouter();
      const viewType = ref('');
      const viewInfo: any = ref({});
      const { close, refreshOtherPage } = useTabs();
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const { createMessage, createConfirm } = useMessage();

      // 收件箱-查看
      const getReceiveView = async () => {
        let res = await oamailReceiveViewApi({ id: route.params.id });
        viewInfo.value = res;
        console.log(res, 'getReceiveView');
      };

      // 草稿箱-查看
      const getDraftView = async () => {
        let res = await oamailDraftViewApi({ id: route.params.id });
        viewInfo.value = res;
      };

      // 已发送-查看
      const getSendView = async () => {
        let res = await oamailSendViewApi({ id: route.params.id });
        viewInfo.value = res;
        console.log(res, 'getSendView');
      };

      // 已删除-查看
      const getDeleteView = async () => {
        viewType.value = (route.params.type as string).split('_')[0];
        let viewDeleteType = (route.params.type as string).split('_')[1];
        switch (viewDeleteType) {
          case 'SEND':
            getSendView();
            break;
          case 'RECEIVE':
            getReceiveView();
            break;
          case 'DRAFT':
            getDraftView();
            break;

          default:
            break;
        }
      };

      // 附件下载
      const handleDownloadByUrl = (it) => {
        downloadByUrl({
          fileName: it.fileName,
          url: `${VITE_GLOB_DOFILE_URL}${it.filePath}`,
          target: '_self',
        });
      };

      // 删除
      const handleDelete = (type) => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会删除该邮件, 是否继续?',
          onOk() {
            switch (type) {
              case 'receive':
                console.log('receive');
                emailDelete(oamailReceiveDeleteApi, { ids: route.params.id }, 'XcmailReceiveList');
                break;
              case 'draft':
                console.log('draft');
                emailDelete(oamailDraftDeleteApi, { ids: route.params.id }, 'XcmailDraftList');
                break;
              case 'send':
                emailDelete(oamailSendDeleteApi, { ids: route.params.id }, 'XcmailSendList');
                break;

              default:
                break;
            }
          },
        });
      };

      /**
       * @description: 所有删除操作
       * @param {*} api 接口
       * @param {*} data 接口参数
       * @param {*} routerName 路由名称
       * @return {*}
       */
      const emailDelete = async (api, data, routerName) => {
        await api(data);
        createMessage.success('操作成功');
        close();
        refreshOtherPage(routerName);
      };

      // 彻底删除
      const handleDeleteForever = (type) => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会彻底删除该邮件, 是否继续?',
          onOk() {
            switch (type) {
              case 'draft':
                console.log('draft');
                emailDelete(
                  oamailDraftDeleteForeverApi,
                  { ids: route.params.id },
                  'XcmailDraftList',
                );
                break;
              case 'delete':
                let viewDeleteType = (route.params.type as string).split('_')[1];
                let obj =
                  viewDeleteType === 'RECEIVE'
                    ? { receiveIds: route.params.id }
                    : { sendIds: route.params.id };
                emailDelete(oamailDeleteDeleteForeverApi, obj, 'XcmailDelList');
                break;

              default:
                break;
            }
          },
        });
      };

      /**
       * @description: 所有路由跳转
       * @param {*} routerName 路由名称
       * @param {*} type 路由参数
       * @return {*}
       */
      const topath = (routerName, type) => {
        router.push({ name: routerName, params: { id: route.params.id, type } });
      };

      // 恢复
      const handleReload = () => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会恢复该邮件, 是否继续?',
          onOk() {
            let viewDeleteType = (route.params.type as string).split('_')[1];
            let obj =
              viewDeleteType === 'RECEIVE'
                ? { receiveIds: route.params.id }
                : { sendIds: route.params.id };
            emailDelete(oamailDeleteRevertApi, obj, 'XcmailDelList');
          },
        });
      };

      // 返回
      const goBack = () => {
        close();
      };

      onMounted(() => {
        viewType.value = route.params.type as string;
        switch (viewType.value) {
          case 'receive':
            getReceiveView();
            break;
          case 'draft':
            getDraftView();
            break;
          case 'send':
            getSendView();
            break;

          default:
            getDeleteView();
            break;
        }
      });

      return {
        viewType,
        viewInfo,
        dayjs,
        renderSize,
        handleDownloadByUrl,
        handleDelete,
        handleDeleteForever,
        handleReload,
        topath,
        goBack,
      };
    },
  });
</script>

<style lang="less" scoped>
  .email-view-info {
    padding: 16px;
    border-bottom: 1px solid #d9d9d9;
    background: #f9fcff;
  }

  .email-view-title {
    font-size: @font-size-b4;
  }

  .email-view-li {
    width: 400px;
    display: flex;
    justify-content: space-between;
  }

  .email-view-down {
    color: @primary-color;
    cursor: pointer;
  }

  .email-view-content {
    padding: 16px;
  }

  [data-theme='dark'] {
    .email-view-info {
      background-color: #303030;
      border-color: #555;
    }
  }
</style>
