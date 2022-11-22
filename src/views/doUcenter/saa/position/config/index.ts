/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-01 16:04:07
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ucenterCodeCombox } from '/@/api/common/index';
import { BasicColumn, FormProps } from '/@/components/Table';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
    width: 80,
  },
  {
    title: '代码',
    dataIndex: 'code',
    align: 'left',
    width: 80,
  },
  {
    title: '职位类型',
    dataIndex: 'typeName',
    align: 'left',
    width: 80,
  },
  {
    title: '创建人',
    dataIndex: 'createByName',
    align: 'left',
    width: 60,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'left',
    width: 80,
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
    field: 'nameQueryLike',
    type: 'input',
    label: '名称',
    value: undefined,
  },
  {
    field: 'codeQueryLike',
    type: 'input',
    label: '代码',
    value: undefined,
  },
  {
    field: 'type',
    type: 'tag',
    label: '职务类型',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: {
      type: '10001-12006',
    },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
  },
];
