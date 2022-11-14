/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-06-01 18:16:06
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-09-02 14:42:36
 * @FilePath: /rural-revitalization/src/api/sys/menu.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel, getMenutreeParams } from './model/menuModel';
import { UCENTER } from '/@/enums/apiModuleEnum';
import { getAppEnvConfig } from '/@/utils/env';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();
enum Api {
  GetMenuList = '/getMenuList',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};
/**侵入式-添加 */
export const getMyAppListOld = () => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterFunction/newProject/tree`,
    },
    {
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const getMenuTreeOld = (params: getMenutreeParams) => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterFunction/newMenu/tree`,
      params,
    },
    {
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

/**侵入式-添加(上面两个的新接口) */
export const getMyAppList = () => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterFunction/newProjectCache/tree`,
    },
    {
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const getMenuTree = (params: getMenutreeParams) => {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterFunction/newMenuCache/tree`,
      params,
    },
    {
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
