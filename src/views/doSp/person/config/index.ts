/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-08 16:18:49
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-16 17:13:39
 * @FilePath: /rural-revitalization/src/views/expstore/expert/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ucenterCodeCombox, ucenterCodeTree } from '/@/api/common/index';
import { spMarkComboxApi } from '/@/api/doSp/person';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';
export const searchArr: searchListType = [
  {
    field: 'nameQueryLike',
    type: 'input',
    label: '姓名',
    value: undefined,
  },
  {
    field: 'sex',
    type: 'tag',
    label: '性别',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-10004' },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
  },
  {
    field: 'political',
    type: 'tag',
    label: '政治面貌',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-52059' },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
  },
  {
    field: 'isWork',
    type: 'tag',
    label: '工作状态',
    value: undefined,
    labelField: 'label',
    valueField: 'value',
    options: [
      {
        label: '在职',
        value: 1,
      },
      {
        label: '离职',
        value: 0,
      },
    ],
  },
  {
    field: 'markIdQueryIn',
    type: 'tag',
    label: '领域',
    value: undefined,
    api: spMarkComboxApi,
    labelField: 'speMarkName',
    valueField: 'id',
    isMultiple: true,
    hasAll: true,
  },
  {
    field: 'jobTitleId',
    type: 'tag',
    label: '技术职称',
    value: undefined,
    api: ucenterCodeTree,
    searchParams: { type: '10001-52052' },
    labelField: 'name',
    valueField: 'value',
    isChildren: true,
  },
  {
    field: 'detailAddressQueryLike',
    type: 'input',
    label: '联系地址',
    value: undefined,
  },
  {
    field: 'companyNameQueryLike',
    type: 'input',
    label: '单位',
    value: undefined,
  },
];
