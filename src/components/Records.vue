<template>
  <div class="records">
    <mt-header title="签到记录" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"> 返回 </mt-button>
      </router-link>
    </mt-header>

    <EventList
      :link-generator="({ id }) => `/records/${id}`"
      :filter="ev => ev.start_at < Date.now()"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventList from './EventList'

export default {
  name: 'records-mgmt',
  components: {
    EventList
  },
  methods: {
    filterNotStarted(ev) {
      return ev.start_at < Date.now()
    }
  }
}
</script>

<style lang="stylus">
.records
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
