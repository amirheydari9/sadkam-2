import { ruleService } from '../../service/ruleService'

export const namespaced = true

export const state = {
  ListRulesOfFile: [],
  comparisonListRulesOfFile: [],
}

export const mutations = {
  SET_LIST_RULES_OF_FILE (state, payload) {
    state.ListRulesOfFile = payload
  },
  SET_COMPARISON_LIST_RULES_OF_FILE (state, payload) {
    state.comparisonListRulesOfFile = payload
  },
}

export const getters = {
  getListRulesOfFile (state) {
    return state.ListRulesOfFile
  },
  getComparisonListRulesOfFile (state) {
    return state.comparisonListRulesOfFile
  },
}

export const actions = {
  async setDescriptionForPlatform ({ commit }, payload) {
    try {
      return await ruleService().setDescriptionForPlatform(payload)
    } catch (e) {
      console.log(e)
    }
  },
  async setConfirmationBrokerageUser ({ commit }, payload) {
    try {
      return await ruleService().setConfirmationBrokerageUser(payload)
    } catch (e) {
      console.log(e)
    }
  },

  async fetchAllListRulesOfFile ({ commit }, fileId) {
    try {
      const { data } = await ruleService().getListRuleOfFile(fileId)
      commit('SET_LIST_RULES_OF_FILE', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchAllComparisonListRulesOfFile ({ commit }, fileId) {
    try {
      const { data } = await ruleService().getListRuleOfFile(fileId)
      commit('SET_COMPARISON_LIST_RULES_OF_FILE', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchAllListRulesOfAssessmentRequest ({ commit }, assessmentRequestId) {
    try {
      const { data } = await ruleService().getListRulesOfAssessmentRequest(assessmentRequestId)
      commit('SET_LIST_RULES_OF_FILE', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchAllListRulesOfAssessment ({ commit }, assessmentId) {
    try {
      const { data } = await ruleService().getListRulesOfAssessment(assessmentId)
      commit('SET_LIST_RULES_OF_FILE', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async createRuleForRequest (context, rule) {
    try {
      await ruleService().createRuleForRequest(rule)
    } catch (e) {
      console.log(e)
    }
  },
  async createRuleForAssessment (context, rule) {
    try {
      await ruleService().createRuleForAssessment(rule)
    } catch (e) {
      console.log(e)
    }
  },
  async updateRule (context, rule) {
    try {
      await ruleService().updateRule(rule)
    } catch (e) {
      console.log(e)
    }
  },
  async deleteRule (context, ruleId) {
    try {
      await ruleService().deleteRule(ruleId)
    } catch (e) {
      console.log(e)
    }
  },
}
