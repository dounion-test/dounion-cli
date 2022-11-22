<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-14 11:42:59
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 16:25:09
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/dynamicsJ/view.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight>
    <div v-if="viewInfo">
      <a-typography-title :level="4" class="text-center !my-4"
        >【{{ viewInfo.secondLevelNames }}】{{ viewInfo.title }}</a-typography-title
      >
      <a-row :gutter="[10, 0]">
        <a-col v-for="(item, index) in schemasData" :key="index" :span="item.span || 12">
          <div class="view-item flex">
            <span class="label">{{ item.label }}</span>
            <span v-if="item.field == 'keyword'" class="con flex-1">{{
              viewInfo['keywordNames'] || viewInfo['keywordEnNames'] || '-'
            }}</span>
            <span v-else class="con flex-1">{{ viewInfo[item.field] || '-' }}</span>
          </div>
          <a-divider class="!my-3" style="border-color: rgba(0, 0, 0, 0.2)" dashed />
        </a-col>
      </a-row>
      <div class="view-bar my-4">
        <div>全文</div>
        <div
          @click="handleCollect"
          v-if="!viewInfo.isCollect"
          class="flex items-center cursor-pointer"
        >
          <Icon icon="ant-design:star-outlined" />
          <span class="ml-2">收藏</span>
        </div>
        <div
          v-if="viewInfo.isCollect"
          class="flex items-center cursor-pointer collected"
          @click="handleCancelCollect"
        >
          <Icon icon="ant-design:star-filled" />
          <span class="ml-2">已收藏</span>
        </div>
      </div>
      <div v-if="viewInfo.content" class="content" v-html="viewInfo.content"></div>
      <a-empty class="!mt-16" v-if="!viewInfo.content" />
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Typography, Row, Col, Divider, Empty } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Icon } from '/@/components/Icon';
  import { schemasData } from './config/view';
  import { useRoute } from 'vue-router';
  import { domesGeneralInfoViewApi } from '/@/api/doInfo/synthesize/index';
  import {
    domesGeneralInfoCollectApi,
    domesGeneralInfoCollectCancelApi,
  } from '/@/api/doInfo/synthesize/collect';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'GeneralInfoPoliciesView',
    components: {
      Icon,
      PageWrapper,
      ARow: Row,
      ACol: Col,
      ADivider: Divider,
      AEmpty: Empty,
      ATypographyTitle: Typography.Title,
    },
    setup() {
      const route = useRoute();
      const viewInfo = ref();
      const { createMessage } = useMessage();
      const getView = async () => {
        viewInfo.value = await domesGeneralInfoViewApi({ id: route.params.id });
      };
      getView();

      const handleCollect = async () => {
        await domesGeneralInfoCollectApi({ docId: viewInfo.value.id });
        viewInfo.value.isCollect = 1;
        createMessage.success('收藏成功');
      };

      const handleCancelCollect = async () => {
        await domesGeneralInfoCollectCancelApi({ ids: viewInfo.value.id });
        viewInfo.value.isCollect = 0;
        createMessage.success('操作成功');
      };

      return {
        viewInfo,
        schemasData,
        handleCollect,
        handleCancelCollect,
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

  .collected {
    color: @primary-color;
  }

  .view-item {
    .label {
      display: inline-block;
      width: 120px;
      color: #1c1f23;
    }
  }

  [data-theme='dark'] {
    .view-bar {
      background-color: #555;
    }

    .view-item {
      .label {
        color: rgba(255, 255, 255, 0.65);
      }
    }
  }
</style>
