import {userService} from "../../service/userService";

export const namespaced = true;

export const state = {
    users: [],
    roles: [],
    user: {}
};

export const mutations = {
    SET_USERS(state, payload) {
        state.users = payload
    },
    SET_USER(state, payload) {
        state.user = payload
    },
    SET_ROLES(state, payload) {
        state.roles = payload
    },
};

export const getters = {
    getUsers(state) {
        return state.users
    },
    getUser(state) {
        return state.user
    },
    getAllRoles(state) {
        return state.roles
    },
}

export const actions = {
    async fetchUsers({commit}) {
        try {
            const {data} = await userService().getAllUsers()
            commit('SET_USERS', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async createUser(context, user) {
        try {
            return await userService().createUser(user)
        } catch (e) {
            console.log(e)
        }
    },
    async updateUser(context, user) {
        try {
            return await userService().updateUser(user)
        } catch (e) {
            console.log(e)
        }
    },
    async fetchRoles({commit},) {
        try {
            const {data} = await userService().getAllRoles()
            commit('SET_ROLES', data)
        } catch (e) {
            console.log(e)
        }
    }
};
