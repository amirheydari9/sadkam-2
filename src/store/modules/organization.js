import {organizationService} from "../../service/organizationService";

export const namespaced = true;

export const state = {
    organizations: [],
    organizationTypes: [],
    organization: {}
};

export const mutations = {
    SET_ORGANIZATIONS(state, payload) {
        state.organizations = payload
    },
    SET_ORGANIZATION(state, payload) {
        state.organization = payload
    },
    SET_ORGANIZATION_TYPES(state, payload) {
        state.organizationTypes = payload;
    },
};

export const getters = {
    getOrganizations(state) {
        return state.organizations
    },
    getOrganization(state) {
        return state.organization
    },
    getOrganizationTypes(state) {
        return state.organizationTypes
    },
}

export const actions = {
    async fetchOrganizations({commit}) {
        try {
            const {data} = await organizationService().getAllOrganization()
            commit('SET_ORGANIZATIONS', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async createOrganization(context, organization) {
        try {
            return await organizationService().createOrganization(organization)
        } catch (e) {
            console.log(e)
        }
    },
    async updateOrganization(context, organization) {
        try {
            return await organizationService().updateOrganization(organization)
        } catch (e) {
            console.log(e)
        }
    },
    async fetchOrganizationTypes({commit}) {
        try {
            const {data} = await organizationService().getOrganizationTypes()
            commit('SET_ORGANIZATION_TYPES', data)
        } catch (e) {
            console.log(e)
        }
    }
};
