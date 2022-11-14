import { getUcenterOrgTree } from '/@/api/testDemo/dept';
import { FormSchema } from '/@/components/Table';
import vPinyin from '/@/utils/v-py.js';

export const schemas: FormSchema[] = [
  {
    field: 'cname',
    component: 'Input',
    label: '名称',
    colProps: {
      span: 11,
    },
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        onChange: (e: any) => {
          formModel.city = undefined; //  reset city value
          const { setFieldsValue } = formActionType;

          setFieldsValue({
            code: vPinyin.chineseToPinYin(e.target.value),
          });
        },
      };
    },
  },
  {
    field: 'code',
    component: 'Input',
    label: '代码',
    colProps: {
      span: 11,
    },
    required: true,
  },
  {
    field: 'linkId',
    component: 'ApiTreeSelect',
    label: '联系人',
    colProps: {
      span: 11,
    },
    slot: 'linkId',
  },
  {
    field: 'parentId',
    component: 'ApiTreeSelect',
    label: '上级部门',
    componentProps: {
      api: getUcenterOrgTree,
      params: { compType: '' },
      fieldNames: { key: 'id', label: 'cname', value: 'id' },
      showSearch: true,
      treeNodeFilterProp: 'cname',
    },
    colProps: {
      span: 11,
    },
  },
  {
    field: 'telephone',
    component: 'Input',
    label: '电话',
    colProps: {
      span: 11,
    },
    rules: [
      {
        validator: async (_, value) => {
          if (!value) {
            return Promise.resolve();
          }
          const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
          if (!reg.test(value)) {
            return Promise.reject('请输入正确的手机号或者座机号');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'sname',
    component: 'Input',
    label: '简称',
    colProps: {
      span: 11,
    },
  },
  {
    field: 'fax',
    component: 'Input',
    label: '传真',
    colProps: {
      span: 11,
    },
    rules: [
      {
        validator: async (_, value) => {
          if (!value) {
            return Promise.resolve();
          }
          const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
          if (!reg.test(value)) {
            return Promise.reject('请输入正确的手机号或者座机号');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'orderNo',
    component: 'Input',
    label: '顺序号',
    colProps: {
      span: 11,
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
      span: 22,
    },
  },
];
