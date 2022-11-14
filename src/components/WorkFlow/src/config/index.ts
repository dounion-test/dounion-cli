import { mesOaFlowNextPersonList } from '/@/api/testDemo/dept';
import { FormSchema } from '/@/components/Form/index';
const flatten = (arr) => {
  for (const item of arr) {
    if (item.children && Array.isArray(item.children) && item.listPerson) {
      item.id = `${item.id}${item.code}`;
      item.disabled = true;
      item.listPerson.forEach((it) => {
        // it.id = `${item.id}-${it.id}`;
        it.cname = it.name;
      });
      item.children = [...item.children, ...item.listPerson];
      flatten(item.children);
    }
  }

  return arr;
};
export const basicApiTreeSchemas: FormSchema = {
  field: 'person',
  component: 'ApiTreeSelect',
  label: '提交审核方',
  rules: [
    {
      required: true,
      message: '请选择提交审核方',
      type: 'string',
    },
  ],
  componentProps: {
    api: mesOaFlowNextPersonList,
    filterTreeNode: true,
    treeNodeFilterProp: 'personName',
    params: { isMain: 1 },
    fieldNames: { key: 'id', label: 'personName', value: 'personId' },
    showSearch: true,
    afterFetch: flatten,
  },
  colProps: {
    span: 18,
  },
};

export const basicRadioGroupSchemas: FormSchema = {
  field: '_assignKey',
  component: 'ApiRadioGroup',
  label: '选择步骤',
  colProps: {
    span: 24,
  },
  componentProps: {
    options: [],
  },
};

export const basicInputTextArea: FormSchema = {
  field: 'comment',
  defaultValue: '',
  component: 'InputTextArea',
  label: '审批意见',
  colProps: {
    span: 18,
  },
};

export const basicCheckboxGroup: FormSchema = {
  field: 'remindType',
  component: 'CheckboxGroup',
  label: '提醒方式',
  defaultValue: '',
  colProps: {
    span: 24,
  },
  componentProps: {
    options: [],
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
  },
};

export const basicSchemas: FormSchema[] = [];

export const rejectOptions = [
  {
    label: '驳回至上一级',
    value: '',
  },
  {
    label: '驳回至发起人',
    value: 'submit',
  },
];

export const mock1 = [
  {
    bizType: '21001-20',
    taskList: [
      {
        stepId: 'deptResp',
        stepName: '主办科室负责人意见',
        multi: '1',
        assignee: 'deptResp_fixed_role_currentDepartment',
        isFixed: '0',
        fixedAccount: '',
        fixedPersonID: '',
        fixedPersonName: '',
      },
    ],
  },
];
