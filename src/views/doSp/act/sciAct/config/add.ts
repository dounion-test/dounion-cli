/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-11 10:13:05
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-27 10:50:24
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h } from 'vue';
import { Tinymce } from '/@/components/Tinymce/index';
import { FormSchema } from '/@/components/Form/index';
import { uploadApi } from '/@/api/sys/upload';
import { BasicColumn } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';

export const schemasOne: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '活动主题',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 10, xxl: 8 },
    },
    required: true,
  },
  {
    field: 'categoryType',
    component: 'ApiSelect',
    label: '活动分类',
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-52003',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 7 },
    },
    rules: [{ required: true, message: '请选择活动分类', trigger: 'blur' }],
  },
  {
    field: '[startDate, endDate]',
    label: '举办日期',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 7 },
    },
    required: true,
  },
  {
    field: 'actContent',
    component: 'Input',
    label: '活动内容',
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
      wrapperCol: { span: 20, xxl: 16 },
    },
  },

  {
    field: 'pictures',
    component: 'Input',
    label: '图册照片',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 20, xxl: 16 },
    },
    slot: 'pictures',
  },
  {
    field: 'announceAttachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 20, xxl: 16 },
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '52030-20',
      },
    },
  },
];

export const schemasTwo: FormSchema[] = [
  {
    field: 'planList',
    component: 'Input',
    label: '行程安排',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 18, xxl: 16 },
    },
    slot: 'planList',
  },
  {
    field: 'address',
    component: 'Input',
    label: '举办地址',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 10, xxl: 8 },
    },
  },
  {
    field: 'wechat',
    component: 'Input',
    label: '联系人',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '联系人电话',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    rules: [
      {
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            // return Promise.reject('请输入手机号');
            return Promise.resolve();
          }
          const reg = /(^\d{3}-\d{8}$)|(^\d{4}-\d{7,8}$)|(^\d{11}$)/;
          const phone = reg.test(value);
          if (!phone) {
            /* eslint-disable-next-line */
            return Promise.reject('请填写正确的手机号');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
];

export const columns: BasicColumn[] = [
  {
    title: '时间',
    dataIndex: 'actStime',
    width: '150px',
    slots: { customRender: 'actStime' },
  },
  {
    title: '活动安排',
    dataIndex: 'content',
    slots: { customRender: 'content' },
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '100px',
    slots: { customRender: 'action' },
  },
];

export const searchArr = [
  {
    label: '领域',
    type: 'tag',
    value: [],
    valueName: 'markIdQueryIn',
    isMultiple: true,
    border: false,
    options: [],
  },
  {
    label: '职称',
    type: 'treeTag',
    value: [],
    valueName: 'jobTitleId',
    isMultiple: false,
    border: false,
    options: [],
  },
  {
    label: '省内省外',
    type: 'tag',
    value: [],
    valueName: 'isProvinceIn',
    isMultiple: false,
    border: false,
    options: [
      {
        name: '省内',
        value: 1,
        checked: false,
      },
      {
        name: '省外',
        value: 2,
        checked: false,
      },
    ],
  },
  {
    label: '人数',
    type: 'inputNumber',
    value: 10,
    valueName: 'count',
    isMultiple: true,
    border: false,
    options: [],
  },
];
