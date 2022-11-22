<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-13 16:56:44
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-12 15:47:00
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper>
    <a-row :gutter="[16, 16]" class="card-ul">
      <a-col
        class="card-li"
        :span="6"
        v-for="(item, index) in cardArr"
        :key="index"
        @click="handleRouter(item)"
      >
        <div :class="item.class"
          ><h3>{{ item.name }}</h3></div
        >
      </a-col>
    </a-row>
    <div class="shadow bg-white p-4 file-info">
      <a-tabs v-model:activeKey="activeKey" @change="handleTabsChange">
        <template v-for="item in thematicSectionList" :key="item.secondLevel">
          <a-tab-pane :tab="item.secondLevel">
            <a-row :gutter="[15, 15]">
              <a-col :span="12">
                <div class="list-border">
                  <div class="list-nav">
                    <h3>研究报告</h3>
                    <Authority value="GeneralInfoSection">
                      <span class="more" @click="hanldeReportMore">
                        更多 <Icon :size="12" icon="ant-design:right-outlined" />
                      </span>
                    </Authority>
                  </div>
                  <a-list class="list-wrap">
                    <a-list-item
                      v-for="it in reportList"
                      :key="it.id"
                      @click="handleDetail('GeneralInfoSectionView', it)"
                    >
                      <div class="flex w-full">
                        <p class="item-avatar mr-2 font-bold cursor-pointer">
                          <span>研究<br />报告</span>
                        </p>
                        <div class="flex-1 overflow-hidden">
                          <div class="font-bold mb-1">{{ it.title }}</div>
                          <div class="item-content mb-1"
                            >摘要：{{ it.abstractCn || it.abstractEn || '-' }}
                          </div>
                          <div class="item-info">
                            <span>发布时间：{{ it.pulishTime || '-' }}</span>
                            <span>来源：{{ it.sourceMedia || '-' }}</span>
                          </div>
                        </div>
                      </div>
                    </a-list-item>
                  </a-list>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="list-border">
                  <div class="list-nav">
                    <h3>期刊论文</h3>
                    <Authority value="GeneralInfoSection">
                      <span class="more" @click="handlePaperMore">
                        更多 <Icon :size="12" icon="ant-design:right-outlined" />
                      </span>
                    </Authority>
                  </div>
                  <a-list class="list-wrap">
                    <a-list-item
                      v-for="it in paperList"
                      :key="it.id"
                      @click="handleDetail('GeneralInfoSectionView', it)"
                    >
                      <div class="flex w-full cursor-pointer">
                        <p class="item-avatar mr-2 font-bold">
                          <span>期刊<br />论文</span>
                        </p>
                        <div class="flex-1 overflow-hidden">
                          <div class="font-bold mb-1">{{ it.title }}</div>
                          <div class="item-content mb-1"
                            >摘要：{{ it.abstractCn || it.abstractEn || '-' }}
                          </div>
                          <div class="item-info">
                            <span>发布时间：{{ it.pulishTime || '-' }}</span>
                            <span>来源：{{ it.sourceMedia || '-' }}</span>
                          </div>
                        </div>
                      </div>
                    </a-list-item>
                  </a-list>
                </div>
              </a-col>
            </a-row>
          </a-tab-pane>
        </template>
      </a-tabs>
    </div>
    <a-row :gutter="[15, 15]" class="image-info-wrap">
      <a-col :span="12" v-loading="orgLoading">
        <div class="bg-white shadow image-info">
          <div class="hd">
            <h3>机构</h3>
            <Authority value="GeneralInfoExpert"
              ><span class="more" @click="handleOrgMore">
                更多 <Icon :size="12" icon="ant-design:right-outlined" /> </span
            ></Authority>
          </div>
          <div class="bd">
            <a-row
              type="flex"
              justify="space-around"
              align="middle"
              v-if="orgList && orgList.length"
            >
              <a-col
                :span="8"
                @click="handleDetail('GeneralInfoExpertView', item)"
                v-for="item in orgList"
                :key="item"
              >
                <div class="img">
                  <img
                    v-if="item.originalAttachments.length"
                    :src="`${VITE_GLOB_DOFILE_URL}${item.originalAttachments[0].filePath}`" />
                  <Icon v-else icon="icon-park-twotone:pic" :size="80" color="#c7c7c7"
                /></div>
                <strong>{{ item.name }}</strong>
              </a-col>
            </a-row>
            <a-empty v-else class="!my-5" />
          </div>
        </div>
      </a-col>
      <a-col :span="12" v-loading="expertLoading">
        <div class="bg-white shadow image-info person-info">
          <div class="hd">
            <h3 class="font-bold">专家</h3>
            <Authority value="GeneralInfoExpert">
              <span class="more" @click="handleExpertMore">
                更多 <Icon :size="12" icon="ant-design:right-outlined" />
              </span>
            </Authority>
          </div>

          <div class="bd">
            <a-row type="flex" v-if="expertList && expertList.length">
              <a-col
                :span="8"
                @click="handleDetail('GeneralInfoExpertView', item)"
                v-for="item in expertList"
                :key="item"
              >
                <div class="img">
                  <img
                    v-if="item.originalAttachments.length"
                    :src="`${VITE_GLOB_DOFILE_URL}${item.originalAttachments[0].filePath}`" />
                  <Icon v-else icon="icon-park-twotone:pic" :size="80" color="#c7c7c7"
                /></div>
                <strong>{{ item.name }}</strong>
              </a-col>
            </a-row>
            <a-empty v-else class="!my-5" />
          </div>
        </div>
      </a-col>
    </a-row>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { Row, Col, Tabs, TabPane, List, ListItem, Empty } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Icon } from '/@/components/Icon';
  import { domesGeneralInfoHomeApi, domesGeneralInfoDoListApi } from '/@/api/doInfo/synthesize';
  import { useRouter } from 'vue-router';
  import { getAppEnvConfig } from '/@/utils/env';
  import defaultAvatar from '/@/assets/images/default-avatar.jpg';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Authority } from '/@/components/Authority';

  export default defineComponent({
    name: 'GeneralInfoHome',
    components: {
      Icon,
      PageWrapper,
      ARow: Row,
      ACol: Col,
      ATabs: Tabs,
      ATabPane: TabPane,
      AList: List,
      AListItem: ListItem,
      AEmpty: Empty,
      Authority,
    },
    setup() {
      const { hasPermission } = usePermission();
      const { createMessage } = useMessage();
      const router = useRouter();
      const activeKey = ref('');
      const orgList = ref([]);
      const expertList = ref([]);
      const paperList = ref([]);
      const reportList = ref([]);
      const thematicSectionList: any = ref([]);
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const loadingRef = reactive({
        orgLoading: false,
        expertLoading: false,
        paperLoading: false,
        reportLoading: false,
      });

      const domesGeneralInfoHome = async () => {
        let res = await domesGeneralInfoHomeApi();
        thematicSectionList.value = res.thematicSectionList;
        if (thematicSectionList.value[0]) {
          activeKey.value = thematicSectionList.value[0].secondLevel;
          getReportOrPaper();
        }
      };
      domesGeneralInfoHome();

      // 回去期刊报告数据
      const getReportOrPaper = async () => {
        loadingRef.paperLoading = true;
        loadingRef.reportLoading = true;
        paperList.value = (
          await domesGeneralInfoDoList({
            firstLevel: '专题板块',
            secondLevel: activeKey.value,
            docType: '期刊',
            pageNo: 1,
            pageSize: 3,
          })
        ).list;
        loadingRef.paperLoading = false;
        reportList.value = (
          await domesGeneralInfoDoList({
            firstLevel: '专题板块',
            secondLevel: activeKey.value,
            docType: '科技报告',
            pageNo: 1,
            pageSize: 3,
          })
        ).list;
        loadingRef.reportLoading = false;
      };

      const domesGeneralInfoDoList = async (obj) => {
        return await domesGeneralInfoDoListApi(obj);
      };

      // 获取机构专家数据
      const getList = async () => {
        // 机构
        loadingRef.orgLoading = true;
        loadingRef.expertLoading = true;
        orgList.value = (
          await domesGeneralInfoDoList({
            firstLevel: '专家机构',
            secondLevel: '机构',
            pageNo: 1,
            pageSize: 9,
          })
        ).list;
        loadingRef.orgLoading = false;
        // 专家
        expertList.value = (
          await domesGeneralInfoDoList({
            firstLevel: '专家机构',
            secondLevel: '专家',
            pageNo: 1,
            pageSize: 9,
          })
        ).list;
        loadingRef.expertLoading = false;
      };
      getList();

      // 机构-更多
      const handleOrgMore = () => {
        router.push({ name: 'GeneralInfoExpert', query: { activeKey: '机构' } });
      };

      // 专家-更多
      const handleExpertMore = () => {
        router.push({ name: 'GeneralInfoExpert', query: { activeKey: '专家' } });
      };

      // 报告-更多
      const hanldeReportMore = () => {
        router.push({ name: 'GeneralInfoSection', query: { activeKey: activeKey.value } });
      };

      // 期刊-更多
      const handlePaperMore = () => {
        router.push({ name: 'GeneralInfoSection', query: { activeKey: activeKey.value } });
      };

      // 查看详情
      const handleDetail = (name, item) => {
        if (!hasPermission(name)) {
          createMessage.warning('您暂无查看权限！');
          return;
        }
        router.push({ name, params: { id: item.id } });
      };

      const handleTabsChange = () => {
        getReportOrPaper();
      };

      const handleRouter = (item) => {
        if (!hasPermission(item.router)) {
          createMessage.warning('您暂无查看权限！');
          return;
        }
        router.push({ name: item.router });
      };

      return {
        ...toRefs(loadingRef),
        activeKey,
        orgList,
        expertList,
        paperList,
        reportList,
        defaultAvatar,
        thematicSectionList,
        VITE_GLOB_DOFILE_URL,
        cardArr: [
          {
            name: '前沿动态',
            class: 'Group_817',
            img: '../../../assets/images/doInfo/Group_817.png',
            router: 'GeneralInfoDynamics',
          },
          {
            name: '政策法规',
            class: 'Group_818',
            img: '../../../assets/images/doInfo/Group_818.png',
            router: 'GeneralInfoPolicies',
          },
          {
            name: '典型案例',
            class: 'Group_819',
            img: '../../../assets/images/doInfo/Group_819.png',
            router: 'GeneralInfoCase',
          },
          {
            name: '科研态势',
            class: 'Group_820',
            img: '../../../assets/images/doInfo/Group_820.png',
            router: 'GeneralInfoSituation',
          },
        ],
        handleRouter,
        handleOrgMore,
        handleExpertMore,
        handleTabsChange,
        hanldeReportMore,
        handlePaperMore,
        handleDetail,
        hasPermission,
      };
    },
  });
</script>

<style lang="less" scoped>
  .card-ul {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  .card-li {
    height: 154px;
    cursor: pointer;

    & > div {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: @font-size-b13;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      border-radius: 2px;
      background-size: cover;

      h3 {
        margin: 0;
        padding-left: 10%;
        color: #ffffff;
      }
    }
  }

  .Group_817 {
    background: #e3b863 url(../../../assets/images/doInfo/Group_817.png) no-repeat 100%;
  }

  .Group_818 {
    background: #ff787c url(../../../assets/images/doInfo/Group_818.png) no-repeat 100%;
  }

  .Group_819 {
    background: #2aaddf url(../../../assets/images/doInfo/Group_819.png) no-repeat 100%;
  }

  .Group_820 {
    background: #56d7a5 url(../../../assets/images/doInfo/Group_820.png) no-repeat 100%;
  }

  .list-border {
    border-radius: 2px;
    border: 1px solid rgba(28, 31, 35, 0.08);
  }

  .list-nav {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(28, 31, 35, 0.08);
    padding: 5px 18px;

    h3 {
      font-size: @font-size-b2;
      font-weight: 700;
      margin-bottom: 0;
    }
  }

  .list-wrap {
    min-height: 268px;
    padding: 0 18px;
  }

  .more {
    display: flex;
    align-items: center;
    color: #999;
    cursor: pointer;
    &:hover {
      color: @primary-color;
    }
  }

  .item-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: #377bbc;
    border-radius: 2px;
    text-align: center;
    line-height: 1.2;
    padding: 18px 0;
    font-size: @font-size-b2;
    color: #fff;
  }

  .item-content {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-info {
    text-align: right;
    color: #999;

    span {
      margin-left: 10px;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  .image-info-wrap {
    margin-top: 15px;
  }

  .image-info {
    overflow: hidden;
    .hd {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 15px;
      border-bottom: 1px solid #ddd;
    }

    h3 {
      margin-bottom: 0;
      font-size: @font-size-b2;
      font-weight: 700;
    }

    :deep(.ant-col) {
      padding: 20px 10px;
      border-left: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }

    .img {
      display: flex;
      align-items: center;
      width: 90px;
      height: 125px;
      margin: 0 auto;

      img {
        object-fit: contain;
        width: 100%;
        height: auto;
      }
    }

    strong {
      display: block;
      font-weight: normal;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .bd {
      margin-left: -1px;
    }
  }

  .person-info {
    .img img {
      height: 100%;
      object-fit: cover;
    }
  }

  .file-info {
    :deep(.ant-tabs-tab-btn) {
      padding: 0 10px;
    }
  }
  [data-theme='dark'] {
    .image-info {
      .ant-col,
      .hd {
        border-color: #303030;
      }
    }
  }

  @media screen and (max-width: 1537px) {
    .card-li {
      height: 100px;

      & > div {
        font-size: @font-size-b8;
      }
    }
  }
</style>
