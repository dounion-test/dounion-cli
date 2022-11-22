import { defHttp } from '/@/utils/http/axios';
import { getAppEnvConfig } from '/@/utils/env';
import { ErrorMessageMode } from '/#/axios';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

export const mesOaFlowApprovalist = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/domes/mesOaFlow/approvallist`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const oaFlowAgree = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/mesOaFlow/agree/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const mesOaFlowReject = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/mesOaFlow/reject/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
