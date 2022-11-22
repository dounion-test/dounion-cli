import { searchListType } from '/@/components/SearchWrap/src/types/searchList';
import { BasicColumn, FormProps } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';
import { infoTypeFirstLevel, infoTypeDoc, infoTypeSecondLevel } from '/@/api/doInfo/index';

export const searchArr: searchListType = [
  {
    field: 'nameQueryLike',
    type: 'input',
    label: '文献名称',
    value: undefined,
  },
  {
    field: 'titleQueryLike',
    type: 'input',
    label: '标题',
    value: undefined,
  },
  {
    field: 'authorQueryLike',
    type: 'input',
    label: '作者名称',
    value: undefined,
  },
  {
    field: 'wordQueryLike',
    type: 'input',
    label: '关键词',
    value: undefined,
  },
  {
    type: 'rangePicker',
    label: '上传时间',
    value: undefined,
    field: 'date',
    valueFormat: 'YYYY-MM-DD',
  },
  {
    field: 'docTypeQueryIn',
    type: 'tag',
    label: '类型',
    value: undefined,
    api: infoTypeDoc,
    searchParams: { type: '10001-52007' },
    labelField: 'docTypeName',
    valueField: 'docType',
    hasAll: true,
    isMultiple: false,
  },
  {
    field: 'firstLevel',
    type: 'tag',
    label: '一级栏目',
    value: undefined,
    api: infoTypeFirstLevel,
    labelField: 'firstLevelName',
    valueField: 'firstLevel',
    // hasAll: true,
    // isMultiple: false,
    componentProps: ({ formActionType }) => {
      const { updateSchema } = formActionType;
      return {
        onChange: async ({ value }) => {
          updateSchema({
            field: 'secondLevelQueryIn',
            searchParams: { firstLevel: value[0].firstLevel },
            isShow: true,
          });
        },

        deleteChange: (_, cb) => {
          updateSchema({
            field: 'secondLevelQueryIn',
            value: undefined,
            isShow: false,
          });
          cb('secondLevelQueryIn');
        },
      };
    },
  },
  {
    field: 'secondLevelQueryIn',
    type: 'tag',
    label: '二级栏目',
    value: undefined,
    api: infoTypeSecondLevel,
    searchParams: {},
    labelField: 'secondLevelName',
    valueField: 'secondLevel',
    hasAll: true,
    isMultiple: false,
    isShow: false,
  },
  {
    field: 'sourceType',
    type: 'tag',
    label: '文献来源',
    value: undefined,
    api: ucenterCodeCombox,
    searchParams: { type: '10001-52010' },
    resultField: 'list',
    labelField: 'name',
    valueField: 'value',
    hasAll: false,
    isMultiple: false,
  },
];

export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    align: 'left',
    width: 130,
  },
  {
    title: '文献名称',
    dataIndex: 'name',
    align: 'left',
    width: 100,
  },
  {
    title: '作者',
    dataIndex: 'authorNames',
    align: 'left',
    width: 60,
  },
  {
    title: '栏目',
    dataIndex: 'secondLevelNames',
    align: 'left',
    width: 80,
  },
  {
    title: '类型',
    dataIndex: 'docType',
    align: 'left',
    width: 40,
  },
  {
    title: '文献来源',
    dataIndex: 'sourceTypeName',
    align: 'left',
    width: 80,
  },
  // {
  //   title: '数据源',
  //   dataIndex: 'summary4',
  //   align: 'left',
  //   width: 100,
  // },
  {
    title: '上传时间',
    dataIndex: 'createTime',
    align: 'left',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'statusName',
    align: 'left',
    width: 60,
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
