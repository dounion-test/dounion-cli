/*
 * @Author: your name
 * @Date: 2022-05-23 15:17:41
 * @LastEditTime: 2022-06-22 10:26:56
 * @LastEditors: 江雪松 576053154@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vben-admin-thin-next-main/src/api/ucenter/modal/systemModal.ts
 */

export interface UcenterPersonList {
  pageNo: number;
  pageSize: number;
  pathIds?: string;
}

export interface UcenterPersonAddParams {
  name: string;
  mobile: string;
  sex: string;
  account?: string | undefined;
  billNo?: string | undefined;
  birthday?: string | undefined;
  marriage?: string | undefined;
  nation?: string | undefined;
  telephone?: string | undefined;
  email?: string | undefined;
  posId?: number | undefined;
  posLevel?: string | undefined;
  political?: string | undefined;
  remark?: string | undefined;
  personImg?: string | undefined;
  manageFunc?: string | undefined;
  ucenterPersonOrgs: string;
  roleIds: string | undefined;
  paryId?: string | undefined;
  graduateSchool?: string | undefined;
  education?: string | undefined;
  degree?: string | undefined;
  graduateTime?: string | undefined;
  major?: string | undefined;
  joinPartyDate?: string | undefined;
  beginWorkTime?: string | undefined;
  workTime?: string | undefined;
  imsiNo?: string | undefined;
  imeiNo?: string | undefined;
  zipcode?: string | undefined;
  address?: string | undefined;
}

export interface UcenterPersonSaveParams {
  id: string;
  name: string;
  mobile: string;
  sex: string;
  account?: string | undefined;
  billNo?: string | undefined;
  birthday?: string | undefined;
  marriage?: string | undefined;
  nation?: string | undefined;
  telephone?: string | undefined;
  email?: string | undefined;
  posId?: number | undefined;
  posLevel?: string | undefined;
  political?: string | undefined;
  remark?: string | undefined;
  personImg?: string | undefined;
  manageFunc?: string | undefined;
  ucenterPersonOrgs: string;
  roleIds: string | undefined;
  paryId?: string | undefined;
  graduateSchool?: string | undefined;
  education?: string | undefined;
  degree?: string | undefined;
  graduateTime?: string | undefined;
  major?: string | undefined;
  joinPartyDate?: string | undefined;
  beginWorkTime?: string | undefined;
  workTime?: string | undefined;
  imsiNo?: string | undefined;
  imeiNo?: string | undefined;
  zipcode?: string | undefined;
  address?: string | undefined;
}

export interface UcenterPersonDeleteParams {
  idQueryIn: string;
}

export interface UcenterPersonViewParams {
  id: number;
}

export interface UcenterPersonLockParams {
  accounts: string;
}

export interface UcenterPersonResetPwdParams {
  account: string;
}

export interface UcenterPersonListRes {
  list: any[];
  total: number;
}

export interface UcenterRoleComboxParams {
  pageSize: number;
}

export interface UcenterOrgListParams {
  pageNo: number;
  pageSize: number;
  cNameOrCodeOrSnameOrLinkerQueryLike?: string;
}
