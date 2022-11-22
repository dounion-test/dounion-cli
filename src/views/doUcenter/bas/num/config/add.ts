/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-22 10:00:28
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-26 14:30:10
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common';
import dayjs from 'dayjs';

/**
 * @description: 生成流水号
 * @param {*} prefixRule1 前缀
 * @param {*} prefixRule2 日期规则
 * @param {*} suffixLength 长度
 * @param {*} suffixStart 起始值
 * @param {*} type 判断是哪个form
 * @return {*} 流水号
 */
function computerCodeValue(prefixRule1, prefixRule2, suffixLength, suffixStart, type) {
  let preStr: any = undefined;
  let sufNum: any = suffixStart ? suffixStart.length : undefined;
  if (prefixRule1 && prefixRule2 && suffixStart) {
    let str = prefixRule2;
    str = str.replaceAll('{', '');
    str = str.replaceAll('}', '');
    str = str.split('NO')[0];
    preStr = prefixRule1 + dayjs().format(str);
    if (suffixLength > suffixStart.length) {
      sufNum = suffixLength;
      for (let i = 0; i < suffixLength - suffixStart.length; i++) {
        preStr += '0';
      }
    }
    preStr = preStr + suffixStart;
  }
  const obj = type == 4 ? { preview: preStr, suffixLength: sufNum } : { preview: preStr };
  return obj;
}

export const schemas: FormSchema[] = [
  {
    field: 'type',
    component: 'ApiSelect',
    label: '单据类型',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-12008',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
    rules: [{ required: true, message: '单据类型', trigger: 'blur' }],
  },
  {
    field: 'prefixRule1',
    component: 'Input',
    label: '前缀',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    required: true,
    componentProps: ({ formActionType }) => {
      return {
        onChange: (e: any) => {
          const { setFieldsValue, getFieldsValue } = formActionType;
          const data = getFieldsValue();
          const prefixRule2 = data.prefixRule2 ? data.prefixRule2 : undefined;
          const suffixLength = data.suffixLength ? data.suffixLength : undefined;
          const suffixStart = data.suffixStart ? data.suffixStart : undefined;
          const obj = computerCodeValue(e.target.value, prefixRule2, suffixLength, suffixStart, 1);
          setFieldsValue(obj);
        },
      };
    },
  },
  {
    field: 'prefixRule2',
    component: 'Select',
    label: '日期规则',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    componentProps: ({ formActionType }) => {
      return {
        options: [
          { value: '{YYYY}{NO}', label: '年-YYYY' },
          { value: '{YY}{MM}{NO}', label: '年月-YYMM' },
          { value: '{YYYY}{MM}{NO}', label: '年月-YYYYMM' },
          { value: '{YYYY}{MM}{DD}{NO}', label: '年月日-YYYYMMDD' },
          { value: '{YY}{MM}{DD}{NO}', label: '年月日-YYMMDD' },
        ],
        onChange: (e: any) => {
          const { setFieldsValue, getFieldsValue } = formActionType;
          const data = getFieldsValue();
          const prefixRule1 = data.prefixRule1 ? data.prefixRule1 : undefined;
          const suffixLength = data.suffixLength ? data.suffixLength : undefined;
          const suffixStart = data.suffixStart ? data.suffixStart : undefined;
          const obj = computerCodeValue(prefixRule1, e, suffixLength, suffixStart, 2);
          setFieldsValue(obj);
        },
      };
    },
    rules: [{ required: true, message: '日期规则', trigger: 'blur' }],
  },
  {
    field: 'suffixLength',
    component: 'InputNumber',
    label: '长度',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    required: true,
    componentProps: ({ formActionType }) => {
      return {
        controls: false,
        onChange: (e: any) => {
          const { setFieldsValue, getFieldsValue } = formActionType;
          const data = getFieldsValue();
          const prefixRule1 = data.prefixRule1 ? data.prefixRule1 : undefined;
          const prefixRule2 = data.prefixRule2 ? data.prefixRule2 : undefined;
          const suffixStart = data.suffixStart ? data.suffixStart : undefined;
          const obj = computerCodeValue(prefixRule1, prefixRule2, e, suffixStart, 3);
          setFieldsValue(obj);
        },
        onblur: () => {
          const { setFieldsValue, getFieldsValue } = formActionType;
          const data = getFieldsValue();
          const suffixStart = data.suffixStart;
          const suffixLength = data.suffixLength;
          if (suffixStart.length > suffixLength) {
            setFieldsValue({ suffixLength: suffixStart.length });
          }
        },
      };
    },
  },
  {
    field: 'suffixStart',
    component: 'InputNumber',
    label: '起始值',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    required: true,
    componentProps: ({ formActionType }) => {
      return {
        controls: false,
        stringMode: true,
        onChange: (e: any) => {
          const { setFieldsValue, getFieldsValue } = formActionType;
          const data = getFieldsValue();
          const prefixRule1 = data.prefixRule1 ? data.prefixRule1 : undefined;
          const prefixRule2 = data.prefixRule2 ? data.prefixRule2 : undefined;
          const suffixLength = data.suffixLength ? data.suffixLength : undefined;
          const obj = computerCodeValue(prefixRule1, prefixRule2, suffixLength, e, 4);
          setFieldsValue(obj);
        },
      };
    },
  },
  {
    field: 'preview',
    component: 'Input',
    label: '预览',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    dynamicDisabled: () => {
      return true;
    },
  },
];
