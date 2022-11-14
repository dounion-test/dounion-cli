/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-22 10:00:28
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-27 11:19:06
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Table';

export const schemas: FormSchema[] = [
  {
    field: 'keies',
    component: 'Input',
    label: 'key',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    required: true,
  },
  {
    field: 'value',
    component: 'Input',
    label: '内网地址',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
  },
  {
    field: 'outValue',
    component: 'Input',
    label: '外网地址',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
  },
  {
    field: 'remark',
    component: 'Input',
    label: '开发地址',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
  },
  {
    field: 'descript',
    component: 'InputTextArea',
    label: '描述',
    labelWidth: 60,
    colProps: {
      span: 16,
    },
    componentProps: {
      showCount: true,
      maxlength: '100',
    },
  },
];
