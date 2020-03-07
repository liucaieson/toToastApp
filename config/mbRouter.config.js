
export default [
  {
    path: '/',
    component: '../layouts/MBLayout',
    routes: [
      { path: '/', redirect: '/GamePage' },
      { path: '/GamePage', component: './mobile/home/GamePage', title: '首页' },
      { path: '/detail', component: './mobile/home/DetailPage', title: '投注页' },
      { path: '/MatchResult', component: './mobile/home/MatchResult', title: '赛果页' }
    ]
}]
