<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-13 14:12:14
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-15 16:00:11
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/dynamicsJ/module/TabsList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-list size="large" :data-source="list" :pagination="pagination">
    <template #renderItem="{ item }">
      <a-list-item class="relative cursor-pointer">
        <div class="w-9/10" @click="handleView">
          <a-typography-title :level="5" style="font-size: 16px"
            >【{{ item.secondLevel }}】{{ item.title }}</a-typography-title
          >
          <a-typography-text type="secondary" class="ml-2">
            <span class="mr-8">作者：{{ item.authorIds }}</span>
            <span class="mr-8">来源：{{ item.sourceMedia }}</span>
            <span>新闻时间：{{ item.pulishTime }}</span>
          </a-typography-text>
          <div class="mt-2 ml-2">
            <a-typography-text>
              {{ item.abstractCn || item.abstractEn }}
            </a-typography-text>
          </div>
          <a-button class="tl-icon" preIcon="ant-design:star-outlined">收藏</a-button>
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
  import { defineComponent, reactive, watch } from 'vue';
  import { List, Typography } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: {
      AList: List,
      AListItem: List.Item,
      ATypographyTitle: Typography.Title,
      ATypographyText: Typography.Text,
    },
    props: {
      routerName: String,
      pageNo: Number,
      pageSize: Number,
      total: Number,
      list: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const router = useRouter();
      const pagination: any = reactive({
        onChange: (page: number) => {
          emit('change', page);
        },
        current: 1,
        pageSize: props.pageSize,
        size: 'small',
        total: 0,
        showTotal: (total) => `共${total}条`,
      });

      const handleView = () => {
        router.push({ name: props.routerName, params: { id: 1 } });
      };

      watch(
        () => props.pageNo,
        () => {
          pagination.current = props.pageNo as number;
        },
        { deep: true },
      );

      watch(
        () => props.total,
        (val) => {
          pagination.total = val;
        },
        { deep: true, immediate: true },
      );

      return {
        pagination,
        handleView,
      };
    },
  });
</script>

<style lang="less" scoped>
  .tl-icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
</style>
