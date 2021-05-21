import {episodeService} from "../../service/episodeService";

export const namespaced = true;

export const state = {
    episodes: [],
    episode: {},
    parentId: null
};

export const mutations = {
    SET_EPISODES(state, payload) {
        state.episodes = payload
    },
    SET_EPISODE(state, payload) {
        state.episode = payload
    },
    SET_PARENT_ID(state, payload) {
        state.parentId = payload
    },
};

export const getters = {
    getEpisodes(state) {
        return state.episodes
    },
    getEpisode(state) {
        return state.episode
    },
    getParentId(state) {
        return state.parentId
    }
}

export const actions = {
    async fetchAllEpisodes({commit}, productId) {
        try {
            const {data} = await episodeService().getAllEpisodes(productId)
            commit('SET_EPISODES', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async getEpisode({commit}, episodeId) {
        try {
            const {data} = await episodeService().getEpisode(episodeId)
            commit('SET_EPISODE', data.data[0])
        } catch (e) {
            console.log(e)
        }
    },
    async createEpisode(context, episode) {
        try {
            return await episodeService().createEpisode(episode)
        } catch (e) {
            console.log(e)
        }
    },
    async updateEpisode(context, episode) {
        try {
            return await episodeService().updateEpisode(episode)
        } catch (e) {
            console.log(e)
        }
    },
};
