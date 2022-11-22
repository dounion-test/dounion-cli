/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-24 09:55:23
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-28 18:10:07
 * @FilePath: /rural-revitalization/src/api/testDemo/systemCode.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { ACTIVITI, DOMES } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();
import { ContentTypeEnum } from '/@/enums/httpEnum';

// 流程历史-列表
export const activitiProcessDefineListApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${ACTIVITI}/processDefine/page`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 流程定义-列表
export const domesOaFlowDefineListApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/oaFlowDefine/list`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
