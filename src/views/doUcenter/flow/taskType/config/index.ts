/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 17:36:06
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
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
