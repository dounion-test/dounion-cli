import { BasicColumn, FormProps } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { ucenterCodeCombox } from '/@/api/common/index';
import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';
import { uploadApi } from '/@/api/sys/upload';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';
export const columns: BasicColumn[] = [
  {
    title: '成果标题',
    dataIndex: 'title',
    width: 180,
    align: 'left',
  },
  {
    title: '成分分类',
    dataIndex: 'categoryTypeName',
    width: 80,
    align: 'left',
  },
  {
    title: '类别',
    dataIndex: 'categoryChildTypeName',
    width: 60,
    align: 'left',
  },
  // {
  //   title: '成果描述',
  //   dataIndex: 'name',
  //   width: 140,
  //   align: 'left',
  //   slots: { customRender: 'name' },
  // },
  {
    title: '成果取得日期',
    dataIndex: 'sciDate',
    width: 130,
    align: 'left',
  },
  {
    title: '内外部',
    dataIndex: 'inOutTypeName',
    width: 50,
    align: 'left',
  },
  {
    title: '附件',
    dataIndex: 'applyFile',
    width: 50,
    align: 'left',
    slots: { customRender: 'applyFile' },
  },
  {
    title: '状态',
    dataIndex: 'statusName',
    width: 60,
    align: 'left',
    slots: { customRender: 'statusName' },
  },
];

export const basicSchemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '成果标题',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: {
        span: 19,
      },
    },
    rules: [{ required: true, trigger: 'blur', message: '请填写成果标题', type: 'string' }],
  },
  {
    field: 'categoryType',
    component: 'ApiSelect',
    label: '成果类别',
    rules: [{ required: true, trigger: 'blur', message: '请选择成果类别', type: 'string' }],
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: {
        span: 14,
      },
    },
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52007',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
        onChange: (value) => {
          const { updateSchema } = formActionType;
          if (!value) {
            formModel.categoryChildType = '';
            updateSchema({
              field: 'categoryChildType',
              componentProps: {
                disabled: true,
              },
            });
          } else {
            formModel.categoryChildType = '';
            updateSchema({
              field: 'categoryChildType',
              componentProps: () => {
                return {
                  api: ucenterCodeCombox,
                  disabled: false,
                  params: { type: value },
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
    field: 'categoryChildType',
    component: 'ApiSelect',
    label: '成果子分类',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: {
        span: 14,
      },
    },
    rules: [{ required: true, trigger: 'blur', message: '请选择成果子类别', type: 'string' }],
    componentProps: ({ formModel }) => {
      return {
        api: ucenterCodeCombox,
        disabled: formModel.categoryType ? false : true,
        params: {
          type: formModel.categoryType || '10001-52008',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
  },
  {
    field: 'inOutType',
    component: 'ApiSelect',
    label: '内外部类型',
    rules: [{ required: true, trigger: 'blur', message: '请选择内外部类型', type: 'string' }],
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: {
        span: 14,
      },
    },
    componentProps: () => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52033',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
      };
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '内容',
    rules: [{ required: true, type: 'string', trigger: 'change' }],
    required: true,
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
      wrapperCol: {
        span: 19,
      },
    },
  },
  {
    field: 'sciDate',
    component: 'DatePicker',
    label: '成果日期',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: {
        span: 7,
      },
    },
    required: true,
  },
  {
    field: 'applyFile',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: {
        span: 19,
      },
    },
    componentProps: {
      api: uploadApi,
      maxNumber: 1,
      maxSize: 0,
      uploadParams: {
        groupName: '52030-20',
      },
    },
  },
];

export const searchArr: searchListType = [
  {
    field: 'titleQueryLike',
    type: 'input',
    label: '成果标题',
    value: undefined,
  },
  {
    field: 'categoryType',
    type: 'tag',
    label: '成果分类',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-52007' },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
    hasAll: true,
    isMultiple: false,
  },
  {
    field: 'inOutType',
    type: 'tag',
    label: '内外部类型',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-52033' },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
    hasAll: true,
    isMultiple: false,
  },
];

export const searchArr2: searchListType = [
  {
    field: 'nameQueryLike',
    type: 'input',
    label: '成果标题',
    value: undefined,
  },
];

export const statusObj = {
  '52032-10': '#c88740', //待申请
  '52032-20': '#ffaa2b', //申请中
  '52032-30': '#f8363f', //申请未通过
  '52032-40': '#87d068', //认定通过
};
