import { userService } from '../../service/userService'

export const namespaced = true

export const state = {
  users: [],
  user: {},
}

export const mutations = {
  SET_USERS (state, payload) {
    state.users = payload
  },
  SET_USER (state, payload) {
    state.user = payload
  },
}

export const getters = {
  getUsers (state) {
    return state.users
  },
  getUser (state) {
    return state.user
  },
}

export const actions = {
  async fetchUsers ({ commit }, payload) {
    try {
      const { data } = await userService().getAllUsers(payload.page, payload.size)
      commit('SET_USERS', data.data.items)
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async createUser (context, user) {
    try {
      return await userService().createUser(user)
    } catch (e) {
      console.log(e)
    }
  },
  async updateUser (context, user) {
    try {
      return await userService().updateUser(user)
    } catch (e) {
      console.log(e)
    }
  },
}
