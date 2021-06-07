<template>
  <v-container>
    <div class="w-100">
      <breadcrumbs :items="breadcrumbs"/>
      <v-data-table
        :page="page"
        :pageCount="numberOfPages"
        :options.sync="options"
        :server-items-length="totalUsers"
        :loading="loading"
        :headers="headers"
        :items="users"
        :search="search"
        no-results-text="اطلاعاتی یافت نشد"
        class="elevation-1 w-100"
        :items-per-page="5"
        :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
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
            />
            <v-spacer/>
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
        <template v-slot:item.organization="{ item }">
          {{ transformOrganization(item.organization) }}
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
        :show-dialog="showDialog"
        :is-create="isCreate"
        @closeDialog="closeDialog"
        @handleSave="handleSave"
      />
    </div>
  </v-container>
</template>

<script>
  import { transformOrganizationType, transformRoles, transformOrganization } from '../../../plugins/transformData'
  import UserDetailsDialog from './UserDetailsDialog'
  import { permission } from '../../../plugins/permission'
  import Breadcrumbs from '../../../components/Breadcrumbs'

  export default {
    name: 'Index',
    components: {
      Breadcrumbs,
      UserDetailsDialog,
    },
    data: () => ({
      page: 1,
      totalUsers: 0,
      numberOfPages: 0,
      loading: true,
      options: {},
      showDialog: false,
      isCreate: true,
      search: '',
      headers0: [
        {
          text: 'نام کاربری',
          value: 'nickname',
        },
        {
          text: 'شماره تماس',
          value: 'phone',
        },
        {
          text: 'سطح دسترسی',
          value: 'organizationRoles',
        },
        // {
        //   text: 'نوع سازمان',
        //   value: 'organizationType',
        // },
        {
          text: 'نام سازمان',
          value: 'organization.title',
        },
        {
          text: 'شماره تماس',
          value: 'phone',
        },
        {
          text: 'عملیات',
          value: 'actions',
          sortable: false,
        },
      ],
      headers1: [
        {
          text: 'نام کاربری',
          value: 'nickname',
        },
        {
          text: 'شماره تماس',
          value: 'phone',
        },
        {
          text: 'سطح دسترسی',
          value: 'organizationRoles',
        },
        {
          text: 'شماره تماس',
          value: 'phone',
        },
        {
          text: 'عملیات',
          value: 'actions',
          sortable: false,
        },
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
          to: { name: 'Panel' },
          exact: true,
        },
        {
          text: 'مدیریت کاربران',
          disabled: true,
          exact: true,
        },
      ],
      transformOrganizationType,
      transformRoles,
      transformOrganization,
    }),
    computed: {
      users: {
        get () {
          return this.$store.getters['user/getUsers']
        },
        set (value) {
          return this.$store.commit('user/SET_USER', value)
        },
      },
      isSuperAdmin () {
        return permission().isSuperAdmin()
      },
      isSecretariant () {
        return permission().isSecretariant()
      },
      isUserManager () {
        return permission().isUserManager()
      },
      headers () {
        return (this.isUserManager && this.isSecretariant) ? this.headers0 : this.headers1
      },
    },
    watch: {
      options: {
        handler () {
          this.readDataFromAPI()
        },
      },
      deep: true,
    },
    mounted () {
      // this.$store.dispatch('user/fetchUsers')
      this.readDataFromAPI()
      this.$store.dispatch('staticData/fetchListOfUserRoles')
      if (this.isSecretariant && this.isUserManager) {
        this.$store.dispatch('organization/fetchOrganizations')
        // this.$store.dispatch('staticData/fetchOrganizationTypes')
      }
      this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
    },
    methods: {
      async readDataFromAPI () {
        this.loading = true
        const {
          page,
          itemsPerPage,
        } = this.options
        let data = await this.$store.dispatch('user/fetchUsers', {
          page: page,
          size: itemsPerPage,
        })
        this.loading = false
        this.users = data.data.items
        this.totalUsers = data.data.paginator.itemCount
        this.numberOfPages = data.data.paginator.totalPages
      },
      async editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        await this.$store.commit('user/SET_USER', { ...item })
        this.isCreate = false
        this.showDialog = true
      },
      async createItem () {
        await this.$store.commit('user/SET_USER', { ...this.defaultItem })
        this.isCreate = true
        this.showDialog = true
        this.editedIndex = -1
      },
      async handleSave (user) {
        if (this.editedIndex > -1) {
          await this.$store.dispatch('user/updateUser', user)
          Object.assign(this.users[this.editedIndex], user)
          this.editedIndex = -1
          this.$toast.success('عملیات با موفقیت انجام شد')
        } else {
          await this.$store.dispatch('user/createUser', user)
          // await this.$store.dispatch('user/fetchUsers')
          await this.readDataFromAPI()
          this.$toast.success('عملیات با موفقیت انجام شد')
        }
      },
      closeDialog () {
        this.showDialog = false
      },
    },
  }
</script>

<style scoped>

</style>
