import axiosInstance from '../plugins/axios'

export function staticService() {

    const getRulesListData = async () => {
        try {
            return await axiosInstance.get(`/staticData/rulesData`)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getRulesListData,
    }
}
