<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 11:01:25
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-19 21:58:11
 * @FilePath: /rural-revitalization/src/views/doOp/task/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <div class="p-2 op-task-search">
      <SearchWrap placeholder="请输入文献名称" :searchList="[]" @search="handleSearch" />
    </div>
    <div class="p-2">
      <BasicTable @register="registerTable" class="!p-0" :searchInfo="searchParams">
        <template #bodyCell="{ column, record }">
          <div v-if="column.dataIndex == 'title'" class="title-color">
            {{ record.title || record.titleEn || record.name }}
          </div>
        </template>
        <template #action="{ record }">
          <TableAction
            @click.stop
            :actions="[
              {
                icon: 'ant-design:star-filled',
                tooltip: '取消收藏',
                onClick: handleCollectClick.bind(null, record),
              },
            ]"
          />
        </template>
      </BasicTable>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { columns } from './config';
  import {
    domesGeneralInfoCollectListApi,
    domesGeneralInfoCollectCancelApi,
  } from '/@/api/doInfo/synthesize/collect';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'InfoCollectionList',
    components: {
      BasicTable,
      PageWrapper,
      SearchWrap,
      TableAction,
    },
    setup() {
      const router = useRouter();
      const { createMessage } = useMessage();
      const searchParams = reactive({
        nameQueryLike: undefined,
      });

      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        api: domesGeneralInfoCollectListApi,
        rowKey: 'id',
        columns,
        useSearchForm: false,
        canResize: false,
        showTableSetting: false,
        showIndexColumn: true,
        bordered: false,
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        customRow: (record) => {
          return {
            onClick: () => {
              switch (record.firstLevel) {
                case '前沿动态':
                  router.push({ name: 'GeneralInfoDynamicsView', params: { id: record.docId } });
                  break;
                case '政策法规':
                  router.push({ name: 'GeneralInfoPoliciesView', params: { id: record.docId } });
                  break;
                case '典型案例':
                  router.push({ name: 'GeneralInfoCaseView', params: { id: record.docId } });
                  break;
                case '科研态势':
                  router.push({ name: 'GeneralInfoSituationView', params: { id: record.docId } });
                  break;
                case '专题板块':
                  router.push({ name: 'GeneralInfoSectionView', params: { id: record.docId } });
                  break;
                case '专家机构':
                  router.push({ name: 'GeneralInfoExpertView', params: { id: record.docId } });
                  break;
                default:
                  break;
              }
            },
          };
        },
      });

      const handleSearch = (inputvalue, searchList) => {
        searchParams.nameQueryLike = inputvalue;
        if (searchList.length > 0) {
          searchList.forEach((item) => {
            searchParams[item.field] = item.value;
          });
        }
        reload();
      };

      const handleCollectClick = async (record) => {
        await domesGeneralInfoCollectCancelApi({ ids: record.id });
        createMessage.success('操作成功');
        reload();
      };

      return {
        registerTable,
        searchParams,
        handleSearch,
        handleCollectClick,
      };
    },
  });
</script>

<style lang="less" scoped>
  .op-task-search {
    border-bottom: 16px solid #f0f2f5;
  }

  .title-color {
    color: @primary-color;
    cursor: pointer;
  }
</style>
