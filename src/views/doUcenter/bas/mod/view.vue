<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-27 16:57:42
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-31 09:28:01
 * @FilePath: /rural-revitalization/src/views/doUcenter/messageTemplate/view.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight fixedHeight contentBackground class="pb-10">
    <ul class="p-4 h-9/10">
      <li v-for="(item, index) in list" :key="index" class="flex mb-2">
        <div class="mr-4 ml-10">{{ item.label }}</div>
        <div>{{ info[item.field] ? info[item.field] : '-' }}</div>
      </li>
    </ul>
    <div class="bg-white" style="text-align: right">
      <a-button class="mr-3" @click="goBack()">返回</a-button>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { list } from './config/view';
  import { useRoute, useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { doremindBasMsgConfigViewApi } from '/@/api/doRemind/messageTemplate';

  export default defineComponent({
    components: {
      PageWrapper,
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const info = ref({});
      const { close } = useTabs();
      const getView = async () => {
        let res = await doremindBasMsgConfigViewApi({ bizType: route.params.id });
        console.log(res, 'res');
        let sendTypeName: any = [];
        res.list.forEach((item) => {
          sendTypeName.push(item.sendTypeName);
        });
        info.value = { sendTypeName: sendTypeName.join(','), ...res };
      };
      getView();

      // 取消
      const goBack = () => {
        close();
        router.push({ name: 'MessageTemplate' });
      };
      return {
        list,
        info,
        goBack,
      };
    },
  });
</script>

<style scoped></style>
