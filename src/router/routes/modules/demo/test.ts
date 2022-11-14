import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/testRouter',
  name: 'testRouter',
  component: LAYOUT,
  redirect: '/testRouter/A',
  meta: {
    orderNo: 2000,
    icon: 'ion:settings-outline',
    title: '测试路由',
  },
  children: [
    {
      path: '/testRouter/A',
      name: 'TestRouterA',
      meta: {
        title: '测试路由A',
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/demo/testDemo/A.vue'),
    },
    {
      path: '/testRouter/B',
      name: 'TestRouterB',
      meta: {
        title: '测试路由B',
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/demo/testDemo/B.vue'),
    },
  ],
};

export default system;
