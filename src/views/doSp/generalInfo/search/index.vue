<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 11:01:25
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 16:22:45
 * @FilePath: /rural-revitalization/src/views/doOp/task/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground contentClass="pb-4">
    <div class="p-2 op-task-search">
      <SearchWrap placeholder="请输入文献名称" :searchList="searchArr" @search="handleSearch" />
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
                icon: 'ant-design:star-outlined',
                tooltip: '收藏',
                ifShow: record.isCollect ? false : true,
                onClick: handleCollect.bind(null, record),
              },
              {
                icon: 'ant-design:star-filled',
                tooltip: '取消收藏',
                ifShow: record.isCollect ? true : false,
                onClick: handleCancelCollect.bind(null, record),
              },
            ]"
          />
        </template>
      </BasicTable>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { columns } from './config';
  import { domesGeneralInfoDoListApi } from '/@/api/doInfo/synthesize/index';
  import { usePermission } from '/@/hooks/web/usePermission';
  import {
    domesGeneralInfoCollectApi,
    domesGeneralInfoCollectCancelApi,
  } from '/@/api/doInfo/synthesize/collect';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';
  import { searchArr } from './config/index';

  export default defineComponent({
    name: 'GeneralInfoSearch',
    components: {
      BasicTable,
      PageWrapper,
      SearchWrap,
      TableAction,
    },
    setup() {
      const router = useRouter();
      const { createMessage } = useMessage();
      const { hasPermission } = usePermission();
      const searchParams = reactive({
        titleQueryLike: undefined,
        createTimeQueryGe: undefined,
        createTimeQueryLe: undefined,
      });

      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        api: domesGeneralInfoDoListApi,
        rowKey: 'id',
        columns,
        immediate: true,
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
              switch (record.firstLevelNames) {
                case '前沿动态':
                  if (!hasPermission('GeneralInfoDynamicsView')) {
                    createMessage.warning('您暂无前沿动态权限!');
                    return;
                  }
                  router.push({ name: 'GeneralInfoDynamicsView', params: { id: record.id } });
                  break;
                case '政策法规':
                  if (!hasPermission('GeneralInfoPoliciesView')) {
                    createMessage.warning('您暂无政策法规权限!');
                    return;
                  }
                  router.push({ name: 'GeneralInfoPoliciesView', params: { id: record.id } });
                  break;
                case '典型案例':
                  if (!hasPermission('GeneralInfoCaseView')) {
                    createMessage.warning('您暂无典型案例权限!');
                    return;
                  }
                  router.push({ name: 'GeneralInfoCaseView', params: { id: record.id } });
                  break;
                case '科研态势':
                  if (!hasPermission('GeneralInfoSituationView')) {
                    createMessage.warning('您暂无科研态势权限!');
                    return;
                  }
                  router.push({ name: 'GeneralInfoSituationView', params: { id: record.id } });
                  break;
                case '专题板块':
                  if (!hasPermission('GeneralInfoSectionView')) {
                    createMessage.warning('您暂无专题板块权限!');
                    return;
                  }
                  router.push({ name: 'GeneralInfoSectionView', params: { id: record.id } });
                  break;
                case '专家机构':
                  if (!hasPermission('GeneralInfoExpertView')) {
                    createMessage.warning('您暂无专家机构权限!');
                    return;
                  }
                  router.push({ name: 'GeneralInfoExpertView', params: { id: record.id } });
                  break;
                default:
                  break;
              }
            },
          };
        },
      });

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

      const handleSearch = (inputvalue, searchList) => {
        searchParams.titleQueryLike = inputvalue;
        if (searchList.length) {
          searchList.forEach((item) => {
            if (item.type == 'rangePicker') {
              searchParams.createTimeQueryGe = item.value ? item.value[0] : undefined;
              searchParams.createTimeQueryLe = item.value ? item.value[1] : undefined;
            } else {
              searchParams[item.field] = item.value;
            }
          });
        }
        reload();
      };

      return {
        registerTable,
        searchParams,
        handleSearch,
        handleCollect,
        handleCancelCollect,
        searchArr,
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
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
