import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import VueCookies from 'vue-cookies'
import axiosInstance from './plugins/axios'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import VueConfirmDialog from 'vue-confirm-dialog'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueMask from 'v-mask'

Vue.use(VueMask)
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

Vue.use(VueToast, {
  position: 'top',
})

Vue.use(VueLoading, {
  width: 80,
  height: 80,
  backgroundColor: '#eee',
  color: 'blue',
})

Vue.use(VueCookies)
window.axios = axiosInstance
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
