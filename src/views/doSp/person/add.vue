<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 14:21:45
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-11-02 17:11:33
 * @FilePath: /rural-revitalization/src/views/expstore/expert/add.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentBackground contentFullHeight v-loading="editLoading">
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
    <div class="form-button flex justify-between">
      <div class="ml-13">
        <a-button v-show="current !== 0" class="m-3 !mr-0" @click="current--">上一步</a-button>
        <a-button v-show="current !== 3" class="m-3" @click="current++">下一步</a-button>
      </div>
      <div>
        <a-button class="m-3" type="primary" :loading="btnLoading" @click="validateForm"
          >保存</a-button
        >
        <a-button class="mr-3" @click="goBack()">取消</a-button>
      </div>
    </div>
    <canvas v-show="false" id="mycanvas" width="620" height="877"></canvas>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, provide, nextTick } from 'vue';
  import { Steps } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import StepsOne from './module/StepsOne.vue';
  import StepsTwo from './module/StepsTwo.vue';
  import StepsThree from './module/StepsThree.vue';
  import StepsFour from './module/StepsFour.vue';
  import {
    spPersonAddApi,
    spPersonViewApi,
    spPersonEditApi,
    spPersonSendLetterApi,
    spPersonSendLetterViewApi,
  } from '/@/api/doSp/person';
  import { dosysSysParameterComboxApi } from '/@/api/common/index';
  import { schemasOne, schemasContactOne } from './config/add';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useRoute, useRouter } from 'vue-router';
  import { getAppEnvConfig } from '/@/utils/env';
  import { base64toFile } from '/@/utils/file/base64Conver';
  import { uploadApi } from '/@/api/sys/upload';
  import dayjs from 'dayjs';

  export default defineComponent({
    name: 'SpPersonAdd',
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
      const btnLoading = ref(false);
      const router = useRouter();
      const route = useRoute();
      const editInfo: any = ref({});
      const editLoading = ref(false);
      const editSpNumber = ref('');
      const formSpNumber = ref('');
      const letterImgurl: any = ref('');
      const letterFile: any = ref([]);
      let editId: any = route.params.id;
      const { close, refreshOtherPage } = useTabs();
      const StepsOneRef = ref<InstanceType<typeof StepsOne>>();
      const StepsTwoRef = ref<InstanceType<typeof StepsTwo>>();
      const StepsThreeRef = ref<InstanceType<typeof StepsThree>>();
      const StepsFourRef = ref<InstanceType<typeof StepsFour>>();
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();

      // 编辑-获取数据
      const getView = async () => {
        editLoading.value = true;
        let res = await spPersonViewApi({ id: route.params.id });
        editInfo.value = res;
        // 回显基本信息
        let schemasOneData: any = {};
        schemasOne.forEach((item) => {
          if (item.field == 'nature') {
            schemasOneData[item.field] = '1';
          } else if (item.field == 'spNumber') {
            editSpNumber.value = editInfo.value.spNumber;
            let spNumber = editInfo.value.spNumber ? editInfo.value.spNumber.substring(7) : '';
            schemasOneData[item.field] = spNumber;
          } else {
            schemasOneData[item.field] = res[item.field];
          }
        });
        // 回显联系信息
        let schemasContactOneData: any = {};
        schemasContactOne.forEach((item) => {
          schemasContactOneData[item.field] = res[item.field];
        });
        schemasOneData.isEdit = 1;
        StepsOneRef.value?.setFieldsValue(schemasOneData);
        StepsOneRef.value?.contactSetFieldsValue(schemasContactOneData);
        editLoading.value = false;
      };

      // 点击保存
      const validateForm = async () => {
        await StepsOneRef.value?.validateFields();
        const StepsOneData: any = await StepsOneRef.value?.getFieldsValue();
        const StepsOneContactData: any = await StepsOneRef.value?.contactValidateFields();
        btnLoading.value = true;
        const natureForm: any = StepsOneRef.value?.natureForm;
        const addressForm: any = StepsOneRef.value?.addressForm;

        const jobTitleId: string | undefined =
          StepsOneRef.value?.jobTitleId.length > 0
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
        const StepsTwoData: any = await StepsTwoRef.value?.getFieldsValue();
        const StepsThreeData: any = await StepsThreeRef.value?.getFieldsValue();
        const StepsFourData: any = await StepsFourRef.value?.getFieldsValue();
        if (StepsOneData.pictures) {
          let pictures = StepsOneData.pictures;
          StepsOneData.pictures = pictures.map((item: any) => item.response.data[0]);
        }
        if (StepsOneData.spNumber) {
          let spNumber = StepsOneRef.value?.spNumberPrefix + StepsOneData.spNumber;
          StepsOneData.spNumber = spNumber;
          formSpNumber.value = spNumber;
        }
        StepsTwoData.eduDetailList = StepsTwoData.eduDetailList.filter((item) => {
          return item.itemContent;
        });
        StepsTwoData.workDetailList = StepsTwoData.workDetailList.filter((item) => {
          return item.itemContent;
        });
        StepsTwoData.socialDetailList = StepsTwoData.socialDetailList.filter((item) => {
          return item.itemContent;
        });
        StepsThreeData.researchFieldList = StepsThreeData.researchFieldList.filter((item) => {
          return item.itemContent;
        });
        StepsThreeData.subjectList = StepsThreeData.subjectList.filter((item) => {
          return item.itemContent;
        });
        StepsThreeData.marks = StepsThreeData.marks?.map((item) => {
          return { markId: item.value, markName: item.label };
        });
        StepsFourData.sciAchieveList = StepsFourData.sciAchieveList.filter((item) => {
          return item.itemContent;
        });
        let data = {
          ...StepsOneData,
          ...StepsOneContactData,
          ...StepsTwoData,
          ...StepsThreeData,
          ...StepsFourData,
          ...addressForm,
          ...natureForm,
          jobTitleId,
          otherJobTitle,
          position,
          otherPosition,
        };
        data.school = schoolList.map((item) => item.value).join(',');
        data.pictures = data.pictures ? JSON.stringify(data.pictures) : JSON.stringify([]);
        data.attachments = data.attachments ? JSON.stringify(data.attachments) : JSON.stringify([]);
        data.eduDetailList = JSON.stringify(data.eduDetailList);
        data.workDetailList = JSON.stringify(data.workDetailList);
        data.socialDetailList = JSON.stringify(data.socialDetailList);
        data.researchFieldList = JSON.stringify(data.researchFieldList);
        data.subjectList = JSON.stringify(data.subjectList);
        data.marks = JSON.stringify(data.marks);
        data.sciAchieveList = JSON.stringify(data.sciAchieveList);
        data.spType = '52034-10'; //专家类型（固定值）
        data.sourceType = '52001-20'; //数据来源（固定值）
        route.params.type == 'edit'
          ? spPersonEdit({ id: route.params.id, ...data })
          : spPersonAdd(data);
      };

      // 新增接口
      const spPersonAdd = async (obj) => {
        try {
          await spPersonAddApi(obj);
          goBack(true);
        } catch (error) {
          btnLoading.value = false;
        }
      };

      // 编辑接口
      const spPersonEdit = async (obj) => {
        try {
          await spPersonEditApi(obj);
          if (formSpNumber.value && formSpNumber.value != editSpNumber.value) {
            await reviseLetter();
          }
          goBack(true);
        } catch (error) {
          btnLoading.value = false;
        }
      };

      // 修改电子聘书
      const reviseLetter = async () => {
        let res = await spPersonSendLetterViewApi({ id: editId });
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
          certSdate: res.certSdate,
          certEdate: res.certEdate,
        };
        let imgInfo = await dosysSysParameterComboxApi({ keies: 'mes_letter' });
        nextTick(() => {
          drawPhoto(imgInfo, res.receiveNames, res.spNumber, formData);
        });
      };

      const drawPhoto = (imgInfo, name, spNumber, formData) => {
        let nameWidth = 795;
        switch (name.length) {
          case 1:
            nameWidth = 188;
            break;
          case 2:
            nameWidth = 935;
            break;
          case 3:
            nameWidth = 908;
            break;
          case 4:
            nameWidth = 870;
            break;
          case 5:
            nameWidth = 833;
            break;
          default:
            break;
        }
        let canvas: any = document.getElementById('mycanvas'); //创建canvas
        let context = canvas.getContext('2d'); //创建画布
        let img = new Image(); //因为拿不到图片静态资源，所以创建图片标签
        img.setAttribute('crossOrigin', 'anonymous'); //解决图片跨域问题,也要放到赋值前，否ze大部分浏览器会报错
        img.src = `${VITE_GLOB_DOFILE_URL}${imgInfo[0].value}`;
        //加载图片
        img.onload = async () => {
          canvas.setAttribute('width', img.width);
          canvas.setAttribute('height', img.height);
          //绘制图片
          context.drawImage(img, 0, 0, img.width, img.height);
          //字体大小
          context.font = 'bold 75px 微软雅黑';
          //字体文字，显示位置  图片上需要n个文字就写n个context.fillText(文字,左右,上下);
          context.fillText(name, nameWidth, 1690);
          context.fillText('兹聘请____________同志担任上海市乡村振兴', 570, 1700);
          context.fillText('研究中心“乡村振兴专家库”专家，聘期三年。', 430, 1820);
          context.fillText(dayjs().format('YYYY年MM月DD日'), 1400, 2770);
          context.font = '50px 微软雅黑';
          context.fillStyle = 'white';
          context.fillText(`聘书编号：${spNumber}`, 935, 3000);
          //合成图
          letterImgurl.value = await canvas.toDataURL('image/jpeg');
          // base64转文件流
          let fileRes: any = await uploadApi(
            { file: base64toFile(letterImgurl.value, '电子聘书'), groupName: '25001-80' },
            function () {},
          );
          letterFile.value = fileRes.data.data;
          sendLetter(formData);
        };
      };

      const sendLetter = async (formData) => {
        let receiveIds: any = [];
        let receiveNames: any = [];
        let copyIds: any = [];
        let copyNames: any = [];
        let letterUrl = '';
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
        if (letterFile.value.length > 0) {
          letterUrl = letterFile.value[0].filePath;
          formData.oaAttachment = [...formData.oaAttachment, ...letterFile.value];
        }
        const sendData = {
          id: editId,
          topic: formData.topic,
          content: formData.content,
          letterUrl: letterUrl,
          elcLetters: letterFile.value.length > 0 ? JSON.stringify(letterFile.value[0]) : undefined,
          oaAttachment: JSON.stringify(formData.oaAttachment),
          receiveIds: receiveIds.length > 0 ? receiveIds.join(',') : undefined,
          receiveNames: receiveNames.length > 0 ? receiveNames.join(',') : undefined,
          copyIds: copyIds.length > 0 ? copyIds.join(',') : undefined,
          copyNames: copyNames.length > 0 ? copyNames.join(',') : undefined,
          certSdate: formData.certSdate,
          certEdate: formData.certEdate,
        };
        await spPersonSendLetterApi(sendData);
      };

      // 取消
      const goBack = (status = false) => {
        close(router.currentRoute.value);
        if (status) {
          refreshOtherPage('SpPersonList');
        } else {
          router.push({ name: 'SpPersonList' });
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
        editLoading,
        btnLoading,
        StepsOneRef,
        StepsTwoRef,
        StepsThreeRef,
        StepsFourRef,
        validateForm,
        goBack,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/step-form.less';
</style>
