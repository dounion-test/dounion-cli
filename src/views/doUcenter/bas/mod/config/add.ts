/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-22 10:00:28
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-27 15:43:32
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/config/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { FormSchema } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';
import { getUcenterOrgTree } from '/@/api/testDemo/dept';

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '模板名称',
    colProps: {
      span: 13,
    },
    required: true,
  },
  {
    field: 'bizType',
    component: 'ApiSelect',
    label: '消息类型',
    colProps: {
      span: 13,
    },
    componentProps: {
      api: ucenterCodeCombox,
      params: {
        type: '10001-10041',
      },
      resultField: 'list',
      labelField: 'name',
      valueField: 'value',
    },
    required: true,
  },
  {
    field: 'orgId',
    component: 'ApiTreeSelect',
    label: '机关(单位)',
    required: true,
    componentProps: {
      api: getUcenterOrgTree,
      params: { compType: '10027-10' },
      fieldNames: { key: 'id', label: 'cname', value: 'id' },
      showSearch: true,
      labelInValue: true,
      treeNodeFilterProp: 'cname',
    },
    colProps: {
      span: 13,
    },
  },
];
