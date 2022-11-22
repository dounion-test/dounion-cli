/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-29 11:18:04
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-17 15:46:46
 * @FilePath: /rural-revitalization/src/views/doOp/task/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '任务名称',
    dataIndex: 'stepName',
    align: 'left',
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    align: 'left',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    align: 'left',
  },
  {
    title: '执行人',
    dataIndex: 'assigneeName',
    align: 'left',
    width: 90,
  },
  {
    title: '审批意见',
    dataIndex: 'comment',
    align: 'left',
  },
  {
    title: '审批状态',
    dataIndex: 'statusName',
    align: 'left',
  },
];
