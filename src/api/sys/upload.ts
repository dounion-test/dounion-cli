/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2022-05-27 17:42:32
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-08-12 17:51:22
 * @FilePath: /vben-ucenter/src/api/sys/upload.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
// import { useGlobSetting } from '/@/hooks/setting';
import { getAppEnvConfig } from '/@/utils/env';

// const { uploadUrl = '' } = useGlobSetting();
const { VITE_GLOB_API_DEV_URL } = getAppEnvConfig();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  console.log(params, 'params');
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: '/dosys/file/upload',
      baseURL: VITE_GLOB_API_DEV_URL,
      onUploadProgress,
    },
    params,
  );
}
