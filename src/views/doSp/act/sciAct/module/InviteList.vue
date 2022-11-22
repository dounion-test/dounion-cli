<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-12 09:58:37
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-12 13:59:02
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/module/InviteList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="width: 98%">
    <div>
      <div class="invite-list-title">出席</div>
      <ul class="flex flex-wrap">
        <li v-for="item in 1" :key="item" class="mr-2 mb-2">
          <InviteItem />
        </li>
      </ul>
    </div>
    <div>
      <div class="invite-list-title">未出席</div>
      <ul class="flex flex-wrap">
        <li v-for="item in 13" :key="item" class="mr-2 mb-2">
          <InviteItem />
        </li>
      </ul>
    </div>
    <div>
      <div class="invite-list-title">未联系</div>
      <ul class="flex flex-wrap">
        <li v-for="item in 4" :key="item" class="mr-2 mb-2">
          <InviteItem />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import InviteItem from './InviteItem.vue';

  export default defineComponent({
    components: {
      InviteItem,
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="less" scoped>
  .invite-list-title {
    background: #d8d8d8;
    border-bottom: 1px solid @primary-color;
    padding: 6px 8px;
    margin-bottom: 20px;
  }
</style>
