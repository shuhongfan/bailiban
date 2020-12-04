<template>
  <div class="login_container">
    <div class="left">
      <el-carousel arrow="never">
        <el-carousel-item>
          <img src="../../assets/img/01-1.jpg" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../assets/img/01-2.jpg" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../assets/img/01-3.jpg" alt="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../assets/img/01-4.jpg" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="right">
      <h1>欢迎登录</h1>
      <h2>乐在生活</h2>
      <div class="login_box">
        <!-- 登陆表单区域 -->
        <el-form ref="loginFormRef" :model="loginFrom" :rules="LoginfromRules" label-width="0" class="login_form">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input clearable autofocus v-model="loginFrom.username" placeholder="请输入用户名" style="width: 100%;"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input clearable show-password v-model="loginFrom.password" placeholder="请输入密码" style="width: 100%;"></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item  class="btns">
            <el-button type="primary" @click="handleLogin">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      loginFrom: {
        username: '',
        password: ''
      },
      LoginfromRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['userId'])
  },
  methods: {
    ...mapMutations(['setUserId', 'setUserInfo']),
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    handleLogin () {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.goLogin()
        } else {
          this.$message.error('正则验证失败，表单信息格式不符合规范，请检查后重新输入!!!')
          return false
        }
      })
    },
    // 获取用户信息并放到vuex
    async handleUserInfo () {
      const result = await this.axios.post('/user/query', this.qs.stringify({ id: this.userId }))
      // console.log(result)
      this.setUserInfo(result.data.datas[0])
    },
    async goLogin () {
      const result = await this.axios.post('/user/login', this.qs.stringify(this.loginFrom))
      console.log(result)
      if (result.data.code === 200) {
        this.$message({
          type: 'success',
          message: result.data.msg
        })
        this.setUserId(result.data.id)
        // 获取用户信息
        this.handleUserInfo()
        this.$router.push('/info')
        this.$cookie.set('vueAdminToken', result.data, '0')
      } else {
        this.$message.error(result.data.msg)
      }
    }
  }

}
</script>

<style scoped lang="less">
.el-carousel {
  /deep/ .el-carousel__item--card {
    width: auto !important;
  }
  /deep/ .el-carousel__item {
    width: auto !important;
  }
  /deep/ .el-carousel__item--card.is-active {
    z-index: 2;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0px) !important;
  }
}

.login_container{
  display: flex;
  justify-content: space-around;
  .left{
    height: 600px;
    width: 50%;
    .el-carousel{
      height: 600px;
      .el-carousel-item{
        height: 600px;
      }
      .el-carousel__item{
        height: 600px;
      }
      img{
        width: 100%;
      }
    }
  }
  .right{
    width: 400px;
    h1{
      font-size: 44px;
    }
    h2{
      font-size: 28px;
    }
    .el-input{
      width: 300px!important;
    }
    .el-button{
      width: 140px!important;
    }
  }
}
</style>
