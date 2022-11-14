/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-08 14:13:57
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-06-14 13:47:44
 * @FilePath: /vben-ucenter/src/api/testDemo/func.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { UCENTER } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
import { ContentTypeEnum } from '/@/enums/httpEnum';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

export const getUcenterObjFuncList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterObjFunc/list`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const functionSave = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterObjFunc/save`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
