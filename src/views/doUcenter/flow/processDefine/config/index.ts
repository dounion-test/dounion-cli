/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 18:12:49
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '机关（单位）',
    dataIndex: 'orgName',
    align: 'left',
  },
  {
    title: '流程名称',
    dataIndex: 'bizName',
    align: 'left',
  },
  {
    title: '类型',
    dataIndex: 'bizTypeName',
    align: 'left',
  },
  {
    title: '流程Id',
    dataIndex: 'defineId',
    align: 'left',
  },
  {
    title: '创建人',
    dataIndex: 'createByName',
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'left',
  },
];
