<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "./typo.css"
import { mapGetters } from 'vuex'
import { checkToken } from 'store'

export default {
  name: 'app',
  computed: {
    token: 'token'
  },
  mounted() {
    if (!checkToken(this.token)) {
      this.$toast({
        message: this.token ? '登录已过期，请重新登录' : '请先登录'
      })
      this.$router.push('/login/')
    } else {
      this.$router.push('/events/')
    }
  }
}
</script>
