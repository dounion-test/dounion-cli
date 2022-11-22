<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-13 13:55:35
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-14 16:37:31
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/dynamicsJ/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <a-tabs class="!px-2 dynamics-tabs">
      <template v-for="item in settingList" :key="item.key">
        <a-tab-pane :tab="item.name">
          <a-card>
            <a-card-grid
              @click="handleView"
              v-for="it in 30"
              :key="it"
              style="width: 20%; text-align: center"
            >
              <div>
                <img
                  class="grid-img mb-2"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
                <div class="mt-2">张天柱</div>
              </div>
            </a-card-grid>
          </a-card>
        </a-tab-pane>
      </template>
    </a-tabs>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { Tabs, TabPane, Card, CardGrid } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: {
      PageWrapper,
      ATabs: Tabs,
      ATabPane: TabPane,
      ACard: Card,
      ACardGrid: CardGrid,
    },
    setup() {
      const router = useRouter();
      const handleView = () => {
        // router.push({ name: 'ExpertView', params: { id: 1 } });
        router.push({ name: 'OrgView', params: { id: 1 } });
      };
      return {
        settingList: [
          {
            key: '1',
            name: '专家',
          },
          {
            key: '2',
            name: '机构',
          },
        ],
        handleView,
      };
    },
  });
</script>

<style lang="less">
  .dynamics-tabs {
    .ant-tabs-tab {
      width: 100px;
      justify-content: center;
    }
  }
</style>

<style lang="less" scoped>
  .grid-img {
    width: 60px;
    height: 80px;
    margin: 0 auto;
  }
</style>
