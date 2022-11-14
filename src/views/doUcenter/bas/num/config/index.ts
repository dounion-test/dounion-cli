/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-26 15:52:18
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '单据类型',
    dataIndex: 'typeName',
    width: 150,
    align: 'left',
  },
  {
    title: '编号前缀',
    dataIndex: 'prefixRule1',
    align: 'left',
  },
  {
    title: '日期规则',
    dataIndex: 'prefixRule2',
    width: 150,
    align: 'left',
    slots: { customRender: 'prefixRule2' },
  },
  {
    title: '流水号长度',
    dataIndex: 'suffixLength',
    width: 90,
    align: 'left',
  },
  {
    title: '起始值',
    dataIndex: 'suffixStart',
    width: 150,
    align: 'left',
  },
  {
    title: '效果预览',
    dataIndex: 'preview',
    align: 'left',
  },
  {
    title: '机关（单位）',
    dataIndex: 'orgName',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'bizType',
    label: '',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请输入单据类型',
    },
  },
];
