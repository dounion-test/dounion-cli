<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-14 15:48:13
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 13:31:57
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/expert/expertView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <div v-if="viewInfo && viewInfo.secondLevelNames == '机构'" class="view-con">
      <div
        @click="handleCollect"
        v-if="!viewInfo.isCollect"
        class="flex items-center cursor-pointer collect"
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
      <div class="bg-gray-50 view-left mr-10">
        <img
          class="view-org-img"
          v-if="viewInfo.originalAttachments.length > 0"
          :src="`${VITE_GLOB_DOFILE_URL}${viewInfo.originalAttachments[0].filePath}`"
        />
        <div
          v-if="viewInfo.originalAttachments.length == 0"
          class="view-org-img flex items-center justify-center no-pic"
          ><Icon icon="icon-park-twotone:pic" :size="80" color="#c7c7c7"
        /></div>
        <div class="ml-5 mb-2">机构名称：{{ viewInfo.name }}</div>
        <div class="ml-5 mb-2">所在国家：{{ viewInfo.country || '-' }}</div>
        <div class="ml-5 mb-2">所在地区：{{ viewInfo.arear || '-' }}</div>
        <div class="ml-5 mb-2 whitespace-break-spaces"
          >机构官网：{{ viewInfo.websiteName || '-' }}</div
        >
      </div>
      <div class="flex-1" v-if="viewInfo">
        <div v-if="viewInfo.content" class="mb-4 mt-4" v-html="viewInfo.content"></div>
        <a-empty class="!mt-16" v-if="!viewInfo.content" />
      </div>
    </div>
    <div v-if="viewInfo && viewInfo.secondLevelNames == '专家'" class="view-con">
      <div
        @click="handleCollect"
        v-if="!viewInfo.isCollect"
        class="flex items-center cursor-pointer collect"
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
      <div class="bg-gray-50 view-left mr-10">
        <img
          class="view-img"
          v-if="viewInfo.originalAttachments.length > 0"
          :src="`${VITE_GLOB_DOFILE_URL}${viewInfo.originalAttachments[0].filePath}`"
        />
        <img
          v-if="viewInfo.originalAttachments.length == 0"
          class="view-img"
          :src="defaultAvatar"
        />
        <div class="ml-5 mb-2">姓名：{{ viewInfo.name }}</div>
        <div class="ml-5 mb-2">性别：{{ viewInfo.sexName }}</div>
        <div class="ml-5 mb-2">所在单位：{{ viewInfo.agencyName || '-' }}</div>
        <div class="ml-5 mb-2">单位所在地区：{{ viewInfo.unitLocation || '-' }}</div>
      </div>
      <div class="flex-1">
        <div class="mb-4 mt-4">籍贯：{{ viewInfo.specProvinceName || '-' }}</div>
        <div class="mb-4">出生年月：{{ viewInfo.birthYm || '-' }}</div>
        <div class="mb-4">学位：{{ viewInfo.degreeName || '-' }}</div>
        <div class="mb-4">研究方向：{{ viewInfo.rescDirection || '-' }}</div>
        <div class="mb-4">教育经历：{{ viewInfo.eduExperience || '-' }}</div>
        <div class="mb-4">职称：{{ viewInfo.rank || '-' }}</div>
        <div>职务：{{ viewInfo.position || '-' }}</div>
      </div>
    </div>
    <a-empty v-if="!viewInfo" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Empty } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { domesGeneralInfoViewApi } from '/@/api/doInfo/synthesize/index';
  import { useRoute } from 'vue-router';
  import { Icon } from '/@/components/Icon';
  import { getAppEnvConfig } from '/@/utils/env';
  import defaultAvatar from '/@/assets/images/default-avatar.jpg';
  import {
    domesGeneralInfoCollectApi,
    domesGeneralInfoCollectCancelApi,
  } from '/@/api/doInfo/synthesize/collect';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'GeneralInfoExpertView',
    components: {
      Icon,
      PageWrapper,
      AEmpty: Empty,
    },
    setup() {
      const route = useRoute();
      const viewInfo = ref();
      const { createMessage } = useMessage();
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
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
        defaultAvatar,
        VITE_GLOB_DOFILE_URL,
        handleCollect,
        handleCancelCollect,
      };
    },
  });
</script>

<style lang="less" scoped>
  .view-con {
    display: flex;
    padding: 30px;
    position: relative;
  }

  .collect,
  .collected {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .collected {
    color: @primary-color;
  }

  .view-left {
    width: 300px;
    // height: 364px;
    padding: 40px;
  }

  .view-img {
    width: 120px;
    height: 160px;
    margin: 0 auto;
    margin-bottom: 16px;
  }

  .view-org-img {
    width: 120px;
    margin: 0 auto;
    margin-bottom: 16px;
  }
</style>
