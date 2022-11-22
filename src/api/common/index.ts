/*
 * @Author: your name
 * @Date: 2022-05-24 13:39:54
 * @LastEditTime: 2022-09-08 13:30:03
 * @LastEditors: 江雪松 576053154@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vben-admin-thin-next-main/src/api/common/index.ts
 */
import { defHttp } from '/@/utils/http/axios';
import { DoUcenterOrgTreeParams, UcenterCodeComboxParams } from './commonModel';
import { getAppEnvConfig } from '/@/utils/env';
import { ErrorMessageMode } from '/#/axios';
import { UCENTER, DOLOCK, DOSYS } from '/@/enums/apiModuleEnum';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

export function doUcenterOrgTree(params: DoUcenterOrgTreeParams, mode: ErrorMessageMode = 'modal') {
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
}

export function ucenterCodeCombox(
  params: UcenterCodeComboxParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterCode/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

export function ucenterCodeTree(params: UcenterCodeComboxParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterCode/tree`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 获取密钥
export const sysSecretView = (mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOLOCK}/sys/secret/view`,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 获取电子聘书
export function dosysSysParameterComboxApi(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: `/${DOSYS}/sysParameter/combox/api`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 下载模板
export const sysParameterLoad = (params?, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOSYS}/sysParameter/load/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
