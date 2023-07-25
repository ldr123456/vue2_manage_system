// 在需要通信的组件中引入该文件
import Vue from 'vue';

// 使用 Event Bus来实现非父子组件之间的通信
const bus = new Vue();

export default bus;