/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-24 19:39:22
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, FormProps } from '/@/components/Table';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export const columns: BasicColumn[] = [
  {
    title: '',
    dataIndex: 'oaAttachmentList',
    width: 30,
    align: 'center',
    slots: { customRender: 'oaAttachmentList' },
  },
  {
    title: '收件人',
    dataIndex: 'receiveNames',
    width: 120,
    align: 'left',
  },
  {
    title: '主题',
    dataIndex: 'topic',
    width: 150,
    align: 'left',
    slots: { customRender: 'topic' },
  },
  {
    title: '时间',
    dataIndex: 'writeDateFormat',
    width: 80,
    align: 'left',
  },
  {
    title: '大小',
    dataIndex: 'emailSize',
    width: 60,
    align: 'left',
    slots: { customRender: 'emailSize' },
  },
];

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 0,
    showActionButtonGroup: false,
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

export const searchArr: searchListType = [
  {
    field: 'topicLike',
    type: 'input',
    label: '主题',
    value: undefined,
  },
  {
    field: 'receiveNamesLike',
    type: 'input',
    label: '收件人',
    value: undefined,
  },
  {
    label: '时间',
    type: 'rangePicker',
    value: undefined,
    field: 'date',
    valueFormat: 'YYYY-MM-DD',
  },
];
