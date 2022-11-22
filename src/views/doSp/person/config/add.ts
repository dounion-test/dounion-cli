/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-09 15:07:06
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 11:49:33
 * @FilePath: /rural-revitalization/src/views/expstore/expert/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { uploadApi } from '/@/api/sys/upload';
import { FormSchema } from '/@/components/Form/index';
import { BasicColumn } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';
import { GetBirthday } from '/@/utils/index';

import { Tinymce } from '/@/components/Tinymce/index';
import { domesOpPersonAllPersonTreeApi } from '/@/api/doOp/person';
import { h } from 'vue';
export const FORM_ORDER = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
const flatten = (arr) => {
  for (const item of arr) {
    item.id = item.key;
    item.disabled = true;
    item.name = item.deptName;
    item.children.forEach((it) => {
      it.id = it.personId;
    });
  }
  return arr;
};

export const schemasOne: FormSchema[] = [
  {
    field: 'account',
    component: 'Input',
    label: '账号',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    required: true,
    dynamicDisabled: ({ values }) => {
      return values.isEdit;
    },
  },
  {
    field: 'isEdit',
    component: 'Input',
    label: '是否编辑',
    show: false,
  },
  {
    field: 'mobile',
    component: 'Input',
    label: '手机号',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('请输入手机号');
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
    dynamicDisabled: ({ values }) => {
      return values.isEdit ? true : false;
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '中文名',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    required: true,
  },
  {
    field: 'isWork',
    component: 'Select',
    label: '工作状态',
    componentProps: {
      options: [
        {
          label: '在职',
          value: 1,
          key: 1,
        },
        {
          label: '离职',
          value: 0,
          key: 0,
        },
      ],
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    required: true,
  },
  {
    field: 'sex',
    component: 'ApiRadioGroup',
    label: '性别',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-10004',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
    rules: [
      {
        required: true,
        validator: async (_rule, value) => {
          if (!value) {
            return Promise.reject('请选择性别');
          }
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'nature',
    component: 'Input',
    label: '专家类型',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 13, xxl: 11 },
    },
    rules: [
      {
        required: true,
        validator: async (_rule, value) => {
          if (!value) {
            return Promise.reject('请选择完整的专家类型');
          }
        },
        trigger: 'change',
      },
    ],
    slot: 'nature',
  },
  {
    field: 'companyName',
    component: 'Input',
    label: '工作单位',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    required: true,
  },
  {
    field: 'spNumber',
    component: 'Input',
    label: '专家编码',
    colProps: {
      span: 12,
    },
    componentProps: {
      maxLength: 4,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    rules: [
      {
        validator: async (_, value) => {
          if (value) {
            if (value.length < 4) {
              return Promise.reject('输入的编码小于11位');
            }
            if (value.length == 4) {
              const isNumber = /^[+-]?\d*(\.\d*)?(e[+-]?\d+)?$/;
              if (!isNumber.test(value)) {
                return Promise.reject('最后四位请输入整数');
              }
            }
            return Promise.resolve();
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
    slot: 'spNumber',
  },
  {
    field: 'jobTitleId',
    component: 'ApiSelect',
    label: '技术职称',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 20, xxl: 11 },
    },
    slot: 'jobTitle',
  },
  {
    field: 'political',
    component: 'ApiSelect',
    label: '政治面貌',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-52059',
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
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 20, xxl: 11 },
    },
    slot: 'position',
  },
  {
    field: 'nation',
    component: 'ApiSelect',
    label: '民族',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-70015',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
  },
  {
    field: 'idNo',
    component: 'Input',
    label: '身份证号码',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    rules: [
      {
        required: false,
        // @ts-ignore
        validator: async (rule, value) => {
          if (value) {
            /* eslint-disable-next-line */
            const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            const idNo = reg.test(value);
            if (!idNo) {
              /* eslint-disable-next-line */
              return Promise.reject('请填写正确的身份证号码');
            }
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
    componentProps: ({ formActionType }) => {
      return {
        onChange: (e: any) => {
          const { setFieldsValue } = formActionType;
          const time = GetBirthday(e.target.value);
          if (time) {
            setFieldsValue({ birthday: time });
          }
        },
      };
    },
  },
  {
    field: 'email',
    component: 'Input',
    label: '电子邮件',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    rules: [
      {
        required: false,
        // @ts-ignore
        validator: async (rule, value) => {
          if (value) {
            /* eslint-disable-next-line */
            const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-z]+([-.][a-z]+)*$/;
            const email = reg.test(value);
            if (!email) {
              /* eslint-disable-next-line */
              return Promise.reject('邮箱格式如:admin@163.com');
            }
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'birthday',
    component: 'DatePicker',
    label: '出生日期',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
  },

  // {
  //   field: 'provinceCityCounty',
  //   component: 'Input',
  //   label: '省市区',
  //   colProps: {
  //     span: 12,
  //   },
  //   itemProps: {
  //     wrapperCol: { span: 12, xxl: 8 },
  //   },
  //   slot: 'provinceCityCounty',
  // },
  // {
  //   field: 'address',
  //   component: 'Input',
  //   label: '详细地址',
  //   colProps: {
  //     span: 12,
  //   },
  //   itemProps: {
  //     wrapperCol: { span: 12, xxl: 8 },
  //   },
  // },
  // {
  //   field: 'zipCode',
  //   component: 'Input',
  //   label: '邮政编码',
  //   colProps: {
  //     span: 12,
  //   },
  //   itemProps: {
  //     wrapperCol: { span: 12, xxl: 8 },
  //   },
  //   rules: [
  //     {
  //       required: false,
  //       // @ts-ignore
  //       validator: async (rule, value) => {
  //         if (value) {
  //           /* eslint-disable-next-line */
  //           const reg = /^[0-9]\d{5}$/;
  //           const zipCode = reg.test(value);
  //           if (!zipCode) {
  //             /* eslint-disable-next-line */
  //             return Promise.reject('请输入正确的邮政编码');
  //           }
  //         }
  //         return Promise.resolve();
  //       },
  //       trigger: 'change',
  //     },
  //   ],
  // },

  {
    field: 'bankName',
    component: 'Input',
    label: '开户行',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
  },
  {
    field: 'education',
    component: 'ApiSelect',
    label: '学历',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-10006',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
  },
  {
    field: 'bankNo',
    component: 'Input',
    label: '银行账号',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
  },
  {
    field: 'school',
    component: 'Input',
    label: '毕业院校',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    slot: 'school',
  },
  {
    field: 'pictures',
    component: 'Input',
    label: '图册照片',
    colProps: {
      span: 24,
    },
    slot: 'pictures',
  },
];

export const schemasContactOne: FormSchema[] = [
  {
    field: 'provinceCityCounty',
    component: 'Input',
    label: '省市区',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 20, xxl: 12 },
    },
    slot: 'provinceCityCounty',
  },
  {
    field: 'zipCode',
    component: 'Input',
    label: '邮政编码',
    colProps: {
      span: 12,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 8 },
    },
    rules: [
      {
        required: false,
        // @ts-ignore
        validator: async (rule, value) => {
          if (value) {
            /* eslint-disable-next-line */
            const reg = /^[0-9]\d{5}$/;
            const zipCode = reg.test(value);
            if (!zipCode) {
              /* eslint-disable-next-line */
              return Promise.reject('请输入正确的邮政编码');
            }
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
  },
];

export const schemasTwo: FormSchema[] = [
  {
    field: 'eduDetailList',
    component: 'InputTextArea',
    label: '教育经历',
    componentProps: {
      rows: 6,
      showCount: true,
      maxlength: '100',
    },

    colProps: {
      span: 24,
    },
    slot: 'eduDetailList',
  },
  {
    field: 'workDetailList',
    component: 'InputTextArea',
    label: '工作经历',
    componentProps: {
      rows: 6,
      showCount: true,
      maxlength: '100',
    },

    colProps: {
      span: 24,
    },
    slot: 'workDetailList',
  },
  {
    field: 'socialDetailList',
    component: 'InputTextArea',
    label: '社会兼职',
    componentProps: {
      rows: 6,
      showCount: true,
      maxlength: '100',
    },
    colProps: {
      span: 24,
    },
    slot: 'socialDetailList',
  },
];

export const schemasThree: FormSchema[] = [
  {
    field: 'researchFieldList',
    component: 'InputTextArea',
    label: '研究领域或行业领域',
    componentProps: {
      rows: 6,
      showCount: true,
      maxlength: '100',
    },
    colProps: {
      span: 24,
    },
    slot: 'researchFieldList',
  },
  {
    field: 'marks',
    component: 'InputTextArea',
    label: '专家所属领域',
    componentProps: {
      rows: 6,
      showCount: true,
      maxlength: '100',
    },
    colProps: {
      span: 24,
    },
    slot: 'marks',
  },
  {
    field: 'subjectList',
    component: 'InputTextArea',
    label: '近年来承担的课题/项目',
    componentProps: {
      rows: 6,
      showCount: true,
      maxlength: '100',
    },
    colProps: {
      span: 24,
    },
    slot: 'subjectList',
  },
];

export const schemasFour: FormSchema[] = [
  {
    field: 'sciAchieveList',
    component: 'InputTextArea',
    label: '学术成果',
    componentProps: {
      rows: 6,
      showCount: true,
      maxlength: '100',
    },
    colProps: {
      span: 24,
    },
    slot: 'sciAchieveList',
  },
  {
    field: 'attachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 24,
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '52030-10',
      },
    },
  },
];

export const schemasFive: FormSchema[] = [
  {
    field: 'pictures',
    component: 'Input',
    label: '图册照片',
    colProps: {
      span: 19,
    },
    slot: 'pictures',
  },
  {
    field: 'attachments',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 19,
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '52030-10',
      },
    },
  },
];

export const emailSchemas: FormSchema[] = [
  {
    field: 'receiveIds',
    component: 'ApiTreeSelect',
    label: '收件人',
    componentProps: {
      api: domesOpPersonAllPersonTreeApi,
      labelInValue: true,
      fieldNames: { key: 'id', label: 'name', value: 'id' },
      showSearch: true,
      treeNodeFilterProp: 'name',
      afterFetch: flatten,
      multiple: true,
    },
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'copyIds',
    component: 'ApiTreeSelect',
    label: '抄送人',
    componentProps: {
      api: domesOpPersonAllPersonTreeApi,
      labelInValue: true,
      fieldNames: { key: 'id', label: 'name', value: 'id' },
      showSearch: true,
      treeNodeFilterProp: 'name',
      afterFetch: flatten,
      multiple: true,
    },
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 12, xxl: 12 },
    },
  },
  {
    field: 'topic',
    component: 'Input',
    label: '主题',
    colProps: {
      span: 22,
    },
    required: true,
  },
  {
    field: 'content',
    component: 'Input',
    label: '内容',
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
      span: 22,
    },
  },
  {
    field: 'oaAttachment',
    component: 'Upload',
    label: '上传附件',
    colProps: {
      span: 22,
    },
    componentProps: {
      api: uploadApi,
      uploadParams: {
        groupName: '25001-80',
      },
    },
  },
  {
    field: 'letter',
    component: 'Input',
    label: '电子聘书',
    colProps: {
      span: 18,
    },
    slot: 'letter',
  },
];

export const columns: BasicColumn[] = [
  {
    title: '附件名称',
    dataIndex: 'name',
    edit: true,
    editable: true,
    align: 'left',
  },
  {
    title: '是否必备',
    dataIndex: 'isRequired',
    align: 'left',
  },
  {
    title: '查看',
    dataIndex: 'view',
    align: 'left',
    slots: { customRender: 'view' },
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'left',
    slots: { customRender: 'action' },
  },
];

export const tagList = [
  {
    label: '产业发展',
    value: 1,
    checked: false,
  },
  {
    label: '保障供给',
    value: 2,
    checked: false,
  },
  {
    label: '共同富裕',
    value: 3,
    checked: false,
  },
  {
    label: '风貌形态',
    value: 4,
    checked: false,
  },
  {
    label: '农业人才',
    value: 5,
    checked: false,
  },
  {
    label: '农村家庭',
    value: 6,
    checked: false,
  },
  {
    label: '绿色生态',
    value: 7,
    checked: false,
  },
  {
    label: '土地创新',
    value: 8,
    checked: false,
  },
  {
    label: '文化遗产',
    value: 9,
    checked: false,
  },
  {
    label: '乡村治理',
    value: 10,
    checked: false,
  },
  {
    label: '公共服务',
    value: 11,
    checked: false,
  },
  {
    label: '金融保险',
    value: 12,
    checked: false,
  },
  {
    label: '智慧农业',
    value: 13,
    checked: false,
  },
  {
    label: '双碳',
    value: 14,
    checked: false,
  },
  {
    label: '乡村文化',
    value: 16,
    checked: false,
  },
  {
    label: '集体经济',
    value: 17,
    checked: false,
  },
  {
    label: '多领域复合型',
    value: 18,
    checked: false,
  },
];
