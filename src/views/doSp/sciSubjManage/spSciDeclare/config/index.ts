import { BasicColumn, FormProps } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { ucenterCodeCombox } from '/@/api/common/index';
import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';
import { uploadApi } from '/@/api/sys/upload';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 0,
    showActionButtonGroup: false,
    schemas: [
      // 占位
      {
        field: `empty`,
        label: ``,
        component: 'Select',
        slot: 'custom',
        colProps: {
          xl: 24,
        },
      },
    ],
  };
}

export const columns: BasicColumn[] = [
  {
    title: '课题名称',
    dataIndex: 'name',
    width: 120,
    align: 'left',
  },
  {
    title: '课题类别',
    dataIndex: 'subTypeName',
    width: 60,
    align: 'left',
  },
  {
    title: '类别',
    dataIndex: 'typeName',
    width: 40,
    align: 'left',
  },
  // {
  //   title: '单位名称',
  //   dataIndex: 'orgName',
  //   width: 180,
  //   align: 'left',
  // },
  {
    title: '申报人',
    dataIndex: 'applyName',
    width: 60,
    align: 'left',
  },
  {
    title: '申报日期',
    dataIndex: 'applyStime',
    width: 60,
    align: 'left',
  },
  {
    title: '申报结果',
    dataIndex: 'applyResult',
    width: 60,
    align: 'left',
    slots: { customRender: 'applyResult' },
  },
  // {
  //   title: '上级部门意见',
  //   dataIndex: 'publishUnitName',
  //   width: 180,
  //   align: 'left',
  // },
  // {
  //   title: '发布部门意见',
  //   dataIndex: 'parentUnitName',
  //   width: 180,
  //   align: 'left',
  // },
  {
    title: '附件',
    dataIndex: 'declareAttachments',
    width: 40,
    align: 'left',
    slots: { customRender: 'declareAttachments' },
  },
];

export const basicSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '课题名称',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 19 },
    },
    rules: [{ required: true, type: 'string' }],
  },
  {
    field: 'type',
    component: 'ApiSelect',
    label: '类别',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 14 },
    },
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52005',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
        //   onChange: (value) => {
        //     const { updateSchema } = formActionType;
        //     if (!value) {
        //       formModel.categoryChildType = '';
        //       updateSchema({
        //         field: 'categoryChildType',
        //         componentProps: {
        //           disabled: true,
        //         },
        //       });
        //     } else {
        //       formModel.categoryChildType = '';
        //       updateSchema({
        //         field: 'categoryChildType',
        //         componentProps: () => {
        //           return {
        //             api: ucenterCodeCombox,
        //             disabled: false,
        //             params: { type: value },
        //             resultField: 'list',
        //             labelField: 'name',
        //             valueField: 'value',
        //           };
        //         },
        //       });
        //     }
        //   },
      };
    },
  },
  {
    field: 'subType',
    component: 'ApiSelect',
    label: '课题类别',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 14 },
    },
    show: ({ values }) => {
      return values.type == '52005-10';
    },
    componentProps: ({ formModel }) => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '52005-10',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
  },
  {
    field: 'code',
    component: 'Input',
    label: '课题项目编号',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 14 },
    },
  },

  {
    field: 'applyStime',
    component: 'DatePicker',
    label: '申报日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      format: 'YYYY-MM-DD',
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 14 },
    },
  },
  {
    field: 'parentUnit',
    component: 'ApiSelect',
    label: '上级部门意见',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 14 },
    },
    componentProps: ({ formModel }) => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52041',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
  },
  {
    field: 'publishUnit',
    component: 'ApiSelect',
    label: '发布单位意见',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 14 },
    },
    componentProps: ({ formModel }) => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52041',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
  },
  {
    field: 'declareContent',
    component: 'Input',
    label: '申报内容',
    defaultValue: '',

    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 19 },
    },
  },
  {
    field: 'declareAttachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 19 },
    },
    componentProps: {
      api: uploadApi,
      maxNumber: 1,
      uploadParams: {
        groupName: '52030-20',
      },
    },
  },
];

export const searchArr: searchListType = [
  {
    field: 'nameQueryLike',
    type: 'input',
    label: '课题名称',
    value: undefined,
  },
  {
    field: 'subType',
    type: 'tag',
    label: '课题类别',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '52005-10' },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
    hasAll: true,
    isMultiple: false,
  },
];

export const statusObj = {
  '52032-10': '#108ee9',
  '52032-20': '#87d068',
  '52032-30': '#f50',
  '52032-40': 'default',
};
