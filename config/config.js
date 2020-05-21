import PCPageRoutes from './router.config';
import MBPageRoutes from './mbRouter.config';

const path = require('path');

export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      dll: true,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ]
      },
      title: {
        defaultTitle: '亚冠体育',
      },
      hardSource: false,
    }],
  ],
  // 路由配置
  routes: PCPageRoutes,
  history: 'browser',
  hash: true
/*  proxy: {
    "/test": {
      "target": "http://35.229.133.12:8090",
      "changeOrigin": true,
      "pathRewrite": { "^/test" : "/api/v1" }
    }
  } */
}
