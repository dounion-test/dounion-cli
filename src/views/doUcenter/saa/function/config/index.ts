/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-22 09:40:52
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-06-22 18:00:16
 * @FilePath: /vben-ucenter/src/views/doUcenter/function/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, FormProps } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 180,
    align: 'left',
  },
  {
    title: '代码',
    dataIndex: 'code',
    width: 200,
    align: 'left',
  },
  {
    title: '地址',
    dataIndex: 'action',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'imgPath',
    width: 200,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 100,
    align: 'left',
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 0,
    showResetButton: false,
    showSubmitButton: false,
    schemas: [
      // 占位
      {
        field: `empty`,
        label: ``,
        component: 'Select',
        slot: 'custom',
        colProps: {
          xl: 24,
        },
      },
    ],
  };
}
