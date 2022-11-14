<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-01 14:11:59
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-07 13:44:54
 * @FilePath: /vben-ucenterF/src/views/doUcenter/person/basicInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-row>
    <a-col :span="16">
      <BasicForm @register="registerOne" :autoFocusFirstItem="true" />
    </a-col>
    <a-col :span="8">
      <div class="change-avatar ml-30">
        <CropperAvatar
          :uploadApi="uploadApi"
          :value="avatar"
          btnText="更换头像"
          :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
          @change="updateAvatar"
          width="150"
          height="150"
          type="10001"
        />
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, watch, nextTick } from 'vue';
  import { CropperAvatar } from '/@/components/Cropper';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas } from '../config/add';
  import { uploadApi } from '/@/api/sys/upload';
  import { Row, Col } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import { getAppEnvConfig } from '/@/utils/env';
  export default defineComponent({
    components: { CropperAvatar, BasicForm, [Row.name]: Row, [Col.name]: Col },
    props: {
      basicFormObj: {
        type: Object,
        default: () => {},
      },
      fillbackImgObj: {
        type: Object,
        default: () => {},
      },
    },
    setup(props) {
      const avatar = ref('');
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const state = reactive<{ imgObj: string | {} }>({
        imgObj: '',
      });
      const [registerOne, { validateFields, getFieldsValue, setFieldsValue }] = useForm({
        labelWidth: 100,
        schemas,
        showResetButton: false,
        showSubmitButton: false,
        actionColOptions: {
          span: 24,
        },
      });
      // 上传头像
      const updateAvatar = (_src, data) => {
        state.imgObj = data?.data[0];
      };
      watch(
        () => props.basicFormObj,
        (val) => {
          nextTick(() => {
            setFieldsValue(cloneDeep(val));
          });
        },
        { immediate: true, deep: true },
      );
      watch(
        () => props.fillbackImgObj,
        (val) => {
          nextTick(() => {
            console.log(val, 'val');
            state.imgObj = val;
            avatar.value = val.filePath ? `${VITE_GLOB_DOFILE_URL}${val.filePath}` : '';
          });
        },
        { immediate: true, deep: true },
      );
      return {
        ...toRefs(state),
        avatar,
        registerOne,
        uploadApi: uploadApi as any,
        updateAvatar,
        validateFields,
        getFieldsValue,
        setFieldsValue,
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
