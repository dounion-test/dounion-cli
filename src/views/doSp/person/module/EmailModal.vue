<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-01 18:16:06
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-11-02 16:30:37
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/AccountModal.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="registerModal"
    :title="modelData.title"
    :width="800"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #letter>
        <div class="cursor-pointer letter-box" v-loading="loadingImg">
          <img
            v-if="letterFile.length > 0"
            @click="handleView"
            class="letter-img"
            :src="imgurl"
            alt=""
          />
          <canvas v-show="false" id="mycanvas" width="620" height="877"></canvas>
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { emailSchemas } from '../config/add';
  import { getAppEnvConfig } from '/@/utils/env';
  import { base64toFile } from '/@/utils/file/base64Conver';
  import { uploadApi } from '/@/api/sys/upload';
  import { createImgPreview } from '/@/components/Preview/index';
  import { dosysSysParameterComboxApi } from '/@/api/common/index';
  import dayjs from 'dayjs';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const modelData: any = ref({ title: '' });
      const viewInfo: any = ref({});
      const imgurl: any = ref('');
      const letterFile: any = ref([]);
      const pictures: any = ref([]);
      const loadingImg = ref(false);
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const { createMessage } = useMessage();

      const [registerForm, { setFieldsValue, resetFields, validateFields, updateSchema }] = useForm(
        {
          labelWidth: 80,
          schemas: emailSchemas,
          showActionButtonGroup: false,
          actionColOptions: {
            span: 23,
          },
        },
      );

      const [registerModal, { closeModal }] = useModalInner(async (data) => {
        modelData.value = data;
        if (modelData.value.type != 4) {
          updateSchema({ field: 'letter', show: false });
        } else {
          updateSchema({ field: 'letter', show: true });
        }
        resetFields();
        getView(data);
      });

      /**
       * @description: 获取邮件模板
       * @param {*} data
       * @param {*} type (1-发送邀请函，2-发布活动，3-取消活动, 4-发电子聘书, 5-活动列表直接发布活动)
       * @return {*}
       */
      const getView = async (data) => {
        let res: any = {};
        switch (modelData.value.type) {
          case 1:
            res = await modelData.value.api({ id: data.id });
            break;
          case 2:
            res = await modelData.value.api(data.data);
            pictures.value = data.data.pictures;
            break;
          case 3:
            res = await modelData.value.api({ id: data.id });
            break;
          case 4:
            loadingImg.value = true;
            res = await modelData.value.api({ id: data.id });
            pictures.value = res.pictures;
            let imgInfo = await dosysSysParameterComboxApi({ keies: 'mes_letter' });
            nextTick(() => {
              drawPhoto(imgInfo, res.receiveNames, res.spNumber);
            });
            break;
          case 5:
            res = await modelData.value.api({ id: data.id });
            break;

          default:
            break;
        }
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
        viewInfo.value = res;
        setFieldsValue(formData);
      };

      const handleSubmit = async () => {
        if (loadingImg.value) {
          createMessage.warning('电子聘书生成中，请稍后再试');
          return false;
        }
        const formData = await validateFields();
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
          pictures.value = [...pictures.value];
          formData.oaAttachment = [...formData.oaAttachment, ...letterFile.value];
        }
        const sendData = {
          id:
            modelData.value.type == 3 || modelData.value.type == 4 || modelData.value.type == 5
              ? modelData.value.id
              : undefined,
          topic: formData.topic,
          content: formData.content,
          letterUrl: modelData.value.type == 4 ? letterUrl : undefined,
          elcLetters:
            modelData.value.type == 4 && letterFile.value.length > 0
              ? JSON.stringify(letterFile.value[0])
              : undefined,
          pictures:
            modelData.value.type == 4 || modelData.value.type == 2
              ? JSON.stringify(pictures.value)
              : undefined,
          oaAttachment: JSON.stringify(formData.oaAttachment),
          receiveIds: receiveIds.length > 0 ? receiveIds.join(',') : undefined,
          receiveNames: receiveNames.length > 0 ? receiveNames.join(',') : undefined,
          copyIds: copyIds.length > 0 ? copyIds.join(',') : undefined,
          copyNames: copyNames.length > 0 ? copyNames.join(',') : undefined,
          certSdate: modelData.value.type == 4 ? viewInfo.value.certSdate : undefined,
          certEdate: modelData.value.type == 4 ? viewInfo.value.certEdate : undefined,
          isListPublish: modelData.value.type == 5 ? 1 : undefined,
        };
        emit('success', sendData, modelData.value);
        closeModal();
      };

      const handleView = () => {
        let imgList: string[] = [];
        letterFile.value.forEach((item) => {
          imgList.push(`${VITE_GLOB_DOFILE_URL}${item.filePath}`);
        });
        // 可以使用createImgPreview返回的 PreviewActions 来控制预览逻辑，实现类似幻灯片、自动旋转之类的骚操作
        createImgPreview({ imageList: imgList, defaultWidth: 450, rememberState: true });
      };

      const drawPhoto = (imgInfo, name, spNumber) => {
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
          imgurl.value = await canvas.toDataURL('image/jpeg');
          // base64转文件流
          let fileRes: any = await uploadApi(
            { file: base64toFile(imgurl.value, '电子聘书'), groupName: '25001-80' },
            function () {},
          );
          letterFile.value = fileRes.data.data;
          loadingImg.value = false;
        };
      };

      return {
        imgurl,
        modelData,
        letterFile,
        loadingImg,
        registerModal,
        registerForm,
        handleSubmit,
        handleView,
      };
    },
  });
</script>

<style lang="less" scoped>
  .letter-box {
    width: 62px;
    min-height: 87px;
    position: relative;
  }

  .letter-img {
    width: 62px;
  }
</style>
