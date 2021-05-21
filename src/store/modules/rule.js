import {ruleService} from "../../service/ruleService";

export const namespaced = true;

export const state = {
    ListRulesOfFile: []
};

export const mutations = {
    SET_LIST_RULES_OF_FILE(state, payload) {
        state.ListRulesOfFile = payload
    },
};

export const getters = {
    getListRulesOfFile(state) {
        return state.ListRulesOfFile
    },
}

export const actions = {
    async fetchAllListRulesOfFile({commit}, fileId) {
        try {
            const {data} = await ruleService().getListRuleOfFile(fileId)
            commit('SET_LIST_RULES_OF_FILE', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async fetchAllListRulesOfAssessmentRequest({commit}, assessmentRequestId) {
        try {
            const {data} = await ruleService().getListRulesOfAssessmentRequest(assessmentRequestId)
            commit('SET_LIST_RULES_OF_FILE', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async fetchAllListRulesOfAssessment({commit}, assessmentId) {
        try {
            const {data} = await ruleService().getListRulesOfAssessment(assessmentId)
            commit('SET_LIST_RULES_OF_FILE', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async createRuleForAssessmentRequest(context, rule) {
        try {
            await ruleService().createRuleForAssessmentRequest(rule)
        } catch (e) {
            console.log(e)
        }
    },
    async createRuleForAssessment(context, rule) {
        try {
            await ruleService().createRuleForAssessment(rule)
        } catch (e) {
            console.log(e)
        }
    },
    async updateRule(context, rule) {
        try {
            await ruleService().updateRule(rule)
        } catch (e) {
            console.log(e)
        }
    },
    async deleteRule(context, ruleId) {
        try {
            await ruleService().deleteRule(ruleId)
        } catch (e) {
            console.log(e)
        }
    },
};
