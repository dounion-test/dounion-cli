<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-07 14:21:07
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-26 11:11:19
 * @FilePath: /vben-ucenter/src/views/doUcenter/func/Tree.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="overflow-hidden roleTree" style="height: 100%" ref="DeptTreeRef">
    <BasicTree
      :loading="treeLoading"
      ref="asyncExpandTreeRef"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="replaceFields"
      @select="handleSelect"
      class="funcTree"
    >
      <!-- <template #headerTitle>
        <a-row>
          <a-col
            :span="12"
            @click="handleCreate"
            class="headerTitle"
            v-if="hasPermission('UcenterRoleAdd')"
          >
            <user-add-outlined class="mr-1" />
            <span>新增角色</span>
          </a-col>
          <a-col
            :span="12"
            @click="handleEdit"
            class="headerTitle"
            v-if="hasPermission('UcenterRoleEdit')"
          >
            <user-add-outlined class="mr-1" />
            <span>修改角色</span>
          </a-col>
        </a-row>
      </template> -->
      <template #title="item">
        <div class="funcTree-name" :title="item.name">
          {{ item.name }}
        </div>
        <Dropdown
          class="roleTreeDropdown"
          overlayClassName="roleTreeOverlayClassName"
          :trigger="['hover']"
          :dropMenuList="[
            {
              text: '角色详情',
              event: '1',
              unshow: !hasPermission('UcenterRoleView'),
              divider: item.isSys ? false : hasPermission('UcenterRoleView'),
              onClick: handleView.bind(null, item),
            },
            {
              text: '删除角色',
              event: '2',
              unshow: item.isSys ? true : !hasPermission('UcenterRoleView'),
              onClick: handleDelete.bind(null, item),
            },
          ]"
          :getPopupContainer="() => DeptTreeRef"
          popconfirm
        >
          <EllipsisOutlined key="ellipsis" />
        </Dropdown>
      </template>
    </BasicTree>
    <AccountModal @register="registerModal" @success="handleSuccess" />
    <ViewModals @register="registerViewModal" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, unref, PropType } from 'vue';
  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';
  import { getAppEnvConfig } from '/@/utils/env';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { UserAddOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
  import { Dropdown } from '/@/components/Dropdown';
  import { Row, Col } from 'ant-design-vue';
  import AccountModal from './AccountModal.vue';
  import ViewModals from './ViewModals.vue';
  import { delUcenterRole } from '/@/api/testDemo/role';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { postUcenterRoleAdd, postUcenterRoleEdit } from '/@/api/testDemo/role';

  export default defineComponent({
    name: 'DeptTree',
    components: {
      BasicTree,
      EllipsisOutlined,
      UserAddOutlined,
      ARow: Row,
      ACol: Col,
      Dropdown,
      ViewModals,
      AccountModal,
    },
    props: {
      api: {
        type: Function as PropType<(...arg: any[]) => Promise<any>>,
        default: null,
      },
      params: {
        type: Object,
        default: () => {},
      },
      replaceFields: {
        type: Object,
        default: () => {},
      },
    },
    emits: ['select'],
    setup(props, { emit }) {
      const { hasPermission } = usePermission();
      const { api, params } = unref(props);
      const treeData = ref<TreeItem[]>([]);
      const treeLoading = ref(false);
      const selectNode = ref<any[]>([]);
      const DeptTreeRef = ref(null);
      const { createMessage, createConfirm } = useMessage();
      const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
      const { VITE_GLOB_DOFILE_URL } = getAppEnvConfig();
      // 获取数据
      const fetch = async () => {
        treeLoading.value = true;
        treeData.value = (await api(params)).list;
        treeLoading.value = false;
      };
      // 选择
      const handleSelect = (keys, { node }) => {
        selectNode.value = [node];
        keys.length > 0 && emit('select', keys[0]);
      };
      const [registerModal, { openModal }] = useModal();
      const [registerViewModal, { openModal: openViewModal }] = useModal();
      // 查看
      const handleView = (record) => {
        openViewModal(true, { record });
      };
      // 新增
      const handleCreate = () => {
        openModal(true, {
          isUpdate: false,
        });
      };
      // 修改
      const handleEdit = () => {
        if (selectNode.value.length === 0) {
          createMessage.warning('请选择角色');
          return false;
        }
        if (selectNode.value[0].isSys == 1) {
          createMessage.warning('系统初始化角色不允许修改！');
          return false;
        }
        const record = selectNode.value[0];
        record.name = selectNode.value[0].name.el
          ? selectNode.value[0].name.el.innerText
          : selectNode.value[0].name;
        openModal(true, {
          record,
          isUpdate: true,
        });
      };
      // 删除
      const handleDelete = (node) => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '账号将要被删除, 请确认是否继续？',
          onOk() {
            const params = { idQueryIn: node.id };
            deleteRole(params);
          },
        });
      };
      const deleteRole = async (params) => {
        await delUcenterRole(params);
        fetch();
        createMessage.success('操作成功');
      };
      // 新增/修改确认回调
      const handleSuccess = async (value) => {
        value.id && Object.assign(selectNode.value[0], value);
        const api = value.id ? postUcenterRoleEdit : postUcenterRoleAdd;
        await api(value);
        createMessage.success('操作成功');
        fetch();
      };

      onMounted(() => {
        fetch();
      });

      return {
        treeData,
        treeLoading,
        DeptTreeRef,
        asyncExpandTreeRef,
        hasPermission,
        VITE_GLOB_DOFILE_URL,
        registerModal,
        registerViewModal,
        handleSelect,
        handleView,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>

<style lang="less" scoped>
  .funcTree {
    .funcTree-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :deep(.ant-spin-nested-loading) {
      height: 100%;
    }

    :deep(.ant-spin-container) {
      height: 100%;
    }

    :deep(.dounion-tree-header),
    :deep(.ant-row) {
      width: 100%;
    }

    :deep(.ant-tree-node-content-wrapper):hover {
      .roleTreeDropdown {
        visibility: visible;
      }
    }
  }

  .headerTitle {
    color: @primary-color;
    cursor: pointer;
  }
</style>

<style lang="less">
  .roleTreeDropdown {
    visibility: hidden;
    color: @primary-color;
  }

  .roleTree {
    .roleTreeOverlayClassName {
      width: 100%;
    }
  }
</style>
