/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-10 15:34:21
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-20 11:27:04
 * @FilePath: /rural-revitalization/src/views/expstore/activity/list/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export const searchArr: searchListType = [
  {
    field: 'nameQueryLike',
    type: 'input',
    label: '活动名称',
    value: undefined,
  },
  {
    label: '活动日期',
    type: 'rangePicker',
    value: undefined,
    field: 'date',
    valueFormat: 'YYYY-MM-DD',
  },
  {
    label: '活动分类',
    type: 'tag',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-52003' },
    field: 'categoryType',
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
    isMultiple: false,
    hasAll: true,
  },
  {
    label: '活动状态',
    type: 'tag',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-52004' },
    field: 'statusQueryIn',
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
    isMultiple: false,
    hasAll: true,
  },
];

export const columns: BasicColumn[] = [
  {
    title: '日期',
    dataIndex: 'date',
    width: 40,
    customCell: (record) => {
      if (record.isFirst) {
        return { rowSpan: record.count };
      } else {
        return { rowSpan: 0 };
      }
    },
  },
  {
    title: '时间',
    dataIndex: 'time',
    width: 30,
  },
  {
    title: '内容',
    dataIndex: 'content',
    width: 40,
  },
];
