import { requestService } from '../../service/requestService'

export const namespaced = true

export const state = {
  requestInfoByEpisodeId: null,
  request: null,
  requests: [],
  submitted: [],
  inqueu: [],
  assigned: [],
  confirmed: [],
  working: [],
  completed: [],
}

export const mutations = {
  SET_REQUEST_INFO_BY_EPISODE_ID (state, payload) {
    state.requestInfoByEpisodeId = payload
  },
  SET_REQUEST (state, payload) {
    state.request = payload
  },
  SET_REQUESTS (state, payload) {
    state.requests = payload
  },
  SET_SUBMITTED (state, payload) {
    state.submitted = payload
  },
  SET_INQUEU (state, payload) {
    state.inqueu = payload
  },
  SET_ASSIGNED (state, payload) {
    state.assigned = payload
  },
  SET_CONFIRMED (state, payload) {
    state.confirmed = payload
  },
  SET_WORKING (state, payload) {
    state.working = payload
  },
  SET_COMPLETED (state, payload) {
    state.completed = payload
  },
}

export const getters = {
  getRequestInfoByEpisodeId (state) {
    return state.requestInfoByEpisodeId
  },
  getRequest (state) {
    return state.request
  },
  getRequests (state) {
    return state.requests
  },
  getSubmitted (state) {
    return state.submitted
  },
  getInqueu (state) {
    return state.inqueu
  },
  getAssigned (state) {
    return state.assigned
  },
  getConfirmed (state) {
    return state.confirmed
  },
  getWorking (state) {
    return state.working
  },
  getCompleted (state) {
    return state.completed
  },

}

export const actions = {
  async fetchAllRequests ({ commit }) {
    try {
      const { data } = await requestService().getAllRequests()
      commit('SET_REQUESTS', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchRequest ({ commit }, requestId) {
    try {
      const { data } = await requestService().getRequest(requestId)
      if (data,'request') {
        commit('SET_REQUEST', data.data)
      } else {
        commit('SET_REQUEST', null)
      }
    } catch (e) {
      console.log(e)
    }
  },

  async fetchRequestByEpisodeId ({ commit }, id) {
    try {
      const { data } = await requestService().getRequestByEpisode(id)
      console.log(data.data.items, 'action')
      if (data.data.items && data.data.items.length > 0) {
        commit('SET_REQUEST_INFO_BY_EPISODE_ID', data.data.items[0])
      } else {
        commit('SET_REQUEST_INFO_BY_EPISODE_ID', null)
      }
    } catch (e) {
      console.log(e)
    }
  },

  async createRequest (context, request) {
    try {
      const { data } = await requestService().createRequest(request)
      console.log(data.data,'createRequest')
       return data.data
    } catch (e) {
      console.log(e)
    }
  },

  async fetchAssessmentListByStatus ({ commit }, status) {
    try {
      const { data } = await requestService().getAssessmentListByStatus(status)
      switch (status) {
        case 0:
          commit('SET_SUBMITTED', data.data)
          break
        case 1:
          commit('SET_INQUEU', data.data)
          break
        case 2:
          commit('SET_ASSIGNED', data.data)
          break
        case 3:
          commit('SET_CONFIRMED', data.data)
          break
        case 4:
          commit('SET_WORKING', data.data)
          break
        case 5:
          commit('SET_COMPLETED', data.data)
          break
      }
    } catch (e) {
      console.log(e)
    }
  },

  async assignRequestToBrokerage (context, assign) {
    try {
      return await requestService().assignRequestToBrokerage(assign)
    } catch (e) {
      console.log(e)
    }
  },

  async unAssignRequestToBrokerage (context, requestId) {
    try {
      return await requestService().unAssignRequestToBrokerage(requestId)
    } catch (e) {
      console.log(e)
    }
  },

  async setStatusOfRequest (context, status) {
    try {
      return await requestService().setStatusOfRequest(status)
    } catch (e) {
      console.log(e)
    }
  },

}
