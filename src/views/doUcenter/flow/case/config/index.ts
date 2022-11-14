/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-03 16:14:31
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '机关(单位)',
    dataIndex: 'orgName',
    align: 'left',
  },
  {
    title: '类型',
    dataIndex: 'bizTypeName',
    align: 'left',
  },
  {
    title: '标题',
    dataIndex: 'title',
    align: 'left',
  },
  {
    title: '当前任务节点',
    dataIndex: 'taskName',
    width: 120,
    align: 'left',
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    align: 'left',
    width: 150,
  },
  {
    title: '完成时间',
    dataIndex: 'completeTime',
    align: 'left',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'statusName',
    width: 80,
    align: 'left',
    slots: { customRender: 'statusName' },
  },
];

export const statusObj = {
  '21002-10': '#c88740', // 草稿
  '21002-20': '#c88740', // 已提交
  '21002-30': '#ffaa2b', // 审批中
  '21002-40': '#87d068', // 审批完成
  '21002-50': '#ffaa2b', // 已追回
  '21002-60': '#f8363f', // 已驳回
  '21002-70': '#f8363f', // 反对
};
