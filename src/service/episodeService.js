import axiosInstance from '../plugins/axios'

export function episodeService () {
  const getAllEpisodes = async (id, page, size) => {
    return await axiosInstance.get(`/episodes/ofParent/${id}?page=${page}&count=${size}`)
  }
  const getEpisode = async (id) => {
    return await axiosInstance.get(`/episodes/${id}`)
  }

  const createEpisode = async (episode) => {
    await axiosInstance.post('/episodes', episode)
  }

  const updateEpisode = async (episode) => {
    await axiosInstance.put('/episodes', episode)
  }

  return {
    getAllEpisodes,
    getEpisode,
    createEpisode,
    updateEpisode,
  }
}
