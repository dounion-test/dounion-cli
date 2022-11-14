import { BasicColumn, FormProps } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';
import { ucenterPositionComboxApi, ucenterRoleComboxApi } from '/@/api/testDemo/person';

export const columns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    sorter: true,
    align: 'left',
    slots: { customRender: 'name' },
  },
  {
    title: '账号',
    dataIndex: 'account',
    width: 100,
    align: 'left',
    resizable: true,
    slots: { customRender: 'account' },
  },
  {
    title: '手机',
    dataIndex: 'mobile',
    width: 120,
    align: 'left',
  },
  {
    title: '部门',
    dataIndex: 'deptNames',
    width: 210,
    align: 'left',
  },
  {
    title: '部门职位',
    dataIndex: 'posName',
    width: 110,
    align: 'left',
  },
  {
    title: '角色',
    dataIndex: 'roleNames',
    width: 210,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    sorter: true,
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
    field: 'marriage',
    type: 'tag',
    label: '婚姻状况',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-10005' },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
  },
  {
    field: 'education',
    type: 'tag',
    label: '学历',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-10006' },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
  },
  {
    field: 'jobTitleId',
    type: 'tag',
    label: '职务',
    value: undefined,
    api: ucenterPositionComboxApi,
    searchParams: {},
    resultField: 'list',
    labelField: 'name',
    valueField: 'id',
  },
  {
    field: 'roleIdQuery',
    type: 'tag',
    label: '角色',
    value: undefined,
    api: ucenterRoleComboxApi,
    searchParams: { pageSize: 10000 },
    resultField: 'list',
    labelField: 'name',
    valueField: 'id',
  },
];
