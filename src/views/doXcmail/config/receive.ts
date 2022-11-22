/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 16:00:09
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-24 19:39:03
 * @FilePath: /rural-revitalization/src/views/doMail/config/draft.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn, FormProps } from '/@/components/Table';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';
import { usePermission } from '/@/hooks/web/usePermission';
const { hasPermission } = usePermission();

export const columns: BasicColumn[] = [
  {
    title: '',
    dataIndex: 'receiveStatus',
    width: 30,
    align: 'center',
    slots: { customRender: 'receiveStatus' },
  },
  {
    title: '发件人',
    dataIndex: 'personName',
    width: 80,
    align: 'left',
    slots: { customRender: 'personName' },
  },
  {
    title: '重要',
    dataIndex: 'isImportant',
    width: 40,
    align: 'left',
    slots: { customRender: 'isImportant' },
  },
  {
    title: '主题',
    dataIndex: 'topic',
    width: 160,
    align: 'left',
    slots: { customRender: 'topic' },
    className: hasPermission('XcmailReceiveView') ? 'email-topic' : '',
  },
  {
    title: '时间',
    dataIndex: 'receiveDateFormat',
    width: 60,
    align: 'left',
  },
  {
    title: '大小',
    dataIndex: 'emailSize',
    width: 50,
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
    field: 'personNameLike',
    type: 'input',
    label: '发件人',
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
