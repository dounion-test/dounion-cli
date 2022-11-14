/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-22 10:00:28
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-25 14:20:11
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Table';
import vPinyin from '/@/utils/v-py.js';
import { ucenterCodeCombox } from '/@/api/common';

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    required: true,
    componentProps: ({ formActionType }) => {
      return {
        onChange: (e: any) => {
          const { setFieldsValue, getFieldsValue } = formActionType;
          const code: any = vPinyin.chineseToPinYin(e.target.value);
          const data: any = getFieldsValue();
          let value: any = undefined;
          if (code && data.type) {
            const type = data.type.split('-')[1];
            value = `${type}-${code}`;
          }
          setFieldsValue({ code, value });
        },
      };
    },
  },
  {
    field: 'type',
    component: 'ApiSelect',
    label: '类别',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    componentProps: ({ formActionType }) => {
      return {
        api: ucenterCodeCombox,
        params: {
          typeQueryIsNull: 1,
        },
        resultField: 'list',
        labelField: 'name',
        valueField: 'value',
        onChange: (e: any) => {
          const { setFieldsValue, getFieldsValue } = formActionType;
          const data: any = getFieldsValue();
          let value: any = undefined;
          if (e && data.code) {
            const type = e.split('-')[1];
            value = `${type}-${data.code}`;
          }
          setFieldsValue({ value });
        },
      };
    },
    rules: [{ required: true, message: '类别', trigger: 'blur' }],
  },
  {
    field: 'code',
    component: 'Input',
    label: '代码',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    componentProps: ({ formActionType }) => {
      return {
        onChange: (e: any) => {
          const { setFieldsValue, getFieldsValue } = formActionType;
          const data: any = getFieldsValue();
          let value: any = undefined;
          if (e.target.value && data.type) {
            const type = data.type.split('-')[1];
            value = `${type}-${e.target.value}`;
          }
          setFieldsValue({ value });
        },
      };
    },
    required: true,
  },
  {
    field: 'value',
    component: 'Input',
    label: '代码值',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    dynamicDisabled: () => {
      return true;
    },
  },
  {
    field: 'sname',
    component: 'Input',
    label: '简称',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
  },
  {
    field: 'ename',
    component: 'Input',
    label: '英文名称',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
  },
  {
    field: 'orderNo',
    component: 'Input',
    label: '顺序号',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
  },
  {
    field: 'isSys',
    component: 'RadioGroup',
    label: '系统/用户',
    labelWidth: 60,
    defaultValue: 0,
    colProps: {
      span: 16,
    },
    componentProps: {
      options: [
        {
          label: '系统',
          value: 1,
        },
        {
          label: '用户',
          value: 0,
        },
      ],
    },
    dynamicDisabled: () => {
      return true;
    },
  },
];
