/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-14 17:49:35
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-14 17:52:57
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/search/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'years',
    align: 'left',
  },
  {
    title: '作者',
    dataIndex: 'years',
    align: 'left',
  },
  {
    title: '来源',
    dataIndex: 'years',
    align: 'left',
  },
  {
    title: '发表时间',
    dataIndex: 'years',
    align: 'left',
  },
  {
    title: '文献类型',
    dataIndex: 'years',
    align: 'left',
  },
];
