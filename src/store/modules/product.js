import {productService} from "../../service/productService";

export const namespaced = true;

export const state = {
    products: [],
    product: {},
    generes: [],
    titleTypes: []
};

export const mutations = {
    SET_PRODUCTS(state, payload) {
        state.products = payload
    },
    SET_PRODUCT(state, payload) {
        state.product = payload
    },
    SET_GENERES(state, payload) {
        state.generes = payload
    },
    SET_TITLE_TYPES(state, payload) {
        state.titleTypes = payload
    }
};

export const getters = {
    getProducts(state) {
        return state.products
    },
    getProduct(state) {
        return state.product
    },
    getGeneres(state) {
        return state.generes
    },
    getTitleTypes(state) {
        return state.titleTypes
    },
}

export const actions = {

    async searchProduct(context, search) {
        try {
            return await productService().searchProduct(search)
            // commit('SET_PRODUCTS', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async fetchAllProducts({commit}) {
        try {
            const {data} = await productService().getAllProducts()
            commit('SET_PRODUCTS', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async getProduct({commit}, productId) {
        try {
            const {data} = await productService().getProduct(productId)
            commit('SET_PRODUCT', data.data[0])
        } catch (e) {
            console.log(e)
        }
    },
    async createProduct(context, product) {
        try {
            return await productService().createProduct(product)
        } catch (e) {
            console.log(e)
        }
    },
    async updateProduct(context, product) {
        try {
            return await productService().updateProduct(product)
        } catch (e) {
            console.log(e)
        }
    },
    async fetchAllGeneres({commit}) {
        try {
            const {data} = await productService().getAllGeneres()
            commit('SET_GENERES', data)
        } catch (e) {
            console.log(e)
        }
    },
    async fetchAllTitleTypes({commit}) {
        try {
            const {data} = await productService().getAllTitleType()
            commit('SET_TITLE_TYPES', data)
        } catch (e) {
            console.log(e)
        }
    },
};
