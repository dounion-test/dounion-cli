import { h } from 'vue';
import { FormSchema } from '/@/components/Form/index';
import { infoDocCombox } from '/@/api/doInfo/index';
import { Tinymce } from '/@/components/Tinymce/index';
export const jigou: FormSchema[] = [
  {
    field: 'code',
    component: 'Input',
    label: '机构编号',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'websiteName',
    component: 'Input',
    label: '机构官网',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'agencyId',
    component: 'ApiSelect',
    label: '机构名称',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
    componentProps: {
      api: infoDocCombox,
      labelField: 'name',
      valueField: 'id',
      params: { docType: '一级机构' },
    },
  },
  {
    field: 'docUpdateTime',
    component: 'DatePicker',
    label: '更新时间',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'country',
    component: 'Input',
    label: '所在国家',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'standName',
    component: 'Input',
    label: '所在国家',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'arear',
    component: 'Input',
    label: '所在地区',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'deptName',
    component: 'Input',
    label: '部门',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'orgContent',
    component: 'Input',
    label: '机构简介',
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
      span: 16,
    },
    itemProps: {
      wrapperCol: { span: 24, xxl: 16 },
    },
  },
];
