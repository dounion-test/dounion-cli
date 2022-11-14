<template>
  <div class="workFlow">
    <BasicModal
      width="800px"
      :minHeight="300"
      title="工作流"
      class="upload-preview-modal"
      :loading="loading"
      :confirmLoading="confirmLoading"
      @register="registerModal"
      @ok="handleOk"
      @cancel="handleCancel"
      @visible-change="visibleChange"
    >
      <BasicForm :actionColOptions="{ span: 16 }" @register="register" class="width-80" />
    </BasicModal>
    <div class="bth-box text-right" v-if="!isApply">
      <a-button type="primary" size="mini" @click="agree" class="mr-5">同意</a-button>
      <a-button type="primary" danger size="mini" @click="reject" class="mr-5">驳回</a-button>
      <!-- <a-button type="primary" danger size="mini" @click="oppose" class="mr-5">反对</a-button> -->
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, watch, nextTick, onUnmounted } from 'vue';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import {
    basicSchemas,
    basicApiTreeSchemas,
    basicRadioGroupSchemas,
    basicInputTextArea,
    basicCheckboxGroup,
    rejectOptions,
  } from './config/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { firstTask } from '/@/api/testDemo/scientific';
  import { mergeWith, cloneDeep } from 'lodash-es';
  import { ucenterCodeCombox } from '/@/api/common/index';
  export default defineComponent({
    name: 'WorkFlow',
    components: {
      BasicModal,
      BasicForm,
    },
    props: {
      isApply: {
        type: Boolean,
        default: false,
      },
      confirmLoading: {
        type: Boolean,
        default: false,
      },
      clickApply: {
        type: Boolean,
        default: false,
      },
      nextTaskList: {
        type: Array,
      },
      closeModal: {
        type: Boolean,
        default: false,
      },
      firstTaskParams: {
        type: Object,
        default: () => {
          return {
            bizType: '52037-10',
          };
        },
      },
    },
    emits: ['submit', 'cancel'],
    setup(props, { emit }) {
      const { createMessage } = useMessage();
      const loading = ref(false);
      // 当前工作流事件类型
      const workType = ref('');
      // 流转步骤是否多节点
      const isMultiNode = ref(false);
      // 确定按钮的loading
      const confirmLoading = ref(false);
      const setWorkType = (type) => {
        workType.value = type;
      };
      let remindDefaultValue = ref('');
      const [
        register,
        { validateFields, getFieldsValue, appendSchemaByField, removeSchemaByFiled },
      ] = useForm({
        labelWidth: 100,
        schemas: basicSchemas,
        showActionButtonGroup: false,
      });
      const [registerModal, { openModal, closeModal }] = useModal();

      const agree = () => {
        setWorkType('agree');

        openModal(true);

        nextTick(() => transTaskList(props.nextTaskList));
      };

      const handleOk = async () => {
        await validateFields();
        // 获取表单
        const formData = await getFieldsValue();
        // 发起申请（workType = apply）时对多节点，需特殊处理
        let other: Recordable = {};
        if (workType.value === 'apply' && isMultiNode.value) {
          other.submit_branch = selectTreeField.value;
        }
        // 审批阶段同意并且流程未结束
        if (workType.value === 'agree' && !isWorkFlowEnd.value) {
          other[`${workFlowStepId.value}_branch`] = formData._assignKey;
        }
        //转换消息提醒数据
        if (formData.remindType?.length) {
          formData.remindType = formData.remindType.join(',');
        }
        mergeWith(formData, other);
        emit('submit', { type: workType.value, approvalModel: formData });
      };

      const reject = () => {
        setWorkType('reject');

        openModal(true);

        nextTick(() => transTaskList(props.nextTaskList));
      };
      const oppose = () => {
        setWorkType('oppose');

        openModal(true);

        nextTick(() => transTaskList(props.nextTaskList));
      };

      // 当前流程节点Id
      const workFlowStepId = ref('');
      // 当前节点是否是工作流最后一步
      const isWorkFlowEnd = ref(false);
      const selectTreeField = ref('');
      // 流程步骤-获取首步任务
      const getFirstTask = async () => {
        loading.value = true;
        try {
          // 获取流程数据
          let data = await firstTask(props.firstTaskParams);
          // 选择步骤默认选择第一个节点
          if (!data || data.length === 0) {
            createMessage.warning('流程数据为空');
            return;
          }

          // 根据taskList创建流程步骤
          const { taskList } = data[0];
          transTaskList(taskList);
        } catch {
          createMessage.error('获取工作流失败！');
        }

        setTimeout(() => {
          loading.value = false;
        }, 300);
      };

      //处理工作流程数据
      const transTaskList = (taskList, selectIndex = 0) => {
        const baseTaskList = cloneDeep(taskList);
        // 是否多节点
        isMultiNode.value = taskList.length > 1;

        /**
         * isFixed 是否为固定节点 0/否 1/是 2/范围选择,把fixedPersonID当做参数传递给审批人员树接口
         * fixedPersonName 当isFixed=1时，固定人员name
         * fixedPersonID 当isFixed=1时，固定人员Id
         * multi 审批人员是否可以多选
         * stepId 当前流程节点id
         */
        let { isFixed, fixedPersonName, multi, stepId, fixedPersonID, assignee } = {
          ...taskList[selectIndex || 0],
        };
        // 当前流程Id
        workFlowStepId.value = stepId;
        selectTreeField.value = assignee;
        // stepId=end 时，表示当前流程已经结束
        if (stepId === 'end') {
          isWorkFlowEnd.value = true;
          // return;
        }

        // 处理字段符合单选组件要求
        taskList = taskList.map((v, i) => {
          return {
            label: v.stepName,
            value: isWorkFlowEnd.value ? 'end' : v.assignee,
            index: i,
            ...v,
          };
        });

        // isFixed=1，则当前固定人员只有一个，并且需要回显到审批人员组件上
        if (isFixed == 1) {
          let componentProps = {
            params: { isMain: 1 },
            fieldNames: { key: 'id', label: 'cname', value: 'id' },
            opstions: [
              {
                id: fixedPersonID,
                cname: fixedPersonName,
              },
            ],
          };
          mergeWith(basicApiTreeSchemas, componentProps, { defaultValue: fixedPersonID });
          // 范围选择,把fixedPersonID当做参数传递给审批人员树接口
        } else if (isFixed == 2) {
          let {
            componentProps: { params },
          } = basicApiTreeSchemas;
          mergeWith(params, { personIdQueryIn: fixedPersonID });
          mergeWith(basicApiTreeSchemas, { componentProps: { params } });
        }

        // multi 审批人员树组件是否多选
        if (multi == 1) {
          mergeWith(
            basicApiTreeSchemas,
            {
              componentProps: { multiple: false },
            },
            { rules: [{ type: 'number' }] },
          );
        } else {
          mergeWith(
            basicApiTreeSchemas,
            {
              componentProps: { multiple: true },
            },
            { rules: [{ type: 'array' }] },
          );
        }

        mergeWith(basicApiTreeSchemas, { field: assignee, componentProps: { params: { stepId } } });
        mergeWith(basicRadioGroupSchemas, {
          defaultValue: isWorkFlowEnd.value ? 'end' : assignee,
          componentProps: {
            options: taskList,
            onChange: async (value) => {
              let index = taskList.findIndex((v) => v.value === value);
              if (index != -1) {
                await visibleChange();
                transTaskList(baseTaskList, index);
              }
            },
          },
        });
        console.log(basicRadioGroupSchemas, basicApiTreeSchemas, 'basicApiTreeSchemas');

        // 处理动态表单
        switch (workType.value) {
          case 'apply':
            // 添加选择步骤
            appendSchemaByField(basicRadioGroupSchemas, undefined, true);
            // 添加审核人员
            appendSchemaByField(basicApiTreeSchemas, '_assignKey');
            // 添加提醒方式
            appendSchemaByField(basicCheckboxGroup, undefined);
            break;
          case 'agree':
            // 添加选择步骤
            appendSchemaByField(basicRadioGroupSchemas, undefined, true);
            // 添加审核人员
            !isWorkFlowEnd.value && appendSchemaByField(basicApiTreeSchemas, '_assignKey');
            // 添加审批意见
            appendSchemaByField(basicInputTextArea, undefined);
            // 添加提醒方式
            appendSchemaByField(basicCheckboxGroup, undefined);
            break;
          case 'reject':
            let baseData = cloneDeep(basicRadioGroupSchemas);
            baseData.defaultValue = '';
            baseData.componentProps.options = rejectOptions;
            baseData.field = 'taskDefineKey';
            // 更改选择步骤的选项
            appendSchemaByField(baseData, undefined, true);
            // 添加审批意见
            appendSchemaByField(basicInputTextArea, undefined);
            break;
          case 'oppose':
            // 添加审批意见
            appendSchemaByField(basicInputTextArea, undefined);
            break;
        }
      };
      const handleCancel = () => {
        emit('cancel');
      };

      const visibleChange = () => {
        removeSchemaByFiled([
          '_assignKey',
          selectTreeField.value,
          'comment',
          'remindType',
          'taskDefineKey',
        ]);
      };

      const apply = () => {
        setWorkType('apply');

        openModal(true);

        getFirstTask();
      };
      const remindOptinos = ref([]);
      const requestRemindOptinos = () => {
        ucenterCodeCombox({ type: '10001-10042' }).then((res) => {
          remindOptinos.value = res;
          const options = res.list.map((v) => {
            if (v.name === '系统消息') {
              remindDefaultValue.value = v.value;
            }
            return {
              label: v.name,
              ...v,
            };
          });
          mergeWith(
            basicCheckboxGroup,
            { componentProps: { options: options } },
            { defaultValue: [remindDefaultValue.value] },
          );
        });
      };
      onMounted(() => requestRemindOptinos());

      onUnmounted(() => visibleChange());

      watch(
        () => props.clickApply,
        (val) => {
          val && apply();
          !val && closeModal();
        },
      );

      watch(
        () => props.closeModal,
        (val) => {
          val && closeModal();
        },
      );

      watch(
        () => props.confirmLoading,
        (val) => (confirmLoading.value = val),
      );
      return {
        loading,
        agree,
        reject,
        oppose,
        register,
        registerModal,
        handleOk,
        handleCancel,
        apply,
        visibleChange,
        confirmLoading,
      };
    },
  });
</script>

<style scoped lang="less">
  .workFlow {
    display: inline-block;
  }

  :deep(.ant-input) {
    min-height: 80px;
  }

  :deep(.ant-tree-select-dropdown) {
    top: 35px !important;
    min-height: auto !important;
    // height: 150px !important;

    .ant-select-tree-list-holder {
      // max-height: 150px !important;
    }
  }
</style>
