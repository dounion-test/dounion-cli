/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-25 12:00:24
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, FormProps } from '/@/components/Table';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export const columns: BasicColumn[] = [
  {
    title: '事件类型',
    dataIndex: 'typeName',
    width: 120,
    align: 'left',
  },
  {
    title: '内容',
    dataIndex: 'opContent',
    align: 'left',
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
    width: 150,
    align: 'left',
  },
  {
    title: '操作时间',
    dataIndex: 'time',
    width: 160,
    align: 'left',
  },
  {
    title: '机关（单位）',
    dataIndex: 'orgName',
    width: 250,
    align: 'left',
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
    field: 'accountQueryLike',
    type: 'input',
    label: '账号',
    value: undefined,
  },
  {
    label: '时间',
    type: 'rangePicker',
    value: undefined,
    field: 'date',
    valueFormat: 'YYYY-MM-DD',
  },
];
