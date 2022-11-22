/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-24 09:55:23
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-27 14:09:26
 * @FilePath: /rural-revitalization/src/api/testDemo/systemCode.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { DOSYS } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();
import { ContentTypeEnum } from '/@/enums/httpEnum';

// 系统设置-列表
export const dosysSysParameterListApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOSYS}/sysParameter/list`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 系统设置-编辑
export const dosysSysParameterSaveApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOSYS}/sysParameter/save`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 系统设置-更新缓存
export const dosysSysParameterRefreshApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOSYS}/sysParameter/refresh`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
