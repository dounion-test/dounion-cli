/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 17:42:43
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '流程定义名称',
    dataIndex: 'processDefineName',
    align: 'left',
  },
  {
    title: '版本号',
    dataIndex: 'version',
    align: 'left',
    width: 80,
  },
  {
    title: '流程分类',
    dataIndex: 'category',
    align: 'left',
  },
  {
    title: '模型表示',
    dataIndex: 'key',
    align: 'left',
    width: 130,
  },
  {
    title: '流程定义Id',
    dataIndex: 'processDefineId',
    align: 'left',
  },
];
