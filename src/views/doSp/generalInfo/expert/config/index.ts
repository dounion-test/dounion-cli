import { ucenterCodeCombox } from '/@/api/common/index';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';

export const searchArr: searchListType = [
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
