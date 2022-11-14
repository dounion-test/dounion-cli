/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-08 14:13:57
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-06-09 15:30:38
 * @FilePath: /vben-ucenter/src/api/testDemo/func.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { UCENTER } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

// 菜单管理-树列表
export const getUcenterFunctionListTreeApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterFunction/list/tree`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 菜单管理-新增
export const ucenterFunctionAddApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterFunction/add`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 菜单管理-修改
export const ucenterFunctionEditApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterFunction/save`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 菜单管理-删除
export const ucenterFunctionDeleteApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterFunction/delete`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 菜单管理-查看
export const ucenterFunctionviewApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterFunction/view`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 菜单管理-列表
export const getUcenterFunctionListApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterFunction/list`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
