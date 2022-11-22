import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { getAppEnvConfig } from '/@/utils/env';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

export const getSpSciSubjectList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/domes/spSciSubject/list`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const spSciSubjectAdd = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/spSciSubject/add`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const spSciSubjectEdit = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/spSciSubject/save`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const spSciSubjectMySubjectList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/domes/spSciSubject/my/subjectList`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const spSciSubjectView = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/domes/spSciSubject/view`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const spSciSubjectDelete = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/spSciSubject/delete`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const mySpSciApplyList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/domes/spSciApply/myList`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const mySpSciApplyAdd = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/spSciApply/add`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const mySpSciApplyEdit = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/spSciApply/edit`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const mySpSciApplyView = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/domes/spSciApply/view`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const mySpSciApplyDelete = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/spSciApply/delete`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 工作流-获取首部任务
export const firstTask = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/domes/mesOaFlow/common/firstTask/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 成果认定-提交审批
export const spSciApplySubmit = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/spSciApply/submit`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 成果认定审批列表
export const spSciApplyMyList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/domes/spSciApply/myList`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

/**
 * 申报相关接口
 * @param params
 * @param mode
 * @returns
 */
export const spSciDeclareList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/domes/spSciDeclare/list`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const spSciDeclareAdd = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/spSciDeclare/add`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const spSciDeclareEdit = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/spSciDeclare/save`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const spSciDeclareView = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/domes/spSciDeclare/view`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const spSciDeclareDelete = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/spSciDeclare/delete`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opPublicList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/domes/opPublic/list/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
