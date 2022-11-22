<template>
  <PageWrapper contentFullHeight contentClass="h-full">
    <a-row :gutter="[15, 15]">
      <a-col :span="12">
        <div class="shadow bg-white p-4">
          <a-tabs v-model:activeKey="activeKey1" @tabClick="tab1Click">
            <template #rightExtra>
              <a-button type="link">更多</a-button>
            </template>
            <template v-for="item in homeTab1" :key="item.key">
              <a-tab-pane :tab="item.name">
                <a-list size="small" :data-source="homeModeList" v-if="item.key === activeKey1">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      {{ item.title }}
                      <template #actions>
                        <span>{{ item.date }}</span>
                      </template>
                    </a-list-item>
                  </template>
                </a-list>
              </a-tab-pane>
            </template>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="shadow bg-white p-4">
          <a-tabs v-model:activeKey="activeKey2" @tabClick="tab2Click">
            <template #rightExtra>
              <a-button type="link">更多</a-button>
            </template>
            <template v-for="item in homeTab2" :key="item.key">
              <a-tab-pane :tab="item.name">
                <a-list size="small" :data-source="homeModeList" v-if="item.key === activeKey2">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      {{ item.title }}
                      <template #actions>
                        <span>{{ item.date }}</span>
                      </template>
                    </a-list-item>
                  </template>
                </a-list>
              </a-tab-pane>
            </template>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="shadow bg-white p-4">
          <a-tabs v-model:activeKey="activeKey3" @tabClick="tab3Click">
            <template #rightExtra>
              <a-button type="link">更多</a-button>
            </template>
            <template v-for="item in homeTab3" :key="item.key">
              <a-tab-pane :tab="item.name">
                <a-list size="small" :data-source="homeModeList" v-if="item.key === activeKey3">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      {{ item.title }}
                      <template #actions>
                        <span>{{ item.date }}</span>
                      </template>
                    </a-list-item>
                  </template>
                </a-list>
              </a-tab-pane>
            </template>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="shadow bg-white p-4">
          <a-tabs v-model:activeKey="activeKey4" @tabClick="tab4Click">
            <template #rightExtra>
              <a-button type="link">更多</a-button>
            </template>
            <template v-for="item in homeTab4" :key="item.key">
              <a-tab-pane :tab="item.name">
                <a-list size="small" :data-source="homeModeList" v-if="item.key === activeKey4">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      {{ item.title }}
                      <template #actions>
                        <span>{{ item.date }}</span>
                      </template>
                    </a-list-item>
                  </template>
                </a-list>
              </a-tab-pane>
            </template>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="24">
        <div class="shadow bg-white p-4">
          <a-tabs v-model:activeKey="activeKey5" @tabClick="tab5Click">
            <template #rightExtra>
              <a-button type="link">更多</a-button>
            </template>
            <template v-for="item in homeTab5" :key="item.key">
              <a-tab-pane :tab="item.name">
                <a-list size="small" :data-source="homeModeList" v-if="item.key === activeKey5">
                  <template #renderItem="{ item }">
                    <a-list-item>
                      {{ item.title }}
                      <template #actions>
                        <span>{{ item.date }}</span>
                      </template>
                    </a-list-item>
                  </template>
                </a-list>
              </a-tab-pane>
            </template>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="shadow bg-white p-4">
          <a-card title="Card Title">
            <a-card-grid
              v-for="(item, i) in orgList"
              :key="i"
              style="width: 25%; text-align: center"
            >
              <img :src="item.imgPath" />
              <p>{{ item.name }}</p>
            </a-card-grid>
          </a-card>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="shadow bg-white p-4"
          ><a-card title="Card Title">
            <a-card-grid
              v-for="(item, i) in orgList"
              :key="i"
              style="width: 25%; text-align: center"
            >
              <img :src="item.imgPath" />
              <p>{{ item.name }}</p>
            </a-card-grid>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue';
  import { Row, Col, Tabs, TabPane, List, ListItem, Card, CardGrid } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import {
    homeTab1,
    homeTab2,
    homeTab3,
    homeTab4,
    homeTab5,
    homeModeList,
    orgList,
  } from './config';

  export default defineComponent({
    name: 'SynthesizeHome',
    components: {
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
      const state = reactive({
        homeTab1,
        activeKey1: ref('1'),

        homeTab2,
        activeKey2: ref('1'),

        homeTab3,
        activeKey3: ref('1'),

        homeTab4,
        activeKey4: ref('1'),

        homeTab5,
        activeKey5: ref('1'),

        homeModeList,
        orgList,
      });

      const tab1Click = (key) => {
        state.activeKey1 = key;
      };
      const tab2Click = (key) => {
        state.activeKey2 = key;
      };
      const tab3Click = (key) => {
        state.activeKey3 = key;
      };
      const tab4Click = (key) => {
        state.activeKey4 = key;
      };
      const tab5Click = (key) => {
        state.activeKey5 = key;
      };

      return {
        ...toRefs(state),
        tab1Click,
        tab2Click,
        tab3Click,
        tab4Click,
        tab5Click,
      };
    },
  });
</script>
