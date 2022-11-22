<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-19 17:08:36
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 14:47:54
 * @FilePath: /rural-revitalization/src/views/doMail/send.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper contentFullHeight contentBackground>
    <BasicTable @register="registerTable" class="!p-0" :searchInfo="searchParams">
      <template #form-custom>
        <a-form-item-rest>
          <SearchWrap
            placeholder="请输入主题或收件人"
            :searchList="searchArr"
            @search="handleSearch"
          />
        </a-form-item-rest>
      </template>
      <template #topic="{ record }">
        <span
          :class="{ 'email-topic': hasPermission('XcmailSendView') }"
          @click="handleView(record.id)"
          >{{ record.topic }}</span
        >
      </template>
      <template #oaAttachmentList="{ record }">
        <div>
          <Icon v-if="record.oaAttachmentList.length > 0" icon="ant-design:paper-clip-outlined" />
        </div>
      </template>
      <template #emailSize="{ record }">
        <div>{{ (record.emailSize / 1024).toFixed(2) }} K</div>
      </template>
      <template #action="{ record }">
        <TableAction
          @click.stop
          :actions="[
            {
              icon: 'eva:edit-2-outline',
              label: '再次编辑',
              tooltip: '再次编辑',
              auth: 'XcmailSendReedit',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'fluent:delete-28-regular',
              color: 'error',
              tooltip: '删除',
              label: '删除',
              auth: 'XcmailSendDelete',
              popConfirm: {
                title: '是否确认删除',
                placement: 'bottomRight',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Icon } from '/@/components/Icon';
  import { SearchWrap } from '/@/components/SearchWrap';
  import { oamailSendListApi, oamailSendDeleteApi } from '/@/api/doMail/send';
  import { PageWrapper } from '/@/components/Page';
  import { columns, searchArr, getFormConfig } from '../config/send';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRouter } from 'vue-router';
  import { usePermission } from '/@/hooks/web/usePermission';
  export default defineComponent({
    name: 'XcmailSendList',
    components: {
      Icon,
      BasicTable,
      TableAction,
      PageWrapper,
      SearchWrap,
      AFormItemRest: Form.ItemRest,
    },
    setup() {
      const router = useRouter();
      const { createMessage } = useMessage();
      const searchParams = reactive({
        topicOrPersonName: undefined,
        topicLike: undefined,
        receiveNamesLike: undefined,
        sendStartTime: undefined,
        sendEndTime: undefined,
      });
      const { hasPermission } = usePermission();
      const hasAuth = [hasPermission('XcmailSendReedit'), hasPermission('XcmailSendView')];
      /**
       * table 列表
       */
      const [registerTable, { reload }] = useTable({
        api: oamailSendListApi,
        rowKey: 'id',
        columns,
        formConfig: getFormConfig(),
        useSearchForm: true,
        canResize: false,
        showTableSetting: true,
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
            onDblclick: () => {
              if (hasAuth[0]) {
                router.push({
                  name: 'XcmailSendReedit',
                  params: { id: record.id, type: 'edit_send' },
                });
              } else if (hasAuth[1]) {
                router.push({
                  name: 'XcmailSendView',
                  params: { id: record.id, type: 'send' },
                });
              } else {
                createMessage.warning('您暂无编辑与查看权限');
              }
            },
          };
        },
      });

      //查看
      const handleView = (id) => {
        if (hasAuth[1]) {
          router.push({ name: 'XcmailSendView', params: { id, type: 'send' } });
        } else {
          return;
        }
      };

      /**
       * 编辑
       */
      const handleEdit = (item) => {
        router.push({ name: 'XcmailSendReedit', params: { id: item.id, type: 'edit_send' } });
      };

      /**
       * 删除
       */
      const handleDelete = async (record) => {
        await oamailSendDeleteApi({ ids: record.id });
        createMessage.success('操作成功');
        reload();
      };

      /**
       * 搜索
       */
      const handleSearch = (inputvalue, searchList) => {
        searchParams.topicOrPersonName = inputvalue;
        if (searchList.length > 0) {
          searchList.forEach((item) => {
            if (item.type == 'rangePicker') {
              searchParams.sendStartTime = item.value ? item.value[0] : undefined;
              searchParams.sendEndTime = item.value ? item.value[1] : undefined;
            } else {
              searchParams[item.field] = item.value;
            }
          });
        }
        reload();
      };

      return {
        searchArr,
        searchParams,
        registerTable,
        handleView,
        handleEdit,
        handleDelete,
        handleSearch,
        hasPermission,
      };
    },
  });
</script>

<style lang="less" scoped>
  :deep(.ant-table-thead) {
    tr {
      :nth-child(2)::before {
        width: 0 !important;
      }
    }
  }
</style>

<style lang="less">
  .email-topic {
    cursor: pointer;
    color: @primary-color;
  }
</style>
