import axiosInstance from '../plugins/axios'

export function dashboardService () {
  const home = async () => {
    return await axiosInstance.get('/dashboard/home')
  }

  return {
    home,
  }
}
