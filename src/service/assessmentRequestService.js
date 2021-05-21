import axiosInstance from '../plugins/axios'

export function assessmentRequestService() {

    const getAllAssessmentRequests = async () => {
        try {
            return await axiosInstance.get('/assessmentRequest')
        } catch (e) {
            console.log(e)
        }
    }
    const getAssessmentRequest = async (id) => {
        try {
            return await axiosInstance.get(`/assessmentRequest/${id}`)
        } catch (e) {
            console.log(e)
        }
    }
    const getAssessmentRequestByEpisode = async (episodeId) => {
        try {
            return await axiosInstance.get(`/assessmentRequest/find/byEpisode/${episodeId}`)
        } catch (e) {
            console.log(e)
        }
    }

    const createAssessmentRequest = async (assessmentRequest) => {
        try {
            return await axiosInstance.post('/assessmentRequest', assessmentRequest)
        } catch (e) {
            console.log(e)
        }
    }

    const createFile = async (file) => {
        try {
            return await axiosInstance.post('/assessmentRequest/file', file)
        } catch (e) {
            console.log(e)
        }
    }

    const createDialog = async (dialog) => {
        try {
            return await axiosInstance.post('/assessmentRequest/dialog', dialog)
        } catch (e) {
            console.log(e)
        }
    }

    const getAssessmentListByStatus = async (status) => {
        try {
            return await axiosInstance.get(`/assessmentRequest/find/byStatus/${status}`)
        } catch (e) {
            console.log(e)
        }
    }

    const assignAssessmentRequestToBrokerage = async (assign) => {
        try {
            return await axiosInstance.patch(`/assessmentRequest/assign`, assign)
        } catch (e) {
            console.log(e)
        }
    }

    const unAssignAssessmentRequestToBrokerage = async (assessmentRequestId) => {
        try {
            return await axiosInstance.patch(`/assessmentRequest/unassign`, assessmentRequestId)
        } catch (e) {
            console.log(e)
        }
    }

    const setStatusOfAssessmentRequest = async (status) => {
        try {
            return await axiosInstance.patch(`/assessmentRequest/status`, status)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllAssessmentRequests,
        getAssessmentRequest,
        getAssessmentRequestByEpisode,
        createAssessmentRequest,
        createDialog,
        createFile,
        getAssessmentListByStatus,
        assignAssessmentRequestToBrokerage,
        setStatusOfAssessmentRequest,
        unAssignAssessmentRequestToBrokerage
    }
}
