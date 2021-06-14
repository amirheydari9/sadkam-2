import axiosInstance from '../plugins/axios'

export function dashboardService () {
  const home = async () => {
    return await axiosInstance.post('/dashboard/home')
  }

  return {
    home,
  }
}
