<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-12 14:21:28
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-15 10:56:04
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/module/InviteItemModal.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicModal @register="registerModal" :width="500" title="联系专家" @ok="handleOk">
    <ExpertCardItem :record="record" :isHoverable="false" :isShowBtn="false" :isShowTel="true" />
    <div class="mt-2">
      <a-checkbox v-model:checked="checked">{{ checked ? '已联系' : '未联系' }}</a-checkbox>
      <a-switch
        v-model:checked="switchValue"
        checked-children="能出席"
        un-checked-children="不能出席"
      />
    </div>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Checkbox, Switch } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import ExpertCardItem from '/@/views/doSp/person/module/ExpertCardItem.vue';

  export default defineComponent({
    components: {
      BasicModal,
      ExpertCardItem,
      ACheckbox: Checkbox,
      ASwitch: Switch,
    },
    emits: ['success'],
    setup(_, { emit }) {
      const checked = ref(false);
      const switchValue = ref(false);
      const record = ref({});
      const [registerModal, { closeModal }] = useModalInner(async (data) => {
        checked.value = false;
        switchValue.value = false;
        record.value = data.record;
      });

      const handleOk = () => {
        emit('success', checked.value, switchValue.value);
        closeModal();
      };

      return {
        record,
        checked,
        switchValue,
        registerModal,
        handleOk,
      };
    },
  });
</script>

<style scoped></style>
