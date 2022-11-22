<template>
  <PageWrapper contentFullHeight contentClass="flex">
    <PageCollapsed
      title="部门列表"
      :width="isShowLeft ? 250 : 0"
      :isShowLeft="isShowLeft"
      :isMarginRight="isShowLeft"
    >
      <template #cLeft>
        <BasicTree
          toolbar
          search
          v-model:selectedKeys="selectedKeys"
          :loading="treeLoading"
          :checkStrictly="true"
          :expandOnSearch="true"
          :clickRowToExpand="false"
          :treeData="treeData"
          :fieldNames="{ key: 'ids', title: 'countyName' }"
          @select="handleSelect"
          class="bg-white"
          ref="asyncExpandTreeRef"
        >
          <template #title="node">
            <span :title="node.countyName" class="titleBox">{{ node.countyName }} </span>
          </template>
        </BasicTree>
      </template>
      <template #cRight>
        <div class="bg-white">
          <div class="mb-5" v-for="(item, index) in allData" :key="item.id">
            <div>
              <h2 class="text-center mt-4 mb-1 title"
                ><span v-if="index === 0" @click="back" class="float-left back absolute"
                  ><Icon icon="ion:chevron-back-outline" />返回至上一级</span
                >{{ item.statisticalName || '' }}</h2
              >
              <h3 class="text-center title2" v-if="item.years">{{ item.years }}</h3>
              <div class="flex justify-between align-center">
                <h3 class="ml-2 mb-0 float-left" v-if="item.statisticalCode">{{
                  item.statisticalCode
                }}</h3>
                <div class="flex align-center">
                  <h3 class="mr-2 mb-0" v-if="item.unit">单位：{{ item.unit }}</h3>
                  <a-button type="primary" class="mr-2" @click="handleAdd(index)">新增</a-button>
                </div>
              </div>
              <div class="clear-both overflow-x-auto mb-2" v-if="item.columns.length">
                <BasicTable
                  ref="tableRef"
                  class="table"
                  :dataSource="item.dataSource"
                  @register="registerTable"
                  :columns="item.columns"
                >
                  <template #headerCell="{ column }">
                    <div :title="column.customTitle || column.title"
                      >{{ column.customTitle || column.title
                      }}<div
                        v-if="column?.headerCell?.some((v) => v === column.dataIndex)"
                        class="table-move"
                      ></div
                    ></div>
                  </template>

                  <template #action="{ record }">
                    <TableAction
                      @click.stop
                      :actions="[
                        {
                          icon: 'eva:edit-2-outline',
                          tooltip: '编辑',
                          label: '编辑',
                          ifShow: !record.isEdit,
                          onClick: handleEdit.bind(null, record),
                        },
                        {
                          icon: 'fluent:delete-28-regular',
                          tooltip: '删除',
                          label: '删除',
                          ifShow: !record.isEdit,
                          onClick: handleDelete.bind(null, record),
                        },
                        {
                          label: '保存',
                          ifShow: record.isEdit === true,
                          onClick: handleSave.bind(null, record),
                        },
                        {
                          label: '取消',
                          ifShow: record.isEdit === true,
                          onClick: handleCancel.bind(null, record),
                        },
                      ]"
                    />
                  </template>

                  <template v-for="item in Array.from(slotKeys)" :key="item" #[item]="{ record }">
                    <a-input v-show="record.isEdit" v-model:value="record[item]" />
                    <span v-show="!record.isEdit" @click="handleEdit(record)">{{
                      record[item]
                    }}</span>
                  </template>
                </BasicTable>
              </div>

              <h3 v-if="item.memo">注：{{ item.memo }}</h3>
            </div>
          </div>
        </div>
      </template>
    </PageCollapsed>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, nextTick, toRefs, reactive, unref } from 'vue';
  import { PageWrapper, PageCollapsed } from '/@/components/Page';
  import {
    localIndexView,
    localInfoCountyList,
    localInfoEdit,
    localInfoAdd,
    localInfoDelete,
  } from '/@/api/doSp/local';
  import { BasicTable, useTable, TableActionType, TableAction } from '/@/components/Table';
  import { useRoute, useRouter } from 'vue-router';
  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';
  import { Row, Col, Input } from 'ant-design-vue';
  import Icon from '/@/components/Icon/index';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: {
      PageWrapper,
      PageCollapsed,
      BasicTable,
      BasicTree,
      ARow: Row,
      ACol: Col,
      Icon,
      TableAction,
      AInput: Input,
    },
    setup() {
      const dataSource: any = ref([]);
      const route = useRoute();
      const router = useRouter();
      const columns: any = ref([]);
      const treeLoading = ref(false);
      const treeData = ref<TreeItem[]>([]);
      const showTree = ref(route.query.showTree === '1');
      const key = ref(0);
      const tableRef = ref<Nullable<TableActionType>>(null);
      const isShowLeft = ref(false);

      const { createMessage } = useMessage();

      const [registerTable, { setLoading, setTableData }] = useTable({
        rowKey: 'id',
        immediate: true,
        useSearchForm: false,
        canResize: false,
        showIndexColumn: true,
        bordered: true,
        showTableSetting: false,
        pagination: false,
        isFixedHeader: false,
        actionColumn: {
          width: 150,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const fetch = async () => {
        treeLoading.value = true;
        localInfoCountyList().then((res) => {
          if (res.length) {
            isShowLeft.value = true;
          }
          res.map((item, index) => {
            item.ids += ',';
            if (index == 0) {
              selectedKeys.value = item.children[0].ids as string;
            }
          });
          treeData.value = res;

          requestList(selectedKeys.value);

          nextTick(() => {
            getTree()?.expandAll(true);
          });
        });
        // treeData.value = (await localInfoCountyList()) as unknown as TreeItem[];
        nextTick(() => {
          treeLoading.value = false;
        });
      };

      const tableMessage = reactive({
        memo: '',
        nameValue: '',
        statisticalCode: '',
        statisticalName: '',
        unit: '',
        years: '',
      });
      const allData: any = ref([]);
      const requestList = async (ids?) => {
        try {
          const data = await localIndexView({
            ids,
          });
          data.map((item, i) => {
            const { infoList, tableList, ...other } = item;
            handleTableList(tableList, infoList);

            item.columns = tableList;
            item.dataSource = infoList;
            item.tableMessage = {};
            Object.assign(item.tableMessage, tableMessage, other);
          });
          allData.value = data;

          console.log(slotKeys.value, 'slotKeys===');

          // getTableAction()?.setLoading(false);
        } catch (err) {
          console.log(err);
          // getTableAction()?.setLoading(false);
        }
      };

      const headerCell = ref([]);
      const slotKeys = ref(new Set());
      const handleTableList = (tableList, infoList) => {
        if (tableList?.length) {
          tableList.map((v, i) => {
            if (v.unit) {
              v.title = `${v.name}(${v.unit})`;
            } else {
              v.title = v.name;
            }

            v.dataIndex = v.code;
            v.width = 100;
            v.isEdit = false;
            v.slots = { customRender: v.code };
            slotKeys.value.add(v.code);

            if (v.children?.length) {
              const { code } = v;
              // 判断table列表中该code是否有值
              if (infoList[0][code]) {
                const { children } = v;
                delete v.children;
                v.ellipsis = false;
                v.headerCell = [];
                v.headerCell.push(v.code);
                const newParent = {
                  title: '',
                  dataIndex: `${code}-${i}`,
                  children: [v, ...children],
                };
                tableList.splice(i, 1, newParent);
                handleTableList(newParent.children, infoList);
              } else {
                handleTableList(v.children, infoList);
              }
            }
          });
        }
      };

      function getTableAction() {
        const tableAction = unref(tableRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      }

      const handleSelect = (node) => {
        if (node.length) {
          const [ids] = node;
          // selectedKeys.value = ids as string;
          requestList(ids.replace(',', ''));
        }
      };

      const back = () => {
        router.push({ name: 'LocalInfoIndexList' });
      };

      const selectedKeys = ref('');
      const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
      const getTree = () => unref(asyncExpandTreeRef);

      const handleEdit = (record) => {
        record.isEdit = true;
      };

      const handleSave = async (record) => {
        const { dimensionId, ...attr } = record;
        const valueList = [];
        Object.keys(attr).forEach((key) => {
          if (key !== 'key' && key !== 'isEdit') {
            valueList.push({ target: key, value: attr[key] });
          }
        });

        const params = {
          indexId: route.params.id,
          valueList: JSON.stringify(valueList),
        };

        let Api = new Function();

        if (dimensionId) {
          Object.assign(params, { dimensionId });
          Api = localInfoEdit;
        } else {
          Api = localInfoAdd;
        }

        try {
          await Api(params);
          record.isEdit = false;
          createMessage.success('操作成功！');
          requestList(selectedKeys.value || route.params.id);
        } catch {
          // requestList(selectedKeys.value || route.params.id);
        }

        record.isEdit = false;
      };

      const handleAdd = (index) => {
        const column = allData.value[index].dataSource[0];
        let obj = { isEdit: true };
        Object.keys(column).forEach((key) => {
          obj[key] = '';
        });
        allData.value[index].dataSource.push(obj);
        setTableData(allData.value[index].dataSource);
        console.log(allData.value[index].dataSource, 'allData.value[index].dataSource');
      };

      const handleDelete = async ({ dimensionId }) => {
        await localInfoDelete({ dimensionIds: dimensionId, indexId: route.params.id });
        requestList(selectedKeys.value || route.params.id);
        createMessage.success('删除成功！');
      };

      const handleCancel = (record) => {
        record.isEdit = false;
      };

      onMounted(() => {
        showTree.value ? fetch() : requestList(route.params.id);
      });

      return {
        dataSource,
        columns,
        treeLoading,
        treeData,
        showTree,
        headerCell,
        tableRef,
        selectedKeys,
        allData,
        ...toRefs(tableMessage),
        registerTable,
        handleSelect,
        back,
        asyncExpandTreeRef,
        handleEdit,
        slotKeys,
        handleSave,
        handleCancel,
        handleDelete,
        handleAdd,
        isShowLeft,
      };
    },
  });
</script>

<style lang="less" scoped>
  .dynamics-tabs {
    :deep(.ant-tabs-nav-list) {
      .ant-tabs-tab {
        min-width: 100px;
        justify-content: center;
      }
    }
  }

  .main-con-wrap {
    height: 100%;
  }

  .table-move {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: #fafafa;
  }

  .title {
    font-size: @font-size-b6;
  }

  .title2 {
    font-size: @font-size-b4;
  }

  .back:hover {
    color: @primary-color;
  }

  .back {
    font-size: @font-size-base;
    transition: all 0.3s;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .align-center {
    align-items: center;
  }

  [data-theme='dark'] .table-move {
    background: #1d1d1d;
  }
</style>
