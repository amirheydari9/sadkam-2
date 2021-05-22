import store from '../store/store'

export function permission () {
    const can = (permission) => {
        if (store.getters.getCurrentUser) {
            return store.getters.getCurrentUser.organizationRoles.indexOf(permission) !== -1
        } else {
            return false
        }
    }

    const isSuperAdmin = () => {
        if (store.getters.getCurrentUser) {
            return (
                store.getters.getCurrentUser.organizationRoles.length === 3 &&
                store.getters.getCurrentUser.organizationType === 'SECRETARIAT'
            )
        } else {
            return false
        }
    }

    const isAdmin = () => {
        if (store.getters.getCurrentUser) {
            return (
                store.getters.getCurrentUser.organizationRoles.length === 3 &&
                store.getters.getCurrentUser.organizationType !== 'SECRETARIAT'
            )
        } else {
            return false
        }
    }

    const isUserManager = () => {
        if (store.getters.getCurrentUser) {
          return (
                store.getters.getCurrentUser.organizationRoles.indexOf('USER_MANAGER') !== -1
            )
        } else {
            return false
        }
    }

    const isFinancial = () => {
        if (store.getters.getCurrentUser) {
            return (
                store.getters.getCurrentUser.organizationRoles.indexOf('FINANCIAL') !== -1
            )
        } else {
            return false
        }
    }

    const isOrders = () => {
        if (store.getters.getCurrentUser) {
            return (
                store.getters.getCurrentUser.organizationRoles.indexOf('ORDERS') !== -1
            )
        } else {
            return false
        }
    }

    const isSecretariant = () => {
        if (store.getters.getCurrentUser) {
            return (
                store.getters.getCurrentUser.organizationType === 'SECRETARIAT'
            )
        } else {
            return false
        }
    }

    const isPlatform = () => {
        if (store.getters.getCurrentUser) {
            return (
                store.getters.getCurrentUser.organizationType === 'PLATFORM'
            )
        } else {
            return false
        }
    }

    const isBrokerage = () => {
        if (store.getters.getCurrentUser) {
            return (
                store.getters.getCurrentUser.organizationType === 'BROKERAGE'
            )
        } else {
            return false
        }
    }

    const hasAssessmentRequestPermission = () => {
        if (store.getters.getCurrentUser) {
            return (
                store.getters.getCurrentUser.organizationType !== 'SECRETARIAT' &&
                store.getters.getCurrentUser.organizationRoles.indexOf('orders') !== -1
            )
        } else {
            return false
        }
    }

    return {
        can,
        isSuperAdmin,
        isAdmin,
        isUserManager,
        isFinancial,
        isOrders,
        isSecretariant,
        isPlatform,
        isBrokerage,
        hasAssessmentRequestPermission,
    }
}
