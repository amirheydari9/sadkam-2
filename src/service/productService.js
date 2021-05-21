import axiosInstance from '../plugins/axios'

export function productService() {

    const searchProduct = async (search) => {
        try {
            return await axiosInstance.get(`/products/search/${search}`)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllProducts = async () => {
        try {
            return await axiosInstance.get('/products')
        } catch (e) {
            console.log(e)
        }
    }
    const getProduct = async (id) => {
        try {
            return await axiosInstance.get(`/products/${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    const createProduct = async (product) => {
        try {
           return await axiosInstance.post('/products', product)
        } catch (e) {
            console.log(e)
        }
    }

    const updateProduct = async (product) => {
        try {
            await axiosInstance.put('/products', product)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllGeneres = async () => {
        try {
            return await axiosInstance.get('/products/related/generes')
        } catch (e) {
            console.log(e)
        }
    }

    const getAllTitleType = async () => {
        try {
            return await axiosInstance.get('/products/related/types')
        } catch (e) {
            console.log(e)
        }
    }

    return {
        searchProduct,
        getAllProducts,
        getProduct,
        createProduct,
        updateProduct,
        getAllGeneres,
        getAllTitleType
    }
}
