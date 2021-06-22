import axiosInstance from '../plugins/axios'

export function requestService () {
  const getAllRequests = async () => {
    try {
      return await axiosInstance.get('/request')
    } catch (e) {
      console.log(e)
    }
  }
  const getRequestByEpisode = async (episodeId) => {
    return await axiosInstance.get(`/request/find/byEpisode/${episodeId}`)
  }

  const getRequest = async (id) => {
    return await axiosInstance.get(`/request/${id}`)
  }

  const createRequest = async (request) => {
    return await axiosInstance.post('/request', request)
  }

  const createFile = async (file) => {
    return await axiosInstance.post('/request/file', file)
  }

  const createDialog = async (dialog) => {
    return await axiosInstance.post('/request/dialog', dialog)
  }

  const getAssessmentListByStatus = async (status, page, size) => {
    try {
      return await axiosInstance.get(`/request/find/byStatus/${status}?page=${page}&count=${size}`)
    } catch (e) {
      console.log(e)
    }
  }

  const assignRequestToBrokerage = async (assign) => {
    try {
      return await axiosInstance.patch('/request/assign', assign)
    } catch (e) {
      console.log(e)
    }
  }

  const unAssignRequestToBrokerage = async (requestId) => {
    try {
      return await axiosInstance.patch('/request/unassign', requestId)
    } catch (e) {
      console.log(e)
    }
  }

  const setStatusOfRequest = async (status) => {
    try {
      return await axiosInstance.patch('/request/status', status)
    } catch (e) {
      console.log(e)
    }
  }

  const calculateCost = async (requestId) => {
    try {
      return await axiosInstance.get(`/request/calculateCost/${requestId}`)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    getAllRequests,
    getRequest,
    getRequestByEpisode,
    createRequest,
    createDialog,
    createFile,
    getAssessmentListByStatus,
    assignRequestToBrokerage,
    setStatusOfRequest,
    unAssignRequestToBrokerage,
    calculateCost,
  }
}
