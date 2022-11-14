<template>
  <div :class="getClass" :style="getStyle">
    <div
      :class="`${prefixCls}-image-wrapper ${prefixCls}-${
        circled ? 'borderRadio50' : 'borderRadio0'
      }`"
      :style="getImageWrapperStyle"
      @click="openModal"
    >
      <div :class="`${prefixCls}-image-mask`" :style="getImageWrapperStyle">
        <Icon
          icon="ant-design:cloud-upload-outlined"
          :size="getIconWidth"
          :style="getImageWrapperStyle"
          color="#d6d6d6"
          v-if="!sourceValue"
        />
      </div>
      <img :src="sourceValue" v-if="sourceValue" />
      <!-- 侵入式-修改 增加一个默认头像 -->
      <!-- <Icon
        v-if="!sourceValue && isRenderAvatar"
        icon="ant-design:user-outlined"
        color="#d6d6d6"
        size="80px"
        style="margin-top: 30px"
      /> -->
    </div>
    <a-button
      :class="`${prefixCls}-upload-btn`"
      @click="openModal"
      v-if="showBtn"
      v-bind="btnProps"
    >
      {{ btnText ? btnText : t('component.cropper.selectImage') }}
    </a-button>

    <CopperModal
      @register="register"
      @upload-success="handleUploadSuccess"
      :uploadApi="uploadApi"
      :src="sourceValue"
      :type="type"
      :circled="circled"
      :options="options"
      :title="title"
      :showCropperPreview="showCropperPreview"
    />
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    computed,
    CSSProperties,
    unref,
    ref,
    watchEffect,
    watch,
    PropType,
  } from 'vue';
  import CopperModal from './CopperModal.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import type { ButtonProps } from '/@/components/Button';
  import Icon from '/@/components/Icon';

  const props = {
    width: { type: [String, Number], default: '200px' },
    value: { type: String },
    /**侵入式-修改 */
    type: { type: String },
    showBtn: { type: Boolean, default: true },
    btnProps: { type: Object as PropType<ButtonProps> },
    btnText: { type: String, default: '' },
    uploadApi: { type: Function as PropType<({ file: Blob, name: string }) => Promise<void>> },
    isRenderAvatar: { type: Boolean, default: true },
    options: { type: Object },
    circled: { type: Boolean, default: true },
    height: { type: [String, Number], default: '200px' },
    showCropperPreview: { type: Boolean, default: true },
    title: { type: String, default: '头像上传' },
  };

  export default defineComponent({
    name: 'CropperAvatar',
    components: { CopperModal, Icon },
    props,
    emits: ['update:value', 'change'],
    setup(props, { emit, expose }) {
      const sourceValue = ref(props.value || '');
      const { prefixCls } = useDesign('cropper-avatar');
      const [register, { openModal, closeModal }] = useModal();
      const { createMessage } = useMessage();
      const { t } = useI18n();

      const getClass = computed(() => [prefixCls]);

      const getWidth = computed(() => `${props.width}`.replace(/px/, '') + 'px');

      const getHeight = computed(() => `${props.height || props.width}`.replace(/px/, '') + 'px');

      const getIconWidth = computed(() => parseInt(`${props.width}`.replace(/px/, '')) / 2 + 'px');

      const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }));

      const getImageWrapperStyle = computed(
        (): CSSProperties => ({ width: unref(getWidth), height: unref(getHeight) }),
      );

      watchEffect(() => {
        sourceValue.value = props.value || '';
      });

      watch(
        () => sourceValue.value,
        (v: string) => {
          emit('update:value', v);
        },
      );

      /**侵入式-修改 */
      function handleUploadSuccess({ source, data }) {
        sourceValue.value = source;
        emit('change', source, data);
        createMessage.success(t('component.cropper.uploadSuccess'));
      }

      expose({ openModal: openModal.bind(null, true), closeModal });

      return {
        t,
        prefixCls,
        register,
        openModal: openModal as any,
        getIconWidth,
        sourceValue,
        getClass,
        getImageWrapperStyle,
        getStyle,
        isRenderAvatar: props.isRenderAvatar,
        handleUploadSuccess,
        options: props.options,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-cropper-avatar';

  .@{prefix-cls} {
    display: inline-block;
    text-align: center;

    &-borderRadio0 {
      border-radius: 0 !important;
    }

    &-image-wrapper {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      background: @component-background;
      border: 1px solid @border-color-base;
      border-radius: 50%;

      img {
        width: 100%;
      }
    }

    &-image-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      border: 0 none;
      cursor: pointer;

      ::v-deep(svg) {
        margin: auto;
        width: 40%;
      }
    }

    &-image-mask:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    &-upload-btn {
      margin: 10px auto;
    }
  }
</style>
