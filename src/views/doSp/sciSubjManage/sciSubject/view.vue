<template>
  <PageWrapper contentFullHeight contentBackground contentClass="p-4">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="19">
        <div v-for="item in titleArr" :key="item.id" style="width: 94%">
          <a-divider
            orientation="left"
            orientation-margin="16px"
            class="!font-bold title-bar"
            :id="item.id"
          >
            {{ item.label }}
          </a-divider>

          <!-- 立项 -->
          <div v-if="item.id == 'topic'" class="pl-5">
            <div class="line-box">
              <span class="line-title">基本信息</span>
              <div class="line"></div>
            </div>

            <Description class="mt-4" :column="2" :data="viewData" :schema="viewSchemaOne" />

            <div class="line-box mt-5 mb-5">
              <span class="line-title">需要的材料</span>
              <div class="line"></div>
            </div>

            <div class="pl-5" v-html="viewData.projectContent"></div>

            <div class="line-box mt-5 mb-5">
              <span class="line-title">上传的材料</span>
              <div class="line"></div>
            </div>

            <ViewFile class="pl-5" :fileList="viewData.projectAttachments" />
          </div>

          <!-- 咨询 -->
          <div v-if="item.id == 'consult'" class="pl-5">
            <div class="line-box mt-5 mb-5">
              <span class="line-title">需要的材料</span>
              <div class="line"></div>
            </div>

            <div class="pl-5" v-html="viewData.reviewContent"></div>

            <div class="line-box mt-5 mb-5">
              <span class="line-title">上传的材料</span>
              <div class="line"></div>
            </div>

            <ViewFile class="pl-5" :fileList="viewData.reviewAttachments" />
          </div>

          <!-- 开题 -->
          <div v-if="item.id == 'kaiti'" class="pl-5">
            <div class="line-box mt-5 mb-5">
              <span class="line-title">需要的材料</span>
              <div class="line"></div>
            </div>

            <div class="pl-5" v-html="viewData.openContent"></div>

            <div class="line-box mt-5 mb-5">
              <span class="line-title">上传的材料</span>
              <div class="line"></div>
            </div>

            <ViewFile class="pl-5" :fileList="viewData.openAttachments" />
          </div>

          <!-- 中期检查 -->
          <div v-if="item.id == 'inspection'" class="pl-5">
            <div class="line-box mt-5 mb-5">
              <span class="line-title">需要的材料</span>
              <div class="line"></div>
            </div>

            <div class="pl-5" v-html="viewData.midCheckContent"></div>

            <div class="line-box mt-5 mb-5">
              <span class="line-title">上传的材料</span>
              <div class="line"></div>
            </div>

            <ViewFile class="pl-5" :fileList="viewData.midCheckAttachments" />
          </div>

          <!-- 变更 -->
          <div v-if="item.id == 'change'" class="pl-5">
            <div class="line-box mt-5 mb-5">
              <span class="line-title">需要的材料</span>
              <div class="line"></div>
            </div>

            <div class="pl-5" v-html="viewData.changeContent"></div>

            <div class="line-box mt-5 mb-5">
              <span class="line-title">变更叙述</span>
              <div class="line"></div>
            </div>

            <div class="line-box mt-5 mb-5">
              <span class="line-title">上传的材料</span>
              <div class="line"></div>
            </div>

            <ViewFile class="pl-5" :fileList="viewData.changeAttachments" />
          </div>

          <!-- 结题归档 -->
          <div v-if="item.id == 'placeOnFile'" class="pl-5">
            <div class="line-box mt-5 mb-5">
              <span class="line-title">需要的材料</span>
              <div class="line"></div>
            </div>

            <div class="pl-5" v-html="viewData.archiveContent"></div>

            <div class="line-box mt-5 mb-5">
              <span class="line-title">上传的结题、归档材料</span>
              <div class="line"></div>
            </div>

            <ViewFile class="pl-5" :fileList="viewData.archiveAttachments" />
          </div>
        </div>
      </a-col>
      <a-col :span="5">
        <div class="mb-10 annex-wrap">
          <div class="annex-pic" v-if="viewData.projectPictureFile">
            <img
              v-if="getImgUrl(viewData.projectPictureFile)"
              :src="getImgUrl(viewData.projectPictureFile)"
            />
            <template v-else>
              <div class="flex items-center justify-center no-pic"><img :src="logo" /></div>
            </template>
            <div class="my-2 ml-2">
              <Icon icon="et:pictures" />
              <span class="ml-1">课题图片</span>
            </div>
          </div>
          <template v-else>
            <div class="flex items-center justify-center no-pic"
              ><Icon icon="icon-park-twotone:pic" :size="60" /></div
            ><div class="my-2 ml-2">
              <Icon icon="et:pictures" />
              <span class="ml-1">暂无概述图</span>
            </div>
          </template>
        </div>
        <a-anchor
          @click="handleClick"
          :get-container="getContainer"
          :offsetTop="100"
          style="width: 100%"
        >
          <a-anchor-link
            v-for="item in titleArr"
            :key="item.id"
            :href="`#${item.id}`"
            :title="item.label"
          />
        </a-anchor>
      </a-col>
    </a-row>

    <template #rightFooter>
      <a-button @click="goBack">返回</a-button>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, nextTick } from 'vue';
  import { Row, Col, Divider, Anchor } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { viewSchemaOne, titleArr } from './config/view';
  import { Description } from '/@/components/Description/index';
  import { spSciSubjectView } from '/@/api/testDemo/scientific';
  import { useRoute, useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import ViewFile from './modules/viewFile.vue';
  import type { AnchorProps } from 'ant-design-vue';
  import logo from '/@/assets/images/logo.png';
  export default defineComponent({
    name: 'SpSciSubjectView',
    components: {
      ADivider: Divider,
      PageWrapper,
      Description,
      AAnchor: Anchor,
      AAnchorLink: Anchor.Link,
      ViewFile,
      ARow: Row,
      ACol: Col,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const viewData = ref<Recordable>({});
      const loading = ref(false);
      const { close } = useTabs();
      const getImgUrl = (fileList) => {
        if (!fileList || !fileList?.length) return '';
        return '/dofile' + fileList[0]?.filePath;
      };
      const handleClick: AnchorProps['onClick'] = (e, link) => {
        e.preventDefault();
      };
      const getContainer = (): HTMLElement => {
        return document.querySelector(`.layouts-scroll .scrollbar__wrap`) as HTMLElement;
      };
      const goBack = () => {
        router.go(-1);

        close(router.currentRoute.value);
      };

      onMounted(() => {
        spSciSubjectView({ id: route.params.id }).then((res) => {
          // 处理附件
          loading.value = true;
          nextTick(() => (viewData.value = res));
        });
      });
      return {
        viewData,
        titleArr,
        viewSchemaOne,
        loading,
        logo,
        getImgUrl,
        handleClick,
        getContainer,
        goBack,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/view-info.less';

  .view-right-wrap {
    border: 1px solid #d9d9d9;
  }

  .view-right-img {
    width: 100%;
    height: 140px;
  }

  :deep(.ant-col) {
    padding: 10px 0;
  }
</style>

<style lang="less">
  .line-box {
    display: flex;
    align-items: center;

    .line {
      border-top: 1px dashed #ccc;
      width: 100%;
      flex: 1;
      margin-left: 10px;
    }
  }

  .view-right-wrap {
    border: 1px solid #d9d9d9;
  }

  .view-right-img {
    width: 100%;
    height: 140px;
  }
</style>
