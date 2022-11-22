<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:21:45
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-25 16:36:49
 * @FilePath: /rural-revitalization/src/views/expstore/expert/add.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <a-steps v-model:current="current" size="small" class="expert-steps !mt-5">
      <a-step title="活动公告" />
      <a-step title="行程安排" />
      <a-step title="筛选专家" />
    </a-steps>
    <div>
      <StepsOne v-show="current === 0" ref="StepsOneRef" />
      <StepsTwo v-show="current === 1" ref="StepsTwoRef" />
      <StepsThree v-show="current === 2" ref="StepsThreeRef" />
    </div>
    <div class="bg-white mr-2" style="text-align: right">
      <a-button class="m-3" type="primary" :loading="btnLoading" @click="validateForm"
        >保存</a-button
      >
      <a-button
        v-show="current === 2"
        class="mr-3"
        type="primary"
        :loading="publishBtnLoading"
        @click="publishValidateForm"
        >发布</a-button
      >
      <a-button class="mr-3" @click="goBack()">取消</a-button>
    </div>
    <EmailModal @register="registerModal" @success="handleSuccess" style="width: 700px" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, provide } from 'vue';
  import { Steps } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import EmailModal from '../../person/module/EmailModal.vue';
  import StepsOne from './module/StepsOne.vue';
  import StepsTwo from './module/StepsTwo.vue';
  import StepsThree from './module/StepsThree.vue';
  import {
    spSciActAddApi,
    spSciActViewApi,
    spSciActEditApi,
    spSciActPublishApi,
    spSciActPublishViewApi,
  } from '/@/api/doSp/act/sciAct';
  import { useModal } from '/@/components/Modal';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRoute, useRouter } from 'vue-router';
  import dayjs from 'dayjs';

  export default defineComponent({
    // name: 'SpSciActAdd',
    components: {
      StepsOne,
      StepsTwo,
      StepsThree,
      EmailModal,
      PageWrapper,
      ASteps: Steps,
      AStep: Steps.Step,
    },
    setup() {
      const current = ref(0);
      const btnLoading = ref(false);
      const publishBtnLoading = ref(false);
      const router = useRouter();
      const route = useRoute();
      const editInfo = ref({});
      const { createMessage } = useMessage();
      const { close, refreshOtherPage } = useTabs();
      const [registerModal, { openModal }] = useModal();
      const StepsOneRef = ref<InstanceType<typeof StepsOne>>();
      const StepsTwoRef = ref<InstanceType<typeof StepsTwo>>();
      const StepsThreeRef = ref<InstanceType<typeof StepsThree>>();

      // 编辑-获取数据
      const getView = async () => {
        let res = await spSciActViewApi({ id: route.params.id });
        editInfo.value = res;
        // 回显人物经历
      };

      // 保存/编辑
      const validateForm = async () => {
        await StepsOneRef.value?.validateFields();
        const StepsOneData: any = await StepsOneRef.value?.getFieldsValue();
        const StepsTwoData: any = await StepsTwoRef.value?.getFieldsValue();
        const attendList: any = await StepsThreeRef.value?.attendList;
        const unAttendList: any = await StepsThreeRef.value?.unAttendList;

        if (StepsOneData.pictures) {
          let pictures = StepsOneData.pictures;
          StepsOneData.pictures = pictures.map((item: any) => item.response.data[0]);
        }
        let data = {
          ...StepsOneData,
          ...StepsTwoData,
          acceptList: attendList.map((item) => item.id).join(','),
          unAcceptList: unAttendList.map((item) => item.id).join(','),
        };

        const { startDate, endDate, pictures, planList, announceAttachments } = data;
        data.startDate = dayjs(startDate).format('YYYY-MM-DD');
        data.endDate = dayjs(endDate).format('YYYY-MM-DD');
        data.pictures = pictures ? JSON.stringify(pictures) : JSON.stringify([]);
        data.planList = planList ? JSON.stringify(planList) : JSON.stringify([]);
        data.announceAttachments = announceAttachments
          ? JSON.stringify(announceAttachments)
          : JSON.stringify([]);
        btnLoading.value = true;
        route.params.type == 'edit'
          ? spSciActEdit({ id: route.params.id, ...data })
          : spSciActAdd(data);
      };

      // 发布
      const publishValidateForm = async () => {
        await StepsOneRef.value?.validateFields();
        const StepsOneData: any = await StepsOneRef.value?.getFieldsValue();
        const StepsTwoData: any = await StepsTwoRef.value?.getFieldsValue();
        const attendList: any = await StepsThreeRef.value?.attendList;
        const unAttendList: any = await StepsThreeRef.value?.unAttendList;

        if (StepsOneData.pictures) {
          let pictures = StepsOneData.pictures;
          StepsOneData.pictures = pictures.map((item: any) => item.response.data[0]);
        }
        let data = {
          ...StepsOneData,
          ...StepsTwoData,
          acceptList: attendList.map((item) => item.id).join(','),
          unAcceptList: unAttendList.map((item) => item.id).join(','),
        };

        const { startDate, endDate, pictures, planList, announceAttachments } = data;
        data.startDate = dayjs(startDate).format('YYYY-MM-DD');
        data.endDate = dayjs(endDate).format('YYYY-MM-DD');
        data.pictures = pictures ? pictures : [];
        data.planList = planList ? JSON.stringify(planList) : JSON.stringify([]);
        data.announceAttachments = announceAttachments
          ? JSON.stringify(announceAttachments)
          : JSON.stringify([]);
        if (!data.acceptList) {
          createMessage.warning('请邀请专家');
          return false;
        }
        openModal(true, { title: '发送活动邀请', api: spSciActPublishViewApi, type: 2, data });
      };

      // 新增接口
      const spSciActAdd = async (obj) => {
        await spSciActAddApi(obj);
        btnLoading.value = false;
        goBack(true);
      };

      // 编辑接口
      const spSciActEdit = async (obj) => {
        await spSciActEditApi(obj);
        btnLoading.value = false;
        goBack(true);
      };

      // 发布
      const spSciActPublish = async (obj) => {
        obj.id = route.params.id ? route.params.id : undefined;
        await spSciActPublishApi(obj);
        publishBtnLoading.value = false;
        goBack(true);
      };

      // 发布邮件回调
      const handleSuccess = (sendData, data) => {
        publishBtnLoading.value = true;
        spSciActPublish({
          id: route.params.id ? route.params.id : undefined,
          ...data.data,
          ...sendData,
        });
      };

      // 取消
      const goBack = (status = false) => {
        close(router.currentRoute.value);
        if (status) {
          refreshOtherPage('SpSciActList');
        } else {
          router.push({ name: 'SpSciActList' });
        }
      };

      // 编辑回填
      onMounted(() => {
        if (route.params.type == 'edit') {
          getView();
        }
      });

      provide('editInfo', editInfo);

      return {
        current,
        btnLoading,
        StepsOneRef,
        StepsTwoRef,
        StepsThreeRef,
        publishBtnLoading,
        registerModal,
        validateForm,
        handleSuccess,
        publishValidateForm,
        goBack,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/step-form.less';
</style>
