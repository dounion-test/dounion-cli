<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-19 11:57:04
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 13:31:05
 * @FilePath: /rural-revitalization/src/views/doSp/generalInfo/expert/module/cardList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <a-card>
      <a-card-grid
        @click="handleView(it)"
        v-for="it in list"
        :key="it"
        style="width: 20%; text-align: center"
      >
        <div class="image-info" :class="{ 'person-info': activeKey == '专家' }">
          <span class="img" v-if="activeKey == '专家'"
            ><img
              v-if="it.originalAttachments.length"
              class="grid-img1 mb-2"
              :src="`${VITE_GLOB_DOFILE_URL}${it.originalAttachments[0].filePath}`"
            />
            <img v-else class="grid-img1 mb-2" :src="defaultAvatar" />
          </span>
          <span class="img" v-if="activeKey == '机构'">
            <img
              v-if="it.originalAttachments.length"
              class="grid-img2 mb-2"
              :src="`${VITE_GLOB_DOFILE_URL}${it.originalAttachments[0].filePath}`"
            />
            <Icon v-else icon="icon-park-twotone:pic" :size="80" color="#c7c7c7" />
          </span>
          <strong>{{ it.name }}</strong>
        </div>
      </a-card-grid>
    </a-card>
    <div class="page-wrap">
      <a-pagination
        v-model:current="current"
        v-model:page-size="pageSizeSon"
        size="small"
        :total="total"
        :show-total="(total) => `共 ${total} 条`"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, watch } from 'vue';
  import { Card, CardGrid, Pagination } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { useRouter } from 'vue-router';
  import { getAppEnvConfig } from '/@/utils/env';
  import defaultAvatar from '/@/assets/images/default-avatar.jpg';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    components: {
      Icon,
      ACard: Card,
      ACardGrid: CardGrid,
      APagination: Pagination,
    },
    props: {
      pageNo: Number,
      pageSize: Number,
      total: Number,
      activeKey: String,
      list: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const { hasPermission } = usePermission();
      const { createMessage } = useMessage();
      const router = useRouter();
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      const pagination = reactive({
        current: 1,
        pageSizeSon: props.pageSize,
        total: 0,
      });

      const handleView = (record) => {
        if (!hasPermission('GeneralInfoExpertView')) {
          createMessage.warning('您暂无查看权限!');
          return;
        }
        router.push({ name: 'GeneralInfoExpertView', params: { id: record.id } });
      };

      const handleChange = (page) => {
        emit('change', page);
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
          pagination.total = val as number;
        },
        { deep: true, immediate: true },
      );

      return {
        defaultAvatar,
        VITE_GLOB_DOFILE_URL,
        ...toRefs(pagination),
        handleView,
        handleChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .image-info {
    :deep(.ant-col) {
      padding: 20px 10px;
      border-left: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }

    .img {
      display: flex;
      align-items: center;
      width: 90px;
      height: 125px;
      margin: 0 auto;

      img {
        object-fit: contain;
        width: 100%;
        height: auto;
      }
    }

    strong {
      display: block;
      font-weight: normal;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .person-info {
    .img img {
      height: 100%;
      object-fit: cover;
    }
  }

  .page-wrap {
    text-align: right;
    padding: 10px 0;
  }
</style>
