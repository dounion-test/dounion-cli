/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 15:47:40
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-24 14:11:12
 * @FilePath: /rural-revitalization/src/views/doOp/task/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Form/index';
import { ucenterCodeCombox } from '/@/api/common/index';
import { domesOpOrgTreeApi } from '/@/api/doOp/person';

// 遍历树型结构数组
const flatten = (arr) => {
  for (const item of arr) {
    if (item.children && Array.isArray(item.children)) {
      item.oldId = item.id;
      item.id = item.parentId ? `${item.parentId}-${item.id}` : `${item.id}`;
      if (item.children.length > 0) {
        item.disabled = true;
      }
      item.children.forEach((it) => {
        it.parentId = item.id;
      });
      flatten(item.children);
    }
  }
};

export const schemas: FormSchema[] = [
  {
    field: 'account',
    component: 'Input',
    label: '用户账号',
    required: true,
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 8, xxl: 5 },
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: '用户名称',
    required: true,
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 8, xxl: 5 },
    },
  },
  {
    field: 'executiveLevel',
    component: 'ApiSelect',
    label: '行政级别',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 8, xxl: 5 },
    },
    componentProps: ({ formActionType }) => {
      return {
        api: ucenterCodeCombox,
        params: {
          type: '10001-52048',
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
        onChange: async (e: any) => {
          const { updateSchema, setFieldsValue } = formActionType;
          setFieldsValue({ viewIds: undefined });
          if (e) {
            updateSchema({
              field: 'viewIds',
              component: 'TreeSelect',
              componentProps: {
                loading: true,
                treeData: [],
                labelInValue: true,
                treeDefaultExpandedKeys: ['1'],
              },
            });
            const res = await domesOpOrgTreeApi({ executiveLevelQuery: e });
            await flatten(res);
            updateSchema({
              field: 'viewIds',
              component: 'TreeSelect',
              componentProps: {
                loading: false,
                treeData: res,
                showSearch: true,
                labelInvalue: true,
                treeNodeFilterProp: 'nodeName',
                fieldNames: { key: 'id', label: 'nodeName', value: 'id' },
                treeDefaultExpandedKeys: ['1'],
              },
            });
          } else {
            updateSchema({
              field: 'viewIds',
              component: 'TreeSelect',
              componentProps: {
                treeData: [],
                labelInValue: true,
                treeDefaultExpandedKeys: ['1'],
              },
            });
          }
        },
      };
    },
    rules: [
      {
        required: true,
        validator: async (_rule, value) => {
          if (!value) {
            return Promise.reject('行政级别');
          }
        },
        trigger: 'change',
      },
    ],
  },
  {
    field: 'viewIds',
    component: 'TreeSelect',
    label: '行政区域',
    required: true,
    componentProps: {
      labelInvalue: true,
      treeDefaultExpandedKeys: ['1'],
    },
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 8, xxl: 5 },
    },
  },
  {
    field: 'mobile',
    component: 'Input',
    label: '手机',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 8, xxl: 5 },
    },
    rules: [
      {
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.resolve();
          }
          const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
          const phone = reg.test(value);
          if (!phone) {
            /* eslint-disable-next-line */
            return Promise.reject('手机号码格式错误');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'businessType',
    component: 'ApiSelect',
    label: '经营主体类型',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 8, xxl: 5 },
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-52049',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
  },
  {
    field: 'businessName',
    component: 'Input',
    label: '经营主体名称',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 8, xxl: 5 },
    },
  },
  {
    field: 'isBusinessAcct',
    component: 'RadioGroup',
    label: '经营主体账号',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 8, xxl: 5 },
    },
    componentProps: {
      options: [
        {
          label: '是',
          value: 1,
        },
        {
          label: '否',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'isMonitorUser',
    component: 'RadioGroup',
    label: '示范村动态监测用户',
    colProps: {
      span: 24,
    },
    itemProps: {
      wrapperCol: { span: 8, xxl: 5 },
    },
    componentProps: {
      options: [
        {
          label: '是',
          value: 1,
        },
        {
          label: '否',
          value: 0,
        },
      ],
    },
  },
];

export const treeSchemas: FormSchema[] = [
  {
    field: 'parentId',
    component: 'ApiTreeSelect',
    label: '行政机构',
    required: true,
    colProps: {
      span: 20,
    },
    componentProps: {
      api: domesOpOrgTreeApi,
      params: {
        executiveLevelQuery: '52048-30',
      },
      showSearch: true,
      treeNodeFilterProp: 'nodeName',
      fieldNames: { key: 'id', label: 'nodeName', value: 'id' },
    },
  },
  {
    field: 'nodeName',
    component: 'Input',
    label: '结构名称',
    required: true,
    colProps: {
      span: 20,
    },
  },
  {
    field: 'nodeCode',
    component: 'Input',
    label: '结构编码',
    required: true,
    colProps: {
      span: 20,
    },
  },
  {
    field: 'executiveLevel',
    component: 'ApiSelect',
    label: '行政级别',
    colProps: {
      span: 20,
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-52048',
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
            return Promise.reject('行政级别');
          }
        },
        trigger: 'change',
      },
    ],
    required: true,
  },
  {
    field: 'note',
    component: 'InputTextArea',
    label: '备注说明',
    componentProps: {
      showCount: true,
      maxlength: '100',
    },
    colProps: {
      span: 20,
    },
  },
];
