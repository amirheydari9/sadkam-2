import { staticService } from '../../service/staticServive'

export const namespaced = true

export const state = {
  rulesList: [],
  roles: [],
  organizationTypes: [],
  generes: [],
  productCategoryData: [],
}

export const mutations = {
  SET_RULE_LIST (state, payload) {
    state.rulesList = payload
  },
  SET_LIST_OF_USER_ROLES (state, payload) {
    state.roles = payload
  },
  SET_ORGANIZATION_TYPES (state, payload) {
    state.organizationTypes = payload
  },
  SET_GENERES (state, payload) {
    state.generes = payload
  },
  SET_PRODUCT_CATEGORY_DATA (state, payload) {
    state.productCategoryData = payload
  },
}

export const getters = {

  getSubjectsRule (state) {
    return state.rulesList.subjects
  },
  getActionsRule (state) {
    return state.rulesList.actions
  },
  getTypesRule (state) {
    return state.rulesList.type
  },
  getRoles (state) {
    return state.roles
  },
  getOrganizationTypes (state) {
    return state.organizationTypes
  },
  getGeneres (state) {
    return state.generes
  },
  getProductCategoryData (state) {
    return state.productCategoryData
  },
}

export const actions = {
  async fetchRulesList ({ commit }) {
    try {
      const { data } = await staticService().getRulesListData()
      commit('SET_RULE_LIST', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchListOfUserRoles ({ commit }) {
    try {
      const { data } = await staticService().getListOfUserRoles()
      commit('SET_LIST_OF_USER_ROLES', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchOrganizationTypes ({ commit }) {
    try {
      const { data } = await staticService().getListOfOrganizationTypes()
      commit('SET_ORGANIZATION_TYPES', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchAllGeneres ({ commit }) {
    try {
      const { data } = await staticService().getListOfGeneresData()
      commit('SET_GENERES', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchListOfCategoryData ({ commit }) {
    try {
      const { data } = await staticService().getListOfProductCategoryData()
      commit('SET_PRODUCT_CATEGORY_DATA', data.data)
    } catch (e) {
      console.log(e)
    }
  },
  async updateRulesData (context, data) {
    try {
      await staticService().updateRulesData(data)
    } catch (e) {
      console.log(e)
    }
  },
  async updateGeneresData (context, data) {
    try {
      await staticService().updateGeneresData(data)
    } catch (e) {
      console.log(e)
    }
  },
  async updateProductCategoryData (context, data) {
    try {
      await staticService().updateProductCategoryData(data)
    } catch (e) {
      console.log(e)
    }
  },
}
