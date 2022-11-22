/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-27 17:01:25
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, FormProps } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';
import { getUcenterOrgTree } from '/@/api/testDemo/dept';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';
import { usePermission } from '/@/hooks/web/usePermission';
const { hasPermission } = usePermission();

export const columns: BasicColumn[] = [
  {
    title: '机关(单位)',
    dataIndex: 'orgName',
    align: 'left',
  },
  {
    title: '模板名称',
    dataIndex: 'name',
    align: 'left',
    className: hasPermission('BasMsgConfigView') ? 'title-link' : '',
  },
  {
    title: '消息类型',
    dataIndex: 'bizTypeName',
    align: 'left',
  },
  {
    title: '分发方式',
    dataIndex: 'listName',
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
    field: 'orgIdQueryIn',
    type: 'ApiTreeSelect',
    label: '机关(单位)',
    value: undefined,
    api: getUcenterOrgTree,
    fieldNames: { key: 'id', label: 'cname', value: 'id' },
    treeNodeFilterProp: 'name',
  },
  {
    field: 'bizTypeQueryIn',
    type: 'tag',
    label: '消息类型',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-10041' },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
  },
];
