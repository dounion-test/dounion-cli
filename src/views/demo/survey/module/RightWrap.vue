<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-19 17:10:18
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-07-25 10:05:29
 * @FilePath: /vben-ucenter/src/views/demo/system/survey/module/RightWrap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="right h-full bg-white p-2">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane key="1" tab="全局设置">
        <div class="flex justify-between">
          <span>表单必填</span>
          <a-switch v-model:checked="isRequired" @change="handleSwitchChange" />
        </div>
        <a-divider />
      </a-tab-pane>
      <a-tab-pane key="2" tab="表单设置" force-render>
        <div>
          <span>该表单必填</span>
          <a-switch v-model:checked="isRequired" @change="handleSwitchChange" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue';
  import { Switch, Tabs, Divider } from 'ant-design-vue';

  export default defineComponent({
    components: { ASwitch: Switch, ATabs: Tabs, ATabPane: Tabs.TabPane, ADivider: Divider },
    props: {
      required: {
        type: Boolean,
        default: () => true,
      },
      midItem: Object,
      midIndex: Number,
      moduleIndex: Number,
    },
    emits: ['save'],
    setup(props, { emit }) {
      const activeKey = ref('1');

      const handleSwitchChange = () => {
        console.log('llllllll');
      };

      const handleClick = () => {
        emit('save');
      };

      return {
        isRequired: computed(() => {
          return props.required;
        }),
        activeKey,
        handleClick,
        handleSwitchChange,
      };
    },
  });
</script>
<style lang="less" scoped>
  .right {
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  }

  :deep(.ant-tabs-nav-list) {
    width: 100%;

    .ant-tabs-tab {
      width: 50%;
      justify-content: center;
    }
  }

  :deep(.ant-divider-horizontal) {
    margin: 12px 0;
  }
</style>
