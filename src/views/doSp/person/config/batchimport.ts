/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 10:46:20
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-01 21:00:16
 * @FilePath: /rural-revitalization/src/views/doOp/opPerson/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'account',
    align: 'left',
    width: 100,
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
    width: 120,
  },
  {
    title: '民族',
    dataIndex: 'nation',
    align: 'left',
    width: 80,
  },
  {
    title: '身份证号码',
    dataIndex: 'idNo',
    align: 'left',
  },
  {
    title: '出生日期',
    dataIndex: 'birthday',
    align: 'left',
  },
  {
    title: '导入结果',
    dataIndex: 'errorMsg',
    align: 'left',
    fixed: 'right',
  },
];
