/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 10:46:20
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 11:58:26
 * @FilePath: /rural-revitalization/src/views/doOp/opPerson/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, FormProps } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export const columns: BasicColumn[] = [
  {
    title: '联络人',
    dataIndex: 'linker',
    align: 'left',
    width: 60,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    align: 'left',
    width: 80,
  },
  {
    title: '所属区域',
    dataIndex: 'nodeName',
    align: 'left',
    width: 60,
  },
  {
    title: '岗位名称',
    dataIndex: 'jobName',
    align: 'left',
    width: 60,
  },
  {
    title: '责任科室',
    dataIndex: 'deptName',
    align: 'left',
    width: 100,
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
    field: 'phoneQueryLike',
    type: 'input',
    label: '联系电话',
    value: undefined,
  },
  {
    field: 'job',
    type: 'tag',
    label: '岗位',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: {
      type: '10001-52061',
    },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
  },
];
