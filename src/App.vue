<template>
  <div id="app">
    <!-- 路由出口，通过路由调控的组件都会渲染到这个出口处 -->
    <router-view></router-view>
  </div>
</template>

<script>
import vHome from './components/common/Home.vue';

export default {
  name: 'App',
  components: {
    // 挂载Home组件
    vHome,
  },
}
</script>

<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css'; /*深色主题*/
/* @import './assets/css/theme-green/color-green.css';  浅绿色主题 */
</style>
