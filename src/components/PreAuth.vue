<template>
  <div class="preauth">
    <mt-header title="签到授权">
      <router-link to="/" slot="left">
        <mt-button icon="back"> 返回 </mt-button>
      </router-link>
    </mt-header>

    <mt-field label="签到姬标识" v-model="identifier" placeholder="请输入签到姬标识" @input="generatePreauth" />
    <FieldDateTime
      label="授权截止时间"
      v-model="expires"
      placeholder="请设定授权截止事件"
      @input="generatePreauth"
      :min-date="new Date()"
    />

    <div class="code">
      <QRCode v-if="identifier && preauth" :value="code" />
      <div v-else>
        <img src="../assets/nklogo.png">
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FieldDateTime from './FieldDateTime'
import QRCode from './QRCode'

const ONE_WEEK = 7 * 24 * 3600 * 1000

export default {
  components: {
    FieldDateTime,
    QRCode
  },
  computed: {
    ...mapGetters({
      org: 'org'
    }),
    code() {
      return 'P/' + this.preauth
    },
  },
  data() {
    return {
      preauth: '',
      identifier: '',
      expires: Date.now() + ONE_WEEK
    }
  },
  methods: {
    generatePreauth() {
      return this.$agent.post(`/api/orgs/${this.org}/stewards/`)
          .send({
            identifier: this.identifier,
            expires: Math.floor(this.expires / 1000)
          })
          .then(
            ({ body }) => {
              this.preauth = body.preauth
            },
            err => console.error(e)
          )
    }
  }
}
</script>

<style lang="stylus" scoped>
.code
  width: 100%
  max-width: 640px
  margin: 1em 0
  padding: 0
  position: relative
  img
    width: 90%
    margin: 0 auto
    display: block
.qr-code
  width: 90%
  margin: 0 auto
  display: block
</style>