import axiosInstance from '../plugins/axios'

export function requestService () {
    const getAllRequests = async () => {
        try {
            return await axiosInstance.get('/request')
        } catch (e) {
            console.log(e)
        }
    }
    const getRequest = async (id) => {
        try {
            return await axiosInstance.get(`/request/${id}`)
        } catch (e) {
            console.log(e)
        }
    }
    const getRequestByEpisode = async (episodeId) => {
        try {
            return await axiosInstance.get(`/request/find/byEpisode/${episodeId}`)
        } catch (e) {
            console.log(e)
        }
    }

    const createRequest = async (request) => {
        try {
            return await axiosInstance.post('/request', request)
        } catch (e) {
            console.log(e)
        }
    }

    const createFile = async (file) => {
        try {
            return await axiosInstance.post('/request/file', file)
        } catch (e) {
            console.log(e)
        }
    }

    const createDialog = async (dialog) => {
        try {
            return await axiosInstance.post('/request/dialog', dialog)
        } catch (e) {
            console.log(e)
        }
    }

    const getAssessmentListByStatus = async (status) => {
        try {
            return await axiosInstance.get(`/request/find/byStatus/${status}`)
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
    }
}
