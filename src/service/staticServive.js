import axiosInstance from '../plugins/axios'

export function staticService () {
  const getRulesListData = async () => {
    try {
      return await axiosInstance.get('/staticData/rulesData')
    } catch (e) {
      console.log(e)
    }
  }

  const getListOfUserRoles = async () => {
    try {
      return await axiosInstance.get('/staticData/userRolesData')
    } catch (e) {
      console.log(e)
    }
  }

  return {
    getRulesListData,
    getListOfUserRoles,
  }
}
