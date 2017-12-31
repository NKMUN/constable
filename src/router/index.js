import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Events from '@/components/Events'
import EventPage from '@/components/EventPage'
import PreAuth from '@/components/PreAuth'
import Records from '@/components/Records'
import RecordPage from '@/components/RecordPage'
import EventRecord from '@/components/EventRecord'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login
    },
    {
      path: '/events/',
      name: 'Events',
      component: Events
    },
    {
      path: '/events/:id',
      name: 'Event',
      component: EventPage,
      props: true
    },
    {
      path: '/preauth/',
      name: 'Preauth',
      component: PreAuth
    },
    {
      path: '/records/',
      name: 'Records',
      component: Records
    },
    {
      path: '/records/:id',
      name: 'Record',
      component: RecordPage,
      props: true
    },
    {
      path: '/records/:id/list',
      name: 'EventRecord',
      component: EventRecord,
      props: true
    },
  ]
})
