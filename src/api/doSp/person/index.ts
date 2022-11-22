/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-12 16:57:20
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-17 10:24:57
 * @FilePath: /rural-revitalization/src/api/doSp/act/sciAct.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { DOMES, DOSYS } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
import { ContentTypeEnum } from '/@/enums/httpEnum';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

// 专家列表
export const getSpPersonListApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/spPerson/list`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 定向查询
export const spPersonComboxApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/spPerson/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 查看
export const spPersonViewApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/spPerson/view`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 随机查询
export const spPersonInventListByRandomApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/spPerson/inventListByRandom/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 领域tag
export const spMarkComboxApi = (mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/spMark/combox`,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 专家管理-新增
export const spPersonAddApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      params,
      url: `/${DOMES}/spPerson/add`,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 专家管理-批量新增
export const spPersonAddListApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      params,
      url: `/${DOMES}/spPerson/addList/api`,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 专家管理-编辑
export const spPersonEditApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      params,
      url: `/${DOMES}/spPerson/edit`,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 专家管理-移除专家
export const spPersonRemoveApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      params,
      url: `/${DOMES}/spPerson/remove/combox`,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 专家管理-发电子聘书
export const spPersonSendLetterApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      params,
      url: `/${DOMES}/spPerson/sendLetter/combox`,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 专家管理-获取电子聘书模版
export const spPersonSendLetterViewApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      params,
      url: `/${DOMES}/spPerson/sendLetterView/combox`,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 专家管理-发送邀请邮件
export const spPersonSendInvitationLetterApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      params,
      url: `/${DOMES}/spPerson/sendInvitationLetter/combox`,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 专家管理-获取邀请模版
export const spPersonSendInvitationLetterViewApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      params,
      url: `/${DOMES}/spPerson/sendInvitationLetterView/combox`,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 专家管理-领域饼图,居住地环形图,任职单位柱状图
export const spPersonPieChartApi = (mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/spPerson/pieChart/combox`,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 专家管理-专家数量统计
export const spPersonStatisticsCountApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      params,
      url: `/${DOMES}/spPerson/statisticsCount/combox`,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 专家管理-导入
export const spPersonImportByExcelApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/spPerson/importByExcel`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_DATA },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
