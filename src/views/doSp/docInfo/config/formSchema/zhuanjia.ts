import { h } from 'vue';
import { FormSchema } from '/@/components/Form/index';
import { infoDocCombox } from '/@/api/doInfo/index';
import { Tinymce } from '/@/components/Tinymce/index';
import { ucenterCodeCombox } from '/@/api/common/index';
import { uploadApi } from '/@/api/sys/upload';
export const zhuanjia: FormSchema[] = [
  {
    field: 'code',
    component: 'Input',
    label: '专家编号',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  // {
  //   field: 'specType',
  //   component: 'ApiSelect',
  //   label: '专家类型',
  //   colProps: {
  //     span: 8,
  //   },
  //   itemProps: {
  //     wrapperCol: { span: 15, xxl: 12 },
  //   },
  //   componentProps: {
  //     api: ucenterCodeCombox,
  //     params: {
  //       type: '10001-52054',
  //     },
  //     resultField: 'list',
  //     labelField: 'name',
  //     valueField: 'value',
  //   },
  // },
  {
    field: 'rescDirection',
    component: 'Input',
    label: '研究方向',
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
    label: '姓名',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
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
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'firstOrg',
    component: 'ApiSelect',
    label: '一级机构',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
    componentProps: {
      api: infoDocCombox,
      labelField: 'name',
      valueField: 'id',
      params: { docType: '机构' },
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
    field: 'unitLocation',
    component: 'Input',
    label: '单位所在地区',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
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
    field: 'docNum',
    component: 'Input',
    label: '发文数量',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
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
      wrapperCol: { span: 15, xxl: 12 },
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
      wrapperCol: { span: 15, xxl: 12 },
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
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'rank',
    component: 'Input',
    label: '职称',
    colProps: {
      span: 8,
    },
    itemProps: {
      wrapperCol: { span: 15, xxl: 12 },
    },
  },
  {
    field: 'position',
    component: 'Input',
    label: '职务',
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
    label: '专家简介（英文）',
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
    label: '专家简介（中文）',
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
