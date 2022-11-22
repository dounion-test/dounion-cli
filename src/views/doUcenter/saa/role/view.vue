<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-07 14:21:07
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-06-23 18:29:45
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/view.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper>
    <Description class="mt-4" title="基本信息" :column="2" :data="viewData" :schema="viewSchema" />

    <PageFooter>
      <a-button class="my-2" @click="goBack">返回</a-button>
    </PageFooter>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Description } from '/@/components/Description/index';
  import { PageWrapper, PageFooter } from '/@/components/Page';
  import { getUcenterRoleView } from '/@/api/testDemo/role';
  import { useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { viewSchema } from './config/view';

  export default defineComponent({
    name: 'UcenterRoleView',
    components: {
      Description,
      PageWrapper,
      PageFooter,
    },
    setup() {
      const router = useRouter();
      const {
        currentRoute: {
          value: {
            params: { id },
          },
        },
      } = router;
      const { closeCurrent } = useTabs();
      const goBack = () => {
        router.push({ name: 'UcenterRoleList' });
        closeCurrent();
      };

      let viewData = ref({});
      onMounted(async () => {
        try {
          const getViewParams = { id };
          viewData.value = await getUcenterRoleView(getViewParams);
        } catch {}
      });

      return { viewData, viewSchema, goBack };
    },
  });
</script>
