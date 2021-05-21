import {assessmentService} from "../../service/assessmentService";

export const namespaced = true;

export const state = {
    rules: [],
};

export const mutations = {
    SET_ASSESSMENT_RULES(state, payload) {
        state.rules = payload
    }
};

export const getters = {}

export const actions = {
    async createAssessment(context, assessment) {
        try {
            return await assessmentService().createAssessment(assessment)
        } catch (e) {
            console.log(e)
        }
    },
    async findAssessmentByEpisodeId(context, episodeId) {
        try {
            return await assessmentService().createAssessment(episodeId)
        } catch (e) {
            console.log(e)
        }
    },
    async getRulesByAssessmentId({commit}, assessmentId) {
        try {
            const {data} = await assessmentService().getRulesByAssessmentId(assessmentId)
            commit('SET_ASSESSMENT_RULES', data.data.rules)
        } catch (e) {
            console.log(e)
        }
    },
};
