/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 11:18:04
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-03 15:02:14
 * @FilePath: /rural-revitalization/src/views/doOp/task/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';
// import { domesOpSurveyListComboxApi } from '/@/api/doOp/task';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export const waitColumns: BasicColumn[] = [
  {
    title: '流程标题',
    dataIndex: 'bizName',
    align: 'left',
    width: 150,
  },
  {
    title: '流程名称',
    dataIndex: 'summary',
    align: 'left',
    width: 150,
  },
  {
    title: '填报单位',
    dataIndex: 'fillOrg',
    align: 'left',
    width: 100,
  },
  {
    title: '填报时间',
    dataIndex: 'submitTime',
    align: 'left',
    width: 100,
  },
  {
    title: '当前节点',
    dataIndex: 'statusName',
    align: 'left',
    width: 90,
  },
  {
    title: '审批状态',
    dataIndex: 'statusName',
    align: 'left',
    width: 90,
  },
];

export const saveColumns: BasicColumn[] = [
  {
    title: '流程标题',
    dataIndex: 'bizName',
    align: 'left',
    width: 150,
  },
  {
    title: '流程名称',
    dataIndex: 'summary',
    align: 'left',
    width: 150,
  },
  {
    title: '填报单位',
    dataIndex: 'fillOrg',
    align: 'left',
    width: 100,
  },
  {
    title: '填报时间',
    dataIndex: 'submitTime',
    align: 'left',
    width: 100,
  },
  {
    title: '审阅状态',
    dataIndex: 'statusName',
    align: 'left',
    width: 90,
  },
  {
    title: '审批状态',
    dataIndex: 'statusName',
    align: 'left',
    width: 90,
  },
];

export const doneColumns: BasicColumn[] = [
  {
    title: '流程标题',
    dataIndex: 'bizName',
    align: 'left',
    width: 150,
  },
  {
    title: '流程名称',
    dataIndex: 'summary',
    align: 'left',
    width: 150,
  },
  {
    title: '填报单位',
    dataIndex: 'fillOrg',
    align: 'left',
    width: 100,
  },
  {
    title: '填报时间',
    dataIndex: 'submitTime',
    align: 'left',
    width: 100,
  },
  {
    title: '审批状态',
    dataIndex: 'statusName',
    align: 'left',
    width: 90,
  },
];

export const endColumns: BasicColumn[] = [
  {
    title: '流程标题',
    dataIndex: 'bizName',
    align: 'left',
    width: 150,
  },
  {
    title: '流程名称',
    dataIndex: 'summary',
    align: 'left',
    width: 150,
  },
  {
    title: '填报单位',
    dataIndex: 'fillOrg',
    align: 'left',
    width: 100,
  },
  {
    title: '填报时间',
    dataIndex: 'submitTime',
    align: 'left',
    width: 100,
  },
  {
    title: '审批状态',
    dataIndex: 'statusName',
    align: 'left',
    width: 90,
  },
];

export const searchArr: searchListType = [
  {
    field: 'surNameQueryLike',
    type: 'input',
    label: '调研表名',
    value: undefined,
  },
  {
    field: 'yearsQueryIn',
    type: 'datePicker',
    label: '年度',
    value: undefined,
    picker: 'year',
    valueFormat: 'YYYY',
  },
  // {
  //   field: 'surTypeQueryIn',
  //   type: 'tag',
  //   label: '调研表类型',
  //   value: undefined,
  //   api: domesOpSurveyListComboxApi,
  //   searchParams: {
  //     pageNo: 1,
  //     pageSize: 100000,
  //   },
  //   labelField: 'surName',
  //   valueField: 'id',
  // },
];
