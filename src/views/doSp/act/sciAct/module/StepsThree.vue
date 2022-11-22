<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-11 09:57:52
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 18:03:43
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/module/StepsThree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-tabs v-model:activeKey="activeKey" tab-position="left" class="!mt-8">
    <a-tab-pane key="1" tab="新增邀请"><AddInvite @change="handleChange" /></a-tab-pane>
    <a-tab-pane v-if="isEdit == 'edit'" key="2" tab="邀请记录"><InviteLogs /></a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import AddInvite from './AddInvite.vue';
  import InviteLogs from './InviteLogs.vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    components: {
      AddInvite,
      InviteLogs,
      ATabs: Tabs,
      ATabPane: TabPane,
    },
    setup() {
      const route = useRoute();
      const activeKey = ref('1');
      const attendList = ref([]);
      const unAttendList = ref([]);

      const handleChange = (attend, unAttend) => {
        attendList.value = attend;
        unAttendList.value = unAttend;
      };

      return {
        activeKey,
        attendList,
        unAttendList,
        handleChange,
        isEdit: route.params.type,
      };
    },
  });
</script>

<style scoped></style>
