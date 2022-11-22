import { FormSchema } from '/@/components/Form/index';
import { infoLabelCombox } from '/@/api/doInfo/index';
import { uploadApi } from '/@/api/sys/upload';
export const jijinxiangmu: FormSchema[] = [
  {
    field: 'code',
    component: 'Input',
    label: '基金编号',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
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
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'arear',
    show: false,
    component: 'Input',
    label: '国家地区',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'country',
    component: 'InputGroup',
    label: '国家地区',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },

    slot: 'country',
  },
  {
    field: 'applyCode',
    component: 'Input',
    label: '申请号',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'applyDate',
    component: 'DatePicker',
    label: '申请日期',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'publicCountryCode',
    component: 'Input',
    label: '地区代码',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'publicIdentifyCode',
    component: 'Input',
    label: '专利识别代码',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
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
      wrapperCol: { span: 15, xxl: 12 },
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
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'fundStatus',
    component: 'Input',
    label: '状态',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
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
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  // {
  //   field: 'cost',
  //   component: 'Input',
  //   label: '费用',
  //   colProps: {
  //     span: 8,
  //   },
  //   itemProps: {
  //     wrapperCol: { span: 15, xxl: 12 },
  //   },
  //   suffix: '万元（￥）',
  //   componentProps: { type: 'number' },
  // },
  {
    field: 'cost',
    component: 'Input',
    label: '费用',
    slot: 'cost',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'authorWithAff',
    component: 'Input',
    label: '发明人',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'title',
    component: 'Input',
    label: '标题',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
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
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'inputOrg',
    component: 'Input',
    label: '机构名称',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'keyword',
    component: 'ApiSelect',
    label: '中文关键词',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 21, xxl: 12 },
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
    field: 'abstractCn',
    component: 'InputTextArea',
    label: '摘要',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 21, xxl: 12 },
    },
    componentProps: {
      row: 10,
      showCount: true,
      maxlength: '1000',
    },
  },
  {
    field: 'originalAttachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 21, xxl: 12 },
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '52030-20',
      },
    },
  },
];
