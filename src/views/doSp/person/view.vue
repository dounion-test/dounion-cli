<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 17:59:26
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-11-02 19:10:25
 * @FilePath: /rural-revitalization/src/views/expstore/expert/view.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentBackground contentClass="p-4">
    <a-row :gutter="16">
      <a-col class="gutter-row" :span="19">
        <!-- 基本信息 -->
        <div class="person-info">
          <div class="hd">
            <a-space :size="10">
              <div class="user-info">
                <strong>{{ editInfo.name }}</strong>
                <span class="post">{{
                  editInfo.companyName || editInfo.jobTitleIdName
                    ? `（${editInfo.companyName || ''}${editInfo.jobTitleIdName || ''}）`
                    : ''
                }}</span>
                <span class="button-bar"
                  ><Authority value="SpPersonAdd"
                    ><a-button @click="handleAdd" size="small" class="ml-2"
                      ><Icon icon="ant-design:plus-outlined" />新增</a-button
                    ></Authority
                  >
                  <Authority value="SpPersonEdit"
                    ><a-button
                      class="ml-2"
                      size="small"
                      @click="handleEdit(editInfo.id)"
                      v-if="editInfo.status != '52002-20'"
                    >
                      <Icon icon="ant-design:edit-outlined" />
                      编辑
                    </a-button></Authority
                  >
                  <Authority value="SpPersonContract"
                    ><a-button
                      @click="handleSendLetter(editInfo.id)"
                      class="ml-2"
                      size="small"
                      v-if="editInfo.status != '52002-20' && !editInfo.certSdate"
                      ><Icon icon="icon-park:send" />发送电子聘书</a-button
                    ></Authority
                  >
                  <Authority value="SpPersonDelete"
                    ><a-button
                      @click="handleRemove(editInfo.id)"
                      class="ml-2"
                      size="small"
                      v-if="editInfo.status != '52002-20'"
                      ><Icon icon="ant-design:minus-outlined" />移除专家</a-button
                    ></Authority
                  >
                </span>
              </div>
            </a-space>
            <p class="indent-lg mt-3 desc">{{ editInfo.profile }}</p>
          </div>
          <div class="p-4 bd">
            <a-row :gutter="[10, 0]">
              <a-col
                v-for="(item, index) in schemasOneData"
                :key="index"
                :span="item.span || 12"
                v-show="item.label != '图册照片' && item.label != '是否编辑'"
              >
                <div class="view-item"
                  ><span class="label">{{ item.label }}</span
                  ><span class="con">{{ item.value }}</span></div
                >
                <a-divider style="border-color: rgba(0, 0, 0, 0.2)" dashed />
              </a-col>
            </a-row>
          </div>
        </div>
        <div class="other-info" v-for="item in titleArr" :key="item.id">
          <a-divider
            orientation="left"
            orientation-margin="16px"
            class="!font-bold title-bar"
            :id="item.id"
          >
            {{ item.label }}
          </a-divider>
          <!-- 入驻记录 -->
          <div v-if="item.id == 'EntryRecord'">
            <div class="m-4">
              <span class="list-box" v-if="editInfo.certSdate"
                >入驻时间：{{ editInfo.certSdate }} ~ {{ editInfo.certEdate }}</span
              >
              <a-empty :image="simpleImage" v-else />
            </div>
          </div>
          <!-- 乡研活动 -->
          <div class="m-4" v-if="item.id == 'RuralResearchActivities'">
            <a-timeline class="list-box" v-if="editInfo.actList && editInfo.actList.length > 0">
              <a-timeline-item v-for="it in editInfo.actList" :key="it.id" color="gray">
                <p>{{ it.startDate }}</p>
                <p
                  >{{ it.name
                  }}<span v-if="it.statusName" style="color: #0000ff"
                    >【{{ it.statusName }}】</span
                  ></p
                >
              </a-timeline-item>
            </a-timeline>
            <a-empty :image="simpleImage" v-else />
          </div>
          <!-- 人物经历 -->
          <div class="m-4" v-if="item.id == 'CharacterExperience'">
            <div class="list-box" v-for="it in item.children" :key="it.id">
              <div :id="it.id">{{ it.label }}</div>
              <template>
                <ul v-if="editInfo[it.id] && editInfo[it.id].length">
                  <li v-for="(i, j) in editInfo[it.id]" :key="j">{{ i.itemContent }}</li>
                </ul>
                <a-empty :image="simpleImage" v-else />
              </template>
            </div>
          </div>
          <!-- 研究领域或行业领域、近年来承担的主要课题/项目、 学术成果-->
          <div
            class="m-4"
            v-if="
              item.id == 'researchFieldList' ||
              item.id == 'subjectList' ||
              item.id == 'sciAchieveList'
            "
          >
            <a-list
              class="list-box person-achievement"
              size="small"
              :data-source="editInfo[item.id]"
            >
              <template #renderItem="{ item }">
                <a-list-item>{{ item.itemContent }}</a-list-item>
              </template>
            </a-list>
          </div>
          <!-- 专家附件 -->
          <template v-if="item.id == 'attachments'">
            <ul class="m-4 downlink" v-if="editInfo[item.id]?.length">
              <li
                class="cursor-pointer list-box"
                v-for="it in editInfo[item.id]"
                :key="it.id"
                @click="handleDownloadByUrl(it)"
              >
                <span>{{ it.fileName }}</span>
                <span style="color: #0000ff" class="ml-2">下载</span>
              </li>
            </ul>
            <a-empty :image="simpleImage" v-else />
          </template>
        </div>
      </a-col>
      <a-col :span="5">
        <div class="mb-10 annex-wrap">
          <div @click="openImg(pictures)" v-if="pictures.length > 0" class="annex-pic">
            <img :src="`${VITE_GLOB_DOFILE_URL}${pictures[0].filePath}`" />
            <div class="my-2 ml-2">
              <Icon icon="et:pictures" />
              <span class="ml-1">{{ editInfo.name }}的概述图 （{{ pictures.length }}张）</span>
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
      <EmailModal @register="registerModal" @success="handleSuccess" />
    </a-row>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {
    Row,
    Col,
    Divider,
    Space,
    Timeline,
    Anchor,
    AnchorLink,
    List,
    ListItem,
    Empty,
  } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Icon } from '/@/components/Icon';
  import { Authority } from '/@/components/Authority';
  import { schemasOne } from './config/add';
  import { titleArr } from './config/view';
  import type { AnchorProps } from 'ant-design-vue';
  import EmailModal from './module/EmailModal.vue';
  import {
    spPersonViewApi,
    spPersonSendLetterApi,
    spPersonRemoveApi,
    spPersonSendLetterViewApi,
  } from '/@/api/doSp/person';
  import { useRoute, useRouter } from 'vue-router';
  import { getAppEnvConfig } from '/@/utils/env';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadByUrl } from '/@/utils/file/download';
  import { createImgPreview } from '/@/components/Preview/index';
  import { useLoading } from '/@/components/Loading';

  export default defineComponent({
    name: 'SpPersonVIew',
    components: {
      Icon,
      Authority,
      EmailModal,
      PageWrapper,
      ARow: Row,
      ACol: Col,
      ADivider: Divider,
      ASpace: Space,
      ATimeline: Timeline,
      ATimelineItem: Timeline.Item,
      AAnchor: Anchor,
      AAnchorLink: AnchorLink,
      AList: List,
      AListItem: ListItem,
      AEmpty: Empty,
    },
    setup() {
      const editInfo: any = ref({});
      const route = useRoute();
      const router = useRouter();
      const pictures: any = ref([]);
      const schemasOneData: any = ref([]);
      const [registerModal, { openModal }] = useModal();
      const { createMessage, createConfirm } = useMessage();
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const [openFullLoading, closeFullLoading] = useLoading({});
      const handleClick: AnchorProps['onClick'] = (e) => {
        e.preventDefault();
      };

      const getView = async () => {
        openFullLoading();
        let res = await spPersonViewApi({ id: route.params.id });
        editInfo.value = res;
        pictures.value = [...res.headImgFile, ...res.pictures];
        if (res.elcLetters && res.elcLetters.filePath) {
          pictures.value.push(res.elcLetters);
        }
        schemasOneData.value = [];
        schemasOne.forEach((item) => {
          if (
            item.field == 'sex' ||
            item.field == 'education' ||
            item.field == 'political' ||
            item.field == 'nation' ||
            item.field == 'jobTitleId' ||
            item.field == 'position'
          ) {
            let curValue = null;
            if (res[item.field] === '52052-1011' || res[item.field] === '52052-2601') {
              curValue = res.otherJobTitle;
            } else if (res[item.field] === '52051-109' || res[item.field] === '52051-207') {
              curValue = res.otherPosition;
            } else {
              curValue = res[`${item.field}Name`];
            }
            schemasOneData.value.push({
              label: item.label,
              value: curValue,
              span: 12,
            });
          } else if (item.field == 'isWork') {
            schemasOneData.value.push({
              label: item.label,
              value: res[item.field] ? '在职' : '离职',
              span: 12,
            });
          } else if (item.field == 'school') {
            schemasOneData.value.push({
              label: item.label,
              value: res[item.field],
              span: 12,
            });
          } else if (item.field == 'provinceCityCounty') {
            let name = `
              ${res.homeProvinceName ? `${res.homeProvinceName}` : ''}
              ${res.homeCityName ? `${res.homeCityName}` : ''}
              ${res.homeCountyName ? `${res.homeCountyName}` : ''}
            `;
            schemasOneData.value.push({
              label: item.label,
              value: name,
              span: 12,
            });
          } else if (item.field == 'nature') {
            schemasOneData.value.push({
              label: item.label,
              value: `${res.natureFirstName || ''}${
                res.natureSecondName ? `/${res.natureSecondName}` : ''
              }${res.natureThirdName ? `/${res.natureThirdName}` : ''}`,
              span: 12,
            });
          } else {
            schemasOneData.value.push({
              label: item.label,
              value: res[item.field],
              span: 12,
            });
          }
        });
        closeFullLoading();
      };
      getView();

      const handleAdd = () => {
        router.push({ name: 'SpPersonAdd', params: { type: 'add' } });
      };
      const handleEdit = (id) => {
        router.push({ name: 'SpPersonEdit', params: { type: 'edit', id } });
      };

      // 发送电子聘书
      const handleSendLetter = (id) => {
        openModal(true, {
          title: '发送电子聘书',
          api: spPersonSendLetterViewApi,
          type: 4,
          id: id,
        });
      };

      // 邮件确认回调
      const handleSuccess = (sendData) => {
        spPersonSendLetter(sendData);
      };

      // 电子聘书接口
      const spPersonSendLetter = async (data) => {
        await spPersonSendLetterApi(data);
        createMessage.success('发送成功');
        getView();
      };

      const handleRemove = (id) => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会移除该专家, 是否继续?',
          onOk() {
            spPersonRemove(id);
          },
        });
      };

      const getContainerBox = () => {
        return document.querySelector(`.layouts-scroll .scrollbar__wrap`) as any;
      };

      const spPersonRemove = async (id) => {
        await spPersonRemoveApi({ ids: id });
        createMessage.success('移除成功');
        getView();
      };

      // 图片预览
      const openImg = (imgs) => {
        let imgList: string[] = [];
        imgs.forEach((item) => {
          imgList.push(`${VITE_GLOB_DOFILE_URL}${item.filePath}`);
        });
        // 可以使用createImgPreview返回的 PreviewActions 来控制预览逻辑，实现类似幻灯片、自动旋转之类的骚操作
        createImgPreview({
          imageList: imgList,
          defaultWidth: 400,
          rememberState: true,
          scaleStep: 5,
        });
      };

      // 附件下载
      const handleDownloadByUrl = (it) => {
        downloadByUrl({
          fileName: it.fileName,
          url: `${VITE_GLOB_DOFILE_URL}${it.filePath}`,
          target: '_self',
        });
      };

      return {
        pictures,
        simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
        editInfo,
        titleArr,
        registerModal,
        schemasOneData,
        VITE_GLOB_DOFILE_URL,
        handleClick,
        getContainerBox,
        openImg,
        handleDownloadByUrl,
        handleAdd,
        handleEdit,
        handleSendLetter,
        handleRemove,
        handleSuccess,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/view-info.less';
</style>
