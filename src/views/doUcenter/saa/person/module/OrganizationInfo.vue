<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-01 14:48:55
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-07 11:23:04
 * @FilePath: /vben-ucenterF/src/views/doUcenter/person/OrganizationInfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-row>
    <a-col :span="8">
      <DeptTree
        @check="handleCheck"
        @select="handleSelect"
        class="dept-tree"
        :checkTree="true"
        :checkeKeys="organizeKeys"
        :editcheckeKeys="editOrganizeKeys"
        :replaceFields="{ key: 'id', title: 'cname' }"
      />
    </a-col>
    <a-col :span="2" class="acol-add">
      <a-button @click="toAddOrganize(false)"> 添加 </a-button>
    </a-col>
    <a-col :span="14">
      <BasicTable @register="registerTable" class="tree-table" :isFixedHeader="false">
        <template #mainOrganization="{ record }">
          <a-radio-group name="radioGroup" v-model:value="organizeValue">
            <a-radio :value="record.id" />
          </a-radio-group>
        </template>
        <template #cadre="{ record, index }">
          <a-checkbox v-model:checked="record.cadre" @change="handleChange(index)" />
        </template>
        <template #operate="{ record, index }">
          <Icon
            class="cursor-pointer"
            color="red"
            icon="fluent:delete-28-regular"
            @click="toDelOrganize(record, index)"
          />
        </template>
      </BasicTable>
    </a-col>
  </a-row>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, nextTick, reactive } from 'vue';
  import DeptTree from '../module/DeptTree.vue';
  import { Row, Col } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { organizeColumns } from '../config/add';
  import { BasicTable, useTable } from '/@/components/Table';
  import { cloneDeep } from 'lodash-es';
  import { Radio, RadioGroup, Checkbox, CheckboxGroup } from 'ant-design-vue';
  export default defineComponent({
    components: {
      Icon,
      DeptTree,
      BasicTable,
      [Row.name]: Row,
      [Col.name]: Col,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
    },
    props: {
      backfillKeys: {
        type: Array,
        default: () => [],
      },
      backfillOrgs: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      let organizeValue = ref('');
      let organizeList = ref<any[]>([]);
      let organizeNodes = ref<any[]>([]);
      let organizeKeys = ref<any[]>([]);
      let editOrganizeKeys = ref<any[]>([]);
      const state = reactive<{ ucenterPersonOrgs: any[] }>({
        ucenterPersonOrgs: [],
      });
      const [registerTable, { getDataSource }] = useTable({
        dataSource: organizeList,
        columns: organizeColumns,
        bordered: true,
        isCanResizeParent: true,
        pagination: false,
      });
      // 勾选部门
      const handleCheck = (keys, checkedNodes, edit) => {
        if (edit) {
          organizeNodes.value = cloneDeep(checkedNodes);
          toAddOrganize(true);
        } else {
          organizeKeys.value = keys.checked;
          organizeNodes.value = checkedNodes;
          // organizeNodes.value = checkedNodes.map((item) => item.props.node);
        }
      };
      // 点击部门
      const handleSelect = (keys, _name, _id, _parentId, node) => {
        if (!keys) return false;
        let index = organizeKeys.value.indexOf(keys);
        let selectNodes = node.selectedNodes[0];
        index == -1 && organizeKeys.value.push(keys) && organizeNodes.value.push(selectNodes);
        index != -1 && organizeKeys.value.splice(index, 1) && organizeNodes.value.splice(index, 1);
      };
      // 添加部门
      const toAddOrganize = (edit) => {
        organizeList.value = [];
        if (edit) {
          organizeNodes.value.forEach((item) => {
            delete item.children;
            state.ucenterPersonOrgs.forEach((it) => {
              if (item.id == it.deptId) {
                item.cadre = it.isMainPerson == 1 ? ref(true) : ref(false);
                if (it.isMain == 1) {
                  organizeValue.value = it.deptId;
                }
              }
            });
            organizeList.value.push(item);
          });
        } else {
          organizeNodes.value.forEach((item) => {
            delete item.children;
            item.cadre = false;
            organizeList.value.push(item);
          });
        }
      };
      // 删除部门
      const toDelOrganize = (item) => {
        organizeList.value = organizeList.value.filter((it) => {
          return it.id != item.id;
        });
        organizeNodes.value = organizeNodes.value.filter((it) => {
          return it.id != item.id;
        });
        organizeKeys.value = organizeKeys.value.filter((it) => {
          return it != item.id;
        });
      };
      const handleChange = (index) => {
        organizeList.value[index].cadre = !organizeList.value[index].cadre;
      };
      watch(
        () => props.backfillKeys,
        (val) => {
          if (val.length > 0) {
            nextTick(() => {
              organizeKeys.value = cloneDeep(val);
              editOrganizeKeys.value = cloneDeep(val);
            });
          }
        },
        { immediate: true, deep: true },
      );
      watch(
        () => props.backfillOrgs,
        (val) => {
          state.ucenterPersonOrgs = cloneDeep(val);
        },
        { immediate: true, deep: true },
      );
      return {
        organizeList,
        organizeValue,
        organizeKeys,
        editOrganizeKeys,
        registerTable,
        getDataSource,
        handleCheck,
        handleSelect,
        toAddOrganize,
        toDelOrganize,
        handleChange,
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
