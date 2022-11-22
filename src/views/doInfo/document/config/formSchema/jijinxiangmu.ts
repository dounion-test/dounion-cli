import { FormSchema } from '/@/components/Form/index';
export const jijinxiangmu: FormSchema[] = [
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
    field: 'webAddr',
    component: 'Input',
    label: '网页链接',
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
    label: '区域',
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
    label: '区域',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'passDate',
    component: 'DatePicker',
    label: '通过日期',
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
    field: 'fundStatus',
    component: 'DatePicker',
    label: '状态',
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
    field: 'endDate',
    component: 'DatePicker',
    label: '结束日期',
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
    field: 'name',
    component: 'Input',
    label: '项目名称',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '费用',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
    suffix: '万元（￥）',
  },
  {
    field: 'title',
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
    field: 'sourceFundName',
    component: 'Input',
    label: '来源基金名称',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'abstractCn',
    component: 'InputTextArea',
    label: '摘要',
    colProps: {
      span: 8,
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
    component: 'Input',
    label: '中文关键词',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
];
