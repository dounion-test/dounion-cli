import { h } from 'vue';
import { FormSchema } from '/@/components/Form/index';
import { infoDocCombox } from '/@/api/doInfo/index';
import { Tinymce } from '/@/components/Tinymce/index';
import { ucenterCodeCombox } from '/@/api/common/index';
export const zhuanjia: FormSchema[] = [
  {
    field: 'code',
    component: 'Input',
    label: '专家编号',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'rescDirection',
    component: 'Input',
    label: '研究方向',
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
    label: '姓名',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'eduExperience',
    component: 'Input',
    label: '教育经历',
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
    label: '一级机构',
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
    field: 'unitLocation',
    component: 'Input',
    label: '单位所在地区',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'specProvince',
    component: 'Input',
    label: '作者省份',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
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
    field: 'docNum',
    component: 'Input',
    label: '发文数量',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'sex',
    component: 'ApiSelect',
    label: '性别',
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-10004',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'degree',
    component: 'ApiSelect',
    label: '学位',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-70018',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
  },
  {
    field: 'birthYm',
    component: 'DatePicker',
    label: '出生年月',
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
    field: 'rank',
    component: 'ApiSelect',
    label: '职称',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-52052',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
  },
  {
    field: 'position',
    component: 'ApiSelect',
    label: '职务',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-52051',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
  },
  {
    field: 'expertContent',
    component: 'Input',
    label: '专家简介',
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
      wrapperCol: { span: 16, xxl: 16 },
    },
  },
];
