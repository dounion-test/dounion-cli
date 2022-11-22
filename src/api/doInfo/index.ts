import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { DOMES } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

export const infoDocList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/infoDoc/list`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const infoDocDelete = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/infoDoc/delete`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const infoTypeFirstLevel = (mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/infoType/firstLevel/combox`,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const infoTypeSecondLevel = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/infoType/secondLevel/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const infoTypeLevelTree = (mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/infoType/level/tree`,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const infoTypeDoc = (mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/infoType/doc/combox`,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const infoDocCombox = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/infoDoc/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const infoLabelCombox = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/infoLabel/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const infoDocAdd = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/infoDoc/add`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const infoDocEdit = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/infoDoc/edit`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const infoDocView = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/infoDoc/view`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
