import { FormSchema } from '/@/components/Form/index';
import { infoDocCombox, infoLabelCombox } from '/@/api/doInfo/index';
import { uploadApi } from '/@/api/sys/upload';
export const qikan: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '中文刊名',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'jumpPage',
    component: 'Input',
    label: '跳转页',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'nameEn',
    component: 'Input',
    label: '英文刊名',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'pagecount',
    component: 'Input',
    label: '总页数',
    componentProps: {
      type: 'number',
    },
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
    label: '中文标题',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'recordTime',
    component: 'DatePicker',
    label: '收录时间',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
    componentProps: {
      picker: 'year',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
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
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'webAddr',
    component: 'Input',
    label: '全文地址',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'author',
    component: 'Input',
    label: '作者',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
    // componentProps: {
    //   api: infoDocCombox,
    //   labelField: 'name',
    //   valueField: 'id',
    //   params: { specTypeQueryIn: 1, docType: '专家' },
    // },
  },
  {
    field: 'cnnoNumber',
    component: 'Input',
    label: 'cnno号',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'issnNumber',
    component: 'Input',
    label: 'issn号',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'year',
    component: 'DatePicker',
    label: '年',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
    componentProps: {
      picker: 'year',
      format: 'YYYY',
      valueFormat: 'YYYY',
    },
  },
  {
    field: 'fund',
    component: 'Input',
    label: '基金',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'volume',
    component: 'Input',
    label: '卷',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'firstAuthor',
    component: 'Input',
    label: '第一作者',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
    // componentProps: {
    //   api: infoDocCombox,
    //   labelField: 'name',
    //   valueField: 'id',
    //   params: { specTypeQueryIn: 1, docType: '专家' },
    // },
  },
  {
    field: 'phase',
    component: 'Input',
    label: '期',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'doi',
    component: 'Input',
    label: 'DOI',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'sourceMedia',
    component: 'Input',
    label: '来源媒体',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'authorWithAff',
    component: 'Input',
    label: '带归属机构的作者',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
    // componentProps: {
    //   api: infoDocCombox,
    //   labelField: 'name',
    //   valueField: 'id',
    //   params: { specTypeQueryIn: 1, docType: '机构' },
    // },
  },
  {
    field: 'docLanguage',
    component: 'Input',
    label: '文献语言',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'pubmedId',
    component: 'Input',
    label: 'PubMed ID',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'orgIds',
    component: 'ApiSelect',
    label: '机构',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 13, xxl: 12 },
    },
    componentProps: {
      api: infoDocCombox,
      labelField: 'name',
      valueField: 'id',
      params: { docType: '机构' },
      mode: 'multiple',
    },
  },
  {
    field: 'expertIds',
    component: 'ApiSelect',
    label: '专家',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 13, xxl: 12 },
    },
    componentProps: {
      api: infoDocCombox,
      labelField: 'name',
      valueField: 'id',
      params: { docType: '专家' },
      mode: 'multiple',
    },
  },
  {
    field: 'keywordEn',
    component: 'ApiSelect',
    label: '英文关键词',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 13, xxl: 12 },
    },
    componentProps: {
      api: infoLabelCombox,
      labelField: 'name',
      valueField: 'id',
      params: { type: '52055-20' },
      mode: 'multiple',
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
      wrapperCol: { span: 13, xxl: 12 },
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
      wrapperCol: { span: 13, xxl: 12 },
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
