<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:21:45
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-10 14:31:34
 * @FilePath: /rural-revitalization/src/views/expstore/expert/add.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentBackground contentFullHeight>
    <a-steps v-model:current="current" size="small" class="!mt-5 expert-steps">
      <a-step title="基本信息" />
      <a-step title="人物经历" />
      <a-step title="课题/项目" />
      <a-step title="学术成果" />
    </a-steps>
    <div>
      <StepsOne v-show="current === 0" ref="StepsOneRef" />
      <StepsTwo v-show="current === 1" ref="StepsTwoRef" />
      <StepsThree v-show="current === 2" ref="StepsThreeRef" />
      <StepsFour v-show="current === 3" ref="StepsFourRef" />
    </div>
    <div class="text-right form-button">
      <a-button type="primary" @click="handleSave" :loading="saveLoading" class="my-2 mr-5"
        >保存</a-button
      >
      <a-button @click="goBack">取消</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, provide } from 'vue';
  import { Steps } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import StepsOne from './module/StepsOne.vue';
  import StepsTwo from '/@/views/doSp/person/module/StepsTwo.vue';
  import StepsThree from '/@/views/doSp/person/module/StepsThree.vue';
  import StepsFour from '/@/views/doSp/person/module/StepsFour.vue';
  import { spRecordEditApi, spRecordViewApi } from '/@/api/doSp/record';
  import { schemasOne } from './config/add';

  export default defineComponent({
    components: {
      StepsOne,
      StepsTwo,
      StepsThree,
      StepsFour,
      PageWrapper,
      ASteps: Steps,
      AStep: Steps.Step,
    },
    setup() {
      const current = ref(0);
      const router = useRouter();
      const {
        currentRoute: {
          value: {
            params: { type, id },
          },
        },
      } = router;
      const isEdit = type === 'edit';

      //表单验证
      const saveLoading = ref(false);
      const StepsOneRef = ref<InstanceType<typeof StepsOne>>();
      const StepsTwoRef = ref<InstanceType<typeof StepsTwo>>();
      const StepsThreeRef = ref<InstanceType<typeof StepsThree>>();
      const StepsFourRef = ref<InstanceType<typeof StepsFour>>();

      //保存
      const { createMessage } = useMessage();
      const handleSave = async () => {
        await StepsOneRef.value?.validateFields();
        const StepsOneData: any = await StepsOneRef.value?.getFieldsValue();
        const addressForm: any = StepsOneRef.value?.addressForm;

        const jobTitleId: string | undefined = StepsOneRef.value?.jobTitleId.length
          ? StepsOneRef.value?.jobTitleId[StepsOneRef.value?.jobTitleId.length - 1]
          : undefined;
        const otherJobTitle: string | undefined = StepsOneRef.value?.otherJobTitle;

        const position: string | undefined = StepsOneRef.value?.position.length
          ? StepsOneRef.value?.position[StepsOneRef.value?.position.length - 1]
          : undefined;
        const otherPosition: string | undefined = StepsOneRef.value?.otherPosition;

        const schoolList: any = StepsOneRef.value?.schoolList.filter((item) => {
          return item.value;
        });
        if (StepsOneData.pictures) {
          let pictures = StepsOneData.pictures;
          StepsOneData.pictures = pictures?.map((item: any) => item.response.data[0]);
        }

        const StepsTwoData: any = await StepsTwoRef.value?.getFieldsValue();
        StepsTwoData.eduDetailList = StepsTwoData.eduDetailList?.filter((item) => {
          return item.itemContent;
        });
        StepsTwoData.workDetailList = StepsTwoData.workDetailList?.filter((item) => {
          return item.itemContent;
        });
        StepsTwoData.socialDetailList = StepsTwoData.socialDetailList?.filter((item) => {
          return item.itemContent;
        });

        const StepsThreeData: any = await StepsThreeRef.value?.getFieldsValue();
        StepsThreeData.researchFieldList = StepsThreeData.researchFieldList?.filter((item) => {
          return item.itemContent;
        });
        StepsThreeData.subjectList = StepsThreeData.subjectList?.filter((item) => {
          return item.itemContent;
        });
        StepsThreeData.marks = StepsThreeData.marks?.map((item) => {
          return { markId: item.value, markName: item.label };
        });

        const StepsFourData: any = await StepsFourRef.value?.getFieldsValue();
        StepsFourData.sciAchieveList = StepsFourData.sciAchieveList?.filter((item) => {
          return item.itemContent;
        });
        let data = {
          ...StepsOneData,
          ...StepsTwoData,
          ...StepsThreeData,
          ...StepsFourData,
          ...addressForm,
          jobTitleId,
          otherJobTitle,
          position,
          otherPosition,
        };
        const {
          pictures,
          attachments,
          eduDetailList,
          workDetailList,
          socialDetailList,
          researchFieldList,
          subjectList,
          marks,
          sciAchieveList,
        } = data;
        data.id = id;
        data.school = schoolList.map((item) => item.value).join(',');
        data.pictures = pictures ? JSON.stringify(pictures) : JSON.stringify([]);
        data.attachments = attachments ? JSON.stringify(attachments) : JSON.stringify([]);
        data.eduDetailList = JSON.stringify(eduDetailList);
        data.workDetailList = JSON.stringify(workDetailList);
        data.socialDetailList = JSON.stringify(socialDetailList);
        data.researchFieldList = JSON.stringify(researchFieldList);
        data.subjectList = JSON.stringify(subjectList);
        data.marks = JSON.stringify(marks);
        data.sciAchieveList = JSON.stringify(sciAchieveList);
        ApiUrl(data);
      };

      const ApiUrl = async (obj) => {
        saveLoading.value = true;
        await spRecordEditApi(obj);
        createMessage.success('操作成功');
        goBack(true);
        saveLoading.value = false;
      };

      // 取消
      const { closeCurrent, refreshOtherPage } = useTabs();
      const goBack = (status = false) => {
        closeCurrent();
        if (status) {
          refreshOtherPage('MyResumeView');
        } else {
          router.push({ name: 'MyResumeView' });
        }
      };

      // 编辑回填
      onMounted(() => {
        if (isEdit) getView();
      });

      const editInfo = ref({});

      const getView = async () => {
        let res = await spRecordViewApi({});
        editInfo.value = res;
        // 回显基本信息
        let schemasOneData: any = {};
        schemasOne.forEach((item) => {
          schemasOneData[item.field] = res[item.field];
        });
        StepsOneRef.value?.setFieldsValue(schemasOneData);
        // 回显人物经历
      };

      provide('editInfo', editInfo);

      return {
        current,
        saveLoading,
        StepsOneRef,
        StepsTwoRef,
        StepsThreeRef,
        StepsFourRef,
        handleSave,
        goBack,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/step-form.less';
</style>
