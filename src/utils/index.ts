import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import type { App, Plugin } from 'vue';

import { unref } from 'vue';
import { isObject } from '/@/utils/is';

export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }

  return src;
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

// 防抖函数
export const debounce = (function () {
  let timer: any = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

//打印公共方法
export const openPrintPreview = (params) => {
  if (params.dataList != null && params.dataList.length) {
    const newWindow: any = window.open('', params.title + new Date().getTime());
    const form = newWindow.document.createElement('form');
    newWindow.document.body.appendChild(form);
    const NODE_ENV = process.env.NODE_ENV === 'production' ? '' : '/dev-api';
    form.action =
      window.location.origin +
      NODE_ENV +
      `/domes/print/preview/combox?_sgk=` +
      params._sgk +
      '&t=' +
      new Date().getTime();
    form.method = 'post';
    const input = newWindow.document.createElement('input');
    input.name = 'dataList';
    input.value = JSON.stringify(params.dataList);
    form.appendChild(input);
    form.submit();
    newWindow.document.body.removeChild(form);
  }
};

// 从身份证号里获取出生年月日
export const GetBirthday = (psidno) => {
  let birthdayno, birthdaytemp;
  if (psidno.length == 18) {
    birthdayno = psidno.substring(6, 14);
  } else if (psidno.length == 15) {
    birthdaytemp = psidno.substring(6, 12);
    birthdayno = '19' + birthdaytemp;
  } else {
    return '';
  }
  const birthday =
    birthdayno.substring(0, 4) +
    '-' +
    birthdayno.substring(4, 6) +
    '-' +
    birthdayno.substring(6, 8);
  return birthday;
};
