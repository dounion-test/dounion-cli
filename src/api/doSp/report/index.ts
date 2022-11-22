/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-12 16:57:20
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-17 15:21:41
 * @FilePath: /rural-revitalization/src/api/doSp/act/sciAct.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { DOMES } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
import { ContentTypeEnum } from '/@/enums/httpEnum';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

// 文献类型统计
export const infoDocReportApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/infoDoc/report/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 栏目-文献统计
export const infoDocLevelReportApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/infoDoc/levelReport/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 增量--按文献类型
export const infoDocDocIncrementApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/infoDoc/docIncrement/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 增量--按二级栏目
export const infoDocLevelIncrementApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/infoDoc/levelIncrement/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
