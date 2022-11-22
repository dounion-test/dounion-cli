import { h } from 'vue';
import { FormSchema } from '/@/components/Form/index';
import { infoDocCombox } from '/@/api/doInfo/index';
import { Tinymce } from '/@/components/Tinymce/index';
import { uploadApi } from '/@/api/sys/upload';
export const jigou: FormSchema[] = [
  {
    field: 'code',
    component: 'Input',
    label: '机构编号',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
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
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'name',
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
    field: 'standName',
    component: 'Input',
    label: '规范名称',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
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
    field: 'deptName',
    component: 'Input',
    label: '部门',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'isShow',
    component: 'RadioGroup',
    label: '在综合信息显示',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
    defaultValue: '0',
    componentProps: {
      options: [
        {
          label: '是',
          value: '1',
        },
        {
          label: '否',
          value: '0',
        },
      ],
    },
  },
  {
    field: 'contentEn',
    component: 'Input',
    label: '机构简介（英文）',
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
      wrapperCol: { span: 21, xxl: 12 },
    },
  },
  {
    field: 'content',
    component: 'Input',
    label: '机构简介（中文）',
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
      wrapperCol: { span: 21, xxl: 12 },
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
