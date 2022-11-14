<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-13 18:11:32
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-24 15:51:13
 * @FilePath: /rural-revitalization/src/views/doSp/act/sciAct/module/UploadFieldWrap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <SlickList axis="xy" v-model:list="fileList" class="flex flex-wrap" :distance="20">
      <SlickItem
        class="fileList-wrap"
        v-for="(file, index) in fileList"
        :key="file.uid"
        :index="index"
      >
        <div
          class="fileList-img"
          :style="{
            'background-image':
              'url(' + VITE_GLOB_DOFILE_URL + file.response?.data[0]?.filePath + ')',
          }"
        >
          <div class="fileList-view" @click.stop>
            <Icon
              class="cursor-pointer"
              :size="16"
              color="#fff"
              icon="ant-design:eye-outlined"
              @click="handleView(file)"
            />
            <Icon
              class="cursor-pointer ml-2"
              :size="16"
              color="#fff"
              icon="ant-design:delete-outlined"
              @click.stop="handleDelete(index)"
            />
          </div>
        </div>
      </SlickItem>
      <a-upload
        v-show="fileList.length < 8"
        class="uploadFieildWrap"
        v-model:file-list="fileList"
        :action="uploadUrl"
        :accept="accept"
        :showUploadList="false"
        list-type="picture-card"
        :data="{ groupName }"
        :multiple="multiple"
        :headers="{ _sgk: token }"
      >
        <div>
          <Icon icon="ant-design:plus-outlined" />
          <div style="margin-top: 8px">{{ t('component.upload.upload') }}</div>
        </div>
      </a-upload>
    </SlickList>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, inject } from 'vue';
  import { Upload } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { SlickList, SlickItem } from 'vue-slicksort';
  import type { UploadProps } from 'ant-design-vue';
  import { getAppEnvConfig } from '/@/utils/env';
  import { getToken } from '/@/utils/auth';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { createImgPreview } from '/@/components/Preview/index';

  export default defineComponent({
    components: {
      Icon,
      SlickList,
      SlickItem,
      AUpload: Upload,
    },
    props: {
      groupName: String,
      field: String,
      // 可上传文件类型
      accept: {
        type: String,
        default: '',
      },
      multiple: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const previewVisible = ref(false);
      const previewImage = ref('');
      const previewTitle = ref('');
      const token = getToken();
      // const token = '521F25EA9B7DCCB58C5C07EE1980849E';
      const editInfo: any = inject('editInfo');
      const { t } = useI18n();
      const { VITE_GLOB_API_DEV_URL, VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const fileList = ref<UploadProps['fileList']>([]);

      const handleCancel = () => {
        previewVisible.value = false;
        previewTitle.value = '';
      };

      const handleView = (file) => {
        let imgList = [`${VITE_GLOB_DOFILE_URL}${file.response?.data[0]?.filePath}`];
        // 可以使用createImgPreview返回的 PreviewActions 来控制预览逻辑，实现类似幻灯片、自动旋转之类的骚操作
        createImgPreview({ imageList: imgList, defaultWidth: 600, rememberState: true });
      };

      const handleDelete = (index) => {
        fileList.value?.splice(index, 1);
      };

      watch(
        () => fileList.value,
        () => {
          emit('change', fileList.value);
        },
      );

      watch(
        () => editInfo,
        () => {
          let pictures = editInfo.value[props.field as string];
          pictures.forEach((item) => {
            fileList.value?.push({
              uid: item.id,
              name: item.fileName,
              status: 'done',
              url: `${VITE_GLOB_DOFILE_URL}${item.filePath}`,
              response: {
                data: [{ ...item }],
              },
            });
          });
          emit('change', fileList.value);
        },
        { deep: true },
      );

      return {
        token,
        previewVisible,
        previewImage,
        fileList,
        uploadUrl: `${VITE_GLOB_API_DEV_URL}/dosys/file/upload`,
        handleCancel,
        previewTitle,
        VITE_GLOB_DOFILE_URL,
        handleView,
        handleDelete,
        t,
      };
    },
  });
</script>

<style lang="less" scoped>
  .uploadFieildWrap {
    width: inherit;
  }

  .fileList-wrap {
    display: inline-block;
    width: 104px;
    height: 104px;
    border: 1px solid #d9d9d9;
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 2px;
  }

  .fileList-img {
    width: 86px;
    height: 86px;
    margin-left: 8px;
    margin-top: 8px;
    background-size: cover;
    background-position: center center;
  }

  .fileList-view {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
  }

  .fileList-wrap:hover {
    .fileList-view {
      opacity: 1;
      transition: 0.2s;
    }
  }

  :deep(.ant-upload-list-item-actions) {
    a {
      display: none;
    }
  }

  [data-theme='dark'] {
    .fileList-wrap {
      border-color: #303030;
    }
  }
</style>
