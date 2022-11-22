<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-13 14:12:14
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-24 15:16:43
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/dynamicsJ/module/TabsList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-list size="large" :data-source="list" :pagination="pagination.total ? pagination : false">
    <template #renderItem="{ item }">
      <a-list-item class="relative cursor-pointer">
        <div class="w-9/10">
          <a-typography-title
            @click="handleView(item)"
            :level="5"
            style="font-size: 16px"
            :class="{ alink: hasPermission(props.routerName) }"
            >【{{ item.secondLevelNames }}{{ showDocType ? `/${item.docType}` : '' }}】{{
              item.title
            }}</a-typography-title
          >
          <a-typography-text type="secondary" class="ml-2">
            <span class="mr-8">作者：{{ item.authorNames || '-' }}</span>
            <span class="mr-8">来源：{{ item.sourceMedia || '-' }}</span>
            <span>新闻时间：{{ item.pulishTime || '-' }}</span>
          </a-typography-text>
          <div class="mt-2 ml-2">
            <a-typography-text>
              {{ item.abstractCn || item.abstractEn }}
            </a-typography-text>
          </div>
          <a-button
            v-if="!item.isCollect"
            @click.stop="handleCollect(item)"
            class="tl-icon"
            preIcon="ant-design:star-outlined"
            >收藏</a-button
          >
          <a-button
            v-if="item.isCollect"
            @click.stop="handleCancelCollect(item)"
            class="tl-icon-al"
            preIcon="ant-design:star-filled"
            >已收藏</a-button
          >
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
  import { defineComponent, reactive, watch } from 'vue';
  import { List, Typography } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import {
    domesGeneralInfoCollectApi,
    domesGeneralInfoCollectCancelApi,
  } from '/@/api/doInfo/synthesize/collect';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';

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
      showDocType: {
        type: Boolean,
        default: () => false,
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const { hasPermission } = usePermission();
      const router = useRouter();
      const { createMessage } = useMessage();
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

      const handleView = (record) => {
        if (hasPermission(props.routerName)) {
          router.push({ name: props.routerName, params: { id: record.id } });
        } else {
          createMessage.warning('对不起，您暂无查看权限！');
        }
      };

      const handleCollect = async (record) => {
        await domesGeneralInfoCollectApi({ docId: record.id });
        record.isCollect = 1;
        createMessage.success('收藏成功');
      };

      const handleCancelCollect = async (record) => {
        await domesGeneralInfoCollectCancelApi({ ids: record.id });
        record.isCollect = 0;
        createMessage.success('操作成功');
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
        handleCollect,
        handleCancelCollect,
        hasPermission,
        props,
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

  .tl-icon-al {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 78px;
    padding: 0;
    color: @primary-color;
  }

  .generalInfo-title:hover {
    color: @primary-color;
  }
</style>
