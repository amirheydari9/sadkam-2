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
  getSubjectRuleForStaticData (state) {
      const data = []
      state.rulesList.subjects.forEach(item => {
        const row = {
          fa: item,
        }
        data.push(row)
      })
      return data
  },
  getActionsRule (state) {
    return state.rulesList.actions
  },
  getActionRuleForStaticData (state) {
     const data = []
    state.rulesList.actions.forEach(item => {
       const row = {
         fa: item,
       }
       data.push(row)
     })
     return data
  },
  getTypesRule (state) {
    return state.rulesList.type
  },
  getTypeRuleForStaticData (state) {
     const data = []
    state.rulesList.type.forEach(item => {
       const row = {
         fa: item,
       }
       data.push(row)
     })
     return data
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
