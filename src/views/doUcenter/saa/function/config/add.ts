/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-22 09:44:14
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-06-22 09:44:40
 * @FilePath: /vben-ucenter/src/views/doUcenter/function/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Table';

export const schemas: FormSchema[] = [
  {
    field: 'parentId',
    component: 'ApiTreeSelect',
    label: '上级菜单',
    colProps: {
      span: 24,
    },
    required: true,
    slot: 'remoteSearch',
  },
  {
    field: 'name',
    component: 'Input',
    label: '菜单名称',
    colProps: {
      span: 12,
    },
    required: true,
  },
  {
    field: 'action',
    component: 'Input',
    label: '请求地址',
    colProps: {
      span: 12,
    },
    required: true,
  },
  {
    field: 'code',
    component: 'Input',
    label: '代码',
    colProps: {
      span: 12,
    },
    required: true,
  },
  {
    field: 'imgPath',
    component: 'Input',
    label: '图标路径',
    colProps: {
      span: 12,
    },
    required: true,
  },
  {
    field: 'orderNo',
    component: 'Input',
    label: '排序号',
    colProps: {
      span: 12,
    },
    required: true,
  },
  {
    field: 'type',
    component: 'Select',
    label: '类型',
    colProps: {
      span: 12,
    },
    componentProps: {
      options: [
        {
          label: '菜单',
          value: 1,
        },
        {
          label: '子菜单',
          value: 2,
        },
        {
          label: 'tab页签',
          value: 3,
        },
        {
          label: '按钮',
          value: 4,
        },
      ],
    },
    required: true,
  },
];
