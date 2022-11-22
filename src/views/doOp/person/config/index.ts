/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 10:46:20
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 11:54:58
 * @FilePath: /rural-revitalization/src/views/doOp/opPerson/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, FormProps } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export const columns: BasicColumn[] = [
  {
    title: '用户账号',
    dataIndex: 'account',
    align: 'left',
    width: 120,
    slots: { customRender: 'account' },
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    align: 'left',
    width: 90,
  },
  {
    title: '手机',
    dataIndex: 'mobile',
    align: 'left',
    width: 110,
  },
  {
    title: '行政级别',
    dataIndex: 'executiveLevelName',
    align: 'left',
    width: 80,
  },
  {
    title: '区',
    dataIndex: 'countyName',
    align: 'left',
    width: 80,
  },
  {
    title: '镇',
    dataIndex: 'townName',
    align: 'left',
    width: 80,
  },
  {
    title: '村',
    dataIndex: 'villageName',
    align: 'left',
    width: 80,
  },
  {
    title: `示范村动态监测用户`,
    dataIndex: 'isMonitorUser',
    align: 'left',
    width: 80,
    slots: { customRender: 'isMonitorUser' },
  },
  {
    title: '经营主体账号',
    dataIndex: 'isBusinessAcct',
    align: 'left',
    width: 90,
    slots: { customRender: 'isBusinessAcct' },
  },
  {
    title: '经营主体类型',
    dataIndex: 'businessTypeName',
    align: 'left',
    width: 110,
  },
  {
    title: '经营主体名称',
    dataIndex: 'businessName',
    align: 'left',
    width: 110,
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
    label: '用户账号',
    value: undefined,
  },
  {
    field: 'nameQueryLike',
    type: 'input',
    label: '用户名称',
    value: undefined,
  },
  {
    field: 'isMonitorUser',
    type: 'tag',
    label: '示范村监测账号',
    value: undefined,
    options: [
      {
        label: '是',
        value: 1,
      },
      {
        label: '否',
        value: 0,
      },
    ],
    labelField: 'label',
    valueField: 'value',
  },
  {
    field: 'businessType',
    type: 'tag',
    label: '经营主体类型',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: {
      type: '10001-52049',
    },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
  },
];
