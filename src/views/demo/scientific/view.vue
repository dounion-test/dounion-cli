<template>
  <PageWrapper contentBackground contentClass="p-4 flex">
    <div class="w-3/4 xl:w-4/5">
      <div v-for="item in titleArr" :key="item.id" style="width: 85%">
        <a-divider
          orientation="left"
          orientation-margin="16px"
          class="!text-xl !font-bold relative"
          :id="item.id"
        >
          {{ item.label }}
        </a-divider>

        <!-- 入驻记录 -->
        <a-steps
          v-if="item.id == 'declarationRecord'"
          progress-dot
          :current="1"
          class="expert-steps-view !mt-18"
        >
          <a-step title="3月21日" description="发送邀请函" sub-title="2021年" />
          <a-step title="4月21" description="用户注册" />
          <a-step title="5月21" description="申请入驻" />
        </a-steps>
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Row, Col, Divider, Timeline, Steps, Anchor } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { titleArr } from './config/view';
  export default defineComponent({
    name: 'ScientificView',
    components: {
      ADivider: Divider,
      PageWrapper,
      ASteps: Steps,
      AStep: Steps.Step,
    },
    setup() {
      return {
        titleArr,
      };
    },
  });
</script>

<style lang="less" scoped>
  .view-info-label {
    display: inline-block;
    width: 90px;
    font-weight: 700;
    font-size: @font-size-base;
    color: #a1a1a1;
  }

  .view-right-wrap {
    border: 1px solid #d9d9d9;
  }

  .view-right-img {
    width: 100%;
    height: 140px;
  }

  :deep(.ant-col) {
    border-bottom: 1px dashed #d9d9d9;
    padding: 10px 0;
  }

  :deep(.ant-divider-inner-text)::before {
    content: '';
    height: 22px;
    border-left: 12px solid #118af7;
    position: absolute;
    left: 0;
    top: 3px;
  }
</style>
