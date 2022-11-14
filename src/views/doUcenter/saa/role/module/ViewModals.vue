<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-09 15:50:45
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-06-22 10:02:51
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/viewModal.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicModal
    @register="register"
    title="角色查看"
    :showOkBtn="false"
    :showCancelBtn="false"
    width="720px"
  >
    <Description class="mt-4" :column="2" :data="viewData" :schema="viewSchema" />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description } from '/@/components/Description/index';
  import { getUcenterRoleView } from '/@/api/testDemo/role';
  import { viewSchema } from '../config/view';

  export default defineComponent({
    components: { BasicModal, Description },
    setup() {
      let viewData = ref('');
      const [register] = useModalInner(async ({ record }) => {
        console.log(record, 'data');
        const getViewParams = { id: record.id };
        viewData.value = await getUcenterRoleView(getViewParams);
      });
      return {
        register,
        viewData,
        viewSchema,
      };
    },
  });
</script>

<style lang="less" scoped>
  :deep(.ant-descriptions-item-content) {
    span {
      white-space: pre;
    }
  }
</style>
