import axiosInstance from '../plugins/axios'

export function staticService () {
  const getRulesListData = async () => {
    return await axiosInstance.get('/staticData/rulesData')
  }

  const getListOfUserRoles = async () => {
    return await axiosInstance.get('/staticData/userRolesData')
  }

  const getListOfOrganizationTypes = async () => {
    return await axiosInstance.get('/staticData/organizationTypesData')
  }

  const getListOfGeneresData = async () => {
    return await axiosInstance.get('/staticData/generesData')
  }

  const getListOfProductCategoryData = async () => {
    return await axiosInstance.get('/staticData/productCategoryData')
  }

  const updateRulesData = async (data) => {
    return await axiosInstance.put('/staticData/rulesData', data)
  }

  const updateGeneresData = async (data) => {
    return await axiosInstance.put('/staticData/generesData', data)
  }

  const updateProductCategoryData = async (data) => {
    return await axiosInstance.put('/staticData/productCategoryData', data)
  }

  return {
    getRulesListData,
    getListOfUserRoles,
    getListOfOrganizationTypes,
    getListOfGeneresData,
    getListOfProductCategoryData,
    updateRulesData,
    updateGeneresData,
    updateProductCategoryData,
  }
}
