<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "./typo.css"
import { mapGetters } from 'vuex'
import { checkToken } from './store.js'

export default {
  name: 'app',
  computed: {
    ...mapGetters({
      token: 'token'
    })
  },
  mounted() {
    if (!checkToken(this.token)) {
      this.$toast({
        message: this.token ? '登录已过期，请重新登录' : '请先登录'
      })
      this.$router.push('/login/')
    }
  }
}
</script>

<style lang="stylus">
body
  margin: 0
  padding: 0
  height: 100vh
  width: 100vw
  overflow: hidden
#app
  width: 100%
  height: 100%
</style>
