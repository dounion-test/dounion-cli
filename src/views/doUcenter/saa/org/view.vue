<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-07 14:21:07
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-07-11 15:50:45
 * @FilePath: /vben-ucenter/src/views/doUcenter/org/view.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <Description class="mt-4" title="基本信息" :column="2" :data="viewData" :schema="schema" />
    <div class="bg-white pt-4 pb-4" style="text-align: right">
      <a-button class="mr-2" @click="goBack()">返回</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Description } from '/@/components/Description/index';
  import { PageWrapper } from '/@/components/Page';
  import { getUcenterDeptPersonView } from '/@/api/testDemo/dept';
  import { useRouter } from 'vue-router';
  import { viewSchema } from './config/view';
  import { useTabs } from '/@/hooks/web/useTabs';
  export default defineComponent({
    name: 'UcenterOrgView',
    components: {
      Description,
      PageWrapper,
    },
    setup() {
      const router = useRouter();
      const { close } = useTabs();
      const {
        currentRoute: {
          value: {
            params: { id },
          },
        },
      } = router;
      let viewData = ref({});

      const schema = viewSchema;
      onMounted(async () => {
        try {
          const getViewParams = { id };
          viewData.value = await getUcenterDeptPersonView(getViewParams);
        } catch {}
      });

      const goBack = () => {
        router.push({
          name: 'UcenterOrgList',
        });

        close(router.currentRoute.value);
      };
      return { viewData, schema, goBack };
    },
  });
</script>
