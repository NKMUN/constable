<template>
  <div class="login">
    <mt-header title="Constable @ NKMUN" />

    <mt-field label="用户" placeholder="请输入用户名" v-model="user" />
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" />

    <mt-button type="primary" @click="login">登录</mt-button>

    <img src="../assets/nklogo.png" width="280px" height="172px">
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const {
          body
        } = await this.$agent.post('/api/login')
            .send({
              user: this.user,
              password: this.password
            })
            .showIndicator()
        this.$store.commit('token', body.token)
        this.$toast({
          message: '登录成功',
          position: 'top',
          duration: 1000
        })
        this.$router.replace('/')
      } catch(e) {
        // nop
        console.error(e)
      }
    }
  }
}
</script>

<style lang="stylus">
img
  display: block
  margin: 0 auto
.mint-button
  display: block
  margin: 1em auto
  padding: .5em 3ch
</style>
