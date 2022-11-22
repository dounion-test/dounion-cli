import { FormSchema } from '/@/components/Form/index';
import { infoDocCombox, infoLabelCombox } from '/@/api/doInfo/index';
import { Tinymce } from '/@/components/Tinymce/index';
import { h } from 'vue';

export const xinwen: FormSchema[] = [
  {
    field: 'code',
    component: 'Input',
    label: 'ID编号',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'sourceMedia',
    component: 'Input',
    label: '来源（XX报纸）',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'pulishTime',
    component: 'DatePicker',
    label: '新闻时间',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'atrType',
    component: 'ApiSelect',
    label: '属性分类',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'authorIds',
    component: 'ApiSelect',
    label: '作者',
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
      params: { docType: '专家', specTypeQueryIn: 1 },
    },
  },
  {
    field: 'webAddr',
    component: 'Input',
    label: '网页地址',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'title',
    component: 'Input',
    label: '中文标题',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'newsOrgId',
    component: 'Input',
    label: '媒体机构',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'keyword',
    component: 'ApiSelect',
    label: '关键词',
    colProps: {
      span: 16,
    },
    itemProps: {
      wrapperCol: { span: 18 },
    },
    componentProps: {
      api: infoLabelCombox,
      labelField: 'name',
      valueField: 'id',
      params: { type: '52055-10' },
      mode: 'multiple',
    },
  },
  {
    field: 'content',
    component: 'Input',
    label: '正文',
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
      wrapperCol: { span: 20 },
    },
  },
];
