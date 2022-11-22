import { ucenterCodeCombox } from '/@/api/common/index';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';
import { infoTypeFirstLevel, infoTypeSecondLevel, infoTypeDoc } from '/@/api/doInfo/index';

export const searchArr: searchListType = [
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
