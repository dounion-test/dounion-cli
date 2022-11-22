<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-13 16:56:44
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-15 13:14:54
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper>
    <ul class="card-ul !mb-4">
      <li class="card-li" :class="item.class" v-for="(item, index) in cardArr" :key="index">
        <div class="card-name ml-6 my-auto">{{ item.name }}</div>
      </li>
    </ul>
    <div class="shadow bg-white p-4">
      <a-tabs v-model:activeKey="activeKey">
        <template v-for="item in thematicSectionList" :key="item.secondLevel">
          <a-tab-pane :tab="item.secondLevel">
            <a-row :gutter="[15, 15]">
              <a-col :span="12">
                <div class="list-border">
                  <div class="list-nav">
                    <span class="font-bold">研究报告</span>
                    <span class="list-more">
                      查看更多 <Icon :size="12" icon="ant-design:right-outlined" />
                    </span>
                  </div>
                  <a-list class="list-wrap">
                    <a-list-item v-for="it in 3" :key="it">
                      <div class="flex w-full">
                        <div class="item-avatar mr-2 font-bold">
                          <div>研究</div>
                          <div>报告</div>
                        </div>
                        <div class="flex-1">
                          <div class="font-bold mb-1">乡村旅游可行性研究报告</div>
                          <div class="item-content mb-1"
                            >摘要：中国乡村XXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXX
                          </div>
                          <div class="item-info">
                            <span>发布时间：2022-05-19至2022-06-18</span>
                            <span>来源：国家治理</span>
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
                    <span class="font-bold">期刊论文</span>
                    <span class="list-more">
                      查看更多 <Icon :size="12" icon="ant-design:right-outlined" />
                    </span>
                  </div>
                  <a-list class="list-wrap">
                    <a-list-item v-for="it in 3" :key="it">
                      <div class="flex w-full">
                        <div class="item-avatar mr-2 font-bold">
                          <div>期刊</div>
                          <div>论文</div>
                        </div>
                        <div class="flex-1">
                          <div class="font-bold mb-1">乡村旅游可行性研究报告</div>
                          <div class="item-content mb-1"
                            >摘要：中国乡村XXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXX
                          </div>
                          <div class="item-info">
                            <span>发布时间：2022-05-19至2022-06-18</span>
                            <span>来源：国家治理</span>
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
    <div class="shadow mt-4">
      <a-row :gutter="[15, 15]">
        <a-col :span="12">
          <div class="list-border bg-white">
            <div class="list-nav">
              <span class="font-bold">机构</span>
              <span class="list-more">
                查看更多 <Icon :size="12" icon="ant-design:right-outlined" />
              </span>
            </div>
            <a-card>
              <a-card-grid v-for="item in 15" :key="item" style="width: 25%; text-align: center">
                <div>
                  <img
                    class="grid-img mb-2"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                  <div class="mt-2">张天柱</div>
                </div>
              </a-card-grid>
            </a-card>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="list-border bg-white">
            <div class="list-nav">
              <span class="font-bold">机构</span>
              <span class="list-more">
                查看更多 <Icon :size="12" icon="ant-design:right-outlined" />
              </span>
            </div>
            <a-card>
              <a-card-grid v-for="item in 20" :key="item" style="width: 25%; text-align: center">
                <div>
                  <img
                    class="grid-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                  <div class="mt-2">张天柱</div>
                </div>
              </a-card-grid>
            </a-card>
          </div>
        </a-col>
      </a-row>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Row, Col, Tabs, TabPane, List, ListItem, Card, CardGrid } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Icon } from '/@/components/Icon';
  import { domesGeneralInfoHomeApi } from '/@/api/doInfo/synthesize';

  export default defineComponent({
    components: {
      Icon,
      PageWrapper,
      ARow: Row,
      ACol: Col,
      ATabs: Tabs,
      ATabPane: TabPane,
      AList: List,
      AListItem: ListItem,
      ACard: Card,
      ACardGrid: CardGrid,
    },
    setup() {
      const activeKey = ref('');
      const thematicSectionList: any = ref([]);
      const domesGeneralInfoHome = async () => {
        let res = await domesGeneralInfoHomeApi();
        thematicSectionList.value = res.thematicSectionList;
        if (thematicSectionList.value[0]) {
          activeKey.value = thematicSectionList.value[0].secondLevel;
        }
      };
      domesGeneralInfoHome();

      return {
        activeKey,
        thematicSectionList,
        cardArr: [
          {
            name: '前沿动态',
            class: 'Group_817',
            img: '../../../assets/images/doInfo/Group_817.png',
          },
          {
            name: '政策法规',
            class: 'Group_818',
            img: '../../../assets/images/doInfo/Group_818.png',
          },
          {
            name: '典型案例',
            class: 'Group_819',
            img: '../../../assets/images/doInfo/Group_819.png',
          },
          {
            name: '科研态势',
            class: 'Group_820',
            img: '../../../assets/images/doInfo/Group_820.png',
          },
        ],
      };
    },
  });
</script>

<style lang="less" scoped>
  .card-ul {
    display: flex;
    justify-content: space-between;
  }

  .card-li {
    width: 400px;
    height: 154px;
    font-size: @font-size-b13;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    display: flex;
    align-items: center;
    border-radius: 2px;
    cursor: pointer;
  }

  .Group_817 {
    background: url(../../../assets/images/doInfo/Group_817.png) no-repeat 100%;
  }

  .Group_818 {
    background: url(../../../assets/images/doInfo/Group_818.png) no-repeat 100%;
  }

  .Group_819 {
    background: url(../../../assets/images/doInfo/Group_819.png) no-repeat 100%;
  }

  .Group_820 {
    background: url(../../../assets/images/doInfo/Group_820.png) no-repeat 100%;
  }

  .list-border {
    border-radius: 2px;
    border: 1px solid rgba(28, 31, 35, 0.08);
  }

  .list-nav {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(28, 31, 35, 0.08);
    padding: 18px;
  }

  .list-wrap {
    padding: 0 18px;
  }

  .list-more {
    display: flex;
    align-items: center;
    color: #bebebe;
    cursor: pointer;
  }

  .item-avatar {
    width: 60px;
    height: 60px;
    background: #377bbc;
    border-radius: 2px;
    opacity: 0.4;
    text-align: center;
    line-height: 12px;
    padding: 18px 0;
    color: #fff;
  }

  .item-content {
    color: #bebebe;
  }

  .item-info {
    text-align: right;
    color: #bebebe;
  }

  .grid-img {
    width: 60px;
    height: 80px;
    margin: 0 auto;
  }

  @media screen and (max-width: 1537px) {
    .card-li {
      width: 300px;
      height: 120px;
      font-size: @font-size-b8;
    }
  }
</style>
