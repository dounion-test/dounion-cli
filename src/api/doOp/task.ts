/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-20 14:40:17
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-27 10:32:58
 * @FilePath: /rural-revitalization/src/api/doMail/add.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { DOMES } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
import { ContentTypeEnum } from '/@/enums/httpEnum';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

// 调研任务管理-列表
export const domesOpTaskListApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTask/list`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 调研任务管理-列表(下拉)
export const domesOpSurveyListComboxApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opSurvey/list/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 调研任务管理-审批类型(下拉)
export const domesOpTaskFillWayApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTask/fillWay/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 调研任务管理-新增
export const domesOpTaskAddApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTask/add`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 调研任务管理-编辑
export const domesOpTaskEditApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTask/edit`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 调研任务管理-查看
export const domesOpTaskViewApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTask/view`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 调研任务管理-发布(创建时)
export const domesOpTaskPublishApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTask/publish/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 调研任务管理-发布(列表)
export const domesOpTaskBatchPublishApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTask/batchPublish/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 调研任务管理-正式发布(列表)
export const domesOpTaskFormalPublishApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTask/formalPublish`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 调研任务管理-结束
export const domesOpTaskBatchFinishApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTask/batchFinish/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
