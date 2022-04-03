export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: 'registry',
        path: '/user/registry',
        component: './user/Registry',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '个人资料',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/work',
    name: '作品',
    icon: 'crown',
    routes: [
      {
        path: '/work/my',
        name: '我的视频',
        component: './work/My',
      },
      {
        path: '/work/upload',
        name: '上传视频',
        component: './work/Upload',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/live',
    name: '直播',
    icon: 'crown',
    routes: [
      {
        path: '/live/create',
        name: '直播管理',
        component: './live/Create',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/review',
    name: '视频审核',
    icon: 'crown',
    component: './Review',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
