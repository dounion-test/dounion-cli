<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-13 13:55:35
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-17 17:04:26
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/dynamicsJ/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <a-tabs class="!px-2 dynamics-tabs" v-model:activeKey="activeKey">
      <a-tab-pane :key="1" tab="总文献" class="mb-4">
        <a-row :gutter="15">
          <a-col :span="12">
            <LiteratureLeft />
          </a-col>
          <a-col :span="12">
            <LiteratureRight />
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="增量统计">
        <div class="mb-10"><DocIncrement /></div>
        <div class="mb-4"><LevelIncrement /></div>
      </a-tab-pane>
    </a-tabs>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs, TabPane, Row, Col } from 'ant-design-vue';
  import LiteratureLeft from './module/LiteratureLeft.vue';
  import LiteratureRight from './module/LiteratureRight.vue';
  import DocIncrement from './module/DocIncrement.vue';
  import LevelIncrement from './module/LevelIncrement.vue';

  export default defineComponent({
    name: 'InfoDocReport',
    components: {
      PageWrapper,
      LiteratureLeft,
      LiteratureRight,
      DocIncrement,
      LevelIncrement,
      ATabs: Tabs,
      ATabPane: TabPane,
      ARow: Row,
      ACol: Col,
    },
    setup() {
      const activeKey = ref(1);

      return {
        activeKey,
      };
    },
  });
</script>

<style lang="less">
  .dynamics-tabs {
    .ant-tabs-tab {
      width: 100px;
      justify-content: center;
    }
  }
</style>
