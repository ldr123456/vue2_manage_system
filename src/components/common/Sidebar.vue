<template>
  <div class="sidebar">
    <!-- default-active：当前激活菜单的0；
        collapse：是否折叠收起菜单；
        unique-opened：是否只保持一个子菜单的展开，默认为false；
        router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转，默认值为false -->
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <!-- 对items进行遍历 -->
      <template v-for="item in items">
        <!-- 使用v-if判定是否具有第二级菜单 -->
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <!-- 如果存在第二级菜单，渲染第一级菜单标题 -->
              <span slot="title">{{ item.title }}</span>
            </template>

            <!-- 遍历第二级菜单 -->
            <template v-for="subItem in item.subs">
              <!-- 判定是否具有第三级菜单 -->
              <template v-if="subItem.subs">
                <el-submenu :index="subItem.index" :key="subItem.index">
                  <!-- 如果存在第三级菜单，渲染第二级菜单标题 -->
                  <template slot="title">{{ subItem.title }}</template>
                  <!-- 遍历第三级菜单，并渲染第三级菜单标题 -->
                  <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
                </el-submenu>
              </template>

              <!-- 如果不存在第三级菜单，渲染第二级菜单标题 -->
              <template v-else>
                <el-menu-item :index="subItem.index" :key="subItem.index">{{subItem.title}}</el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>

        <!-- 如果不存在第二级菜单，渲染第一级菜单标题 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
// 加载 bus 实现组件通信
import bus from "../../utils/bus";
export default {
  data () {
    return {
      collapse: false,
      items: [
        // 这些便是菜单的数据，目前并没有实现对应的功能，为了展示侧边栏的样式，提前模拟在这里。
        {
          icon: "el-icon-lx-home",
          index: "dashboard",
          title: "系统首页",
        },
        {
          icon: "el-icon-lx-cascades",
          index: "table",
          title: "基础表格",
        },
        {
          icon: "el-icon-lx-copy",
          index: "tabs",
          title: "tab选项卡",
        },
        {
          icon: "el-icon-pie-chart",
          index: "charts",
          title: "schart图表",
        },
        {
          icon: "el-icon-rank",
          index: "6",
          title: "拖拽组件",
          subs: [
            {
              index: "drag",
              title: "拖拽列表",
            },
            {
              index: "dialog",
              title: "拖拽弹框",
            },
          ],
        },
        {
          icon: "el-icon-folder",
          index: "2",
          title: "文件处理",
          subs: [
            {
              index: "upload",
              title: "文件上传",
            },
            {
              index: "2-2",
              title: "文本编辑器",
              subs: [
                {
                  index: "editor",
                  title: "富文本编辑器",
                },
                {
                  index: "markdown",
                  title: "markdown编辑器",
                },
              ],
            },
          ],
        },
        {
          icon: "el-icon-lx-global",
          index: "i18n",
          title: "国际化功能",
        },
        {
          icon: "el-icon-lx-warn",
          index: "7",
          title: "错误处理",
          subs: [
            {
              index: "permission",
              title: "权限测试",
            },
            {
              index: "404",
              title: "404页面",
            },
          ],
        },
      ],
    };
  },
  computed: {
    // 对每一个菜单点击后跳转的对应路由进行返回，作为属性 default-active 的值，从而通过 router 属性来进行对应的页面跳转
    onRoutes () {
      // 返回当前路由
      return this.$route.path.replace("/", "");
    },
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏，bus.$on()用于接收信息；bus.$emit()用于发送信息。
    bus.$on("collapses", (msg) => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  },
};
</script>

<!-- CSS样式 -->
<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>