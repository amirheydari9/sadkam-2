import axiosInstance from '../plugins/axios'

export function userService () {
  const getAllUsers = async (page, size) => {
    return await axiosInstance.get(`/users?page=${page}&count=${size}`)
  }

  const createUser = async (user) => {
    return await axiosInstance.post('/users', user)
  }

  const updateUser = async (user) => {
    return await axiosInstance.put('/users', user)
  }

  return {
    getAllUsers,
    createUser,
    updateUser,
  }
}
