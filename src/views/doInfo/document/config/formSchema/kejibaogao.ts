import { FormSchema } from '/@/components/Form/index';
import { infoDocCombox, infoLabelCombox } from '/@/api/doInfo/index';
import { Tinymce } from '/@/components/Tinymce/index';
import { h } from 'vue';

export const kejibaogao: FormSchema[] = [
  {
    field: 'code',
    component: 'Input',
    label: '报告编号',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'articleType',
    component: 'ApiSelect',
    label: '文章类型',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'titleEn',
    component: 'Input',
    label: '英文标题',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'webAddr',
    component: 'Input',
    label: '信息源网址',
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
    field: 'country',
    component: 'Input',
    label: '信息源国家',
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
    field: 'city',
    component: 'Input',
    label: '信息源城市',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'expertIds',
    component: 'ApiSelect',
    label: '专家',
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
      params: { docType: '专家', specTypeQueryIn: 2 },
    },
  },
  {
    field: 'pulishTime',
    component: 'DatePicker',
    label: '发布时间',
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
    label: '机构',
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
      params: { docType: '机构' },
    },
  },
  {
    field: 'labelEn',
    component: 'Input',
    label: '英文标签',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'label',
    component: 'Input',
    label: '中文标签',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'abstractEn',
    component: 'InputTextArea',
    label: '英文摘要',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
    componentProps: {
      showCount: true,
      maxlength: '100',
    },
  },
  {
    field: 'abstractCn',
    component: 'InputTextArea',
    label: '中文摘要',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
    componentProps: {
      showCount: true,
      maxlength: '100',
    },
  },
  {
    field: 'keyword',
    component: 'ApiSelect',
    label: '关键词',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 12 },
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
    field: 'sciEnContent',
    component: 'Input',
    label: '英文正文',
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
  {
    field: 'sciContent',
    component: 'Input',
    label: '中文正文',
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
