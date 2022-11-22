import { BasicColumn, FormProps } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { ucenterCodeCombox } from '/@/api/common/index';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';
import dayjs from 'dayjs';
import { useUserStore } from '/@/store/modules/user';
const userStore = useUserStore();
export const columns: BasicColumn[] = [
  {
    title: '表单名称',
    dataIndex: 'name',
    width: 180,
    align: 'left',
    edit: true,
  },
  {
    title: '设计状态',
    dataIndex: 'designStatusName',
    width: 80,
    align: 'left',
  },
];

export const basicSchemas: FormSchema[] = [
  {
    field: 'surName',
    component: 'Input',
    label: '调研表名称',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 16, xxl: 8 },
    },
  },
  {
    field: 'years',
    component: 'DatePicker',
    label: '年度',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 16, xxl: 8 },
    },
    componentProps: {
      picker: 'year',
      format: 'YYYY',
      valueFormat: 'YYYY',
    },
  },
  {
    field: 'type',
    component: 'ApiSelect',
    label: '调研表类型',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 16, xxl: 8 },
    },
    componentProps: ({ formActionType, formModel }) => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52016',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
        onChange: (value) => {
          console.log(value, 'value');
          formModel.objectType = '';
          const { updateSchema } = formActionType;
          if (value === '52016-30') {
            updateSchema({
              field: 'objectType',
              componentProps: () => {
                return {
                  api: ucenterCodeCombox,
                  params: {
                    pathValueQueryLike: '52016-30',
                    type: '10001-52047',
                  },
                  resultField: 'list',
                  labelField: 'name',
                  valueField: 'value',
                };
              },
            });
          } else {
            updateSchema({
              field: 'objectType',
              componentProps: () => {
                return {
                  api: ucenterCodeCombox,
                  params: {
                    type: '10001-52047',
                  },
                  resultField: 'list',
                  labelField: 'name',
                  valueField: 'value',
                };
              },
            });
          }
        },
      };
    },
  },
  {
    field: 'objectType',
    component: 'ApiSelect',
    label: '调研对象类型',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 16, xxl: 8 },
    },
    componentProps: () => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52047',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
  },

  {
    field: 'remark',
    component: 'InputTextArea',
    label: '调研表说明',
    defaultValue: '',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 20, xxl: 16 },
    },
    componentProps: {
      showCount: true,
      maxlength: '100',
    },
  },
  {
    field: `personName`,
    component: 'Input',
    label: '创建人',
    defaultValue: userStore.getUserInfo?.realName,
    componentProps: {
      disabled: true,
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 16, xxl: 8 },
    },
  },
  {
    field: 'sdDate',
    component: 'DatePicker',
    label: '创建日期',
    defaultValue: dayjs(),
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 16, xxl: 8 },
    },
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      disabled: true,
    },
  },
];

export const searchArr: searchListType = [
  {
    field: 'nameQueryLike',
    type: 'input',
    label: '活动名称',
    value: undefined,
  },
  {
    label: '活动日期',
    type: 'rangePicker',
    value: undefined,
    field: 'date',
    valueFormat: 'YYYY-MM-DD',
  },
  {
    label: '活动分类',
    type: 'tag',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-52003' },
    field: 'categoryType',
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
    isMultiple: false,
    hasAll: true,
  },
  {
    label: '活动状态',
    type: 'tag',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-52004' },
    field: 'statusQueryIn',
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
    isMultiple: false,
    hasAll: true,
  },
];

export const statusObj = {
  '52032-10': '#108ee9',
  '52032-20': '#87d068',
  '52032-30': '#f50',
  '52032-40': 'default',
};
