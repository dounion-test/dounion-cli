/*
 * @Author: your name
 * @Date: 2022-05-23 15:15:59
 * @LastEditTime: 2022-09-01 20:04:43
 * @LastEditors: 江雪松 576053154@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vben-admin-thin-next-main/src/api/ucenter/system.ts
 */
import { defHttp } from '/@/utils/http/axios';
import {
  UcenterPersonList,
  UcenterPersonListRes,
  UcenterRoleComboxParams,
  UcenterPersonAddParams,
  UcenterPersonSaveParams,
  UcenterOrgListParams,
  UcenterPersonViewParams,
  UcenterPersonLockParams,
  UcenterPersonDeleteParams,
  UcenterPersonResetPwdParams,
} from './model/personModel';
import { getAppEnvConfig } from '/@/utils/env';
import { ErrorMessageMode } from '/#/axios';
import { UCENTER } from '/@/enums/apiModuleEnum';
import { ContentTypeEnum } from '/@/enums/httpEnum';

const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

// 人员管理列表
export function ucenterPersonListApi(params: UcenterPersonList, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<UcenterPersonListRes>(
    {
      url: `/${UCENTER}/ucenterPerson/list`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 人员管理-列表(多账号)
export function ucenterPersonNewListApi(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterPerson/new/list`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 添加
export function ucenterPersonAddApi(
  params: UcenterPersonAddParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterPerson/add`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 添加(新)
export function ucenterPersonAddNewApi(
  params: UcenterPersonAddParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterPerson/addNew`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 编辑
export function ucenterPersonSaveApi(
  params: UcenterPersonSaveParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterPerson/save`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 编辑(新)
export function ucenterPersonSaveNewApi(
  params: UcenterPersonSaveParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterPerson/saveNew`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 删除
export function ucenterPersonDeleteApi(
  params: UcenterPersonDeleteParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterPerson/delete`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 查看
export function ucenterPersonViewApi(
  params: UcenterPersonViewParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterPerson/view`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 查看（多账号）
export function ucenterPersonTypeViewApi(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterPerson/typeView`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 锁定
export function ucenterPersonLockApi(
  params: UcenterPersonLockParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterPerson/lock`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 锁定(多账号)
export function ucenterPersonNewLockApi(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterPerson/new/lock`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 解锁
export function ucenterPersonUnlockApi(
  params: UcenterPersonLockParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterPerson/unlock`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 解锁(多账号)
export function ucenterPersonNewUnlockApi(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterPerson/new/unlock`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 重置密码
export function ucenterPersonResetPwdApi(
  params: UcenterPersonResetPwdParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterPerson/resetPwd`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 注销
export function ucenterPersonDestroyApi(
  params: UcenterPersonLockParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterPerson/destroy`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 注销（多账号）
export function ucenterPersonNewDestroyApi(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: `/${UCENTER}/ucenterPerson/new/destroy`,
      params,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 职位列表-combox
export function ucenterPositionComboxApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterPosition/combox`,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 树
export function ucenterRoleComboxApi(
  params: UcenterRoleComboxParams,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterRole/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}

// 部门列表
export function ucenterOrgListApi(params: UcenterOrgListParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    {
      url: `/${UCENTER}/ucenterOrg/list`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
}
