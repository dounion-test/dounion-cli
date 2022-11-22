/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-14 17:49:35
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 13:41:31
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/search/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '文献名称',
    dataIndex: 'title',
    align: 'left',
    width: 220,
  },
  {
    title: '文献类型',
    dataIndex: 'docType',
    align: 'left',
    width: 60,
  },
  {
    title: '文献来源',
    dataIndex: 'sourceTypeName',
    align: 'left',
    width: 60,
  },
  {
    title: '一级栏目',
    dataIndex: 'firstLevelNames',
    align: 'left',
    width: 60,
  },
  {
    title: '二级栏目',
    dataIndex: 'secondLevelNames',
    align: 'left',
    width: 100,
  },
  {
    title: '收藏时间',
    dataIndex: 'collectTime',
    align: 'left',
    width: 100,
  },
];
