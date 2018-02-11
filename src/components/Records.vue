<template>
  <div class="records">
    <mt-header title="签到记录" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"> 返回 </mt-button>
      </router-link>
    </mt-header>

    <EventList
      class="event-list"
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

<style lang="stylus" scoped>
.event-list
  margin-top: 40px
  position: relative
  width: 100%
  height: calc(100vh - 40px)
  overflow: scroll
</style>
