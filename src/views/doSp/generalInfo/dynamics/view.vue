<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-14 11:42:59
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 16:24:38
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/dynamicsJ/view.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight>
    <div v-if="viewInfo">
      <a-typography-title :level="4" class="text-center"
        >【{{ viewInfo.secondLevelNames }}】{{ viewInfo.title }}</a-typography-title
      >
      <div class="view-bar">
        <div>新闻时间：{{ viewInfo.pulishTime }}</div>
        <div>作者：{{ viewInfo.authorNames }}</div>
        <div>来源：{{ viewInfo.sourceMedia }}</div>
      </div>
      <div v-if="viewInfo.content" class="content" v-html="viewInfo.content"></div>
      <a-empty class="!mt-16" v-if="!viewInfo.content" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Typography, Empty } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { useRoute } from 'vue-router';
  import { domesGeneralInfoViewApi } from '/@/api/doInfo/synthesize/index';

  export default defineComponent({
    name: 'GeneralInfoDynamicsView',
    components: {
      PageWrapper,
      AEmpty: Empty,
      ATypographyTitle: Typography.Title,
    },
    setup() {
      const route = useRoute();
      const viewInfo = ref();

      const getView = async () => {
        viewInfo.value = await domesGeneralInfoViewApi({ id: route.params.id });
      };
      getView();

      return {
        viewInfo,
      };
    },
  });
</script>

<style lang="less" scoped>
  .view-bar {
    display: flex;
    justify-content: space-between;
    background: #d9d9d9;
    padding: 10px;
    border-radius: 2px;
  }

  .content {
    word-break: break-all;
    white-space: pre-line;
  }

  [data-theme='dark'] {
    .view-bar {
      background-color: #555;
    }
  }
</style>
