import Vue from 'vue'
import App from './App'
import router from './router'
import superagent from 'superagent'
import superagentUse from 'superagent-use'
import Icon from 'vue-awesome/components/Icon'
import store from './store'
import {
  Button,
  Cell,
  Header,
  Loadmore,
  Field,
  Indicator,
  Toast
} from 'mint-ui'

Vue.config.productionTip = false
Vue.component('Icon', Icon)
Vue.component( Button.name, Button )
Vue.component( Cell.name, Cell )
Vue.component( Header.name, Header )
Vue.component( Loadmore.name, Loadmore )
Vue.component( Field.name, Field )
Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator

// superagent token injection
Vue.prototype.$agent = superagentUse(superagent)
Vue.prototype.$agent.use(req => {
  const token = store.getters.token
  token && req.auth(token, null, {type: 'bearer'})
})
Vue.prototype.$agent.use(req => {
  req.body = () => new Promise((resolve, reject) =>
    req.then(
      res => resolve(res.body),
      reject
    )
  )
  req.blob = () => req.responseType('blob').body()
})
Vue.prototype.$agent.use(req => {
  req.showIndicator = (opts = {}) => {
    Indicator.open(opts)
    req.then(() => Indicator.close())
    return req
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
