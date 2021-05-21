import axiosInstance from '../plugins/axios'

export function assessmentService() {

    const createAssessment = async (assessment) => {
        try {
            return await axiosInstance.post('/assessment', assessment)
        } catch (e) {
            console.log(e)
        }
    }

    const findAssessmentByEpisodeId = async (episodeId) => {
        try {
            return await axiosInstance.get('/assessment', episodeId)
        } catch (e) {
            console.log(e)
        }
    }

    const getRulesByAssessmentId = async (assessmentId) => {
        try {
            return await axiosInstance.get(`/assessment/rule/byAssessment/${assessmentId}`)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        createAssessment,
        findAssessmentByEpisodeId,
        getRulesByAssessmentId
    }
}
