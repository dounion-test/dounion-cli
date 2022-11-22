/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-16 10:21:18
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-17 15:46:54
 * @FilePath: /rural-revitalization/src/views/doSp/report/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';

export const LiteratureLeftColumns: BasicColumn[] = [
  {
    title: '年度',
    dataIndex: 'year',
    width: 60,
  },
  {
    title: '类型',
    dataIndex: 'docType',
    width: 60,
  },
  {
    title: '总文献数',
    dataIndex: 'amount',
    width: 60,
  },
];

export const LiteratureRightColumns: BasicColumn[] = [
  {
    title: '年度',
    dataIndex: 'year',
    width: 60,
  },
  {
    title: '一级栏目',
    dataIndex: 'firstLevel',
    width: 60,
  },
  {
    title: '二级栏目',
    dataIndex: 'secondLevel',
    width: 100,
  },
  {
    title: '文献数',
    dataIndex: 'amount',
    width: 60,
  },
];
