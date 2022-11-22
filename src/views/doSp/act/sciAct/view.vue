<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 17:59:26
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-12 17:07:38
 * @FilePath: /rural-revitalization/src/views/expstore/expert/view.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentBackground contentClass="p-4 flex">
    <a-row :gutter="16" style="width: 100%">
      <a-col class="gutter-row" :span="19">
        <div class="title-info">
          <!-- 基本信息 -->
          <h2>【{{ editInfo.categoryTypeName }}】{{ editInfo.name }}</h2>
          <p>特邀专家：{{ editInfo.invents || '-' }}</p>
          <p
            ><Icon class="mr-1" icon="bxs:map" />举办日期：{{ editInfo.startDate }} 至
            {{ editInfo.endDate }}</p
          >
        </div>
        <div v-for="item in titleArr" :key="item.id">
          <a-divider
            :id="item.id"
            orientation="left"
            orientation-margin="16px"
            class="!font-bold title-bar"
            >{{ item.label }}</a-divider
          >
          <!-- 活动公告 -->
          <template v-if="item.id == 'actContent'">
            <div class="indent-lg m-4" v-if="editInfo[item.id]" v-html="editInfo[item.id]"></div>
            <a-empty :image="simpleImage" v-else />
          </template>

          <!-- 活动回顾、活动成果 -->
          <div v-if="item.id == 'reviewContent' || item.id == 'achieveContent'">
            <div v-if="editInfo[item.id]" class="m-4" v-html="editInfo[item.id]"></div>
            <a-empty :image="simpleImage" v-else />
          </div>

          <!-- 行程安排 -->
          <template v-if="item.id == 'planList'">
            <a-list class="m-2 list-box" size="small" :data-source="editInfo.planList">
              <template #renderItem="{ item, index }">
                <a-list-item
                  >{{ index + 1 }}、{{ item.actDate }}&nbsp;{{ item.actStime }}：{{
                    item.content
                  }}</a-list-item
                >
              </template>
            </a-list>
          </template>
          <!-- 附件 -->
          <div
            class="m-4"
            v-if="
              item.id == 'achieveContent' &&
              editInfo.summaryAttachments &&
              editInfo.summaryAttachments.length
            "
          >
            <a-divider orientation="left" orientation-margin="0">附件信息</a-divider>
            <ul class="pl-4 downlink">
              <li
                v-for="annex in editInfo.summaryAttachments"
                :key="annex.id"
                @click="handleDownloadByUrl(annex)"
              >
                <span>{{ annex.fileName }}</span>
                <a class="link">下载</a>
              </li>
            </ul>
          </div>

          <div
            class="m-4"
            v-if="
              item.id == 'planList' &&
              editInfo.announceAttachments &&
              editInfo.announceAttachments.length
            "
          >
            <a-divider orientation="left" orientation-margin="0">附件信息</a-divider>
            <ul class="pl-4 downlink">
              <li
                v-for="annex in editInfo.announceAttachments"
                :key="annex.id"
                @click="handleDownloadByUrl(annex)"
              >
                <span>{{ annex.fileName }}</span>
                <a class="link">下载</a>
              </li>
            </ul>
          </div>

          <!-- 专家表现评价 -->
          <div class="m-4" v-if="item.id == 'gradeList'">
            <ul v-if="editInfo.gradeList && editInfo.gradeList.length">
              <li v-for="(it, j) in editInfo.gradeList" :key="j">
                <span class="mr-4">{{ j + 1 }}、{{ it.name }}</span>
                <span class="mr-2">{{ it.score }}</span>
                <span>分</span>
              </li>
            </ul>
            <a-empty :image="simpleImage" v-else />
          </div>

          <!-- 专家反馈 -->
          <div class="m-4" v-if="item.id == 'feedbackContent'">
            <ul v-if="editInfo.feedbackList && editInfo.feedbackList.length">
              <li class="mb-4" v-for="(it, index) in editInfo.feedbackList" :key="index">
                <div class="text-xl font-bold mb-4" style="color: #999">{{ it.name }}</div>
                <div>{{ it.backContent }}</div>
              </li>
            </ul>
            <a-empty :image="simpleImage" v-else />
          </div>
        </div>

        <!-- 上一篇/下一篇 -->
        <div class="ml-4 mt-8">
          <div v-if="editInfo.lastPage && editInfo.lastPage.name"
            ><span>上一篇</span>：<a
              href="javascript:void()"
              @click="handlePage(editInfo.lastPage.id)"
              >【{{ editInfo.lastPage.categoryTypeName }}】{{ editInfo.lastPage.name }}</a
            ></div
          >
          <div v-if="editInfo.nextPage && editInfo.nextPage.name"
            ><span>下一篇</span>：<a
              href="javascript:void()"
              @click="handlePage(editInfo.nextPage.id)"
              >【{{ editInfo.nextPage.categoryTypeName }}】{{ editInfo.nextPage.name }}</a
            ></div
          >
        </div>
      </a-col>
      <a-col :span="5">
        <div class="mb-10 annex-wrap">
          <div
            @click="openImg(editInfo.pictures)"
            v-if="editInfo.pictures && editInfo.pictures.length"
            class="annex-pic"
          >
            <img :src="`${VITE_GLOB_DOFILE_URL}${editInfo.pictures[0].filePath}`" />
            <div class="my-2 ml-2">
              <Icon icon="et:pictures" />
              <span class="ml-1">活动图集 （{{ editInfo.pictures.length }}张）</span>
            </div>
          </div>
          <template v-else>
            <div class="flex items-center justify-center no-pic"
              ><Icon icon="icon-park-twotone:pic" :size="60" /></div
            ><div class="my-2 ml-2">
              <Icon icon="et:pictures" />
              <span class="ml-1">暂无活动图集</span>
            </div>
          </template>
        </div>
        <a-anchor
          @click="handleClick"
          :get-container="getContainerBox"
          :offsetTop="80"
          style="width: 100%"
        >
          <a-anchor-link
            :href="`#${item.id}`"
            :title="item.label"
            v-for="item in titleArr"
            :key="item.id"
          >
            <a-anchor-link
              :href="`#${it.id}`"
              :title="it.label"
              v-for="it in item.children"
              :key="it.id"
            />
          </a-anchor-link>
        </a-anchor>
      </a-col>
    </a-row>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Row, Col, Divider, Anchor, AnchorLink, List, ListItem, Empty } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Icon } from '/@/components/Icon';
  import { titleArr } from './config/view';
  import type { AnchorProps } from 'ant-design-vue';
  import { spSciActViewApi } from '/@/api/doSp/act/sciAct';
  import { useRoute, useRouter } from 'vue-router';
  import { getAppEnvConfig } from '/@/utils/env';
  import { downloadByUrl } from '/@/utils/file/download';
  import { createImgPreview } from '/@/components/Preview/index';
  import { useLoading } from '/@/components/Loading';

  export default defineComponent({
    name: 'SpSciActView',
    components: {
      Icon,
      PageWrapper,
      ADivider: Divider,
      AAnchor: Anchor,
      AAnchorLink: AnchorLink,
      ARow: Row,
      ACol: Col,
      AList: List,
      AListItem: ListItem,
      AEmpty: Empty,
    },
    setup() {
      const editInfo: any = ref({});
      const route = useRoute();
      const router = useRouter();
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const [openFullLoading, closeFullLoading] = useLoading({});
      const searchParams = JSON.parse(
        sessionStorage.getItem(`SCIACT_STATE_${route.params.id}`) as string,
      );

      const handleClick: AnchorProps['onClick'] = (e, link) => {
        e.preventDefault();
        console.log(link, 'link');
      };

      const getContainerBox = () => {
        return document.querySelector(`.layouts-scroll .scrollbar__wrap`) as any;
      };

      const handleDownloadByUrl = (it) => {
        downloadByUrl({
          fileName: it.fileName,
          url: `${VITE_GLOB_DOFILE_URL}${it.filePath}`,
          target: '_self',
        });
      };

      const getView = async () => {
        openFullLoading();
        let params = {
          id: route.params.id,
          pageNo: searchParams.pageNo,
          pageSize: searchParams.pageSize,
          ...searchParams.searchParams,
        };
        let res = await spSciActViewApi(params);
        let planList: any = [];
        res.planList.forEach((item) => {
          let planDetailList = JSON.parse(item.planDetailList);
          planDetailList.forEach((it) => {
            planList.push({
              actDate: item.actDate,
              ...it,
            });
          });
        });
        res.planList = planList;
        editInfo.value = res;
        closeFullLoading();
      };
      getView();

      // 图片预览
      const openImg = (imgs) => {
        let imgList: string[] = [];
        imgs.forEach((item) => {
          imgList.push(`${VITE_GLOB_DOFILE_URL}${item.filePath}`);
        });
        // 可以使用createImgPreview返回的 PreviewActions 来控制预览逻辑，实现类似幻灯片、自动旋转之类的骚操作
        createImgPreview({ imageList: imgList, defaultWidth: 700, rememberState: true });
      };

      // 上一个/下一个
      const handlePage = (id) => {
        sessionStorage.setItem(`SCIACT_STATE_${id}`, JSON.stringify(searchParams));
        router.push({ name: 'SpSciActView', params: { type: 'view', id } });
      };

      return {
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
        editInfo,
        titleArr,
        VITE_GLOB_DOFILE_URL,
        handleClick,
        getContainerBox,
        handleDownloadByUrl,
        openImg,
        handlePage,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/view-info.less';

  :deep(.ant-col) {
    border-bottom: 1px dashed #d9d9d9;
    padding: 10px 0;
  }

  .title-info {
    p {
      margin-top: 5px;
      padding-left: 8px;
      font-size: @font-size-b2;
    }
  }
</style>
