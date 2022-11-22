<template>
  <PageWrapper contentFullHeight fixedHeight contentClass="flex">
    <PageCollapsed title="调研表管理">
      <template #iconLink
        ><a-tooltip placement="top" class="cblue ml-2">
          <template #title>
            <span>新增调研表</span>
          </template>
          <Icon
            @click="handleAdd"
            class="cursor-pointer"
            size="16"
            icon="material-symbols-assignment-add-outline-sharp|svg"
          /> </a-tooltip
      ></template>
      <template #cLeft>
        <BasicTree
          toolbar
          :key="treeKey"
          search
          v-model:selectedKeys="selectedKeys"
          :checkStrictly="true"
          :expandOnSearch="true"
          :clickRowToExpand="false"
          :load-data="onLoadData"
          :treeData="treeData"
          ref="treeRef"
          @select="handleSelect"
          class="org-tree"
          :fieldNames="{ title: 'label', key: 'id' }"
        >
          <template #title="node">
            <span :title="node.label" class="titleBox"
              ><span class="handle-title">{{ node.label }}</span>
              <a-popconfirm
                title="确定要删除此调研表吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDeleteNode(node)"
              >
                <Icon
                  v-if="node.hasOwnProperty('personId')"
                  icon="fluent:delete-28-regular"
                  @click.stop=""
                  color="#707070"
                  size="16px"
                  class="float-right"
                />
              </a-popconfirm>

              <Icon
                v-if="node.hasOwnProperty('personId')"
                icon="fluent:document-copy-24-regular"
                @click.stop="handleCopy(node)"
                color="#707070"
                size="16px"
                class="float-right"
              />
            </span>
          </template>
        </BasicTree>
      </template>
      <template #cRight>
        <div class="pt-4">
          <a-spin :spinning="spinning" :tip="spinTip">
            <div class="relative">
              <BasicForm
                :disabled="formDisabled"
                class="w-3/4 xl:w-4/5"
                :actionColOptions="{ span: 16 }"
                @register="register"
              />

              <a-button @click="submitForm" v-loading="formBtnLoading" type="primary" size="mini">{{
                formDisabled ? '编辑' : '保存'
              }}</a-button>
            </div>

            <div v-if="currentId">
              <div class="line mt-5"></div>

              <BasicTable
                :dataSource="tableData"
                @edit-end="editEnd"
                @register="registerTable"
                class="func-tabs"
              >
                <template #toolbar>
                  <a-button type="primary" @click="handleCreate" v-if="hasPermission('OpPersonAdd')"
                    >新增</a-button
                  >
                </template>
                <template #action="{ record, index }">
                  <TableAction
                    :actions="[
                      {
                        icon: 'clarity:design-line',
                        label: '设计',
                        tooltip: '设计',
                        auth: 'OpSurveyDesign',
                        onClick: handleDesign.bind(null, record),
                        disabled: !record.id,
                      },
                      // {
                      //   icon: 'clarity:info-standard-line',
                      //   tooltip: '查看详情',
                      //   onClick: handleView.bind(null, record),
                      //   onDblclick: (e) => e.stopPropagation(),
                      //   disabled: !record.id,
                      // },
                      {
                        icon: 'fluent:delete-28-regular',
                        color: 'error',
                        label: '删除',
                        tooltip: '删除',
                        auth: 'OpSurveyDesign',
                        popConfirm: {
                          title: '是否确认删除',
                          placement: 'bottomRight',
                          confirm: handleDelete.bind(null, record, index),
                          onDblclick: (e) => e.stopPropagation(),
                        },
                      },
                    ]"
                  />
                </template>
              </BasicTable>
            </div>
          </a-spin>
        </div>
      </template>

      <!-- <template #rightFooter>
      <a-button type="primary" class="my-2 mr-5">保存</a-button>
    </template> -->
    </PageCollapsed>

    <BasicModal
      @register="registerModal"
      :width="800"
      title="复制调研表"
      @ok="handleOk"
      titleIcon="fluent:document-copy-24-regular"
    >
      <BasicForm
        auto-focus-first-item
        :actionColOptions="{ span: 16 }"
        @register="registerCopyModal"
        class="width-80"
      />
    </BasicModal>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, nextTick, toRef, unref } from 'vue';
  import { PageWrapper, PageCollapsed } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { basicSchemas, columns } from './config';
  import {
    getOpSurveyList,
    getOpSurveyDateList,
    opSurveyAdd,
    opSurveyEdit,
    opTemplateAdd,
    opTemplateEdit,
    opTemplateDelete,
    getOpSurveyView,
    opSurveyCopy,
    opSurveyDelete,
  } from '/@/api/doOp/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRouter } from 'vue-router';
  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { Icon } from '/@/components/Icon';
  import { Tooltip, Spin, Popconfirm } from 'ant-design-vue';
  import type { TreeProps } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { cloneDeep } from 'lodash';
  import { BasicModal, useModal } from '/@/components/Modal';
  export default defineComponent({
    // name: 'OpSurveyList',
    components: {
      PageWrapper,
      PageCollapsed,
      BasicForm,
      BasicTable,
      TableAction,
      BasicTree,
      Icon,
      ATooltip: Tooltip,
      ASpin: Spin,
      BasicModal,
      APopconfirm: Popconfirm,
    },
    setup() {
      const router = useRouter();
      const { createMessage } = useMessage();
      const spinTip = ref('');
      const spinning = ref(false);
      const formDisabled = ref(false);
      const { hasPermission } = usePermission();
      const tableData = ref([]);
      const treeKey = ref(0);
      /**
       * 左侧树列表
       */
      const treeData = ref<TreeItem[]>([]);
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const getTree = () => {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      };
      // 新增调研表
      const handleAdd = () => {
        // 清空表单
        resetFields();
        // 清空选中树节点
        selectedKeys.value = [];
        // 清空当前节点
        currentId.value = null;
        //清空列表数据
        tableData.value = [];
        // 编辑状态
        formDisabled.value = false;
      };
      // 异步加载树节点
      const onLoadData: TreeProps['loadData'] = (treeNode) => {
        return new Promise((resolve) => {
          if (treeNode.children?.length) {
            resolve();
            return;
          }

          const { years } = treeNode;
          getOpSurveyList({ years }).then((res) => {
            let index = treeData.value.findIndex((v) => v.years === treeNode.years);
            if (!res.length) {
              const isLeaf = toRef(treeNode, 'isLeaf');
              isLeaf.value = true;
              resolve();
              return;
            }

            const children = toRef(treeData.value[index], 'children');
            children.value.push(
              ...res.map((v) => {
                return {
                  ...v,
                  label: v.surName,
                  isLeaf: true,
                };
              }),
            );
            resolve();
          });
        });
      };

      const fetchTree = async ({ id1, id2 }) => {
        let data = (await getOpSurveyDateList({})) as unknown as TreeItem[],
          id = null,
          parentId = null;
        console.log(data, 'tree数据');

        if (!data?.length) return;
        treeData.value = data;
        // 处理数据结构
        treeData.value.map((v, index) => {
          v.id = 'parent' + v.years;
          v.label = v.years;
          if (index === 0 && parentId === null) {
            parentId = v.id;
          }
          v.children = v.surveyList;
          v.children?.map((w, i) => {
            if (i === 0 && id === null) {
              id = w.id;
            }
            w.label = w.surName;
            w.isLeaf = true;
          });
        });
        ++treeKey.value;
        getFormData(id2 || id);
        nextTick(() => {
          getTree().setExpandedKeys([id1 || parentId]);
          getTree().setSelectedKeys([id2 || id]);
        });
      };

      const handleSelect = (_, node) => {
        if (typeof node.node.id === 'string') return;

        spinTip.value = `正在为您获取${node.node.surName}数据，请耐心等待...`;

        getFormData(node.node.id);
      };

      const getFormData = async (id) => {
        formDisabled.value = true;
        spinning.value = true;
        try {
          const data = await getOpSurveyView({ id });

          setFieldsValue(cloneDeep(data));

          currentId.value = data.id;

          nextTick(() => (tableData.value = data.opTemplateList));

          setTimeout(() => (spinning.value = false), 300);
        } catch {
          spinTip.value = '数据获取失败，请重新获取';
          createMessage.error('获取数据失败！');
          setTimeout(() => (spinning.value = false), 300);
        }
      };

      const formBtnLoading = ref(false);

      const selectedKeys = ref([]);

      onMounted(() => fetchTree({}));

      /**
       * 问卷表单
       */
      const [register, { validateFields, getFieldsValue, setFieldsValue, resetFields }] = useForm({
        labelWidth: 120,
        schemas: basicSchemas,
        showActionButtonGroup: false,
      });

      const submitForm = async () => {
        // 判断是否是编辑状态
        if (formDisabled.value) {
          formDisabled.value = false;
          return;
        }

        let data = await getFieldsValue(),
          API = new Function();

        if (currentId.value === null) {
          API = opSurveyAdd;
        } else {
          API = opSurveyEdit;

          Object.assign(data, { id: currentId.value });
        }
        formBtnLoading.value = true;
        try {
          const res = await API(data);
          currentId.value = res;
          createMessage.success('操作成功');
          formBtnLoading.value = false;

          // 更新左侧树节点
          fetchTree({ id1: 'parent' + data.years, id2: res });
        } catch {
          formBtnLoading.value = false;
        }
      };

      /**
       * 调研表表单清单
       */

      const [registerTable, { reload }] = useTable({
        rowKey: 'id',
        columns,
        useSearchForm: false,
        canResize: false,
        showTableSetting: true,
        bordered: true,
        pagination: false,
        // tableSetting: { redo: false, size: false, setting: false, fullScreen: false },
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        afterFetch: (res) => {
          return res.filter((v) => v.id === currentId.value)[0].opTemplateList;
        },
        customRow: (record) => {
          return {
            onDblclick: () => {},
          };
        },
      });

      // 当前调研表Id
      const currentId = ref(null);

      const handleDesign = ({ id, surId }) => {
        router.push(`/doOp/survey/design?id=${surId}&templateId=${id}`);
      };

      const handleView = () => {};

      const handleDelete = async ({ id }, index) => {
        if (!id) {
          tableData.value.splice(index, 1);
          return;
        }
        try {
          await opTemplateDelete({ ids: id + '' });
          // 更新列表中数据
          tableData.value.splice(index, 1);

          console.log(tableData.value, 'tableData.value.');

          createMessage.success('操作成功');
        } catch {
          createMessage.error('操作失败');
        }
      };

      const handleCreate = () => {
        let record = {
          name: '',
          designStatusName: '未设计',
          designStatus: '52042-10',
          surId: currentId.value,
        };
        tableData.value.push(record);
      };

      const editEnd = async ({ record, index, key, value }) => {
        let { id } = record,
          API = new Function(),
          params = { name: value, surId: currentId.value };

        if (id) {
          API = opTemplateEdit;
          Object.assign(params, { id });
        } else {
          API = opTemplateAdd;
        }

        try {
          record.id = await API(params);
          createMessage.success('操作成功');
        } catch {
          createMessage.error('操作失败');
        }
        console.log(record, index, key, value);
      };

      // 复制
      const [registerModal, { openModal, closeModal }] = useModal();
      const [
        registerCopyModal,
        {
          validateFields: copyValidateFields,
          getFieldsValue: copyGetFieldsValue,
          resetFields: copyResetFields,
        },
      ] = useForm({
        labelWidth: 120,
        schemas: [
          {
            field: 'surName',
            component: 'Input',
            label: '调研表名称',
            required: true,
            colProps: {
              span: 24,
            },
            itemProps: {
              wrapperCol: { span: 16, xxl: 8 },
            },
          },
        ],
        showActionButtonGroup: false,
      });
      const copyId = ref();
      const handleCopy = ({ id }) => {
        copyId.value = id;

        openModal();

        nextTick(() => copyResetFields());
      };

      const handleOk = async () => {
        await copyValidateFields();
        const data = copyGetFieldsValue();
        opSurveyCopy({ ids: copyId.value, ...data }).then((res) => {
          fetchTree({});
          closeModal();
        });
      };

      const handleDeleteNode = async ({ id }) => {
        await opSurveyDelete({ ids: id });

        fetchTree({});
      };

      return {
        treeData,
        selectedKeys,
        currentId,
        formBtnLoading,
        tableData,
        treeRef,
        spinTip,
        spinning,
        formDisabled,
        treeKey,
        onLoadData,
        register,
        registerTable,
        handleDesign,
        handleView,
        handleDelete,
        handleCreate,
        handleSelect,
        handleAdd,
        submitForm,
        editEnd,
        hasPermission,
        handleCopy,
        registerModal,
        handleOk,
        registerCopyModal,
        handleDeleteNode,
      };
    },
  });
</script>

<style scoped lang="less">
  .line {
    border-top: 1px solid #cccccc;
  }

  :deep(.tox-tinymce) {
    height: 250px !important;
  }

  .header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > span {
      font-size: @font-size-b2;
    }
  }

  .relative {
    button {
      position: absolute;
      right: 10px;
      bottom: 6px;
    }
  }

  .cblue {
    color: @primary-color;
  }

  .titleBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .float-right {
      opacity: 0;
      transition: all 0.3s;
    }

    .handle-title {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .titleBox:hover .float-right {
    opacity: 1;
  }

  :deep(.ant-tree-node-selected) {
    > .ant-tree-title .float-right {
      opacity: 1 !important;
    }
  }

  [data-theme='dark'] {
    .line {
      border-top: 1px solid #303030;
    }
  }
</style>
