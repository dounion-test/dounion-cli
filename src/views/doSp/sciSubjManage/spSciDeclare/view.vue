<template>
  <PageWrapper contentBackground contentFullHeight contentClass="p-4 flex">
    <Description
      class="w-full mt-4 desciption-view !mb-10"
      :column="2"
      :data="viewData"
      :schema="viewSchema"
    />
    <template #rightFooter>
      <a-button @click="goBack">返回</a-button>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useRoute, useRouter } from 'vue-router';
  import { spSciDeclareView } from '/@/api/testDemo/scientific';
  import { Description } from '/@/components/Description/index';
  import { viewSchema } from './config/view';
  export default defineComponent({
    name: 'SpSciDeclareView',
    components: {
      PageWrapper,
      Description,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const viewData = ref<Recordable>({});

      // 请求查看接口
      const requestView = () => {
        let params = { id: route.params.id };
        spSciDeclareView(params).then((data) => {
          viewData.value = data;
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
        viewSchema,
        viewData,
        goBack,
      };
    },
  });
</script>
