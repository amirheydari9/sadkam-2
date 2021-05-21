import axiosInstance from '../plugins/axios'

export function userService() {

    const getAllUsers = async () => {
        try {
            return await axiosInstance.get('/users?count=100')
        } catch (e) {
            console.log(e)
        }
    }

    const createUser = async (user) => {
        try {
            await axiosInstance.post('/users', user)
        } catch (e) {
            console.log(e)
        }
    }

    const updateUser = async (user) => {
        try {
            await axiosInstance.put('/users', user)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllRoles = async () => {
        try {
           return await axiosInstance.get('/users/roles')
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllUsers,
        createUser,
        updateUser,
        getAllRoles
    }
}
