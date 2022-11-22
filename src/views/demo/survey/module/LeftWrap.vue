<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-19 15:59:32
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-07-20 10:11:33
 * @FilePath: /vben-ucenter/src/views/demo/system/survey/module/LeftWrap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <ul class="left h-full bg-white p-2">
    <li
      v-for="item in leftArr"
      @click.stop="handleClick(item)"
      :key="item.value"
      :from-key="item.value"
    >
      <a-button :from-key="item.value" class="show-btn">
        <!-- from-key 属性必须，移动元素后创建了新dom, 只能监听新dom的点击事件，from-key保证能在监听中获取到value -->
        <span :from-key="item.value">{{ item.label }}</span>
      </a-button>
      <div class="show-from p-1 bg-red-300"></div>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { leftArr } from '../config';

  export default defineComponent({
    emits: ['addfrom'],
    setup(_, { emit }) {
      const handleClick = (item) => {
        emit('addfrom', item);
      };
      return {
        leftArr,
        handleClick,
      };
    },
  });
</script>

<style lang="less" scoped>
  .left {
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);

    li {
      width: 46%;
      display: inline-block;
      margin: 2%;
    }

    .show-btn {
      width: 100%;
    }
  }
</style>
