<!--
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-17 10:28:53
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-14 15:54:54
 * @FilePath: /rural-revitalization/src/views/doOp/survey/design/module/ViewDrawer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    :isDetail="true"
    title="预览"
    wrapClassName="view-drawer"
  >
    <div style="width: 750px" class="m-auto">
      <div style="text-align: right; padding: 6px" class="flex items-center justify-between">
        <span style="font-size: 14px">{{ surName }}</span>
      </div>
      <ul>
        <li v-for="(item, index) in templateList" :key="index">
          <ViewTable :records="item" />
        </li>
      </ul>
      <div style="padding: 6px">
        <div>填报说明：</div>
        <ul>
          <li class="flex" v-for="(item, index) in fillingInstructionsList" :key="index">
            <span>{{ index + 1 }}.&nbsp;</span>
            <!-- <span :innerHTML="item.stem"></span>： -->
            <span :innerHTML="item.remark"></span>
          </li>
        </ul>
      </div>
    </div>
  </BasicDrawer>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { opTemplatePreview } from '/@/api/doOp/index';
  import ViewTable from './ViewTable.vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  export default defineComponent({
    components: {
      BasicDrawer,
      ViewTable,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const templateList = ref([]);
      const surName = ref('');
      const fillingInstructionsList = ref([]);
      const loadingRef = ref(false);
      const { close, refreshOtherPage } = useTabs();
      const [register] = useDrawerInner(async (params) => {
        requestView();
      });
      // 工作流相关的数据
      const nextTask = ref([]);
      // 请求查看接口
      const requestView = () => {
        loadingRef.value = true;
        let params = { id: route.params.id, bizType: route.query.bizType };
        opTemplatePreview({ templateId: route.query.templateId }).then((data) => {
          surName.value = data.surName;
          const { fillingInstructionsList: list, categoryList, surveyMappingList } = data;
          fillingInstructionsList.value = list;
          console.log(fillingInstructionsList.value, 'fillingInstructionsList.value');

          templateList.value = [{ categoryList, surveyMappingList }];
          loadingRef.value = false;
        });
      };

      // 返回
      const goBack = () => {
        router.go(-1);
      };
      return {
        goBack,
        register,
        nextTask,
        surName,
        loadingRef,
        templateList,
        fillingInstructionsList,
      };
    },
  });
</script>
