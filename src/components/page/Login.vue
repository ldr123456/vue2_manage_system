<template>
  <!-- 登录组件 -->
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <!-- 用户名表单 -->
        <!-- prop设置需要校验的字段名 -->
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <!-- 输入框中的图标按钮。slot 具名分发，设置为 prepend就是将这个图标放置在前面。还可以设置为 append 就是将这个图标放置在后面 -->
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>

        <!-- 密码表单 -->
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm()">
            <!-- 按键 “enter” 抬起时调用submitForm 事件 
            .native - 作用是给自定义的组件添加原生事件 -->
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <!-- Tips 提示 -->
        <p class="login-tips">Tips : 用户名和密码随便填</p>
      </el-form>
    </div>
    <!-- model绑定的数据 rules绑定的表单验证规则 ref组件的名称 prop验证规则的属性 -->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      param: {
        username: '祥瑞',
        password: '123123',
      },
      rules: {
        // 验证规则：required：是否必填 message：未通过验证后提示信息 trigger：验证触发 blur：失去焦点时触发
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },],
      },
    };
  },
  methods: {
    submitForm () {
      // 获取ref注册的引用信息
      // validate 是Vue提供的一个表单校验库，可以帮助我们快速的进行表单验证
      this.$refs.login.validate((valid) => {
        if (valid) {
          // 如果通过校验，则将路由转到首页组件上，从而实现登录成功后组件的跳转
          this.$message.success('登录成功');
          // 将用户名传入本地存储
          localStorage.setItem('ms_username', this.param.username);
          this.$router.push('/');
        } else {
          // 如果为通过校验，则提示重新输入账号和密码
          this.$message.error('请输入账号和密码');
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
/* 标题 */
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
/* 登录框 */
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}

/* 按钮 */
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
/* 提示词 */
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
