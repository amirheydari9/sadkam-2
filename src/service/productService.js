import axiosInstance from '../plugins/axios'

export function productService () {
  const searchProduct = async (search) => {
    return await axiosInstance.get(`/products/search/${search}?noPagination=true`)
  }

  const getAllProducts = async (page, size) => {
    return await axiosInstance.get(`/products?page=${page}&count=${size}`)
  }
  const getProduct = async (id) => {
    return await axiosInstance.get(`/products/${id}`)
  }

  const createProduct = async (product) => {
    return await axiosInstance.post('/products', product)
  }

  const updateProduct = async (product) => {
    await axiosInstance.put('/products', product)
  }

  return {
    searchProduct,
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
  }
}
