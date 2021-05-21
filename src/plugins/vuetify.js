import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/i18n'
import '@/sass/overrides.sass'
import fa from 'vuetify/es5/locale/fa'

Vue.use(Vuetify)

const theme = {
  primary: '#4CAF50',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
}

export default new Vuetify({
  rtl: true,
  lang: {
    t: (key, ...params) => i18n.t(key, params),
    locales: { fa },
    current: 'fa',
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
})
