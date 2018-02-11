<template>
  <div class="events">
    <mt-header title="活动列表" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"> 返回 </mt-button>
      </router-link>
      <router-link to="/events/~new" slot="right">
        <mt-button> 新建 </mt-button>
      </router-link>
    </mt-header>

    <EventList :link-generator="({ id }) => `/events/${id}`"/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventList from './EventList'

export default {
  name: 'event-mgmt',
  components: {
    EventList
  }
}
</script>

<style lang="stylus" scoped>
.event-list
  top: 40px
  position: relative
  width: 100%
  height: calc(100vh - 40px)
  overflow: scroll
</style>