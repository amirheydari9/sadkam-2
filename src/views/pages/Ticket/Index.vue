<template>
  <v-container>
    <div class="w-100">
      <v-data-table
        :headers="headers"
        :items="tickets"
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
            />
            <v-spacer />
            <v-btn
              color="primary"
              dark
              @click="createItem"
            >
              ایجاد تیکت جدید
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="createMessage(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
      <create-ticket
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
  import CreateTicket from './CreateTicket'

  export default {
    name: 'Index',
    components: { CreateTicket },
    data: () => ({
      showDialog: false,
      isCreate: true,
      search: '',
      headers: [
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
      ticketId: null,
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
          text: 'مدیریت تیکت ها',
          disabled: true,
          exact: true,
        },
      ],
      transformOrganizationType,
      transformRoles,
      transformOrganization,
    }),
    computed: {
      tickets: {
        get () {
          return this.$store.getters['ticket/getTickets']
        },
        set (value) {
          return this.$store.commit('ticket/SET_TICKETS', value)
        },
      },
    },
    mounted () {
      this.$store.dispatch('ticket/fetchAllTickets')
      this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
    },
    methods: {
      async createMessage (item) {
        await this.$store.commit('ticket/SET_TICKET', { ...item })
        this.ticketId = item._id
        this.isCreate = false
        this.showDialog = true
      },
      async createItem () {
        await this.$store.commit('ticket/SET_TICKET', { ...this.defaultItem })
        this.isCreate = true
        this.showDialog = true
        this.ticketId = null
      },
      async handleSave (ticket) {
        if (this.ticketId) {
          const message = {
            ticketId: this.ticketId,
            message: ticket,
          }
          await this.$store.dispatch('ticket/createMessage', message)
          this.$store.commit('ticket/SET_TICKET', null)
          // Object.assign(this.tickets[this.editedIndex], ticket)
          this.ticketId = null
          this.$toast.success('عملیات با موفقیت انجام شد')
        } else {
          await this.$store.dispatch('ticket/createTicket', ticket)
          await this.$store.dispatch('ticket/fetchAllTickets')
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
