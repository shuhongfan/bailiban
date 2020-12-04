<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  // vuex持久化存储
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })

    // ios废弃了beforeunload，使用pagehide代替
    window.addEventListener('pagehide', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>

</style>
