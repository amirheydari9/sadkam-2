import axiosInstance from '../plugins/axios'

export function organizationService() {

    const getAllOrganization = async () => {
        try {
            return await axiosInstance.get('/organizations?count=100')
        } catch (e) {
            console.log(e)
        }
    }

    const createOrganization = async (organization) => {
        try {
            await axiosInstance.post('/organizations', organization)
        } catch (e) {
            console.log(e)
        }
    }

    const updateOrganization = async (organization) => {
        try {
            await axiosInstance.put('/organizations', organization)
        } catch (e) {
            console.log(e)
        }
    }

    const getOrganizationTypes = async () => {
        try {
            return await axiosInstance.get('/organizations/types')
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllOrganization,
        getOrganizationTypes,
        createOrganization,
        updateOrganization
    }
}
