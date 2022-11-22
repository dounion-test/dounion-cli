import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { getAppEnvConfig } from '/@/utils/env';
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();
import { DOMES } from '/@/enums/apiModuleEnum';

/**
 * 调研表管理
 */
export const getOpSurveyList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/opSurvey/list/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const getOpSurveyView = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/opSurvey/view/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const getOpSurveyDateList = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/opSurvey/dateList/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opSurveyAdd = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opSurvey/add/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opSurveyEdit = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opSurvey/edit/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opTemplateAdd = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTemplate/add/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opTemplateDelete = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTemplate/delete/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opTemplateEdit = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTemplate/edit/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 表单设计查看
export const opTemplateViewDesign = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/opTemplate/viewDesign/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 表单设计保存
export const opTemplateSaveDesign = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTemplate/saveDesign/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 表单设计保存
export const opTemplateSubjectTreeCombox = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTemplate/subjectTree/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 逻辑批量保存
export const opLoicSettingBatchSave = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opLoicSetting/batchSave/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opLoicSettingListAll = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/opLoicSetting/listAll/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 问卷填报系统-调研表填报（列表）
export const opAnswerReportLoadSurveyApi = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opAnswerReport/loadSurvey/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opTemplatePreview = (params, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTemplate/preview/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

// 题库列表
export const opQuestionBankCategoryList = (params?, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opQuestionBank/categoryList/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opQuestionBankLayeredList = (params?, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opQuestionBank/layeredList/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opTemplateLoadSurveyByFillCombox = (params?, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/${DOMES}/opTemplate/loadSurveyByFill/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const sysColumnConfigFullList = (params?, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/sysColumnConfig/fullList`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opSurveyCopy = (params?, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/opSurvey/copy/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};

export const opSurveyDelete = (params?, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get(
    {
      url: `/${DOMES}/opSurvey/delete/combox`,
      params,
    },
    {
      errorMessageMode: mode,
      apiUrl: VITE_GLOB_API_DEV_URL,
    },
  );
};
