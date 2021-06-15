import axiosInstance from '../plugins/axios'

export function ticketService () {
  const getAllTickets = async () => {
    return await axiosInstance.get('/ticket')
  }

  const createMessage = async (message) => {
    return await axiosInstance.post('/ticket/message', message)
  }

  const getSingleTicket = async (ticketId, page, size) => {
    return await axiosInstance.get(`/ticket/${ticketId}?page=${page}&count=${size}`)
  }
  const createTicket = async (ticket) => {
    return await axiosInstance.post('/ticket', ticket)
  }

  return {
    getAllTickets,
    createMessage,
    getSingleTicket,
    createTicket,
  }
}
