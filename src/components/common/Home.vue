<template>
  <div class="home-wrap">
    <!-- 头部组件 -->
    <v-head></v-head>
    <!-- 侧边栏组件 -->
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <!-- 标签栏组件 -->
      <v-tags></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <!-- keep-alive 是 Vue 的内置组件，能在组件切换过程中将状态保留在内存中
        include: 字符串或正则表达式。只有匹配的组件会被缓存。
        exclude: 字符串或正则表达式。任何匹配的组件都不会被缓存。 -->
          <keep-alive :include="tagsList">
            <!-- 次级出口，用以引入次级组件。例如下一个实验中的首页组件 -->
            <router-view></router-view>
          </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
    <!--引入次级组件 -->
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
import bus from "../../utils/bus";
export default {
  data () {
    return {
      tagsList: [],
      collapse: false,
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags,
  },
  // 在生命周期中收取其他页面传递过来的侧边栏的折叠状态，并对标签列表使用 keep-alive。实现打开标签后，在不关闭标签的情况下跳转其他页面，已经打开的标签不会丢失的效果
  created () {
    bus.$on("collapse-content", (msg) => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用 keep-alive ，即关闭标签之后就不保存到内存中了
    bus.$on("tags", (msg) => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  },
};
</script>
