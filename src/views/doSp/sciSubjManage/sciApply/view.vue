<template>
  <PageWrapper contentFullHeight contentBackground contentClass="p-4 flex">
    <Description class="mt-4 !mb-10" :column="2" :data="viewData" :schema="viewSchema" />
    <template #rightFooter>
      <WorkFlow
        v-if="nextTask.length"
        @submit="getWorkFlow"
        :confirmLoading="confirmLoading"
        :nextTaskList="nextTask"
        :closeModal="closeModal"
      />
      <a-button @click="goBack">返回</a-button>
    </template>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useRoute, useRouter } from 'vue-router';
  import { mySpSciApplyView } from '/@/api/testDemo/scientific';
  import { WorkFlow } from '/@/components/WorkFlow';
  import { Description } from '/@/components/Description/index';
  import { viewSchema } from './config/view';
  import { oaFlowAgree, mesOaFlowReject } from '/@/api/common/workFlow';
  import { useTabs } from '/@/hooks/web/useTabs';
  export default defineComponent({
    name: 'SpSciApplyView',
    components: {
      PageWrapper,
      WorkFlow,
      Description,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const viewData = ref<Recordable>({});
      const { close, refreshOtherPage } = useTabs();
      // 工作流相关的数据
      const nextTask = ref([]);
      // 请求查看接口
      const requestView = () => {
        let params = { id: route.params.id };
        mySpSciApplyView(params).then((data) => {
          viewData.value = data;

          const {
            taskModel: { isApprove, isCreate, nextTaskList, processInstanceId },
          } = data;

          nextTask.value = nextTaskList;

          console.log(nextTask.value, 'nextTaskList.value');
        });
      };
      // 返回
      const goBack = () => {
        router.go(-1);
      };
      // 获取工作流数据
      const confirmLoading = ref(false);
      const closeModal = ref(false);
      const getWorkFlow = ({ type, approvalModel }) => {
        let params = {
          approvalModel: JSON.stringify(approvalModel),
          bizType: '52037-10',
          bizId: route.params.id,
        };
        confirmLoading.value = true;
        let API = new Function();
        if (type === 'agree') {
          API = oaFlowAgree;
          Object.assign(params, { approvalModel: JSON.stringify(approvalModel) });
        } else {
          API = mesOaFlowReject;
          Object.assign(params, approvalModel);
        }
        // mesOaFlowReject
        API(params)
          .then(() => {
            confirmLoading.value = false;
            closeModal.value = true;
            close(router.currentRoute.value);
            refreshOtherPage('SpSciApplyList');
          })
          .catch(() => {
            confirmLoading.value = false;
          });
      };
      onMounted(() => {
        requestView();
      });

      return {
        viewSchema,
        viewData,
        goBack,
        getWorkFlow,
        nextTask,
        confirmLoading,
        closeModal,
      };
    },
  });
</script>
