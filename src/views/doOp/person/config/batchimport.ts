/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 10:46:20
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-01 11:17:32
 * @FilePath: /rural-revitalization/src/views/doOp/opPerson/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '用户账号',
    dataIndex: 'account',
    align: 'left',
    width: 60,
    slots: { customRender: 'account' },
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    align: 'left',
    width: 60,
  },
  {
    title: '手机',
    dataIndex: 'mobile',
    align: 'left',
    width: 90,
  },
  {
    title: '行政级别',
    dataIndex: 'executiveLevel',
    align: 'left',
    width: 60,
  },
  {
    title: '区',
    dataIndex: 'countyName',
    align: 'left',
    width: 50,
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
    title: '示范村动态监测用户',
    dataIndex: 'isMonitorUser',
    align: 'left',
    width: 70,
    slots: { customRender: 'isMonitorUser' },
  },
  {
    title: '经营主体账号',
    dataIndex: 'isBusinessAcct',
    align: 'left',
    width: 80,
    slots: { customRender: 'isBusinessAcct' },
  },
  {
    title: '经营主体类型',
    dataIndex: 'businessTypeName',
    align: 'left',
    width: 80,
  },
  {
    title: '经营主体名称',
    dataIndex: 'businessName',
    align: 'left',
    width: 80,
  },
  {
    title: '导入结果',
    dataIndex: 'result',
    align: 'left',
    fixed: 'right',
    width: 60,
    slots: { customRender: 'result' },
  },
];
