import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel } from './model/userModel';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/dosso/login',
  LawCaseInfoList = '/docales/lawCaseInfo/list',
}
import { getAppEnvConfig } from '/@/utils/env';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

export const testLoginApi = (params: LoginParams, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const lawCaseInfoList = (params: any, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: Api.LawCaseInfoList,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
