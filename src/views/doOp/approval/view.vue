<template>
  <PageWrapper contentBackground contentClass="flex !p-1" v-loading="loadingRef">
    <div class="nav-wrap" v-if="surInfo && surInfo.templateList && surInfo.templateList.length > 0">
      <a-typography-title :level="4" class="!mb-3">
        <div class="flex items-center">
          <strong class="mr-2 menu-title">{{ surInfo.surName }}</strong>
        </div>
      </a-typography-title>
      <div class="nav-menu">
        <a-menu v-model:selectedKeys="selectedKeys" @select="hanldeMenuChange">
          <a-menu-item
            v-for="item in surInfo.templateList"
            :key="`${item.bizId}_${item.bizType}`"
            class="nav-menu-item"
          >
            <div class="flex items-center">
              <span class="mr-2">{{ item.templateName }}</span>
            </div>
          </a-menu-item>
        </a-menu>
      </div>
    </div>
    <div class="m-auto approval-work-flow">
      <BasicTable @register="registerTable" />
      <div class="survey-table">
        <div class="hd">
          <h2>{{ surName }}</h2>
          <div class="operat">
            <WorkFlow
              v-if="nextTask.length && currentStepId && currentStepId != 'submit'"
              @submit="getWorkFlow"
              :confirmLoading="confirmLoading"
              :nextTaskList="nextTask"
              :closeModal="closeModal"
            />
            <a-button v-if="nextTask.length" @click="handleSave" class="mr-4" type="primary"
              >保存</a-button
            >
            <a-button @click="goBack">返回</a-button>
          </div>
        </div>
      </div>
      <ul class="survey-list">
        <li v-for="(item, index) in templateList" :key="index">
          <CollapseContainer
            class="mt-5 approval-collapse"
            :title="item.templateName"
            :isTitleLine="false"
          >
            <ViewTable
              @success="handleSuccess"
              :fillPersonSubject="fillPersonSubject"
              :taskObjectId="taskObjectId"
              :templateId="item.templateId"
              :records="item"
              :currentStepId="currentStepId"
              :nextTaskList="nextTask"
              ref="viewTableRef"
            />
          </CollapseContainer>
        </li>
      </ul>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Menu, TypographyTitle } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { useRoute, useRouter } from 'vue-router';
  import { WorkFlow } from '/@/components/WorkFlow';
  import ViewTable from './module/ViewTable.vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { CollapseContainer } from '/@/components/Container';
  import { oaFlowAgree, mesOaFlowReject } from '/@/api/common/workFlow';
  import { useTabs } from '/@/hooks/web/useTabs';
  import {
    opAnswerReportApprovalView,
    opAnswerReportAapprovalSurveyApi,
    opAnswerReportApprovalAuditSaveApi,
  } from '/@/api/doOp/approval';
  import { columns } from './config/view';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: {
      PageWrapper,
      WorkFlow,
      ViewTable,
      BasicTable,
      CollapseContainer,
      AMenu: Menu,
      AMenuItem: Menu.Item,
      ATypographyTitle: TypographyTitle,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const templateList = ref([]);
      const surName = ref('');
      const surInfo = ref();
      const taskObjectId = ref(0);
      const fillPersonSubject: any = ref();
      const loadingRef = ref(false);
      const viewTableRef = ref();
      const selectedKeys = ref<any[]>([`${route.params.id}_${route.query.bizType}`]);
      const { close, refreshOtherPage } = useTabs();
      const { createMessage } = useMessage();

      // 工作流相关的数据
      const nextTask = ref([]);
      const currentStepId = ref('');

      /**
       * table 列表
       */
      const [registerTable, { setTableData }] = useTable({
        rowKey: 'id',
        columns,
        immediate: false,
        useSearchForm: false,
        canResize: false,
        showTableSetting: false,
        showIndexColumn: true,
        bordered: true,
        pagination: false,
      });

      const getSurveyList = async (obj) => {
        surInfo.value = await opAnswerReportAapprovalSurveyApi(obj);
      };
      getSurveyList({ id: route.params.id, bizType: route.query.bizType });

      // 请求查看接口
      const requestView = (params) => {
        loadingRef.value = true;
        templateList.value = [];
        opAnswerReportApprovalView(params).then((data) => {
          surName.value = data.surName;
          templateList.value = data.templateList;
          taskObjectId.value = data.taskObjectId;
          fillPersonSubject.value = data.fillPersonSubject;
          loadingRef.value = false;
          const {
            taskModel: { nextTaskList },
          } = data;
          nextTask.value = nextTaskList;
          currentStepId.value = data.taskModel.currentStepId;
          setTableData(data.taskModel.checkList);
        });
      };

      // 切换表单
      const hanldeMenuChange = () => {
        let bizArr = selectedKeys.value[0].split('_');
        requestView({ id: bizArr[0], bizType: bizArr[1] });
      };

      // 保存审批意见
      const handleSave = async () => {
        let answerDetailList: any = [];
        viewTableRef.value.forEach((item) => {
          let dataSource = item.getDataSource();
          dataSource.forEach((it) => {
            if (it['52044-30']) {
              answerDetailList.push({
                id: it['52044-30'].id,
                auditOpinion: it.auditOpinion ? it.auditOpinion : '',
              });
            }
          });
        });
        await opAnswerReportApprovalAuditSaveApi({
          answerDetailList: JSON.stringify(answerDetailList),
        });
        createMessage.success('审批意见保存成功');
      };

      // 修改答案回调刷新
      const handleSuccess = () => {
        hanldeMenuChange();
      };

      // 返回
      const goBack = () => {
        router.go(-1);
      };
      // 获取工作流数据
      const confirmLoading = ref(false);
      const closeModal = ref(false);
      const getWorkFlow = async ({ type, approvalModel }) => {
        if (type === 'reject') {
          await handleSave();
        }
        let params = {
          approvalModel: JSON.stringify(approvalModel),
          bizType: route.query.bizType,
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
            refreshOtherPage('ApprovalPage');
          })
          .catch(() => {
            confirmLoading.value = false;
          });
      };

      const getContainerBox = () => {
        return document.querySelector(`.layouts-scroll .scrollbar__wrap`) as any;
      };

      onMounted(() => {
        requestView({ id: route.params.id, bizType: route.query.bizType });
      });
      return {
        registerTable,
        goBack,
        getWorkFlow,
        nextTask,
        taskObjectId,
        currentStepId,
        confirmLoading,
        closeModal,
        surName,
        surInfo,
        loadingRef,
        templateList,
        selectedKeys,
        viewTableRef,
        fillPersonSubject,
        getContainerBox,
        hanldeMenuChange,
        handleSave,
        handleSuccess,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import '/@/design/view-table.less';

  .approval-surName {
    font-size: @font-size-b6;
    font-weight: 500;
    flex: 1;
    text-align: center;
  }

  .nav-wrap {
    width: 250px;
    text-align: center;
    padding-top: 80px;
    background-color: #edf3fa;

    :deep(.ant-affix) {
      padding-top: 110px;
      z-index: 1;
    }

    .icon-primary {
      color: @primary-color;
    }

    ul {
      background-color: transparent;
    }
  }

  .menu-title {
    padding-left: 20px;
    font-size: @font-size-b4;
  }

  :deep(.nav-menu) {
    flex: auto;
    border-right: none;
    background-color: transparent;

    li {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      height: 40px !important;
      font-size: @font-size-b2;
      padding-left: 20px;

      .icon-primary {
        color: @primary-color;
      }
    }

    .ant-menu-item-selected {
      background-color: #e3f4fc;
      border-right: 4px solid @primary-color;
    }
  }
</style>

<style lang="less">
  @prefix-cls: ~'@{namespace}-collapse-container__header';

  .approval-collapse {
    .@{prefix-cls} {
      background: #fafafa;
    }

    .p-4 {
      padding: 0;
    }

    .ant-table-wrapper {
      padding: 0;
    }
  }
</style>
