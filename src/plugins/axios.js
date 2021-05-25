import axios from 'axios'
import { authService } from '../service/authService'
import store from '../store/store'
import router from '../router'

const axiosInstance = axios.create({
  baseURL: 'http://sadkam.lincast.ir/api',
})
axiosInstance.interceptors.request.use(function (config) {
  const token = authService().getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  store.commit('SET_OVERLAY', true)
  return config
}, function (err) {
  store.commit('SET_OVERLAY', true)
  return Promise.reject(err)
})

axiosInstance.interceptors.response.use(response => {
  setTimeout(() => {
      store.commit('SET_OVERLAY', false)
  }, 1500)
  return response
}, async error => {
  if (error.response.status === 401 || error.response.status === 403) {
   await store.dispatch('logout')
  }
  if (error.response.status === 404) {
    // router.push({name: 'not-found'})
  }
  setTimeout(() => {
      store.commit('SET_OVERLAY', false)
  }, 1500)
  return Promise.reject(error)
})

export default axiosInstance
