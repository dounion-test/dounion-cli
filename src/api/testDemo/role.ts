import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { UCENTER } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();
import { ContentTypeEnum } from '/@/enums/httpEnum';

export const getUcenterRoleList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterRole/list`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const postUcenterRoleAdd = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterRole/add`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const postUcenterRoleEdit = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterRole/save`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const getUcenterRoleView = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterRole/view`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const delUcenterRole = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterRole/delete`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
