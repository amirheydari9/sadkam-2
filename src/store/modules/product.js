import { productService } from '../../service/productService'

export const namespaced = true

export const state = {
  products: [],
  product: {},
}

export const mutations = {
  SET_PRODUCTS (state, payload) {
    state.products = payload
  },
  SET_PRODUCT (state, payload) {
    state.product = payload
  },
}

export const getters = {
  getProducts (state) {
    return state.products
  },
  getProduct (state) {
    return state.product
  },
}

export const actions = {

  async searchProduct (context, search) {
    try {
      return await productService().searchProduct(search)
      // commit('SET_PRODUCTS', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchAllProducts ({ commit }, payload) {
    try {
      const { data } = await productService().getAllProducts(payload.page, payload.size)
      commit('SET_PRODUCTS', data.data.items)
      return data
    } catch (e) {
      console.log(e)
    }
  },
  async getProduct ({ commit }, productId) {
    try {
      const { data } = await productService().getProduct(productId)
      commit('SET_PRODUCT', data.data[0])
    } catch (e) {
      console.log(e)
    }
  },
  async createProduct (context, product) {
    try {
      return await productService().createProduct(product)
    } catch (e) {
      console.log(e)
    }
  },
  async updateProduct (context, product) {
    try {
      return await productService().updateProduct(product)
    } catch (e) {
      console.log(e)
    }
  },
}
