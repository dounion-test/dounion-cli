/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-09-14 17:49:35
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-26 16:23:38
 * @FilePath: /rural-revitalization/src/views/doInfo/synthesize/search/config/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { BasicColumn } from '/@/components/Table';
import { ucenterCodeCombox } from '/@/api/common/index';
import { searchListType } from '/@/components/SearchWrap/src/types/searchList';
import { infoTypeFirstLevel, infoTypeDoc, infoTypeSecondLevel } from '/@/api/doInfo/index';

export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    align: 'left',
  },
  {
    title: '文献名称',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '作者',
    dataIndex: 'authorNames',
    align: 'left',
    width: 100,
  },
  {
    title: '文献类型',
    dataIndex: 'docType',
    align: 'left',
    width: 100,
  },
  {
    title: '文献来源',
    dataIndex: 'sourceTypeName',
    align: 'left',
    width: 100,
  },
  {
    title: '一级栏目',
    dataIndex: 'firstLevelNames',
    align: 'left',
    width: 100,
  },
  {
    title: '二级栏目',
    dataIndex: 'secondLevelNames',
    align: 'left',
    width: 200,
  },
];

export const searchArr: searchListType = [
  {
    field: 'nameQueryLike',
    type: 'input',
    label: '文献名称',
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
