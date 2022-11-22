<template>
  <PageWrapper contentBackground contentClass="p-4" v-loading="pageLoading">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="19">
        <div class="person-info">
          <div class="flex items-center hd">
            <a-space>
              <a-avatar shape="square" class="user-avatar">
                <img
                  v-if="pictures.length > 0"
                  :src="`${VITE_GLOB_DOFILE_URL}${pictures[0].filePath}`"
                />
                <Icon v-else icon="ant-design:user-outlined" :size="36" />
              </a-avatar>
              <div class="user-info">
                <strong>{{ viewData.name }}</strong>
                <span class="post">{{
                  viewData.companyName || viewData.jobTitleIdName
                    ? `（${viewData.companyName || ''}${viewData.jobTitleIdName || ''}）`
                    : ''
                }}</span>
                <span class="button-bar">
                  <Authority value="MyResumeEdit">
                    <a-button class="ml-2" size="small" @click="handleEdit">
                      <Icon icon="ant-design:edit-outlined" />
                      编辑
                    </a-button>
                  </Authority>
                  <Authority value="MyResumePrint">
                    <a-button class="ml-2" size="small" @click="handlePrint">
                      <Icon icon="ant-design:printer-outlined" />
                      打印
                    </a-button>
                  </Authority>
                </span>
              </div>
            </a-space>
          </div>
          <div class="p-4 bd">
            <a-row :gutter="[10, 0]">
              <a-col :span="item.span || 12" v-for="(item, index) in personInfo" :key="index">
                <div class="view-item"
                  ><span class="label">{{ item.label }}</span
                  ><span class="con">{{ item.value }}</span></div
                >
                <a-divider style="border-color: rgba(0, 0, 0, 0.2)" dashed />
              </a-col>
            </a-row>
          </div>
        </div>

        <div class="other-info" v-for="tit in menuList" :key="tit.id">
          <template v-if="tit.id === 'CharacterExperience'">
            <a-divider
              :id="tit.id"
              orientation="left"
              orientation-margin="16px"
              class="!font-bold title-bar"
              >人物经历</a-divider
            >
            <div
              class="pl-4 pr-4 list-box person-experience"
              v-for="(j, i) in tit.children"
              :key="i"
            >
              <a-list
                :id="j.id"
                v-if="j.id === 'eduDetailList'"
                size="small"
                :data-source="viewData.eduDetailList"
              >
                <template #renderItem="{ item }">
                  <a-list-item>{{ item.itemContent }}</a-list-item>
                </template>
                <template #header>
                  <div>教育经历</div>
                </template>
              </a-list>
              <a-list
                :id="j.id"
                v-if="j.id === 'workDetailList'"
                size="small"
                :data-source="viewData.workDetailList"
              >
                <template #renderItem="{ item }">
                  <a-list-item>{{ item.itemContent }}</a-list-item>
                </template>
                <template #header>
                  <div>工作经历</div>
                </template>
              </a-list>
              <a-list
                :id="j.id"
                v-if="j.id === 'socialDetailList'"
                size="small"
                :data-source="viewData.socialDetailList"
              >
                <template #renderItem="{ item }">
                  <a-list-item>{{ item.itemContent }}</a-list-item>
                </template>
                <template #header>
                  <div>社会兼职</div>
                </template>
              </a-list>
            </div>
          </template>

          <template v-if="tit.id === 'researchFieldList'">
            <a-divider
              :id="tit.id"
              orientation="left"
              orientation-margin="16px"
              class="!font-bold title-bar"
              >研究领域或行业领域</a-divider
            >
            <a-list
              class="list-box person-territory"
              size="small"
              :data-source="viewData.researchFieldList"
            >
              <template #renderItem="{ item, index }">
                <a-list-item>{{ item.itemContent }}</a-list-item>
              </template>
            </a-list>
          </template>

          <template v-if="tit.id === 'subjectList'">
            <a-divider
              :id="tit.id"
              orientation="left"
              orientation-margin="16px"
              class="!font-bold title-bar"
              >近年来承担的主要课题/项目</a-divider
            >
            <a-list
              class="list-box person-project"
              size="small"
              :data-source="viewData.subjectList"
            >
              <template #renderItem="{ item, index }">
                <a-list-item>{{ item.itemContent }}</a-list-item>
              </template>
            </a-list>
          </template>

          <template v-if="tit.id === 'sciAchieveList'">
            <a-divider
              :id="tit.id"
              orientation="left"
              orientation-margin="16px"
              class="!font-bold title-bar"
              >学术成果</a-divider
            >
            <a-list
              class="list-box person-achievement"
              size="small"
              :data-source="viewData.sciAchieveList"
            >
              <template #renderItem="{ item, index }">
                <a-list-item>{{ item.itemContent }}</a-list-item>
              </template>
            </a-list>
          </template>

          <template v-if="tit.id === 'attachments'">
            <a-divider
              :id="tit.id"
              orientation="left"
              orientation-margin="16px"
              class="!font-bold title-bar"
              >附件</a-divider
            >
            <ul class="pl-4 downlink" v-if="viewData.attachments && viewData.attachments.length">
              <li
                v-for="annex in viewData.attachments"
                :key="annex.id"
                @click="handleDownloadByUrl(annex)"
              >
                <span>{{ annex.fileName }}</span>
                <a class="link">下载</a>
              </li>
            </ul>
            <a-empty v-else :image="simpleImage" />
          </template>
        </div>
      </a-col>
      <a-col :span="5">
        <div class="mb-10 annex-wrap">
          <div @click="openImg(pictures)" v-if="pictures.length > 0" class="annex-pic">
            <img :src="`${VITE_GLOB_DOFILE_URL}${pictures[0].filePath}`" />
            <div class="my-2 ml-2">
              <Icon icon="et:pictures" />
              <span class="ml-1">{{ viewData.name }}的概述图 （{{ pictures.length }}张）</span>
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
          :get-container="getContainerBox"
          :offsetTop="80"
          style="width: 100%"
        >
          <a-anchor-link
            :href="`#${item.id}`"
            :title="item.label"
            v-for="item in menuList"
            :key="item.id"
          >
            <a-anchor-link
              v-for="i in item.children"
              :href="`#${i.id}`"
              :title="i.label"
              :key="i.id"
            />
          </a-anchor-link>
        </a-anchor>
      </a-col>
    </a-row>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Row, Col, Avatar, Divider, Space, List, ListItem, Anchor, Empty } from 'ant-design-vue';
  import type { AnchorProps } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Authority } from '/@/components/Authority';
  import { Icon } from '/@/components/Icon';
  import { spRecordViewApi, spRecordPrintApi } from '/@/api/doSp/record';
  import { getAppEnvConfig } from '/@/utils/env';
  import { createImgPreview } from '/@/components/Preview/index';
  import { downloadByUrl } from '/@/utils/file/download';
  import { personInfo, menuList } from './config/index';
  import { getToken } from '/@/utils/auth';
  import { openPrintPreview } from '/@/utils';

  export default defineComponent({
    name: 'MyResumeView',
    components: {
      Authority,
      PageWrapper,
      Icon,
      ARow: Row,
      ACol: Col,
      AAvatar: Avatar,
      ADivider: Divider,
      ASpace: Space,
      AList: List,
      AListItem: ListItem,
      AAnchor: Anchor,
      AAnchorLink: Anchor.Link,
      AEmpty: Empty,
    },
    setup() {
      const router = useRouter();
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const { createMessage } = useMessage();
      const viewData = ref<Recordable>({});
      const pictures: any = ref([]);
      const pageLoading = ref(false);
      const state = reactive({
        editId: null,
        personInfo: personInfo({}),
      });

      onMounted(() => {
        getView();
      });
      const getView = async () => {
        pageLoading.value = true;
        const res = await spRecordViewApi({});
        pictures.value = [...res.headImgFile, ...res.pictures];
        state.personInfo = personInfo(res);
        state.editId = res.id;
        viewData.value = res;
        pageLoading.value = false;
      };

      // 新增
      // const handleAdd = () => {
      //   router.push({
      //     name: 'MyResumeAdd',
      //     params: { type: 'add' },
      //   });
      // };

      //编辑
      const handleEdit = () => {
        router.push({
          name: 'MyResumeEdit',
          params: { type: 'edit', id: state.editId },
        });
      };

      const handlePrint = async () => {
        if (!viewData.value.pictures?.length) {
          return createMessage.warning('请先上传头像');
        }
        const token = getToken();
        const res = await spRecordPrintApi({ id: state.editId });
        // window.open(path)
        let printParams: any = {};
        printParams._sgk = token;
        printParams.dataList = res;
        printParams.title = `${res[0]?.name}个人履历`;
        openPrintPreview(printParams);
      };

      // 图片预览
      const openImg = (imgs) => {
        let imgList: string[] = [];
        imgs.forEach((item) => {
          imgList.push(`${VITE_GLOB_DOFILE_URL}${item.filePath}`);
        });
        // 可以使用createImgPreview返回的 PreviewActions 来控制预览逻辑，实现类似幻灯片、自动旋转之类的骚操作
        createImgPreview({ imageList: imgList, defaultWidth: 700, rememberState: true });
      };

      const handleClick: AnchorProps['onClick'] = (e, link) => {
        e.preventDefault();
        console.log(link, 'link');
      };

      const getContainerBox = () => {
        return document.querySelector(`.layouts-scroll .scrollbar__wrap`);
      };

      // 附件下载
      const handleDownloadByUrl = (item) => {
        downloadByUrl({
          fileName: item.fileName,
          url: `${VITE_GLOB_DOFILE_URL}${item.filePath}`,
          target: '_self',
        });
      };
      return {
        pictures,
        ...toRefs(state),
        handleEdit,
        viewData,
        pageLoading,
        getView,

        VITE_GLOB_DOFILE_URL,
        openImg,
        handleClick,
        getContainerBox,
        menuList,

        handleDownloadByUrl,
        handlePrint,
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/view-info.less';
</style>
