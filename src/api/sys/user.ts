/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-17 09:38:18
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-14 17:16:18
 * @FilePath: /rural-revitalization/src/api/sys/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { ErrorMessageMode } from '/#/axios';
import { getAppEnvConfig } from '/@/utils/env';
import { UCENTER, DOSSO } from '/@/enums/apiModuleEnum';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: `/${DOSSO}/type/login`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get(
    { url: `/${UCENTER}/ucenterPerson/loginView/combox` },
    { errorMessageMode: 'none', apiUrl: VITE_GLOB_API_DEV_URL },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function sendSMS(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: `/${DOSSO}/sms/send`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    { errorMessageMode: mode, apiUrl: VITE_GLOB_API_DEV_URL },
  );
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
