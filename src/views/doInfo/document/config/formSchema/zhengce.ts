import { FormSchema } from '/@/components/Form/index';
import { infoDocCombox, infoLabelCombox } from '/@/api/doInfo/index';
import { Tinymce } from '/@/components/Tinymce/index';
import { h } from 'vue';

export const zhengce: FormSchema[] = [
  {
    field: 'code',
    component: 'Input',
    label: '政策法规编号',
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
    label: '来源网站',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'publishCompany',
    component: 'Input',
    label: '发布单位',
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
    label: '来源网站链接',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'country',
    component: 'InputGroup',
    label: '国家地区',
    colProps: {
      span: 16,
    },

    slot: 'country',
  },
  {
    field: 'arear',
    component: 'Input',
    label: '',
    show: false,
    itemProps: {
      wrapperCol: { span: 7, xxl: 7 },
    },
  },
  {
    field: 'country',
    component: 'Input',
    label: '标题',
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
    label: '政策法规名称',
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
    field: 'policyType',
    component: 'ApiSelect',
    label: '类型',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'reviseTime',
    component: 'DatePicker',
    label: '修订时间',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'implTime',
    component: 'DatePicker',
    label: '实施时间',
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
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
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
    label: '文摘',
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
    field: 'sciContent',
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