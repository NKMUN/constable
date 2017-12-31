<template>
  <div class="index">
    <mt-header title="Constable @ NKMUN">
      <mt-button type="danger" slot="right" @click="logout">退出</mt-button>
    </mt-header>

    <mt-cell title="活动列表" is-link to="/events/">
    </mt-cell>

    <mt-cell title="签到授权" is-link to="/preauth/">
    </mt-cell>

    <mt-cell title="签到统计" is-link to="/records/">
    </mt-cell>

  </div>
</template>

<script>
const nop = () => {}
export default {
  methods: {
    logout() {
      this.$msgbox.confirm('确认退出吗？')
      .then(
        () => {
          this.$store.commit('token', null)
          this.$toast({
            message: '已退出'
          })
          this.$router.replace('/login')
        },
        nop
      )
    }
  }
}
</script>
