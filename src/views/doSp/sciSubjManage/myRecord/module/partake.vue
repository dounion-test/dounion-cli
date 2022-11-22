<template>
  <BasicModal @register="register" @ok="handleOk" title="系统记录的参与的科研课题/项目">
    <a-list
      class="demo-loadmore-list"
      :loading="initLoading"
      item-layout="horizontal"
      :data-source="partakeList"
    >
      <template #renderItem="{ item }">
        <a-list-item class="">
          <a-list-item-meta>
            <template #avatar><a-checkbox v-model:checked="item.checked" /></template>
            <template #title>
              <a href="">{{ item.title }}</a>
            </template>
            <template #description>
              <p class="m-0 text-gray-600"
                ><span>起止时间：</span>{{ item.startDate }} 至 {{ item.endDate }}</p
              >
              <p class="m-0 text-gray-600"
                ><span>负责人：</span>{{ item.name }}<span class="pl-4">项目小组：</span
                >{{ item.jobPerson }}</p
              >
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { List, ListItem, ListItemMeta, Checkbox } from 'ant-design-vue';
  import { partakeList } from '../config/add';
  export default defineComponent({
    components: {
      BasicModal,
      AList: List,
      AListItem: ListItem,
      AListItemMeta: ListItemMeta,
      ACheckbox: Checkbox,
    },
    setup() {
      const state = reactive({
        initLoading: ref(false),
        partakeList,
      });

      const [register, { closeModal }] = useModalInner();

      const handleOk = () => {
        console.log(partakeList, 'partakeList');
        closeModal();
      };

      return { ...toRefs(state), register, handleOk };
    },
  });
</script>
