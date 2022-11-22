/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-07-26 09:46:56
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-07-26 11:37:52
 * @FilePath: /rural-revitalization/src/views/demo/survey/config/view.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'cname',
    colSpan: 0,
    width: 60,
    align: 'left',
  },
  {
    title: '指标名称',
    dataIndex: 'label',
    colSpan: 2,
    align: 'center',
    slots: { customRender: 'label' },
  },
  {
    title: '单位',
    dataIndex: 'unit',
    width: 60,
    align: 'left',
  },
  {
    title: '结果',
    dataIndex: 'reault',
    width: 60,
    align: 'left',
  },
];
