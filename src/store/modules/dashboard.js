import { dashboardService } from '../../service/dashboardService'

export const namespaced = true

export const state = {
  home: [],
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
  async fetchHomeData ({ commit }) {
    try {
      const { data } = await dashboardService().home()
      commit('SET_HOME', data.data)
    } catch (e) {
      console.log(e)
    }
  },
}
