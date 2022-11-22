<template>
  <PageWrapper contentBackground contentFullHeight contentClass="p-4">
    <div class="document-viewbox">
      <!-- 新闻 -->
      <component :is="currentComponent" :data="viewData" ref="viewDocRef" />
    </div>
    <template #rightFooter>
      <a-button @click="goBack">返回</a-button>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useRoute, useRouter } from 'vue-router';
  import { infoDocView } from '/@/api/doInfo/index';

  import viewXinwen from './module/viewXinwen.vue';
  import viewJigou from './module/viewJigou.vue';
  import viewJijinxiangmu from './module/viewJijinxiangmu.vue';
  import viewKejibaogao from './module/viewKejibaogao.vue';
  import viewQikan from './module/viewQikan.vue';
  import viewZhengce from './module/viewZhengce.vue';
  import viewZhuanjia from './module/viewZhuanjia.vue';

  export default defineComponent({
    name: 'InfoDocView',
    components: {
      PageWrapper,

      viewXinwen,
      viewJigou,
      viewJijinxiangmu,
      viewKejibaogao,
      viewQikan,
      viewZhengce,
      viewZhuanjia,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const viewData = ref<Recordable>({});
      const currentComponent = ref('');
      // 请求查看接口
      const requestView = () => {
        let params = { id: route.params.id };
        infoDocView(params).then((data) => {
          viewData.value = data;
          const { docType } = data;
          console.log(docType, 'docType');
          switch (docType) {
            case '新闻':
              currentComponent.value = 'viewXinwen';
              break;
            case '机构':
              currentComponent.value = 'viewJigou';
              break;
            case '基金':
              currentComponent.value = 'viewJijinxiangmu';
              break;
            case '科技报告':
              currentComponent.value = 'viewKejibaogao';
              break;
            case '期刊':
              currentComponent.value = 'viewQikan';
              break;
            case '政策':
              currentComponent.value = 'viewZhengce';
              break;
            case '专家':
              currentComponent.value = 'viewZhuanjia';
              break;
          }
        });
      };
      // 返回
      const goBack = () => {
        router.go(-1);
      };
      onMounted(() => {
        requestView();
      });

      return {
        viewData,
        goBack,
        currentComponent,
      };
    },
  });
</script>

<style lang="less" scoped>
  .document-viewbox {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    :deep(h2) {
      text-align: center;
      font-size: @font-size-b6;
      font-weight: 700;
      span {
        font-weight: normal;
      }
    }
    :deep(.doc-hd) {
      display: flex;
      justify-content: space-between;
      padding: 30px 0 6px;
      color: #666;
      border-bottom: 1px solid #ddd;
      .hd-left {
        span {
          margin-left: 20px;
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
    :deep(.doc-bd) {
      padding-top: 10px;
      .abstract-con {
        padding: 15px;
        background-color: #f6f6f6;
      }
      p {
        line-height: 2;
        white-space: pre-line;
      }
      .annex {
        display: flex;
        .upfile-list-view {
          padding-top: 4px;
        }
      }
      .education-info {
        display: flex;
      }
      .other-info {
        display: flex;
        flex-wrap: wrap;
        padding-top: 10px;
        li {
          width: 50%;
          line-height: 2;
          &.single {
            width: 100%;
          }
        }
      }
    }
  }
</style>
