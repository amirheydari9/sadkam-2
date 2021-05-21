import {staticService} from "../../service/staticServive";

export const namespaced = true;

export const state = {
    rulesList: [],
};

export const mutations = {
    SET_RULE_LIST(state, payload) {
        state.rulesList = payload
    },
};

export const getters = {

    getSubjectsRule(state) {
        return state.rulesList['subjects']
    },
    getActionsRule(state) {
        return state.rulesList.actions
    },
    getTypesRule(state) {
        return state.rulesList.type
    }
}

export const actions = {
    async fetchRulesList({commit}) {
        try {
            const {data} = await staticService().getRulesListData()
            commit('SET_RULE_LIST', data)
        } catch (e) {
            console.log(e)
        }
    },
};
