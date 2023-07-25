import Vue from 'vue';
// 引入路由插件
import Router from 'vue-router';

Vue.use(Router);

// 实例化 VueRouter，并将路由配置文件传递到 VueRouter 实例上
export default new Router({
  routes: [
    // 设置路由配置
    {
      // 设置URL
      path: '/',
      //设置重定向，将 Dashboard 组件设为默认路由组件
      redirect: '/dashboard',
    },
    {
      path: '/',
      // 设置对应组件 将需要引用的组件通过箭头函数直接挂载到组件上
      component: () => import('../components/common/Home.vue'),
      meta: { title: '自述' },
      children: [
        {
          path: 'dashboard',
          component: () => import('../components/page/Dashboard.vue'),
          meta: { title: '系统首页' },
        },
        {
          path: 'tabs',
          component: () => import('../components/page/Tabs.vue'),
          meta: { title: 'tab选项卡' },
        },
        {
          path: 'table',
          component: () => import('../components/page/BaseTable.vue'),
          meta: { title: '基础表格' },
        },
        {
          // vue-schart组件
          path: 'charts',
          component: () => import('../components/page/BaseCharts.vue'),
          meta: { title: 'schart图表' },
        },
        {
          // 拖拽列表组件
          path: 'drag',
          component: () => import('../components/page/DragList.vue'),
          meta: { title: '拖拽列表' },
        },
        {
          // 拖拽Dialog组件
          path: 'dialog',
          component: () => import('../components/page/DragDialog.vue'),
          meta: { title: '拖拽弹框' },
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../components/page/Login.vue'),
      meta: { title: '登录' }
    },
  ],
});
