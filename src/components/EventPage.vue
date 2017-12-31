<template>
  <div class="new-event">
    <mt-header :title="isNew ? '创建活动' : '修改活动'">
      <router-link to="/events/" slot="left">
        <mt-button icon="back"> 返回 </mt-button>
      </router-link>
    </mt-header>

    <mt-field label="活动名称" placeholder="请输入活动名称" v-model="name" :readonly="!editable" />
    <FieldDateTime @input="coerceStartTime" label="开始时间" placeholder="请设定开始时间" :min-date="minStartAt" v-model="start_at" :readonly="!editable" />
    <FieldDateTime @input="coerceTardyTime" label="迟到时间" placeholder="请设定迟到时间" :min-date="minTardyAt" v-model="tardy_at" :readonly="!editable" />
    <FieldDateTime @input="coerceEndTime" label="结束时间" placeholder="请设定结束时间" :min-date="minEndAt" v-model="end_at" :readonly="!editable" />

    <p v-if="!editable" class="hint"> 活动已结束 </p>
    <mt-button v-if="editable" class="update" type="primary" @click="updateEvent"> {{ isNew ? "创建活动" : "修改活动" }} </mt-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isValidDate, floorToDate } from '@/date-util'
import FieldDateTime from './FieldDateTime'
const ONE_WEEK = 7 * 24 * 3600 * 1000

export default {
  components: {
    FieldDateTime
  },
  props: {
    id: {}
  },
  watch: {
    id() {
      this.resetFields()
      if (!this.isNew) {
        this.fetch()
      }
    }
  },
  computed: {
    isNew() {
      return this.id === '~new'
    },
    editable() {
      return !this.end_at || this.end_at > Date.now()
    },
    ...mapGetters({
      org: 'org'
    }),
    minStartAt() {
      return floorToDate(Date.now() - ONE_WEEK)
    },
    minTardyAt() {
      if (this.start_at)
        return new Date(this.start_at)
      else
        floorToDate(Date.now() - ONE_WEEK)
    },
    minEndAt() {
      if (this.tardy_at)
        return new Date(this.tardy_at)
      else
        floorToDate(Date.now() - ONE_WEEK)
    },
  },
  data() {
    return {
      name: '',
      start_at: '',
      tardy_at: '',
      end_at: '',
      now: Date.now()
    }
  },
  methods: {
    resetFields() {
      this.name = ''
      this.start_at = ''
      this.tardy_at = ''
      this.end_at = ''
      this.now = Date.now()
    },
    coerceStartTime() {
      if (!this.tardy_at || this.tardy_at <= this.start_at) {
        this.tardy_at = this.start_at + 1800 * 1000
      }
      this.coerceTardyTime()
      this.coerceEndTime()
    },
    coerceTardyTime() {
      if (this.tardy_at < this.start_at) {
        this.tardy_at = this.start_at
      }
      if (!this.end_at || this.end_at < this.tardy_at) {
        this.end_at = this.tardy_at + 900 * 1000
      }
      this.coerceEndTime()
    },
    coerceEndTime() {
      if (this.end_at < this.tardy_at) {
        this.end_at = this.tardy_at
      }
    },
    validate() {
      return this.name
          && this.start_at
          && this.tardy_at
          && this.end_at
          && this.start_at <= this.tardy_at
          && this.tardy_at <= this.end_at
    },
    async updateEvent() {
      if (!this.validate()) {
        return this.$toast({
          message: '请检查所有字段设置正确'
        })
      }
      const method = this.isNew ? 'post' : 'patch'
      const entity = `/api/orgs/${this.org}/events/${ this.isNew ? '' : this.id }`
      try {
        await this.$agent[method](entity)
            .send({
              name: this.name,
              start_at: this.start_at,
              tardy_at: this.tardy_at,
              end_at: this.end_at,
            })
            .showIndicator()
        this.$toast({
          message: this.isNew ? '活动创建成功' : '活动修改成功',
          duration: 3000
        })
        this.$router.push('/events/')
      } catch(e) {
        console.error(e)
      }
    },
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
    }
  },
  mounted() {
    !this.isNew && this.fetch()
  }
}
</script>

<style lang="stylus" scoped>
.mint-button.update
  display: block
  margin: 1em auto
  padding: .5em 4ch
</style>