/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 15:47:40
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-24 14:15:33
 * @FilePath: /rural-revitalization/src/views/doOp/task/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Form/index';
import { ucenterCodeCombox } from '/@/api/common/index';
import { domesOpOrgTreeApi } from '/@/api/doOp/person';

export const schemas: FormSchema[] = [
  {
    field: 'linker',
    component: 'Input',
    label: '联络人',
    required: true,
    colProps: {
      span: 20,
    },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '联系电话',
    colProps: {
      span: 20,
    },
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject('联系电话');
          }
          const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
          const phone = reg.test(value);
          if (!phone) {
            /* eslint-disable-next-line */
            return Promise.reject('联系电话格式错误');
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'orgId',
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
      treeDefaultExpandedKeys: [1],
    },
  },
  {
    field: 'job',
    component: 'ApiSelect',
    label: '岗位',
    colProps: {
      span: 20,
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-52061',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
  },
  {
    field: 'deptName',
    component: 'Input',
    label: '责任科室',
    colProps: {
      span: 20,
    },
  },
];
