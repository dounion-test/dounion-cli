import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Form/index';
import { ucenterCodeCombox } from '/@/api/common/index';
import { DescItem } from '/@/components/Description/index';
import { ucenterPositionComboxApi } from '/@/api/testDemo/person';

export const organizeColumns: BasicColumn[] = [
  {
    title: '组织名称',
    dataIndex: 'cname',
    width: 160,
    align: 'left',
  },
  {
    title: '是否主组织',
    dataIndex: 'mainOrganization',
    width: 60,
    align: 'left',
    slots: { customRender: 'mainOrganization' },
  },
  {
    title: '主要负责人',
    dataIndex: 'cadre',
    width: 60,
    align: 'left',
    flag: 'CHECKBOX',
    slots: { customRender: 'cadre' },
  },
  {
    title: '操作',
    dataIndex: 'operate',
    width: 60,
    align: 'left',
    slots: { customRender: 'operate' },
  },
];

export const roleColumns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 160,
    align: 'left',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    width: 60,
    align: 'left',
    slots: { customRender: 'operate' },
  },
];

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '姓名',
    colProps: {
      span: 12,
    },
    required: true,
  },
  {
    field: 'account',
    component: 'Input',
    label: '账号',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'sex',
    component: 'ApiRadioGroup',
    label: '性别',
    colProps: {
      span: 12,
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
  },
  {
    field: 'billNo',
    component: 'Input',
    label: '工号',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'birthday',
    component: 'DatePicker',
    label: '出生日期',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'marriage',
    component: 'ApiSelect',
    label: '婚姻状况',
    colProps: {
      span: 12,
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-10005',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
  },
  {
    field: 'nation',
    component: 'ApiSelect',
    label: '民族',
    colProps: {
      span: 12,
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
    field: 'mobile',
    component: 'Input',
    label: '手机',
    colProps: {
      span: 12,
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
  },
  {
    field: 'telephone',
    component: 'Input',
    label: '电话',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: {
      span: 12,
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
    field: 'posId',
    component: 'ApiSelect',
    label: '职务',
    colProps: {
      span: 12,
    },
    componentProps: {
      api: ucenterPositionComboxApi,
      resultField: 'list',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'posLevel',
    component: 'ApiSelect',
    label: '职级',
    colProps: {
      span: 12,
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-70004',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
  },
  {
    field: 'political',
    component: 'ApiSelect',
    label: '政治面貌',
    colProps: {
      span: 12,
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
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      showCount: true,
      maxlength: '100',
    },
    colProps: {
      span: 24,
    },
  },
];

export const schemasOther: FormSchema[] = [
  {
    field: 'partyId',
    component: 'ApiSelect',
    label: '党支部名称',
    colProps: {
      span: 12,
    },
    slot: 'remoteSearch',
  },
  {
    field: 'graduateSchool',
    component: 'Input',
    label: '毕业院校',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'education',
    component: 'ApiSelect',
    label: '学历',
    colProps: {
      span: 12,
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
    field: 'degree',
    component: 'ApiSelect',
    label: '学位',
    colProps: {
      span: 12,
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
    field: 'graduateTime',
    component: 'DatePicker',
    label: '毕业时间',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'major',
    component: 'Input',
    label: '专业',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'joinPartyDate',
    component: 'DatePicker',
    label: '入党日期',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'beginWorkTime',
    component: 'DatePicker',
    label: '参加工作时间',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'workTime',
    component: 'DatePicker',
    label: '入职日期',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'imsiNo',
    component: 'Input',
    label: 'IMSI号码',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'imeiNo',
    component: 'Input',
    label: 'IMEI号码',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'zipcode',
    component: 'Input',
    label: '邮编',
    colProps: {
      span: 12,
    },
  },
  {
    field: 'address',
    component: 'Input',
    label: '家庭地址',
    colProps: {
      span: 24,
    },
  },
];

export const basicDetailSchema: DescItem[] = [
  {
    field: 'name',
    label: '姓名',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'account',
    label: '账号',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'sexName',
    label: '性别',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'billNo',
    label: '工号',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'birthday',
    label: '出生日期',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'marriageName',
    label: '婚姻状况',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'nationName',
    label: '民族',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'mobile',
    label: '手机',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'telephone',
    label: '电话',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'email',
    label: '邮箱',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'posName',
    label: '职务',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'posLevelName',
    label: '职级',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'politicalName',
    label: '政治面貌',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'remark',
    label: '备注',
    render: (val) => {
      return val ? val : '-';
    },
  },
];

export const postDetailSchema: DescItem[] = [
  {
    field: 'orgIdsName',
    label: '所属单位',
    render: (val) => {
      return val ? val : '-';
    },
  },
];

export const otherDetailSchema: DescItem[] = [
  {
    field: 'graduateSchool',
    label: '毕业院校',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'educationName',
    label: '学历',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'degreeName',
    label: '学位',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'graduateTime',
    label: '毕业时间',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'major',
    label: '专业',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'joinPartyDate',
    label: '入党日期',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'beginWorkTime',
    label: '参加工作时间',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'workTime',
    label: '入职日期',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'imsiNo',
    label: 'IMSI号码',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'imeiNo',
    label: 'IMEI号码',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'manageFuncName',
    label: '监管范围',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'zipcode',
    label: '邮编',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'address',
    label: '家庭地址',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'createByName',
    label: '创建人',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'createTime',
    label: '创建时间',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'updateByName',
    label: '修改人',
    render: (val) => {
      return val ? val : '-';
    },
  },
  {
    field: 'updateTime',
    label: '修改时间',
    render: (val) => {
      return val ? val : '-';
    },
  },
];

export interface stateInterface {
  roleIds: any[] | undefined;
  ucenterPersonOrgs: any[];
  organizeKeys: any[];
  backfillOrgs: any[];
  roleKeys: any[];
  btnLoading: boolean;
  ucenterPersonOrgsStatsu: boolean;
  editRes: object;
  basicFormObj: object;
  otherFormObj: object;
  fillbackImgObj: object;
}
