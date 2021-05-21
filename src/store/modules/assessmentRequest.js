import {assessmentRequestService} from "../../service/assessmentRequestService";

export const namespaced = true;

export const state = {
    assessmentRequestInfoByEpisodeId: null,
    assessmentRequest: null,
    assessmentRequests: [],
    submitted: [],
    inqueu: [],
    assigned: [],
    confirmed: [],
    working: [],
    completed: [],
};

export const mutations = {
    SET_ASSESSMENT_REQUEST_INFO_BY_EPISODE_ID(state, payload) {
        state.assessmentRequestInfoByEpisodeId = payload
    },
    SET_ASSESSMENT_REQUEST(state, payload) {
        state.assessmentRequest = payload
    },
    SET_ASSESSMENT_REQUESTS(state, payload) {
        state.assessmentRequests = payload
    },
    SET_SUBMITTED(state, payload) {
        state.submitted = payload
    },
    SET_INQUEU(state, payload) {
        state.inqueu = payload
    },
    SET_ASSIGNED(state, payload) {
        state.assigned = payload
    },
    SET_CONFIRMED(state, payload) {
        state.confirmed = payload
    },
    SET_WORKING(state, payload) {
        state.working = payload
    },
    SET_COMPLETED(state, payload) {
        state.completed = payload
    },
};

export const getters = {
    getAssessmentRequestInfoByEpisodeId(state) {
        return state.assessmentRequestInfoByEpisodeId
    },
    getAssessmentRequest(state) {
        return state.assessmentRequest
    },
    getAssessmentRequests(state) {
        return state.assessmentRequests
    },
    getSubmitted(state) {
        return state.submitted
    },
    getInqueu(state) {
        return state.inqueu
    },
    getAssigned(state) {
        return state.assigned
    },
    getConfirmed(state) {
        return state.confirmed
    },
    getWorking(state) {
        return state.working
    },
    getCompleted(state) {
        return state.completed
    },

}

export const actions = {
    async fetchAllAssessmentRequests({commit}) {
        try {
            const {data} = await assessmentRequestService().getAllAssessmentRequests()
            commit('SET_ASSESSMENT_REQUESTS', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async fetchAssessmentRequest({commit}, assessmentRequestId) {
        try {
            const {data} = await assessmentRequestService().getAssessmentRequest(assessmentRequestId)
            if (data.data) {
                commit('SET_ASSESSMENT_REQUEST', data.data)
            } else {
                commit('SET_ASSESSMENT_REQUEST', null)
            }
        } catch (e) {
            console.log(e)
        }
    },

    async fetchAssessmentRequestByEpisodeId({commit}, id) {
        try {
            const {data} = await assessmentRequestService().getAssessmentRequestByEpisode(id)
            if (data.data && data.data.length > 0) {
                commit('SET_ASSESSMENT_REQUEST_INFO_BY_EPISODE_ID', data.data[0])
            } else {
                commit('SET_ASSESSMENT_REQUEST_INFO_BY_EPISODE_ID', null)
            }
        } catch (e) {
            console.log(e)
        }
    },

    async createAssessmentRequest(context, assessmentRequests) {
        try {
            return await assessmentRequestService().createAssessmentRequest(assessmentRequests)
        } catch (e) {
            console.log(e)
        }
    },

    async fetchAssessmentListByStatus({commit}, status) {
        try {
            const {data} = await assessmentRequestService().getAssessmentListByStatus(status)
            switch (status) {
                case 0:
                    commit('SET_SUBMITTED', data.data)
                    break
                case 1:
                    commit('SET_INQUEU', data.data)
                    break
                case 2:
                    commit('SET_ASSIGNED', data.data)
                    break
                case 3:
                    commit('SET_CONFIRMED', data.data)
                    break
                case 4:
                    commit('SET_WORKING', data.data)
                    break
                case 5:
                    commit('SET_COMPLETED', data.data)
                    break
            }
        } catch (e) {
            console.log(e)
        }
    },

    async assignAssessmentRequestToBrokerage(context, assign) {
        try {
            return await assessmentRequestService().assignAssessmentRequestToBrokerage(assign)
        } catch (e) {
            console.log(e)
        }
    },

    async unAssignAssessmentRequestToBrokerage(context, assessmentRequestId) {
        try {
            return await assessmentRequestService().unAssignAssessmentRequestToBrokerage(assessmentRequestId)
        } catch (e) {
            console.log(e)
        }
    },

    async setStatusOfAssessmentRequest(context, status) {
        try {
            return await assessmentRequestService().setStatusOfAssessmentRequest(status)
        } catch (e) {
            console.log(e)
        }
    },

};
