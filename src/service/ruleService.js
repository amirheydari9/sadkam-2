import axiosInstance from '../plugins/axios'

export function ruleService() {

    const getListRuleOfFile = async (fileId) => {
        try {
            return await axiosInstance.get(`/rules/find/byFile/${fileId}?count=100`)
        } catch (e) {
            console.log(e)
        }
    }

    const getListRulesOfAssessmentRequest = async (assessmentRequestId) => {
        try {
            return await axiosInstance.get(`/rules/find/${assessmentRequestId}`)
        } catch (e) {
            console.log(e)
        }
    }

    const getListRulesOfAssessment = async (assessmentId) => {
        try {
            return await axiosInstance.get(`/rules/find/${assessmentId}`)
        } catch (e) {
            console.log(e)
        }
    }

    const createRuleForAssessmentRequest = async (rule) => {
        try {
            return await axiosInstance.post(`/rules/forAssessmentRequest`, rule)
        } catch (e) {
            console.log(e)
        }
    }

    const createRuleForAssessment = async (rule) => {
        try {
            return await axiosInstance.post(`/rules/forAssessment`, rule)
        } catch (e) {
            console.log(e)
        }
    }

    const updateRule = async (rule) => {
        try {
            return await axiosInstance.put(`/rules`, rule)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteRule = async (id) => {
        try {
            return await axiosInstance.delete(`/rules/${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getListRuleOfFile,
        createRuleForAssessmentRequest,
        updateRule,
        deleteRule,
        getListRulesOfAssessmentRequest,
        getListRulesOfAssessment,
        createRuleForAssessment
    }
}
