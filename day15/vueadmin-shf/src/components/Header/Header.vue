<template>
  <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
    <el-menu-item>
      <img src="../../assets/logo.png" alt="music" class="logo">
    </el-menu-item>
    <el-menu-item index="info">学生信息管理</el-menu-item>
    <el-menu-item index="video">在线课程</el-menu-item>
<!--    <el-menu-item index="test">在线考试</el-menu-item>-->
    <el-menu-item v-if="!userInfo.username" class="right" index="login">登录</el-menu-item>
    <el-submenu v-else class="right" index="login">
      <template  slot="title">{{userInfo.username}}</template>
      <el-menu-item @click="handleLogout">退出登录</el-menu-item>
    </el-submenu>
    <el-menu-item class="right" index="register">注册</el-menu-item>
  </el-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: 'info'
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    '$route.path': function (val) {
      val = val.slice(1)
      console.log(val)
      this.activeIndex = val
    }
  },
  methods: {
    ...mapMutations(['setUserId', 'setUserInfo']),
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      if (key) {
        this.$router.push('/' + key)
      }
    },
    handleLogout () {
      this.$confirm('此操作将退出该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '已退出登录'
        })
        this.setUserId('')
        this.setUserInfo('')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登录'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.logo{
  height: 60px;
}
.el-menu-item:first-child{
  border-bottom: none!important;
}
.el-menu-item:last-child{
  border-bottom: none!important;
}
.search{
  float: right!important;
}

.right{
  float: right!important;
}
</style>
