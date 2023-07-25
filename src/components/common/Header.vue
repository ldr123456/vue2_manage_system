<template>
  <!-- 公共头部组件 -->
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <!-- 通过v-if和v-else来判定折叠按钮的状态 -->
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>

    <!-- 系统logo -->
    <div class="logo">后台管理系统</div>

    <!-- 头部组件右边功能区 -->
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <!--tooltip提供了两个主题：dark和light，通过 effect 设置主题 -->
          <!-- content通过三元表达式来设置不同的文字提示，placement属性控制文字提示出现的位置 -->
          <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message ? `有${message}条未读消息` : `消息中心`" placement="bottom">
            <!-- 点击后路由跳转 -->
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <!-- 通过对message的判定，来决定是否显示小红点 -->
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单：trigger属性配置 click 激活，command：点击菜单项触发的事件回调 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <!-- slot设置下拉列表 -->
          <el-dropdown-menu slot="dropdown">
            <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../../utils/bus";
export default {
  // 在组件中需要用到的数据
  data () {
    return {
      // 折叠栏初始状态
      collapse: false,
      // 全屏初始状态
      fullscreen: false,
      // 候补用户名
      name: "祥瑞",
      // 未读信息初始值
      message: 2,
    };
  },
  // 对在组件中自定义的属性进行监听，从本地存储中获取用户名。如果能够获取到值，则使用该值作为用户名，否则使用 data 中的 name
  computed: {
    username () {
      let username = localStorage.getItem("ms_username");
      return username ? username : this.name;
    },
  },

  methods: {
    // 设置 侧边栏折叠 事件对应的方法，在点击事件触发后对初始状态进行取反操作，以此来折叠和展开侧边栏
    collapseChage () {
      this.collapse = !this.collapse;
      // 通过bus发送信息
      bus.$emit("collapses", this.collapse);
    },
    // 用户名下拉菜单选择事件
    handleCommand (command) {
      //退出登录事件
      if (command == "loginout") {
        // 从本地存储中删除用户名
        localStorage.removeItem("ms_username");
        // 跳转到登录页面
        this.$router.push("/login");
      }
    },
    // 全屏事件
    handleFullScreen () {
      // 获取文档对象的根元素
      let element = document.documentElement;
      if (this.fullscreen) {
        // 设置不同浏览器下的退出全屏模式
        // -webkit- 兼容chrome 和 safari
        // -moz- 兼容firefox
        // -ms- 兼容IE浏览器
        // -o- 兼容opera
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        // 设置不同浏览器下的进入全屏模式
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
  },
  // 初始化页面完成后，对页面可见区域宽度进行判定，如果页面宽度小于1500，则触发 collapseChage 方法。
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
    //通过 bus 通信获取 message 的值。
    bus.$on("msg", (e) => {
      this.message = e;
    });
  },
};
</script>

<!-- CSS样式 -->
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>