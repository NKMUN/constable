<template>
  <div class="record-selector">
    <mt-header title="签到记录" fixed>
      <router-link to="/records/" slot="left">
        <mt-button icon="back"> 返回 </mt-button>
      </router-link>
    </mt-header>

    <mt-field label="活动名称" :value="name" readonly />

    <Checklist
      title="签到状态"
      v-model="result"
      :options="[
        { label: '未到', value: 'missing' },
        { label: '已到', value: 'attended' },
      ]"
    />

    <Radio
      title="角色"
      v-model="role"
      :options="[
        { label: '全部', value: '*' },
        ...roles
      ]"
    />

    <mt-button :disabled="!(role && result)" type="primary" class="view" @click="viewRecord"> 查看记录 </mt-button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Checklist, Radio } from 'mint-ui'

export default {
  components: {
    Checklist,
    Radio
  },
  props: {
    id: {}
  },
  watch: {
    id() {
      this.fetch()
    }
  },
  computed: {
    ...mapGetters({
      org: 'org'
    }),
  },
  data() {
    return {
      name: '',
      now: Date.now(),
      roles: [],
      role: '*',
      result: ['missing']
    }
  },
  methods: {
    async fetch() {
      try {
        const event = await this.$agent.get(`/api/orgs/${this.org}/events/${this.id}`)
            .showIndicator()
            .body()
        this.name = event.name
        this.start_at = event.start_at
        this.tardy_at = event.tardy_at
        this.end_at = event.end_at
        this.now = Date.now()
      } catch(e) {
        console.error(e)
      }
    },
    async viewRecord() {
      const role = this.roles.length === this.role.length ? null : this.role
      const result = this.result.length === 2 ? 'all': this.result[0]
      // create query, call next route
      this.$router.push({
        path: `/records/${this.id}/list`,
        query: {
          role,
          result,
          from: `/records/${this.id}`
        },
      })
    },
    async fetchRoles() {
      return this.$agent.get(`/api/orgs/${this.org}/roles`)
          .body()
          .then(
            roles => this.roles = roles.map(({role, count}) => ({ label: role, value: role })),
            err => console.error(err)
          )
    }
  },
  mounted() {
    this.fetch()
    this.fetchRoles()
  }
}
</script>

<style lang="stylus" scoped>
.mint-button.view
  display: block
  margin: 1em auto
  padding: .5em 4ch
.record-selector
  margin-top: 40px
  height: calc(100vh - 40px)
  overflow: scroll
</style>
