import { ucenterCodeCombox } from '/@/api/common/index';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';
import { BasicColumn, FormProps } from '/@/components/Table';
import { infoTypeFirstLevel, infoTypeSecondLevel, infoTypeDoc } from '/@/api/doInfo/index';
export const searchArr: searchListType = [
  {
    field: 'surNameQueryLike',
    type: 'input',
    label: '文献名称',
    value: undefined,
  },
  {
    field: 'yearsQueryIn',
    type: 'datePicker',
    label: '上传时间',
    value: undefined,
    picker: 'date',
    valueFormat: 'YYYY-MM-DD',
  },
  {
    field: 'categoryType',
    type: 'tag',
    label: '栏目分类',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-52007' },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
    hasAll: true,
    isMultiple: false,
  },
  {
    field: 'categoryType',
    type: 'tag',
    label: '类型',
    value: undefined,
    api: infoTypeDoc,
    searchParams: { type: '10001-52007' },
    resultField: 'list',
    labelField: 'docTypeName',
    valueField: 'docType',
    hasAll: true,
    isMultiple: false,
  },
];

export const columns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'bizName',
    align: 'left',
    width: 280,
  },
  {
    title: '作者',
    dataIndex: 'summary',
    align: 'left',
    width: 80,
  },
  {
    title: '一级栏目',
    dataIndex: 'summary1',
    align: 'left',
    width: 100,
  },
  {
    title: '二级栏目',
    dataIndex: 'summary2',
    align: 'left',
    width: 100,
  },
  {
    title: '类型',
    dataIndex: 'summary3',
    align: 'left',
    width: 100,
  },
  {
    title: '数据源',
    dataIndex: 'summary4',
    align: 'left',
    width: 100,
  },
  {
    title: '上传时间',
    dataIndex: 'summary5',
    align: 'left',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'summary5',
    align: 'left',
    width: 80,
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
