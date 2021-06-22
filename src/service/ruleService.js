import axiosInstance from '../plugins/axios'

export function ruleService () {

  const setDescriptionForPlatform = async (data) => {
    return await axiosInstance.patch('/rules/set/description', data)
  }
  const setConfirmationBrokerageUser = async (data) => {
    return await axiosInstance.patch('/rules/set/confirm', data)
  }

  const getListRuleOfFile = async (fileId) => {
    return await axiosInstance.get(`/rules/find/byFile/${fileId}?count=100`)
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

  const createRuleForRequest = async (rule) => {
    return await axiosInstance.post('/rules/forRequest', rule)
  }

  const createRuleForAssessment = async (rule) => {
    try {
      return await axiosInstance.post('/rules/forAssessment', rule)
    } catch (e) {
      console.log(e)
    }
  }

  const updateRule = async (rule) => {
    return await axiosInstance.put('/rules', rule)
  }

  const deleteRule = async (id) => {
    return await axiosInstance.delete(`/rules/${id}`)
  }

  return {
    getListRuleOfFile,
    createRuleForRequest,
    updateRule,
    deleteRule,
    getListRulesOfAssessmentRequest,
    getListRulesOfAssessment,
    createRuleForAssessment,
    setDescriptionForPlatform,
    setConfirmationBrokerageUser,
  }
}
