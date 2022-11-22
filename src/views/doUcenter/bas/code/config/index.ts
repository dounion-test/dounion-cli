/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-27 17:26:46
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, FormProps } from '/@/components/Table';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 100,
    align: 'left',
    className: 'systemCode-name',
  },
  {
    title: '代码',
    dataIndex: 'code',
    width: 40,
    align: 'left',
  },
  {
    title: '类别',
    width: 80,
    dataIndex: 'typeValue',
    align: 'left',
  },
  {
    title: '代码值',
    dataIndex: 'value',
    width: 80,
    align: 'left',
  },
  {
    title: '简称',
    dataIndex: 'sname',
    width: 100,
    align: 'left',
  },
  {
    title: '系统/用户',
    dataIndex: 'isSys',
    width: 60,
    align: 'left',
    slots: { customRender: 'isSys' },
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 0,
    showActionButtonGroup: false,
    schemas: [
      // 占位
      {
        field: `empty`,
        label: ``,
        component: 'Select',
        slot: 'custom',
        colProps: {
          xl: 24,
        },
      },
    ],
  };
}

export const searchArr: searchListType = [
  {
    field: 'codeQueryLike',
    type: 'input',
    label: '代码',
    value: undefined,
  },
  {
    field: 'nameQueryLike',
    type: 'input',
    label: '名称',
    value: undefined,
  },
  {
    field: 'snameQueryLike',
    type: 'input',
    label: '简称',
    value: undefined,
  },
  {
    field: 'isSys',
    type: 'tag',
    label: '系统/用户',
    value: undefined,
    labelField: 'label',
    valueField: 'value',
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
];
