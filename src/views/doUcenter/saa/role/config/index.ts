/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-22 09:56:56
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-06-22 09:59:52
 * @FilePath: /vben-ucenter/src/views/doUcenter/role/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
    sorter: true,
    slots: { customRender: 'name' },
    resizable: true,
    minWidth: 200,
    maxWidth: 400,
  },
  {
    title: '代码',
    dataIndex: 'code',
    width: 180,
    align: 'left',
    sorter: true,
    resizable: true,
  },
  {
    title: '系统/用户',
    align: 'left',
    dataIndex: 'isSys',
    customRender: ({ record }) => {
      const text = record.isSys == 1 ? '系统' : '用户';
      return h('span', {
        innerHTML: text,
      });
    },
  },
  {
    title: '创建人',
    align: 'left',
    dataIndex: 'createByName',
  },
  {
    title: '创建时间',
    align: 'left',
    dataIndex: 'createTime',
  },
];

export const personColumns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 80,
    sorter: true,
    align: 'left',
    slots: { customRender: 'name' },
  },
  {
    title: '账号',
    dataIndex: 'account',
    width: 120,
    align: 'left',
    resizable: true,
    slots: { customRender: 'account' },
  },
  {
    title: '性别',
    dataIndex: 'sexName',
    width: 50,
    align: 'left',
  },
  {
    title: '手机',
    dataIndex: 'mobile',
    width: 100,
    align: 'left',
  },
  {
    title: '部门',
    dataIndex: 'deptNames',
    width: 150,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    sorter: true,
    width: 150,
    align: 'left',
  },
];
