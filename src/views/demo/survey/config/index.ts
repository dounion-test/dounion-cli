/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-18 15:37:20
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-07-25 09:16:19
 * @FilePath: /vben-ucenter/src/views/demo/system/survey/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const leftArr = [
  {
    label: '输入框',
    value: 0,
    type: 'input',
  },
  {
    label: '下拉选择',
    value: 1,
    type: 'select',
  },
  {
    label: '单选',
    value: 2,
    type: 'radio',
  },
  {
    label: '多选框',
    value: 3,
    type: 'checkbox',
  },
  {
    label: '文本框',
    value: 4,
    type: 'textarea',
  },
  {
    label: '模块',
    value: 5,
    type: 'module',
  },
];

export const formObj = [
  {
    id: '',
    label: '输入框',
    type: 'input',
    required: true,
    placeholder: '请输入',
  },
  {
    id: '',
    idNum: 2,
    label: '下拉选择',
    type: 'select',
    required: true,
    placeholder: '请选择',
    deleteID: [],
    options: [
      {
        label: '选项1',
        value: 1,
      },
      {
        label: '选项2',
        value: 2,
      },
    ],
  },
  {
    id: '',
    idNum: 2,
    label: '单选',
    type: 'radio',
    required: true,
    deleteID: [],
    options: [
      {
        label: '选项1',
        value: 1,
      },
      {
        label: '选项2',
        value: 2,
      },
    ],
  },
  {
    id: '',
    idNum: 3,
    label: '多选框',
    type: 'checkbox',
    required: true,
    deleteID: [],
    options: [
      {
        label: '选项1',
        value: 1,
      },
      {
        label: '选项2',
        value: 2,
      },
      {
        label: '选项3',
        value: 3,
      },
    ],
  },
  {
    id: '',
    label: '文本框',
    type: 'textarea',
    required: true,
    placeholder: '请输入',
  },
  {
    id: '',
    label: '模块',
    type: 'module',
    placeholder: '请输入',
    children: [],
  },
];
