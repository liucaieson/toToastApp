
export default [
  {
    path: '/',
    component: '../layouts/PCLayout.js',
    routes: [
      { path: '/', component: './home', title: '亚冠体育' },
      { component: '404', title: '页面没找到' },
    ],
  },
];
