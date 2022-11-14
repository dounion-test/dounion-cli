<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-24 09:37:03
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-07 13:53:39
 * @FilePath: /rural-revitalization/src/views/doUcenter/systemCode/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" :searchInfo="searchParams" class="!p-0">
      <template #form-custom>
        <a-form-item-rest>
          <SearchWrap placeholder="请输入模板名称" :searchList="searchArr" @search="handleSearch" />
        </a-form-item-rest>
      </template>
      <template #isSys="{ record }">
        <div>{{ record.isSys ? '系统' : '用户' }}</div>
      </template>
      <!-- <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          @click.stop
          :actions="[
            {
              icon: 'eva:edit-2-outline',
              tooltip: '修改',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'fluent:delete-28-regular',
              color: 'error',
              tooltip: '删除',
              popConfirm: {
                title: '是否确认删除',
                placement: 'bottomRight',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template> -->
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, getFormConfig, searchArr } from './config/index';
  import {
    doremindBasMsgConfigListApi,
    doremindBasMsgConfigDeleteApi,
  } from '/@/api/doRemind/messageTemplate';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'SystemCode',
    components: {
      PageWrapper,
      SearchWrap,
      BasicTable,
      TableAction,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const router = useRouter();
      const { createMessage } = useMessage();
      const searchParams = reactive({
        nameQueryLike: undefined,
        orgIdQueryIn: undefined,
        bizTypeQueryIn: undefined,
      });
      /**
       * table 列表
       */
      const [registerTable, { reload, setLoading }] = useTable({
        api: doremindBasMsgConfigListApi,
        rowKey: 'bizType',
        columns,
        formConfig: getFormConfig(),
        useSearchForm: true,
        canResize: false,
        showTableSetting: true,
        showIndexColumn: true,
        bordered: false,
        // actionColumn: {
        //   width: 100,
        //   title: '操作',
        //   dataIndex: 'action',
        //   slots: { customRender: 'action' },
        // },
        afterFetch: (res) => handleAfterFetch(res),
        customRow: (record) => {
          return {
            onClick: () => {
              router.push({ name: 'BasMsgConfigView', params: { id: record.bizType } });
            },
          };
        },
      });

      // 数据处理
      const handleAfterFetch = (res) => {
        res.forEach((item) => {
          let listName: any = [];
          item.list.forEach((it) => {
            listName.push(it.sendTypeName);
          });
          item.listName = listName.length > 0 ? listName.join(',') : '';
        });
        return res;
      };

      // 新增
      const handleCreate = () => {
        router.push({ name: 'MessageTemplateAdd', params: { type: 'add' } });
      };

      // 编辑
      const handleEdit = (record) => {
        router.push({ name: 'MessageTemplateEdit', params: { type: 'edit', id: record.bizType } });
      };

      // 删除
      const handleDelete = async (record) => {
        await doremindBasMsgConfigDeleteApi({ bizTypes: record.bizType });
        createMessage.success('操作成功');
        setLoading(true);
        reload();
      };

      // 搜索
      const handleSearch = (inputvalue, searchList) => {
        searchParams.nameQueryLike = inputvalue;
        if (searchList.length > 0) {
          searchList.forEach((item) => {
            searchParams[item.field] = item.value;
          });
        }
        setLoading(true);
        reload();
      };

      return {
        searchArr,
        searchParams,
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSearch,
      };
    },
  });
</script>
<style lang="less">
  .messageTemplate-name {
    cursor: pointer;
    color: @primary-color;
  }
</style>
