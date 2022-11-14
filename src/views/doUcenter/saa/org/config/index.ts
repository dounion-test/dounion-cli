/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-22 09:29:14
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-06-22 09:30:21
 * @FilePath: /vben-ucenter/src/views/doUcenter/org/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'cname',
    width: 200,
    align: 'left',
    sorter: true,
    slots: { customRender: 'cname' },
  },
  {
    title: '代码',
    dataIndex: 'code',
    width: 120,
    align: 'left',
    sorter: true,
  },
  {
    title: '简称',
    dataIndex: 'sname',
    width: 120,
    align: 'left',
  },
  {
    title: '联系人',
    dataIndex: 'linker',
    width: 60,
    align: 'left',
  },
  {
    title: '顺序号',
    dataIndex: 'orderNo',
    width: 60,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'cNameOrCodeOrSnameOrLinkerQueryLike',
    label: '',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请输入名称、代码、简称、联系人',
    },
  },
];
