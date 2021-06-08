import axiosInstance from '../plugins/axios'

export function episodeService () {
    const getAllEpisodes = async (id,page, size) => {
        try {
            return await axiosInstance.get(`/episodes/ofParent/${id}?page=${page}&count=${size}`)
        } catch (e) {
            console.log(e)
        }
    }
    const getEpisode = async (id) => {
        try {
            return await axiosInstance.get(`/episodes/${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    const createEpisode = async (episode) => {
        try {
            await axiosInstance.post('/episodes', episode)
        } catch (e) {
            console.log(e)
        }
    }

    const updateEpisode = async (episode) => {
        try {
            await axiosInstance.put('/episodes', episode)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllEpisodes,
        getEpisode,
        createEpisode,
        updateEpisode,
    }
}
