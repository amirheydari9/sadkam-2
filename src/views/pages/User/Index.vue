<template>
  <div class="w-100">
    <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        no-results-text="اطلاعاتی یافت نشد"
        class="elevation-1 w-100"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-text-field
              v-model="search"
              label="جست جو"
              single-line
              hide-details
              autofocus
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              dark
              @click="createItem"
          >
            افزودن کاربر جدید
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.organizationRoles="{ item }">
        {{ transformRoles(item.organizationRoles) }}
      </template>
      <template v-slot:item.organizationType="{ item }">
        {{ transformOrganizationType(item.organizationType) }}
      </template>
      <template v-slot:item.organization="{ item }">
        {{ transformOrganization(item.organization) }}
      </template>
      <template v-slot:item.active="{ item }">
        <v-simple-checkbox
            v-model="item.active"
            disabled
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
    <user-details-dialog
        v-if="showDialog"
        :showDialog="showDialog"
        :isCreate="isCreate"
        @closeDialog="closeDialog"
        @handleSave="handleSave"
    />
  </div>
</template>

<script>
import {transformOrganizationType, transformRoles, transformOrganization} from '../../../plugins/transformData'
import UserDetailsDialog from "./UserDetailsDialog";
import {permission} from "../../../plugins/permission";


export default {
  name: "Index",
  components: {UserDetailsDialog},
  data: () => ({
    showDialog: false,
    isCreate: true,
    search: '',
    headers0: [
      {text: 'نام کاربری', value: 'nickname',},
      {text: 'شماره تماس', value: 'phone'},
      {text: 'سطح دسترسی', value: 'organizationRoles'},
      {text: 'نوع سازمان', value: 'organizationType'},
      {text: 'نام سازمان', value: 'organization'},
      {text: 'فعال بودن', value: 'active'},
      {text: 'عملیات', value: 'actions', sortable: false},
    ],
    headers1: [
      {text: 'نام کاربری', value: 'nickname',},
      {text: 'شماره تماس', value: 'phone'},
      {text: 'سطح دسترسی', value: 'organizationRoles'},
      {text: 'فعال بودن', value: 'active'},
      {text: 'عملیات', value: 'actions', sortable: false},
    ],
    editedIndex: -1,
    defaultItem: {
      nickname: '',
      phone: '',
      organizationType: '',
      organizationRoles: [],
      organization: '',
      active: false,
    },
    breadcrumbs: [
      {
        text: 'داشبورد',
        disabled: false,
        to: {name: 'Panel'},
        exact: true
      },
      {
        text: 'مدیریت کاربران',
        disabled: true,
        exact: true
      },
    ],
    transformOrganizationType,
    transformRoles,
    transformOrganization
  }),
  mounted() {
    this.$store.dispatch('user/fetchUsers')
    this.$store.dispatch('user/fetchRoles')
    if (this.isSecretariant && this.isUserManager) {
      this.$store.dispatch('organization/fetchOrganizations')
      this.$store.dispatch('organization/fetchOrganizationTypes')
    }
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  computed: {
    users: {
      get() {
        return this.$store.getters['user/getUsers']
      },
      set(value) {
        return this.$store.commit('user/SET_USER', value)
      }
    },
    isSuperAdmin() {
      return permission().isSuperAdmin()
    },
    isSecretariant() {
      return permission().isSecretariant()
    },
    isUserManager() {
      return permission().isUserManager()
    },
    headers() {
      return (this.isUserManager && this.isSecretariant) ? this.headers0 : this.headers1
    }
  },
  methods: {
    async editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      await this.$store.commit('user/SET_USER', {...item})
      this.isCreate = false
      this.showDialog = true
    },
    async createItem() {
      await this.$store.commit('user/SET_USER', {...this.defaultItem})
      this.isCreate = true
      this.showDialog = true
      this.editedIndex = -1
    },
    async handleSave(user) {
      if (this.editedIndex > -1) {
        await this.$store.dispatch('user/updateUser', user)
        Object.assign(this.users[this.editedIndex], user)
        this.editedIndex = -1
      } else {
        await this.$store.dispatch('user/createUser', user)
        await this.$store.dispatch('user/fetchUsers')
      }
    },
    closeDialog() {
      this.showDialog = false
    }
  },
}
</script>

<style scoped>

</style>
