import { BasicColumn, FormProps } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'name',
    align: 'left',
    width: 180,
  },
  {
    title: '申报开始时间',
    dataIndex: 'applyStime',
    width: 140,
    align: 'left',
  },
  {
    title: '申报结束时间',
    dataIndex: 'applyEtime',
    width: 140,
    align: 'left',
  },
  {
    title: '科研状态',
    dataIndex: 'status',
    width: 80,
    align: 'left',
    slots: { customRender: 'status' },
  },
];

export const getFormConfig = (): Partial<FormProps> => {
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
};

export const statusObj = new Map([
  [
    0,
    {
      type: 'blue',
      label: '未开始',
    },
  ],
  [
    1,
    {
      type: 'green',
      label: '进行中',
    },
  ],
  [
    2,
    {
      type: 'default',
      label: '已结束',
    },
  ],
]);
