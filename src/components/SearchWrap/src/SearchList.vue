<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-18 20:51:36
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-24 17:43:21
 * @FilePath: /rural-revitalization/src/components/SearchWrap/src/SearchList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="bg-white search-con-box">
    <div class="search-form-con">
      <SearchItem :searchList="searchList" :count="searchCount" />
    </div>
    <div class="sl-btn">
      <a-button @click="handleSearch" type="primary">搜索</a-button>
      <a-button @click="handleReset" class="ml-2">重置</a-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SearchItem from './SearchItem.vue';

  export default defineComponent({
    components: {
      SearchItem,
    },
    props: {
      searchList: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['search', 'reset'],
    setup(_, { emit }) {
      const handleSearch = () => {
        emit('search');
      };

      const handleReset = () => {
        emit('reset');
      };

      return {
        handleReset,
        handleSearch,
      };
    },
  });
</script>

<style lang="less" scoped>
  .search-con-box {
    width: 100%;
    position: absolute;
    left: 0px;
    z-index: 100;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
    border: 1px solid rgb(0 0 0 / 10%);
    border-top: none;
  }

  .sl-btn {
    text-align: right;
    padding: 11px;
    border-top: 1px solid #d9d9d9;
  }
</style>

<style lang="less">
  [data-theme='dark'] {
    .ant-form,
    .op-task-search {
      border-bottom-color: #000 !important;
    }

    .sl-btn {
      border-top-color: #555;
    }

    .search-form-con {
      background-color: #2d2d2d;
    }
  }
</style>
