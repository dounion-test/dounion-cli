import { resultSuccess, resultError, getRequestToken, requestParams } from '../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createFakeUserList } from './user';

// single
const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  component: 'LAYOUT',
  redirect: '/dashboard/analysis',
  meta: {
    title: 'routes.dashboard.dashboard',
    hideChildrenInMenu: true,
    icon: 'bx:bx-home',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: '/dashboard/analysis/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: 'routes.dashboard.analysis',
        currentActiveMenu: '/dashboard',
        icon: 'bx:bx-home',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: '/dashboard/workbench/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: 'routes.dashboard.workbench',
        currentActiveMenu: '/dashboard',
        icon: 'bx:bx-home',
      },
    },
  ],
};

const backRoute = {
  path: 'back',
  name: 'PermissionBackDemo',
  meta: {
    title: 'routes.demo.permission.back',
  },

  children: [
    {
      path: 'page',
      name: 'BackAuthPage',
      component: '/demo/permission/back/index',
      meta: {
        title: 'routes.demo.permission.backPage',
      },
    },
    {
      path: 'btn',
      name: 'BackAuthBtn',
      component: '/demo/permission/back/Btn',
      meta: {
        title: 'routes.demo.permission.backBtn',
      },
    },
  ],
};

const authRoute = {
  path: '/permission',
  name: 'Permission',
  component: 'LAYOUT',
  redirect: '/permission/front/page',
  meta: {
    icon: 'carbon:user-role',
    title: 'routes.demo.permission.permission',
  },
  children: [backRoute],
};

const levelRoute = {
  path: '/level',
  name: 'Level',
  component: 'LAYOUT',
  redirect: '/level/menu1/menu1-1',
  meta: {
    icon: 'carbon:user-role',
    title: 'routes.demo.level.level',
  },

  children: [
    {
      path: 'menu1',
      name: 'Menu1Demo',
      meta: {
        title: 'Menu1',
        hideChildrenInMenu: true,
      },
      children: [
        {
          path: 'menu1-1',
          name: 'Menu11Demo',
          meta: {
            title: 'Menu1-1',
          },
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu111Demo',
              component: '/demo/level/Menu111',
              meta: {
                title: 'Menu111',
              },
            },
          ],
        },
        {
          path: 'menu1-2',
          name: 'Menu12Demo',
          component: '/demo/level/Menu12',
          meta: {
            title: 'Menu1-2',
          },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2Demo',
      component: '/demo/level/Menu2',
      meta: {
        title: 'Menu2',
      },
    },
  ],
};

const sysRoute = {
  path: '/system',
  name: 'System',
  component: 'LAYOUT',
  redirect: '/system/account',
  meta: {
    icon: 'ion:settings-outline',
    title: 'routes.demo.system.moduleName',
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: 'routes.demo.system.account',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/account/index',
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: 'routes.demo.system.account_detail',
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
      },
      component: '/demo/system/account/AccountDetail',
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: 'routes.demo.system.role',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/role/index',
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: 'routes.demo.system.menu',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/menu/index',
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: 'routes.demo.system.dept',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/dept/index',
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: 'routes.demo.system.password',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/password/index',
    },
    {
      path: 'survey',
      name: 'survey',
      meta: {
        title: '问卷调查',
        ignoreKeepAlive: true,
      },
      component: '/demo/system/survey/index',
    },
  ],
};

const linkRoute = {
  path: '/link',
  name: 'Link',
  component: 'LAYOUT',
  meta: {
    icon: 'ion:tv-outline',
    title: 'routes.demo.iframe.frame',
  },
  children: [
    {
      path: 'doc',
      name: 'Doc',
      meta: {
        title: 'routes.demo.iframe.doc',
        frameSrc: 'https://vvbin.cn/doc-next/',
      },
    },
    {
      path: 'https://vvbin.cn/doc-next/',
      name: 'DocExternal',
      component: 'LAYOUT',
      meta: {
        title: 'routes.demo.iframe.docExternal',
      },
    },
  ],
};

const ruralRevitalization = {
  path: '/rural',
  name: 'Rural',
  component: 'LAYOUT',
  redirect: '/rural/survey',
  meta: {
    icon: 'ant-design:rocket-outlined',
    title: '乡村振兴',
  },
  children: [
    {
      path: 'survey',
      name: 'survey',
      meta: {
        title: '问卷调查',
        ignoreKeepAlive: true,
      },
      component: '/demo/survey/index',
    },
    {
      path: 'survey-demo',
      name: 'survey-demo',
      meta: {
        title: '问卷调查demo',
        ignoreKeepAlive: true,
        hideChildrenInMenu: true,
      },
      component: '/demo/survey-demo/index',
      children: [
        {
          path: 'preview/:id',
          name: 'SurveyPreview',
          meta: {
            title: '问卷调查-预览',
            ignoreKeepAlive: true,
            hideChildrenInMenu: true,
          },
          component: '/demo/survey-demo/view',
        },
      ],
    },
    {
      path: 'scientific-manager',
      name: 'ScientificManager',
      meta: {
        title: '科研管理',
        ignoreKeepAlive: true,
        hideChildrenInMenu: true,
      },
      component: '/demo/scientific/index',
      children: [
        {
          path: 'add',
          name: 'ScientificAdd',
          meta: {
            title: '科研管理-新增',
            ignoreKeepAlive: true,
          },
          component: '/demo/scientific/add',
        },
        {
          path: 'view/:id',
          name: 'scientificView',
          meta: {
            title: '科研管理-查看',
            ignoreKeepAlive: true,
          },
          component: '/demo/scientific/view',
        },
      ],
    },

    {
      path: 'recognition',
      name: 'Recognition',
      meta: {
        title: '成果认定',
        ignoreKeepAlive: true,
      },
      component: '/demo/recognition/index',
      children: [],
    },
    {
      path: 'survey-list',
      name: 'surveyList',
      meta: {
        title: '问卷设计管理',
        ignoreKeepAlive: true,
      },
      component: '/demo/survey-list/index',
    },
  ],
};

const expertRoute = {
  path: '/expstore',
  name: 'expstore',
  component: 'LAYOUT',
  redirect: '/expstore/expert',
  meta: {
    icon: 'ant-design:rocket-outlined',
    title: '专家库',
  },
  children: [
    {
      path: 'expert',
      name: 'Expert',
      meta: {
        title: '专家管理',
        hideChildrenInMenu: true,
      },
      component: '/expstore/expert/index',
      children: [
        {
          path: ':type',
          name: 'ExpertAdd',
          component: '/expstore/expert/add',
          meta: {
            title: '专家管理-新增',
            hideMenu: true,
            currentActiveMenu: '/expstore/expert',
          },
        },
        {
          path: ':type/:id',
          name: 'ExpertEdit',
          component: '/expstore/expert/add',
          meta: {
            title: '专家管理-编辑',
            hideMenu: true,
            currentActiveMenu: '/expstore/expert',
          },
        },
        {
          path: 'view/:id',
          name: 'ExpertView',
          component: '/expstore/expert/view',
          meta: {
            title: '专家管理-查看',
            hideMenu: true,
            currentActiveMenu: '/expstore/expert',
          },
        },
      ],
    },
    {
      path: 'activity',
      name: 'activity',
      meta: {
        title: '活动管理',
      },
      children: [
        {
          path: 'list',
          name: 'ExpertActivityList',
          meta: {
            title: '活动列表',
            hideChildrenInMenu: true,
          },
          component: '/expstore/activity/list/index',
          children: [
            {
              path: ':type',
              name: 'ExpertActivityListAdd',
              component: '/expstore/activity/list/add',
              meta: {
                title: '活动管理-新增',
                hideMenu: true,
                currentActiveMenu: '/expstore/activity/list',
              },
            },
            {
              path: ':type/:id',
              name: 'ExpertActivityListEdit',
              component: '/expstore/activity/list/add',
              meta: {
                title: '活动管理-编辑',
                hideMenu: true,
                currentActiveMenu: '/expstore/activity/list',
              },
            },
            {
              path: 'view/:id',
              name: 'ExpertActivityListView',
              component: '/expstore/activity/list/view',
              meta: {
                title: '活动管理-查看',
                hideMenu: true,
                currentActiveMenu: '/expstore/activity/list',
              },
            },
            {
              path: 'summary/:id',
              name: 'ExpertActivityListView',
              component: '/expstore/activity/list/summary',
              meta: {
                title: '活动管理-总结',
                hideMenu: true,
                currentActiveMenu: '/expstore/activity/list',
              },
            },
          ],
        },
        {
          path: 'report',
          name: 'ExpertActivityReport',
          meta: {
            title: '活动统计',
            hideChildrenInMenu: true,
          },
          component: '/expstore/activity/report/index',
        },
      ],
    },
    // {
    //   path: 'myResume',
    //   name: 'myResume',
    //   meta: {
    //     title: '我的履历',
    //     hideChildrenInMenu: true,
    //   },
    //   component: '/expstore/myResume/index',
    //   children: [
    //     {
    //       path: ':type',
    //       name: 'myResumeAdd',
    //       component: '/expstore/myResume/add',
    //       meta: {
    //         title: '我的履历-新增',
    //         hideMenu: true,
    //         currentActiveMenu: '/expstore/myResume',
    //       },
    //     },
    //     {
    //       path: ':type/:id',
    //       name: 'myResumeEdit',
    //       component: '/expstore/myResume/add',
    //       meta: {
    //         title: '我的履历-编辑',
    //         hideMenu: true,
    //         currentActiveMenu: '/expstore/myResume',
    //       },
    //     },
    //   ],
    // },
  ],
};

const infoRoute = {
  path: '/doInfo',
  name: 'DoInfo',
  component: 'LAYOUT',
  redirect: '/doInfo/synthesize',
  meta: {
    icon: 'ant-design:rocket-outlined',
    title: '信息库',
  },
  children: [
    {
      path: '/documentManage',
      name: 'documentManage',
      meta: {
        title: '文献管理',
        hideChildrenInMenu: true,
      },
      component: '/doInfo/document/index',
      children: [
        {
          path: 'add',
          name: 'documentManageAdd',
          meta: {
            title: '新增',
            hideMenu: true,
          },
          component: '/doInfo/document/add',
        },
      ],
    },
    {
      path: '/synthesizeManage',
      name: 'SynthesizeManage',
      meta: {
        title: '综合信息',
      },
      children: [
        {
          path: 'home',
          name: 'SynthesizeHome',
          meta: {
            title: '首页',
          },
          component: '/doInfo/synthesize/index',
        },
        {
          path: 'searchList',
          name: 'SearchList',
          component: '/doInfo/synthesize/search/index',
          meta: {
            title: '一站搜索',
            hideChildrenInMenu: true,
          },
          children: [
            {
              path: 'view/:id',
              name: 'SearchView',
              component: '/doInfo/synthesize/search/view',
              meta: {
                title: '一站搜索-查看',
                hideMenu: true,
                currentActiveMenu: '/synthesizeManage/SearchList',
              },
            },
          ],
        },
        {
          path: 'dynamicsList',
          name: 'SynthesizeDynamics',
          component: '/doInfo/synthesize/dynamics/index',
          meta: {
            title: '前沿动态',
            currentActiveMenu: '/synthesizeManage/dynamicsList',
            hideChildrenInMenu: true,
          },
          children: [
            {
              path: 'view/:id',
              name: 'SynthesizeDynamicsView',
              component: '/doInfo/synthesize/dynamics/view',
              meta: {
                title: '前沿动态-查看',
                hideMenu: true,
                currentActiveMenu: '/synthesizeManage/dynamicsList',
              },
            },
          ],
        },
        {
          path: 'statuteList',
          name: 'StatuteList',
          component: '/doInfo/synthesize/statute/index',
          meta: {
            title: '政策法规',
            hideChildrenInMenu: true,
          },
          children: [
            {
              path: 'view/:id',
              name: 'StatuteListView',
              component: '/doInfo/synthesize/statute/view',
              meta: {
                title: '政策法规-查看',
                hideMenu: true,
                currentActiveMenu: '/synthesizeManage/statuteList',
              },
            },
          ],
        },
        {
          path: 'case',
          name: 'CaseList',
          component: '/doInfo/synthesize/case/index',
          meta: {
            title: '典型案例',
            hideChildrenInMenu: true,
          },
        },
        {
          path: 'scientificList',
          name: 'ScientificList',
          component: '/doInfo/synthesize/scientific/index',
          meta: {
            title: '科研态势',
            hideChildrenInMenu: true,
          },
          children: [
            {
              path: 'view/:id',
              name: 'ScientificView',
              component: '/doInfo/synthesize/scientific/view',
              meta: {
                title: '科研态势-查看',
                hideMenu: true,
                currentActiveMenu: '/synthesizeManage/scientificList',
              },
            },
          ],
        },
        {
          path: 'special',
          name: 'SpecialList',
          component: '/doInfo/synthesize/special/index',
          meta: {
            title: '专题板块',
            hideChildrenInMenu: true,
          },
          children: [
            {
              path: 'paperView/:id',
              name: 'SpecialPaperView',
              component: '/doInfo/synthesize/special/paperView',
              meta: {
                title: '期刊论文-查看',
                hideMenu: true,
                currentActiveMenu: '/synthesizeManage/SpecialList',
              },
            },
            {
              path: 'reportView/:id',
              name: 'SpecialReportView',
              component: '/doInfo/synthesize/special/reportView',
              meta: {
                title: '研究报告-查看',
                hideMenu: true,
                currentActiveMenu: '/synthesizeManage/SpecialList',
              },
            },
          ],
        },
        {
          path: 'expertList',
          name: 'ExpertList',
          component: '/doInfo/synthesize/expert/index',
          meta: {
            title: '专家机构',
            hideChildrenInMenu: true,
          },
          children: [
            {
              path: 'expertView/:id',
              name: 'ExpertView',
              component: '/doInfo/synthesize/expert/expertView',
              meta: {
                title: '专家详情',
                hideMenu: true,
                currentActiveMenu: '/synthesizeManage/ExpertList',
              },
            },
            {
              path: 'orgView/:id',
              name: 'OrgView',
              component: '/doInfo/synthesize/expert/orgView',
              meta: {
                title: '机构详情',
                hideMenu: true,
                currentActiveMenu: '/synthesizeManage/ExpertList',
              },
            },
          ],
        },
      ],
    },
  ],
};

const ucenterRoute = {
  path: '/doUcenter',
  name: 'DoUcenter',
  component: 'LAYOUT',
  redirect: '/doUcenter/systemCode',
  meta: {
    icon: 'ion:settings-outline',
    title: '系统配置',
  },
  children: [
    {
      path: 'systemCode',
      name: 'SystemCode',
      meta: {
        title: '系统代码',
        ignoreKeepAlive: true,
        hideChildrenInMenu: true,
      },
      component: '/doUcenter/sysCode/index',
      children: [
        {
          path: 'view/:id',
          name: 'SystemCodeView',
          meta: {
            title: '系统代码-查看',
            ignoreKeepAlive: true,
          },
          component: '/doUcenter/sysCode/view',
        },
      ],
    },
    {
      path: 'logManager',
      name: 'LogManager',
      meta: {
        title: '登录日志',
        ignoreKeepAlive: true,
      },
      component: '/doUcenter/logManager/index',
    },
    {
      path: 'documentNoList',
      name: 'DocumentNoList',
      meta: {
        title: '单据编号管理',
        ignoreKeepAlive: true,
      },
      component: '/doUcenter/documentNoList/index',
    },
    {
      path: 'applyList',
      name: 'ApplyList',
      meta: {
        title: '应用管理',
        ignoreKeepAlive: true,
      },
      component: '/doUcenter/applyManager/index',
    },
    {
      path: 'messageTemplate',
      name: 'MessageTemplate',
      meta: {
        title: '消息模版设置',
        ignoreKeepAlive: true,
        hideChildrenInMenu: true,
      },
      component: '/doUcenter/messageTemplate/index',
      children: [
        {
          path: ':type',
          name: 'MessageTemplateAdd',
          meta: {
            title: '消息模版-新增',
            ignoreKeepAlive: true,
          },
          component: '/doUcenter/messageTemplate/add',
        },
        {
          path: ':type/:id',
          name: 'MessageTemplateEdit',
          meta: {
            title: '消息模版-编辑',
            ignoreKeepAlive: true,
          },
          component: '/doUcenter/messageTemplate/add',
        },
        {
          path: 'view/:id',
          name: 'MessageTemplateView',
          meta: {
            title: '消息模版-查看',
            ignoreKeepAlive: true,
          },
          component: '/doUcenter/messageTemplate/view',
        },
      ],
    },
    {
      path: 'sysParameterList',
      name: 'SysParameterList',
      meta: {
        title: '系统参数配置',
        ignoreKeepAlive: true,
      },
      component: '/doUcenter/sysParameterList/index',
    },
  ],
};

const doOproute = {
  path: '/doOp',
  name: 'DoOp',
  component: 'LAYOUT',
  redirect: '/doOP/opPerson',
  meta: {
    icon: 'ion:settings-outline',
    title: '固定观察点',
  },
  children: [
    {
      path: 'opPerson',
      name: 'OpPerson',
      meta: {
        title: '用户管理',
        ignoreKeepAlive: true,
        hideChildrenInMenu: true,
      },
      component: '/demo/testTable/index',
      children: [
        {
          path: ':type',
          name: 'OpPersonAdd',
          meta: {
            title: '新增',
            ignoreKeepAlive: true,
          },
          component: '/doOp/opPerson/add',
        },
        {
          path: ':type/:id',
          name: 'OpPersonEdit',
          meta: {
            title: '编辑',
            ignoreKeepAlive: true,
          },
          component: '/doOp/opPerson/add',
        },
      ],
    },
    {
      path: 'task',
      name: 'OpTask',
      meta: {
        title: '调研任务管理',
        ignoreKeepAlive: true,
        hideChildrenInMenu: true,
      },
      component: '/doOp/task/index',
      children: [
        {
          path: ':type',
          name: 'OpTaskAdd',
          meta: {
            title: '创建调研任务',
            ignoreKeepAlive: true,
          },
          component: '/doOp/task/add',
        },
        {
          path: ':type/:id',
          name: 'OpTaskEdit',
          meta: {
            title: '编辑',
            ignoreKeepAlive: true,
          },
          component: '/doOp/task/add',
        },
      ],
    },
    {
      path: 'opApproval/list',
      name: 'OpApprovalList',
      meta: {
        title: '审批上报系统',
        ignoreKeepAlive: true,
        hideChildrenInMenu: true,
      },
      component: '/doOp/approval/index',
      children: [],
    },
  ],
};

export default [
  {
    url: '/basic-api/getMenuList',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError('Invalid token!');
      }
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid user token!');
      }
      const id = checkUser.userId;
      let menu: Object[];
      switch (id) {
        case '1':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[0].path;
          menu = [
            dashboardRoute,
            authRoute,
            levelRoute,
            sysRoute,
            linkRoute,
            ruralRevitalization,
            expertRoute,
            infoRoute,
            ucenterRoute,
            doOproute,
          ];
          break;
        case '2':
          dashboardRoute.redirect = dashboardRoute.path + '/' + dashboardRoute.children[1].path;
          menu = [dashboardRoute, authRoute, levelRoute, linkRoute];
          break;
        default:
          menu = [];
      }

      return resultSuccess(menu);
    },
  },
] as MockMethod[];
