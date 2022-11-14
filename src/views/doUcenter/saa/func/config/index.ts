/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-07 14:21:07
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-06-22 17:59:35
 * @FilePath: /vben-ucenter/src/views/doUcenter/func/func.data.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, FormProps } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 320,
    align: 'left',
    slots: { customRender: 'name' },
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'left',
    slots: { customRender: 'action' },
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
