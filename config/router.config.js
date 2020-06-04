export default [
  {
    path: '/',
    component: '../layouts/PCLayout.js',
    routes: [
      { path: '/', component: './home', title: '亚冠体育' },
      { path: '/401', component: './401', title: '亚冠体育-登录过期' },
      { component: '404', title: '页面没找到' },
    ],
  },
];
