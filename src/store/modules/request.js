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
  inProgress: [],
  finished: [],
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
  SET_LIST_IN_PROGRESS (state, payload) {
    state.inProgress = payload
  },
  SET_LIST_FINISHED (state, payload) {
    state.finished = payload
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
  getListInProgress (state) {
    state.inProgress.forEach(item => {
      if (item.episode.parent.episodeCountType === 'single') {
        item.faProductType = 'فیلم'
      } else {
        item.faProductType = `سریال  - فصل ${item.episode.seasonNumber} - قسمت ${item.episode.episodeNumber}`
      }
    })
    return state.inProgress
  },
  getListFinished (state) {
    state.finished.forEach(item => {
      if (item.episode.parent.episodeCountType === 'single') {
        item.faProductType = 'فیلم'
      } else {
        item.faProductType = `سریال  - فصل ${item.episode.seasonNumber} - قسمت ${item.episode.episodeNumber}`
      }
    })
    return state.finished
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

  async fetchRequestByEpisodeId ({ commit }, id) {
    try {
      const { data } = await requestService().getRequestByEpisode(id)
      commit('SET_REQUEST_INFO_BY_EPISODE_ID', data.data.items[0])
    } catch (e) {
      console.log(e)
    }
  },

  async fetchRequest ({ commit }, requestId) {
    try {
      const { data } = await requestService().getRequest(requestId)
      commit('SET_REQUEST', data.data)
    } catch (e) {
      console.log(e)
    }
  },

  async createRequest (context, request) {
    try {
      const { data } = await requestService().createRequest(request)
      console.log(data.data, 'createRequest')
      return data.data
    } catch (e) {
      console.log(e)
    }
  },

  async createDialog (context, dialog) {
    try {
      return await requestService().createDialog(dialog)
    } catch (e) {
      console.log(e)
    }
  },

  async createFile (context, file) {
    try {
      return await requestService().createFile(file)
    } catch (e) {
      console.log(e)
    }
  },

  async fetchAssessmentListByStatus ({ commit }, payload) {
    try {
      const { data } = await requestService().getAssessmentListByStatus(payload.status, payload.page, payload.size)
      switch (payload.status) {
        case 0:
          commit('SET_SUBMITTED', data.data.items)
          return data
        case 1:
          commit('SET_INQUEU', data.data.items)
          return data
        case 2:
          commit('SET_ASSIGNED', data.data.items)
          return data
        case 3:
          commit('SET_CONFIRMED', data.data.items)
          return data
        case 4:
          commit('SET_WORKING', data.data.items)
          return data
        case 5:
          commit('SET_COMPLETED', data.data.items)
          return data
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

  async fetchListInProgress ({ commit }, payload) {
    try {
      const { data } = await requestService().getListInProgress(payload.page, payload.size)
      commit('SET_LIST_IN_PROGRESS', data.data.items)
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async fetchListFinished ({ commit }, payload) {
    try {
      const { data } = await requestService().getListFinished(payload.page, payload.size)
      commit('SET_LIST_FINISHED', data.data.items)
      return data
    } catch (e) {
      console.log(e)
    }
  },

  async calculateCost (context, requestId) {
    try {
      return await requestService().calculateCost(requestId)
    } catch (e) {
      console.log(e)
    }
  },

}
