<template>
  <PageWrapper contentFullHeight fixedHeight contentBackground>
    <template v-if="tabsList?.length">
      <a-tabs class="!px-2 dynamics-tabs" v-model:activeKey="activeKey" size="small">
        <a-tab-pane v-for="item in tabsList" :key="item.name" :tab="item.nameValue">
          <a-button
            @click="goDetail(desc)"
            class="mb-3 mr-3"
            v-for="desc in item.descList"
            :key="desc.id"
            >{{ desc.statisticalName }}</a-button
          >
        </a-tab-pane>
      </a-tabs>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { localIndexList } from '/@/api/doSp/local';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'LocalInfoIndexList',
    components: {
      PageWrapper,
      ATabs: Tabs,
      ATabPane: TabPane,
    },
    setup() {
      const router = useRouter();
      const tabsList: any = ref([]);
      const activeKey = ref();
      const requestList = async () => {
        try {
          tabsList.value = (await localIndexList()) as Recordable[];

          activeKey.value = tabsList.value[0].name;
        } catch (err) {
          console.log(err);
        }
      };

      const goDetail = ({ id }) => {
        router.push(
          `/doSp/docInfoSys/local/view/${id}?showTree=${activeKey.value === '52060-50' ? 1 : 0}`,
        );
        // router.push({
        //   name: '',
        //   params: { id },
        // });
      };

      onMounted(() => requestList());

      return { tabsList, activeKey, goDetail };
    },
  });
</script>

<style lang="less" scoped>
  .dynamics-tabs {
    :deep(.ant-tabs-nav-list) {
      .ant-tabs-tab {
        min-width: 100px;
        justify-content: center;
      }
    }
  }
</style>
