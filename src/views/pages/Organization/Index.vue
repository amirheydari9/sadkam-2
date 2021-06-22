<template>
  <v-container>
    <div class="w-100">
      <breadcrumbs :items="breadcrumbs" />
      <v-data-table
        :headers="headers"
        :items="organizations"
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
            <v-spacer />
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click="createItem"
            >
              افزودن سازمان جدید
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.isActive="{ item }">
          <v-simple-checkbox
            v-model="item.isActive"
            disabled
          />
        </template>
        <template v-slot:item.organizationType="{ item }">
          {{ transformOrganizationType(item.organizationType) }}
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{transformDateToJalali(item.createdAt) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>ویرایش سازمان</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <organization-details-dialog
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
  import { transformOrganizationType ,transformDateToJalali } from '../../../plugins/transformData'
  import OrganizationDetailsDialog from './OrganizationDetailsDialog'
  import Breadcrumbs from '../../../components/Breadcrumbs'

  export default {
    name: 'Index',
    components: { OrganizationDetailsDialog, Breadcrumbs },
    data: () => ({
      showDialog: false,
      isCreate: true,
      search: '',
      headers: [
        {
          text: 'نام سازمان',
          value: 'title',
        },
        {
          text: 'نام واسط',
          value: 'agentName',
        },
        {
          text: 'شماره واسط',
          value: 'agentPhone',
        },
        {
          text: 'نوع سازمان',
          value: 'organizationType',
        },
        {
          text: 'محدودیت تعریف کاربران',
          value: 'usersLimitCount',
        },
        {
          text: 'تاریخ ایجاد',
          value: 'createdAt',
        },
        {
          text: 'فعال بودن',
          value: 'isActive',
        },
        {
          text: 'عملیات',
          value: 'actions',
          sortable: false,
        },
      ],
      editedIndex: -1,
      defaultItem: {
        title: '',
        agentName: '',
        agentPhone: '',
        organizationType: '',
        usersLimitCount:'',
        isActive: false,
      },
      breadcrumbs: [
        {
          text: 'داشبورد',
          disabled: false,
          to: { name: 'Panel' },
          exact: true,
        },
        {
          text: 'مدیریت سازمان ها',
          disabled: true,
          exact: true,
        },
      ],
      transformOrganizationType,
      transformDateToJalali,
    }),
    computed: {
      organizations: {
        get () {
          return this.$store.getters['organization/getOrganizations']
        },
        set (value) {
          return this.$store.commit('organization/SET_ORGANIZATIONS', value)
        },
      },
      organizationType () {
        return this.$store.getters['staticData/getOrganizationTypes']
      },
      formTitle () {
        return this.editedIndex === -1 ? 'افزودن سازمان' : 'ویرایش سازمان'
      },
    },
    mounted () {
      this.$store.dispatch('organization/fetchOrganizations')
      this.$store.dispatch('staticData/fetchOrganizationTypes')
      this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
    },
    methods: {
      async editItem (item) {
        this.editedIndex = this.organizations.indexOf(item)
        await this.$store.commit('organization/SET_ORGANIZATION', { ...item })
        this.isCreate = false
        this.showDialog = true
      },
      async createItem () {
        await this.$store.commit('organization/SET_ORGANIZATION', { ...this.defaultItem })
        this.isCreate = true
        this.showDialog = true
        this.editedIndex = -1
      },
      async handleSave (organization) {
        if (this.editedIndex > -1) {
          await this.$store.dispatch('organization/updateOrganization', organization)
          Object.assign(this.organizations[this.editedIndex], organization)
          this.editedIndex = -1
        } else {
          await this.$store.dispatch('organization/createOrganization', organization)
          await this.$store.dispatch('organization/fetchOrganizations')
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
