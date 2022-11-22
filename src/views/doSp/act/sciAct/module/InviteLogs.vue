<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-12 09:59:43
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-17 15:44:06
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/module/InviteLogs.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="invite-logs" style="width: 98%">
    <h2>邀请记录</h2>
    <div class="pb-10">
      <div
        v-if="attendList.length > 0 || unAttendList.length > 0"
        class="ai-orient flex justify-between"
      >
        <div class="ai-orient-wrap">
          <h3 class="mb-4">能出席的专家列表（{{ attendList.length }}人）</h3>
          <ul>
            <ScrollContainer>
              <li v-for="(item, index) in attendList" :key="item.id" class="pb-4">
                <InviteItem :showAction="false" :record="item" :itemIndex="index" />
              </li>
            </ScrollContainer>
          </ul>
        </div>
        <div class="ai-orient-wrap">
          <h3 class="mb-4">不能出席的专家列表（{{ unAttendList.length }}人）</h3>
          <ul>
            <ScrollContainer>
              <li v-for="(item, index) in unAttendList" :key="item.id" class="pb-4">
                <InviteItem :showAction="false" :record="item" :itemIndex="index" />
              </li>
            </ScrollContainer>
          </ul>
        </div>
      </div>
      <a-empty class="!mt-8" v-if="attendList.length == 0 && unAttendList.length == 0" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Empty } from 'ant-design-vue';
  import InviteItem from './InviteItem.vue';
  import { ScrollContainer } from '/@/components/Container';
  import { useRoute } from 'vue-router';
  import { spSciActInventRecordListApi } from '/@/api/doSp/act/sciAct';

  export default defineComponent({
    components: {
      InviteItem,
      ScrollContainer,
      AEmpty: Empty,
    },
    setup() {
      const route = useRoute();
      const attendList: any = ref([]);
      const unAttendList: any = ref([]);
      const getLogs = async () => {
        let res = await spSciActInventRecordListApi({ id: route.params.id });
        attendList.value = res.acceptList;
        unAttendList.value = res.unAcceptList;
      };
      getLogs();

      return {
        attendList,
        unAttendList,
      };
    },
  });
</script>

<style lang="less" scoped>
  .invite-logs {
    padding: 6px 8px;
    margin-bottom: 20px;
    h2 {
      font-size: @font-size-b2;
      font-weight: 700;
    }
  }

  .ai-orient {
    padding: 20px 40px;
    margin-top: 20px;
    background-color: #fafafa;
    border: 1px solid #d9d9d9;
  }

  .ai-orient-wrap {
    width: 49%;
    border-radius: 2px;

    h3 {
      font-size: @font-size-b2;
    }

    ul {
      padding: 20px;
      border: 1px solid #d9d9d9;
      background-color: #fff;
    }
  }
</style>
