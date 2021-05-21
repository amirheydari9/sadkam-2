import Vue from 'vue'
import Vuex from 'vuex'
import { authService } from '../service/authService'
import { userService } from '../service/userService'
import { organizationService } from '../service/organizationService'
import * as product from './modules/product'
import * as episode from './modules/episode'
import * as assessmentRequest from './modules/assessmentRequest'
import * as staticData from './modules/static'
import * as rule from './modules/rule'
import * as assessment from './modules/assessment'
import * as user from './modules/user'
import * as organization from './modules/organization'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Sidebar_drawer: null,
        Customizer_drawer: false,
        SidebarColor: 'white',
        SidebarBg: '',
        loginPhone: null,
        isAuth: false,
        currentUser: null,
        users: [],
        organizations: [],
        breadcrumbs: [],
        organizationTypes: [],
        roles: [],
    },
    getters: {
        getLoginPhone (state) {
            return state.loginPhone
        },
        getIsAuth (state) {
            return state.isAuth
        },
        getUsers (state) {
            return state.users
        },
        getOrganizations (state) {
            return state.organizations
        },
        getCurrentUser (state) {
            return state.currentUser
        },
        getBreadCrumbs (state) {
            return state.breadcrumbs
        },
        getOrganizationTypes (state) {
            return state.organizationTypes
        },
        getBrokerage (state) {
            return state.organizations.filter(item => item.organizationType === 'brokerage')
        },
        getAllRoles (state) {
            return state.roles
        },
    },
    mutations: {
        SET_SIDEBAR_DRAWER (state, payload) {
            state.Sidebar_drawer = payload
        },
        SET_CUSTOMIZER_DRAWER (state, payload) {
            state.Customizer_drawer = payload
        },
        SET_SIDEBAR_COLOR (state, payload) {
            state.SidebarColor = payload
        },
        SET_LOGIN_PHONE (state, payload) {
            state.loginPhone = payload
        },
        SET_AUTH (state, payload) {
            state.isAuth = payload
        },
        SET_USERS (state, payload) {
            state.users = payload
        },
        SET_ORGANIZATIONS (state, payload) {
            state.organizations = payload
        },
        SET_CURRENT_USER (state, payload) {
            state.currentUser = payload
        },
        SET_BREADCRUMBS (state, payload) {
            state.breadcrumbs = payload
        },
        SET_ORGANIZATION_TYPES (state, payload) {
            state.organizationTypes = payload
        },
        SET_ROLES (state, payload) {
            state.roles = payload
        },
    },
    actions: {
        async login ({ commit }, phone) {
            try {
                await authService().login(phone)
                commit('SET_LOGIN_PHONE', phone)
            } catch (e) {
                console.log(e)
            }
        },
        async loginCheck ({ state, commit }, code) {
            try {
                const { data } = await authService().loginCheck(state.loginPhone, code)
                commit('SET_CURRENT_USER', authService().decodeToken(data.token))
                commit('SET_LOGIN_PHONE', null)
                await authService().setToken(data.token)
            } catch (e) {
                console.log(e)
            }
        },
        async handleCurrentUser ({ commit }, decodedToken) {
            try {
                await commit('SET_CURRENT_USER', decodedToken)
            } catch (e) {
                console.log(e)
            }
        },
        async logout ({ commit }) {
            try {
                commit('SET_CURRENT_USER', null)
                commit('SET_LOGIN_PHONE', null)
                await authService().removeToken()
            } catch (e) {
                console.log(e)
            }
        },

        async fetchRoles ({ commit }) {
            try {
                const { data } = await userService().getAllRoles()
                commit('SET_ROLES', data)
            } catch (e) {
                console.log(e)
            }
        },
        // async updateUser({commit}, user) {
        //     try {
        //         const {data} = await userService().updateUser(user)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // },
        async fetchOrganizations ({ commit }) {
            try {
                const { data } = await organizationService().getAllOrganization()
                commit('SET_ORGANIZATIONS', data.data)
            } catch (e) {
                console.log(e)
            }
        },
        async fetchOrganizationTypes ({ commit }) {
            try {
                const { data } = await organizationService().getOrganizationTypes()
                commit('SET_ORGANIZATION_TYPES', data)
            } catch (e) {
                console.log(e)
            }
        },
    },
    modules: {
        user,
        organization,
        product,
        episode,
        assessmentRequest,
        staticData,
        rule,
        assessment,
    },
})
