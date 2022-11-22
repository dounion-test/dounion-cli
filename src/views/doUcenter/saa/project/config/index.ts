/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 17:10:26
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '代码',
    dataIndex: 'code',
    align: 'left',
  },
  {
    title: 'key值',
    dataIndex: 'keyValue',
    align: 'left',
  },
  {
    title: '排序号',
    dataIndex: 'orderNo',
    align: 'left',
  },
];
