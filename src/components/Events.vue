<template>
  <div class="event-list">
    <mt-header title="活动列表" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"> 返回 </mt-button>
      </router-link>
      <router-link to="/events/~new" slot="right">
        <mt-button> 新建 </mt-button>
      </router-link>
    </mt-header>

    <mt-loadmore :top-method="fetch" :bottom-all-loaded="true" ref="loadmore">

      <template v-if="events.length > 0">
        <mt-cell
          v-for="ev in events"
          :key="ev.id"
          :title="ev.name"
          is-link
          :to="`/events/${ev.id}`"
          :label="
            ev.start_at > now
            ? '尚未开始'
            : ev.end_at < now
              ? '已经结束'
              : '进行中…'
          "
        />
        </mt-cell>
      </template>

      <template v-else>
        <div class="empty-list" @click="fetch">
          <div class="icon">
            <Icon name="refresh" />
          </div>
          <div class="content">
            <p>暂无活动</p>
            <p class="hint">下拉刷新</p>
          </div>
        </div>
      </template>

    </mt-loadmore>

  </div>
</template>

<script>
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/refresh'
import 'vue-awesome/icons/plus'
import { mapGetters } from 'vuex'

export default {
  name: 'event-mgmt',
  computed: {
    ...mapGetters({
      org: 'org'
    })
  },
  data() {
    return {
      events: [],
      now: Date.now()
    }
  },
  methods: {
    async fetch() {
      try {
        const events = await this.$agent.get(`/api/orgs/${this.org}/events/`).body()
        this.events = events.sort((a, b) => a.start_at - b.start_at)
      } catch(e) {
        // nop
        console.error(e)
      }
      this.now = Date.now()
      this.$refs.loadmore && this.$refs.loadmore.onTopLoaded()
    }
  },
  mounted() {
    this.$indicator.open()
    this.fetch(true).then(() => this.$indicator.close())
  }
}
</script>

<style lang="stylus">
.event-list
  height: 100%
  padding-top: 40px    // fixed mint-header
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: center
  .mint-loadmore
    flex-grow: 1
    flex-shrink: 0
</style>

<style lang="stylus">
.event-list
  .mint-header
    .fa-icon
      width: 14pt
      height: 14pt
  .empty-list
    text-align: center
    padding: 6px 10px
    .icon
      margin: 4px
      color: #26a2ff
      svg
        width: 14pt
        height: 14pt
        padding: 5pt
    .hint
      font-size: 9pt
</style>