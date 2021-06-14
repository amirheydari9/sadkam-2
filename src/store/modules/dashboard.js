import { dashboardService } from '../../service/dashboardService'

export const namespaced = true

export const state = {
  home: null,
}

export const mutations = {
  SET_HOME (state, payload) {
    state.home = payload
  },
}

export const getters = {
  getHome (state) {
    return state.home
  },
}

export const actions = {
  async fetchHomeData (context) {
    try {
      const { data } = await dashboardService().home()
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  },
}
