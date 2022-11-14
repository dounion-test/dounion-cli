<template>
  <div>
    <PageWrapper contentFullHeight>
      <div class="search-box">
        <a-input-search
          v-model:value="searchValue"
          placeholder="请根据课题/项目的名称进行检索"
          style="width: 300px"
          @search="onSearch"
        />
      </div>

      <div class="content">
        <a-tabs v-model:activeKey="tabsActiveKey">
          <a-tab-pane key="1" tab="申报公告">
            <BasicTable @register="registerTable">
              <template #toolbar>
                <a-button type="primary" @click="handleCreate">新增</a-button>
              </template>
              <template #action="{ record }">
                <TableAction
                  :actions="[
                    {
                      icon: 'akar-icons:eye',
                      tooltip: '查看详情',
                      onClick: handleView.bind(null, record),
                    },
                    {
                      icon: 'eva:edit-2-outline',
                      tooltip: '编辑',
                      onClick: handleEdit.bind(null, record),
                    },
                    {
                      icon: 'ant-design:user-add-outlined',
                      tooltip: '申请报名',
                      onClick: handleApply.bind(null, record),
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
              </template>
              <template #status="{ record }">
                <a-tag :color="getStatus(record).type">
                  {{ getStatus(record).label }}
                </a-tag>
              </template>
            </BasicTable>
          </a-tab-pane>

          <a-tab-pane key="2" tab="我的课题">
            <a-list :pagination="pagination">
              <a-list-item class="list">
                <a-list-item-meta>
                  <template #avatar>
                    <img class="imgStyle" :src="demoImg" />
                  </template>
                  <template #title>
                    <a href="">【项目】2023年乡村振兴农村科技发展研究项目：农业提质增效</a>
                    <a-button class="ml-5" type="primary" size="small">编辑</a-button>
                  </template>
                  <template #description>
                    <div>
                      <span class="mr-5"
                        >负责人：徐振东 项目小组：马骏、王刚
                        <a-button class="ml-5" type="primary" size="small">授权管理</a-button></span
                      ><span>起止时间：2022-06-12 至 2022-11-16</span>
                    </div>

                    <ul class="description-b mt-1">
                      <li>
                        <div>
                          <div class="flow"> <pie-chart-two-tone /></div>
                          <p class="text-center mb-0">申报</p>
                        </div>

                        <div class="icon ml-8 mr-8"><double-right-outlined /></div>
                      </li>
                      <li>
                        <div>
                          <div class="flow"> <pie-chart-two-tone /></div>
                          <p class="text-center mb-0">申报</p>
                        </div>

                        <div class="icon ml-8 mr-8"><double-right-outlined /></div>
                      </li>
                      <li>
                        <div>
                          <div class="flow"> <pie-chart-two-tone /></div>
                          <p class="text-center mb-0">申报</p>
                        </div>

                        <div class="icon ml-8 mr-8"><double-right-outlined /></div>
                      </li>
                      <li>
                        <div>
                          <div class="flow"> <pie-chart-two-tone /></div>
                          <p class="text-center mb-0">申报</p>
                        </div>

                        <div class="icon ml-8 mr-8"><double-right-outlined /></div>
                      </li>
                      <li>
                        <div class="flex-col flex items-center">
                          <div class="flow"> <pie-chart-two-tone /></div>
                          <p class="text-center mb-0">结题归档</p>
                          <p class="text-center mb-0">结束时间：2023-08-20</p>
                        </div>
                      </li>

                      <li class="ml-15">
                        <div class="flex-col flex items-center">
                          <div class="flow end"> <check-circle-outlined /></div>
                          <p class="text-center mb-0">完成</p>
                        </div>
                      </li>
                    </ul>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </div>
    </PageWrapper>

    <BasicModal @register="registerModal" :width="800" title="申报公告" @ok="handleOk">
      <div>
        <p>{{ selectRowRecord.name }}申报公告，详情见附件。</p>
        <p>申报日期为{{ selectRowRecord.applyEtime }}至{{ selectRowRecord.applyStime }}</p>
        <p>申报网址为 http://www.ktshenbao.cn</p>

        <div class="flex">
          <div class="left"><span>附件：</span></div>
          <div class="right">
            <a-upload
              v-model:file-list="fileList"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :show-upload-list="{ showDownloadIcon: true, showRemoveIcon: true }"
            >
              <template #downloadIcon>download</template>
              <template #removeIcon><StarOutlined /></template>
            </a-upload>
          </div>
        </div>
      </div>
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Tabs, InputSearch, List, Tag, Upload } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { getSpSciSubjectList } from '/@/api/testDemo/scientific';
  import { columns, statusObj } from './config/index';
  import { BasicModal, useModal } from '/@/components/Modal';
  import demoImg from '/@/assets/images/demo.png';
  import { PieChartTwoTone, DoubleRightOutlined, CheckCircleOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'ScientificManager',
    components: {
      PageWrapper,
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
      AInputSearch: InputSearch,
      BasicTable,
      TableAction,
      BasicModal,
      [List.name]: List,
      [List.Item.name]: List.Item,
      AListItemMeta: List.Item.Meta,
      AUpload: Upload,
      ATag: Tag,
      PieChartTwoTone,
      DoubleRightOutlined,
      CheckCircleOutlined,
    },
    setup() {
      const router = useRouter();
      /**
       * tabs key
       */
      const tabsActiveKey = ref<string>('1');

      /**
       * 搜索 value和 事件
       */
      const searchValue = ref<string>('');
      const onSearch = () => {};

      /**
       * 申报课题
       */
      const [registerModal, { openModal, closeModal }] = useModal();

      const handleOk = () => {
        closeModal();
      };

      /**
       * table 列表
       */
      const selectRowRecord = ref<Recordable>({});
      const [registerTable, { reload, getSelectRowKeys }] = useTable({
        api: getSpSciSubjectList,
        rowKey: 'id',
        columns,
        useSearchForm: false,
        pagination: { pageSize: 10 },
        showTableSetting: true,
        bordered: true,
        resizeHeightOffset: 10,
        fetchSetting: { pageField: 'pageNo', listField: 'list' },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        customRow: (record) => {
          return {
            onClick: () => {},
            onDblclick: () => {
              router.push({
                name: 'UcenterPersonEdit',
                params: { type: 'edit', id: record.id },
              });
            },
          };
        },
      });

      const handleCreate = () => {
        router.push({
          name: 'ScientificAdd',
          params: { type: 'add' },
        });
      };

      // 查看
      const handleView = ({ id }) => {
        router.push({
          name: 'scientificView',
          params: {
            id,
          },
        });
      };

      const handleEdit = ({ id }) => {};

      const handleDelete = ({ id }) => {};

      // 申报
      const handleApply = (record) => {
        selectRowRecord.value = record;
        const { id } = record;
        openModal(true, { id, isUpdate: true });
      };

      const getStatus = ({ status }) => {
        let value = statusObj.get(status);

        return value || { label: '无', type: 'warning' };
      };

      const fileList = ref([
        {
          uid: '1',
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/xxx.png',
        },
        {
          uid: '2',
          name: 'yyy.png',
          status: 'done',
          url: 'http://www.baidu.com/yyy.png',
        },
        {
          uid: '3',
          name: 'zzz.png',
          status: 'error',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/zzz.png',
        },
      ]);

      return {
        tabsActiveKey,
        searchValue,
        selectRowRecord,
        onSearch,
        registerTable,
        handleView,
        handleApply,
        registerModal,
        handleOk,
        handleCreate,
        handleEdit,
        handleDelete,
        pagination: {
          show: true,
          pageSize: 3,
        },
        demoImg,
        getStatus,
        fileList,
      };
    },
  });
</script>

<style scoped lang="less">
  [data-theme='dark'] {
    .search-box,
    .content {
      background-color: #151515;
    }
  }

  .search-box {
    background-color: #fff;
    text-align: right;
    padding: 10px;
    margin-bottom: 10px;
  }

  .content {
    background-color: #fff;
  }

  :deep(.ant-tabs) {
    padding: 6px;

    .ant-tabs-nav {
      margin-bottom: 0 !important;
    }
  }

  .imgStyle {
    width: 150px;
    height: 120px;
    border-radius: 10px;
  }

  .description-b {
    display: flex;

    li {
      display: flex;

      .flow {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border-width: 1px;
        border-style: solid;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        > span {
          font-size: 25px;
        }
      }

      .end {
        border: none !important;

        > span {
          font-size: 20px;
        }
      }

      > .icon {
        display: flex;
        align-items: center;

        > span {
          font-size: 20px;
        }
      }
    }
  }

  :deep(.ant-upload-list-item) {
    margin-top: 0;
  }
</style>
