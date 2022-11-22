/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 11:18:04
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 13:12:09
 * @FilePath: /rural-revitalization/src/views/doOp/task/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export const columns: BasicColumn[] = [
  {
    title: '年度',
    dataIndex: 'years',
    align: 'left',
    width: 50,
  },
  {
    title: '调研表类型',
    dataIndex: 'surTypeName',
    align: 'left',
    width: 90,
  },
  {
    title: '调研表名',
    dataIndex: 'surName',
    align: 'left',
    width: 150,
  },
  {
    title: '创建人',
    dataIndex: 'createByName',
    align: 'left',
    width: 70,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'left',
    width: 140,
  },
  {
    title: '发布人',
    dataIndex: 'publisherName',
    align: 'left',
    width: 70,
  },
  {
    title: '开始日期',
    dataIndex: 'beginDate',
    align: 'left',
    width: 90,
  },
  {
    title: '结束日期',
    dataIndex: 'endDate',
    align: 'left',
    width: 90,
  },
  {
    title: '填报方式',
    dataIndex: 'typeName',
    align: 'left',
    width: 70,
  },
  {
    title: '调研单位数量',
    dataIndex: 'counts',
    align: 'left',
    width: 90,
  },
  {
    title: '调研状态',
    dataIndex: 'statusName',
    align: 'left',
    width: 80,
    slots: { customRender: 'statusName' },
  },
];

export const waitColumns: BasicColumn[] = [
  {
    title: '年度',
    dataIndex: 'years',
    align: 'left',
    width: 50,
  },
  {
    title: '调研表类型',
    dataIndex: 'surTypeName',
    align: 'left',
    width: 90,
  },
  {
    title: '调研表名',
    dataIndex: 'surName',
    align: 'left',
    width: 150,
  },
  {
    title: '调研表表单名称',
    dataIndex: 'templateName',
    align: 'left',
    width: 150,
  },
  {
    title: '调研状态',
    dataIndex: 'statusName',
    align: 'left',
    width: 80,
    slots: { customRender: 'statusName' },
  },
];

export const endColumns: BasicColumn[] = [
  {
    title: '年度',
    dataIndex: 'years',
    align: 'left',
    width: 50,
  },
  {
    title: '调研表类型',
    dataIndex: 'surTypeName',
    align: 'left',
    width: 80,
  },
  {
    title: '调研表名',
    dataIndex: 'surName',
    align: 'left',
    width: 150,
  },
  {
    title: '创建人',
    dataIndex: 'createByName',
    align: 'left',
    width: 70,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'left',
    width: 140,
  },
  {
    title: '发布人',
    dataIndex: 'publisherName',
    align: 'left',
    width: 70,
  },
  {
    title: '开始日期',
    dataIndex: 'beginDate',
    align: 'left',
    width: 90,
  },
  {
    title: '结束日期',
    dataIndex: 'endDate',
    align: 'left',
    width: 90,
  },
  {
    title: '调研/填报单位数量',
    dataIndex: 'counts',
    align: 'left',
    width: 70,
    slots: { customRender: 'countsFillCounts' },
  },
  // {
  //   title: '填报单位数量',
  //   dataIndex: 'fillCounts',
  //   align: 'left',
  //   width: 90,
  // },
  {
    title: '调研状态',
    dataIndex: 'statusName',
    align: 'left',
    width: 80,
    slots: { customRender: 'statusName' },
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
  {
    field: 'surTypeQueryIn',
    type: 'tag',
    label: '调研表类型',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: {
      type: '10001-52016',
    },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
  },
];

export const statusObj = {
  '52019-10': '#108ee9', //待发布
  '52019-20': '#87d068', //调研中
  '52019-30': 'default', //已结束
};

export const viewSchema = [
  {
    label: '年度',
    field: 'years',
    labelMinWidth: 60,
    labelStyle: { 'text-align': 'right' },
    contentMinWidth: 200,

    render: (_, form) => {
      return form.years || '-';
    },
  },
  {
    label: '调研表类型',
    field: 'surTypeName',
    labelMinWidth: 60,
    labelStyle: { 'text-align': 'right' },
    contentMinWidth: 200,
    render: (_, form) => {
      return form.surTypeName || '-';
    },
  },
  {
    label: '调研表名',
    field: 'surName',
    labelMinWidth: 60,
    labelStyle: { 'text-align': 'right' },

    render: (_, form) => {
      return form.surName || '-';
    },
  },
  {
    label: '创建人',
    field: 'createByName',
    labelMinWidth: 60,
    labelStyle: { 'text-align': 'right' },

    render: (_, form) => {
      return form.createByName || '-';
    },
  },
  {
    label: '创建时间',
    field: 'createTime',
    labelMinWidth: 60,
    labelStyle: { 'text-align': 'right' },

    render: (_, form) => {
      return form.createTime || '-';
    },
  },
  {
    label: '发布人',
    field: 'publisherName',
    labelMinWidth: 60,
    labelStyle: { 'text-align': 'right' },

    render: (_, form) => {
      return form.publisherName || '-';
    },
  },
  {
    label: '开始日期',
    field: 'beginDate',
    labelMinWidth: 60,
    labelStyle: { 'text-align': 'right' },

    render: (_, form) => {
      return form.beginDate || '-';
    },
  },
  {
    label: '结束日期',
    field: 'endDate',
    labelMinWidth: 60,
    labelStyle: { 'text-align': 'right' },

    render: (_, form) => {
      return form.endDate || '-';
    },
  },
  {
    label: '填报方式',
    field: 'typeName',
    labelMinWidth: 60,
    labelStyle: { 'text-align': 'right' },

    render: (_, form) => {
      return form.typeName || '-';
    },
  },
  {
    label: '调研单位',
    field: 'orgNames',
    labelMinWidth: 60,
    labelStyle: { 'text-align': 'right' },

    render: (_, form) => {
      return form.orgNames || '-';
    },
  },

  {
    label: '调研状态',
    field: 'years',
    labelMinWidth: 60,
    labelStyle: { 'text-align': 'right' },

    render: (_, form) => {
      return form.years || '-';
    },
  },
];
