<template>
  <div class="event-record">
    <mt-header title="签到记录" fixed>
      <router-link :to="$route.query.from || '/records/'" slot="left">
        <mt-button icon="back"> 返回 </mt-button>
      </router-link>
    </mt-header>

    <div class="wrapper">
      <mt-loadmore
        ref="loadmore"
        :top-method="refresh"
        :top-all-loaded="false"
        :bottom-method="fetch"
        bottom-pull-text="上拉加载更多"
        bottom-drop-text="释放加载更多"
        :bottom-all-loaded="page === total"
      >
        <div class="inner-wrapper">
          <table>
            <tbody>
              <tr v-for="record in records">
                <td>{{ record.name }}</td>
                <td>{{ record.reported_at ? formatDate(record.reported_at, 'yyyy-mm-dd HH:MM') : '尚未签到' }}</td>
                <td>{{ conclusionText(record.conclusion) }}</td>
              </tr>
            </tbody>
          </table>
          <p class="hint">{{ page === total ? '没有更多数据' : '上拉加载更多' }}</p>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isValidDate, floorToDate, format as formatDate } from '@/date-util'

export default {
  computed: {
    ...mapGetters({
      org: 'org'
    }),
  },
  props: {
    id: {}
  },
  data() {
    return {
      page: 0,
      total: 0,
      records: []
    }
  },
  methods: {
    async refresh() {
      this.page = 0
      this.records = []
      this.$refs.loadmore.fillContainer()
    },
    formatDate,
    conclusionText(v) {
      switch(v) {
        case 'attended': return '正常'
        case 'late': return '迟到'
        case 'unattended': return '缺席'
        default: return '缺席'
      }
    },
    async fetch() {
      const {
        query: { result, role }
      } = this.$route
      const {
        status,
        body,
        headers: {
          'x-pages': _pages,
        }
      } = await this.$agent.get(`/api/orgs/${this.org}/events/${this.id}/records`)
          .query({
            pageSize: 10,
            page: this.page,
            result,
            role
          })
      const total = parseInt(_pages, 10)
      this.records = [ ...this.records, ...body ]
      this.page = Math.min(total, this.page + 1)
      this.total = total
      if (this.$refs.loadmore.translate) {
        this.$refs.loadmore.onTopLoaded()
        this.$refs.loadmore.onBottomLoaded()
      } else {
        this.$refs.loadmore.bottomStatus = 'pull'
      }
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>

<style lang="stylus" scoped>
.event-record
  height: 100%
.wrapper
  top: 40px
  position: relative
  width: 100%
  height: calc(100vh - 40px)
  overflow: scroll
.inner-wrapper
  // min-height: calc(100vh - 50px)
  padding-bottom: 1em
  table
    width: 100%
    td
      padding: .25em 1ch
  .hint
    margin: 1em 0 0 0
    text-align: center
    font-size: 9pt
</style>