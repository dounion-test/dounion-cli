<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-10 10:13:32
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-23 15:31:29
 * @FilePath: /vben-ucenter/src/views/doUcenter/person/components/BasicTableTitle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-dropdown
    :overlayClassName="title ? 'BasicTableTitle' : 'BasicTableTitleMove'"
    :getPopupContainer="title ? null : handleContainer"
  >
    <a class="ant-dropdown-link table-title" @click.prevent>
      <span v-if="title" class="table-title-name">{{ title }}</span>
      <DownOutlined v-if="title" class="table-title-icon" />
      <span v-if="title" class="table-title-num">({{ total }} 人)</span>
      <down-circle-outlined v-if="!title && id" />
    </a>
    <template #overlay>
      <a-menu v-if="id">
        <a-menu-item v-if="hasPermission('UcenterOrgAdd')">
          <a href="javascript:;" @click="handleCreate">添加部门</a>
        </a-menu-item>
        <a-menu-item v-if="parentId && hasPermission('UcenterOrgEdit')">
          <a href="javascript:;" @click="handleEdit">编辑部门</a>
        </a-menu-item>
        <a-menu-divider v-if="parentId && hasPermission('UcenterOrgDelete')" />
        <a-menu-item v-if="parentId && hasPermission('UcenterOrgDelete')">
          <a href="javascript:;" @click="handleDelete">删除部门</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <OrgModal @register="registerModal" @success="handleModalSuccess" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { DownOutlined, DownCircleOutlined } from '@ant-design/icons-vue';
  import { Dropdown, Menu, MenuItem, MenuDivider } from 'ant-design-vue';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { delUcenterDept } from '/@/api/testDemo/dept';
  import OrgModal from '../../org/module/OrgModal.vue';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    components: {
      OrgModal,
      DownOutlined,
      DownCircleOutlined,
      [Dropdown.name]: Dropdown,
      [Menu.name]: Menu,
      [MenuItem.name]: MenuItem,
      [MenuDivider.name]: MenuDivider,
    },
    props: {
      title: String,
      id: Number,
      parentId: {
        type: Number || null,
        default: null,
      },
      total: {
        type: Number,
        default: 0,
      },
      treeRef: {
        type: HTMLDivElement || Function || undefined,
        default: () => {},
      },
    },
    setup(props) {
      const { refreshPage } = useTabs();
      const { hasPermission } = usePermission();
      const [registerModal, { openModal }] = useModal();
      const { createMessage, createConfirm } = useMessage();
      const handleCreate = () => {
        openModal(true, { treeID: props.id, isUpdate: false });
      };
      const handleEdit = () => {
        openModal(true, { id: props.id, isUpdate: true });
      };
      const handleDelete = async () => {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '此操作会删除该部门, 是否继续?',
          onOk() {
            toDelUcenterDept();
          },
        });
      };
      const toDelUcenterDept = async () => {
        const params = { idQueryIn: props.id };
        await delUcenterDept(params);
        createMessage.success('操作成功');
        refreshPage();
      };
      const handleContainer = () => {
        return props.treeRef;
      };
      const handleModalSuccess = () => {
        refreshPage();
      };
      return {
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleContainer,
        handleModalSuccess,
        hasPermission,
      };
    },
  });
</script>

<style lang="less" scoped>
  .table-title {
    display: flex;
    align-items: center;
    padding-left: 7px;
    color: #b6b7b9;
    font-size: @font-size-base;
    cursor: pointer;

    &-name {
      font-size: @font-size-b4;
      font-weight: 500;
    }

    &-icon {
      color: #000000;
      margin-right: 5px;
      margin-left: 2px;
    }
  }
</style>

<style lang="less">
  .BasicTableTitle {
    min-width: 160px !important;
  }

  .BasicTableTitleMove {
    width: 90%;
    left: 5% !important;
  }
</style>
