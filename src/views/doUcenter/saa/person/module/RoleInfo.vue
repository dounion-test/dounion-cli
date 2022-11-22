<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-01 14:48:55
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-11 14:04:12
 * @FilePath: /vben-ucenterF/src/views/doUcenter/person/OrganizationInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-row>
    <a-col :span="8">
      <DeptTree
        @check="handleCheckRole"
        @select="handleSelectRole"
        class="dept-tree"
        :isAdd="true"
        :checkTree="true"
        :checkeKeys="roleKeys"
        :editcheckeKeys="editRoleKeys"
        :replaceFields="{ key: 'id', title: 'name' }"
      />
    </a-col>
    <a-col :span="2" class="acol-add">
      <a-button @click="toAddRole()"> 添加 </a-button>
    </a-col>
    <a-col :span="14">
      <BasicTable @register="registerRoleTable" class="tree-table" :isFixedHeader="false">
        <template #operate="{ record, index }">
          <Icon
            class="cursor-pointer"
            color="red"
            icon="fluent:delete-28-regular"
            @click="toDelRole(record, index)"
          />
        </template>
      </BasicTable>
    </a-col>
  </a-row>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, nextTick } from 'vue';
  import DeptTree from '../module/DeptTree.vue';
  import { Row, Col } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { roleColumns } from '../config/add';
  import { cloneDeep } from 'lodash-es';
  import { BasicTable, useTable } from '/@/components/Table';
  export default defineComponent({
    components: {
      Icon,
      DeptTree,
      BasicTable,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    props: {
      backfillKeys: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      let roleNodes = ref<any[]>([]);
      let roleKeys = ref<any[]>([]);
      let editRoleKeys = ref<any[]>([]);
      let roleList = ref<any[]>([]);
      const [registerRoleTable] = useTable({
        dataSource: roleList,
        columns: roleColumns,
        bordered: true,
        isCanResizeParent: true,
        pagination: false,
      });
      // 勾选角色
      const handleCheckRole = (keys, checkedNodes, edit) => {
        console.log(keys, checkedNodes, 'keys, checkedNodes edit');
        if (edit) {
          roleNodes.value = checkedNodes;
          toAddRole();
        } else {
          roleKeys.value = keys.checked;
          roleNodes.value = checkedNodes;
          // roleNodes.value = checkedNodes.map((item) => item.props.node);
        }
      };
      // 点击角色
      const handleSelectRole = (keys, _name, _id, _parentId, node) => {
        if (!keys) return false;
        let index = roleKeys.value.indexOf(keys);
        let selectNodes = node.selectedNodes[0];
        index == -1 && roleKeys.value.push(keys) && roleNodes.value.push(selectNodes);
        index != -1 && roleKeys.value.splice(index, 1) && roleNodes.value.splice(index, 1);
      };
      // 添加角色
      const toAddRole = () => {
        roleList.value = [];
        roleNodes.value.forEach((item) => {
          roleList.value.push(item);
        });
      };
      // 删除角色
      const toDelRole = (item) => {
        roleList.value = roleList.value.filter((it) => {
          return it.id != item.id;
        });
        roleNodes.value = roleNodes.value.filter((it) => {
          return it.id != item.id;
        });
        roleKeys.value = roleKeys.value.filter((it) => {
          return it != item.id;
        });
      };
      watch(
        () => props.backfillKeys,
        (val) => {
          if (val.length > 0) {
            nextTick(() => {
              roleKeys.value = cloneDeep(val);
              editRoleKeys.value = cloneDeep(val);
            });
          }
        },
        { immediate: true, deep: true },
      );
      return {
        roleList,
        roleKeys,
        editRoleKeys,
        registerRoleTable,
        toAddRole,
        toDelRole,
        handleCheckRole,
        handleSelectRole,
      };
    },
  });
</script>

<style lang="less" scoped>
  .dept-tree {
    height: 100%;
    margin-top: 0;
    border: 1px solid #d9d9d9;
  }

  .acol-add {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :deep(.ant-tree-list) {
    padding-top: 10px;
  }

  .tree-table {
    :deep(.ant-table-wrapper) {
      padding: 0;
      height: 100%;
    }
  }
  [data-theme='dark'] {
    .dept-tree {
      border-color: #303030;
    }
  }
</style>
