import axiosInstance from '../plugins/axios'

export function organizationService () {
  const getAllOrganization = async () => {
    return await axiosInstance.get('/organizations?count=10000')
  }

  const createOrganization = async (organization) => {
    await axiosInstance.post('/organizations', organization)
  }

  const updateOrganization = async (organization) => {
    await axiosInstance.put('/organizations', organization)
  }

  return {
    getAllOrganization,
    createOrganization,
    updateOrganization,
  }
}
