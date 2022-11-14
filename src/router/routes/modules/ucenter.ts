/*
 * @Author: your name
 * @Date: 2022-05-23 14:50:21
 * @LastEditTime: 2022-05-31 15:08:36
 * @LastEditors: 江雪松 576053154@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vben-admin-thin-next-main/src/router/routes/modules/ucenter.ts
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const ucenter: AppRouteModule = {
  path: '/ucenter',
  name: 'Ucenter',
  component: LAYOUT,
  redirect: '/ucenter/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.ucenter'),
    orderNo: 101,
  },
  children: [
    // {
    //   path: 'index',
    //   name: 'UcenterPage',
    //   component: () => import('/@/views/systemManager/ucenterPerson/index.vue'),
    //   meta: {
    //     title: t('routes.dashboard.ucenterPerson'),
    //   },
    // },
    // {
    //   path: 'personAdd/:type',
    //   name: 'UcenterPersonAdd',
    //   component: () => import('/@/views/systemManager/ucenterPerson/pageSave.vue'),
    //   meta: {
    //     title: t('routes.dashboard.ucenterPersonAdd'),
    //     hideMenu: true,
    //   },
    // },
    // {
    //   path: 'personAdd/:type/:id',
    //   name: 'UcenterPersonEdit',
    //   component: () => import('/@/views/systemManager/ucenterPerson/pageSave.vue'),
    //   meta: {
    //     title: t('routes.dashboard.ucenterPersonEdit'),
    //     hideMenu: true,
    //   },
    // },
    // {
    //   path: 'personView/:id',
    //   name: 'UcenterPersonView',
    //   component: () => import('/@/views/systemManager/ucenterPerson/personView.vue'),
    //   meta: {
    //     title: t('routes.dashboard.ucenterPersonView'),
    //     hideMenu: true,
    //   },
    // },
  ],
};

export default ucenter;
