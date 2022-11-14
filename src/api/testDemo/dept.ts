import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { UCENTER, DOMES } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();
import { ContentTypeEnum } from '/@/enums/httpEnum';

// 部门管理
export const getUcenterOrgTree = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterOrg/tree`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
export const getUcenterOrgPersonTree = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterOrg/listDeptPerson/tree`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const getUcenterOrgList = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterOrg/list`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const getUcenterDeptPersonAdd = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterOrg/add`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const getUcenterDeptPersonEdit = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterOrg/save`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const getUcenterDeptPersonView = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterOrg/view`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const delUcenterDept = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterOrg/delete`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 部门调整
export const getDeptAdjustmentList = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterDeptPerson/list`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const mesOaFlowNextPersonList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/mesOaFlow/nextPersonList/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
