/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-01 14:05:49
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-01 16:03:22
 * @FilePath: /rural-revitalization/src/views/doUcenter/saa/position/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ucenterCodeCombox } from '/@/api/common/index';
import { FormSchema } from '/@/components/Table';
import vPinyin from '/@/utils/v-py.js';

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    colProps: {
      span: 18,
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
      span: 18,
    },
    required: true,
  },
  {
    field: 'type',
    component: 'ApiSelect',
    label: '职务类型',
    colProps: {
      span: 18,
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-12006',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
  },
  {
    field: 'memo',
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
