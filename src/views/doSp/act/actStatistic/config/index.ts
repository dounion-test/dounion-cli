/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-11 17:31:42
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-20 09:33:31
 * @FilePath: /rural-revitalization/src/views/expstore/activity/report/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';

export const columns: BasicColumn[] = [
  {
    title: '时间',
    dataIndex: 'date',
    width: '100px',
  },
  {
    title: '活动总次数',
    dataIndex: 'totalCount',
    width: '110px',
  },
  {
    title: '沙龙',
    dataIndex: 'salonCount',
  },
  {
    title: '专题研讨',
    dataIndex: 'seminarCount',
  },
  {
    title: '个人讲座',
    dataIndex: 'personLectureCount',
  },
  {
    title: '评审',
    dataIndex: 'assessCount',
  },
  {
    title: '课题验收',
    dataIndex: 'projectAcceptCount',
  },
];

export const list = [
  {
    field: 'name',
    type: 'input',
    label: '姓名',
    value: undefined,
    placeholder: 'Borderless',
  },
  {
    field: 'name15',
    type: 'select',
    label: '工作状态',
    value: undefined,
    placeholder: 'Borderless',
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
    label: '性别',
    type: 'ApiSelect',
    value: undefined,
    field: 'sex',
    api: ucenterCodeCombox,
    searchParams: { type: '10001-10004' },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
  },
  {
    label: '领域',
    type: 'tag',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-52003' },
    field: 'markIdQueryIn',
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
    isMultiple: false,
    hasAll: true,
  },
  {
    label: '活动日期',
    type: 'rangePicker',
    value: undefined,
    field: 'date',
    valueFormat: 'YYYY-MM-DD',
  },
];
