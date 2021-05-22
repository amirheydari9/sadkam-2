import { ticketService } from '../../service/ticketService'

export const namespaced = true

export const state = {
  tickets: [],
  ticket: null,
}

export const mutations = {
  SET_TICKETS (state, payload) {
    state.tickets = payload
  },
  SET_TICKET (state, payload) {
    state.ticket = payload
  },
}

export const getters = {
  getTickets (state) {
    return state.tickets
  },
  getTicket (state) {
    return state.ticket
  },
}

export const actions = {
  async fetchAllTickets ({ commit }) {
    try {
      const { data } = await ticketService().getTickets()
      commit('SET_TICKETS', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchTicket ({ commit }, ticketId) {
    try {
      const { data } = await ticketService().getTicket(ticketId)
      commit('SET_TICKET', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async createTicket (context, ticket) {
    try {
      return await ticketService().createTicket(ticket)
    } catch (e) {
      console.log(e)
    }
  },
  async createMessage (context, message) {
    try {
      return await ticketService().createMessage(message)
    } catch (e) {
      console.log(e)
    }
  },
}
