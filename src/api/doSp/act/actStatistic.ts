/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-08-12 16:57:20
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-03 10:32:48
 * @FilePath: /rural-revitalization/src/api/doSp/act/sciAct.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { DOMES } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
import { ContentTypeEnum } from '/@/enums/httpEnum';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

// 活动统计(列表)
export const getSpSciActActStatisticApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/spSciAct/actStatistic/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 活动统计(饼图)
export const getSpSciActPieChartApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/spSciAct/pieChart/combox`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
