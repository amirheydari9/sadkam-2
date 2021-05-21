<template>
  <div class="w-100">
    <v-data-table
        :headers="headers"
        :items="organizations"
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
              class="mb-2"
              @click="createItem"
          >
            افزودن سازمان جدید
          </v-btn>

        </v-toolbar>
      </template>
      <template v-slot:item.active="{ item }">
        <v-simple-checkbox
            v-model="item.active"
            disabled
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.organizationType="{ item }">
        {{ transformOrganizationType(item.organizationType) }}
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
    <organization-details-dialog
        v-if="showDialog"
        :showDialog="showDialog"
        :isCreate="isCreate"
        @closeDialog="closeDialog"
        @handleSave="handleSave"
    />
  </div>
</template>

<script>
import {transformOrganizationType} from "../../../plugins/transformData";
import OrganizationDetailsDialog from "./OrganizationDetailsDialog";

export default {
  name: "Index",
  components: {OrganizationDetailsDialog},
  data: () => ({
    showDialog: false,
    isCreate: true,
    search: '',
    headers: [
      {text: 'نام سازمان', value: 'name',},
      {text: 'شماره معرف', value: 'agent_phone'},
      {text: 'نوع سازمان', value: 'organizationType'},
      {text: 'آدرس', value: 'address'},
      {text: 'فعال بودن', value: 'active'},
      {text: 'عملیات', value: 'actions', sortable: false},
    ],
    editedIndex: -1,
    defaultItem: {
      name: '',
      agent_phone: '',
      organizationType: '',
      address: '',
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
        text: 'مدیریت سازمان ها',
        disabled: true,
        exact: true
      },
    ],
    transformOrganizationType
  }),
  mounted() {
    this.$store.dispatch('organization/fetchOrganizations')
    this.$store.dispatch('organization/fetchOrganizationTypes')
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  computed: {
    organizations: {
      get() {
        return this.$store.getters['organization/getOrganizations']
      },
      set(value) {
        return this.$store.commit('organization/SET_ORGANIZATIONS', value)
      }
    },
    organizationType() {
      return this.$store.getters['organization/getOrganizationTypes']
    },
    formTitle() {
      return this.editedIndex === -1 ? 'افزودن سازمان' : 'ویرایش سازمان'
    },
  },
  methods: {
    async editItem(item) {
      this.editedIndex = this.organizations.indexOf(item)
      await this.$store.commit('organization/SET_ORGANIZATION', {...item})
      this.isCreate = false
      this.showDialog = true
    },
    async createItem() {
      await this.$store.commit('organization/SET_ORGANIZATION', {...this.defaultItem})
      this.isCreate = true
      this.showDialog = true
      this.editedIndex = -1
    },
    async handleSave(organization) {
      if (this.editedIndex > -1) {
        await this.$store.dispatch('organization/updateOrganization', organization)
        Object.assign(this.organizations[this.editedIndex], organization)
        this.editedIndex = -1
      } else {
        await this.$store.dispatch('organization/createOrganization', organization)
        await this.$store.dispatch('organization/fetchOrganizations')
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
