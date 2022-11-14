<template>
  <div :class="prefixCls">
    <CollapseHeader
      :class="isTitleLine ? 'title-line' : ''"
      v-bind="props"
      :prefixCls="prefixCls"
      :show="show"
      @expand="handleExpand"
    >
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #action>
        <slot name="action"></slot>
      </template>
    </CollapseHeader>

    <CollapseTransition :enable="canExpan">
      <Skeleton v-if="loading" :active="loading" />
      <div class="p-4" :class="`${prefixCls}__body`" v-else v-show="show">
        <slot></slot>
      </div>
    </CollapseTransition>
    <div :class="`${prefixCls}__footer`" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { ref } from 'vue';
  import { isNil } from 'lodash-es';
  // component
  import { Skeleton } from 'ant-design-vue';
  import { CollapseTransition } from '/@/components/Transition';
  import CollapseHeader from './CollapseHeader.vue';
  import { triggerWindowResize } from '/@/utils/event';
  // hook
  import { useTimeoutFn } from '/@/hooks/core/useTimeout';
  import { useDesign } from '/@/hooks/web/useDesign';

  const props = defineProps({
    title: { type: String, default: '' },
    loading: { type: Boolean },
    /**
     *  Can it be expanded
     */
    canExpan: { type: Boolean, default: true },
    /**
     * Warm reminder on the right side of the title
     */
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: '',
    },
    /**
     * Whether to trigger window.resize when expanding and contracting,
     * Can adapt to tables and forms, when the form shrinks, the form triggers resize to adapt to the height
     */
    triggerWindowResize: { type: Boolean },
    /**
     * Delayed loading time
     */
    lazyTime: { type: Number, default: 0 },
    isTitleLine: { type: Boolean, default: false },
    show: { type: Boolean, default: true },
  });

  const show = ref(props.show);

  const { prefixCls } = useDesign('collapse-container');

  /**
   * @description: Handling development events
   */
  function handleExpand(val: boolean) {
    show.value = isNil(val) ? !show.value : val;
    if (props.triggerWindowResize) {
      // 200 milliseconds here is because the expansion has animation,
      useTimeoutFn(triggerWindowResize, 200);
    }
  }

  defineExpose({
    handleExpand,
  });
</script>
<style lang="less">
  @name: ~'@{namespace}';
  @prefix-cls: ~'@{namespace}-collapse-container';

  .@{prefix-cls} {
    background-color: @component-background;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;

    &__header {
      display: flex;
      height: 32px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid @border-color-light;
    }

    &__footer {
      border-top: 1px solid @border-color-light;
    }

    &__action {
      display: flex;
      text-align: right;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .title-line {
    .@{name}{
      &-basic-title {
        position: relative;
        padding-left: 16px;
        font-weight: 700;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 4px;
          height: 18px;
          border-left: 8px solid @primary-color;
        }
      }
    }
  }
  @media screen and (max-width: 1537px) {
    .title-line {
      .@{name}{
        &-basic-title {
          &::before {
            height: 16px;
            border-left-width: 6px;
          }
        }
      }
    }
  }
</style>
