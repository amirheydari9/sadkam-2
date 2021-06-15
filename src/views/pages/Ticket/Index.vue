<template>
  <v-container>
    <breadcrumbs :items="breadcrumbs"/>
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
            <v-spacer/>
            <v-btn
              color="primary"
              dark
              @click="createItem"
            >
              ایجاد تیکت جدید
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{ transformDateToJalali(item.createdAt) }}
        </template>
        <template v-slot:item.originalOwner="{ item }">
          {{ transformOrganization(item.originalOwner) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                small
                class="mr-2"
                @click="createMessage(item)"
              >
                mdi-plus
              </v-icon>
            </template>
            <span>افزودون پیام</span>
          </v-tooltip>

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
  import CreateTicket from './CreateTicket'
  import { transformOrganization, transformDateToJalali } from '../../../plugins/transformData'
  import Breadcrumbs from '../../../components/Breadcrumbs'

  export default {
    name: 'Index',
    components: {
      CreateTicket,
      Breadcrumbs,
    },
    data: () => ({
      showDialog: false,
      isCreate: true,
      search: '',
      headers: [
        {
          text: 'عنوان',
          value: 'title',
        },
        {
          text: 'کاربر',
          value: 'user',
        },
        {
          text: 'شناسه سازمان',
          value: 'originalOwner.title',
        },
        {
          text: 'وضعیت',
          value: 'status',
        },
        {
          text: 'تاریخ ایجاد',
          value: 'createdAt',
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
      transformOrganization,
      transformDateToJalali,
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
      this.$store.dispatch('organization/fetchOrganizations')
      this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
    },
    methods: {
      async createMessage (item) {
        await this.$store.dispatch('ticket/fetchTicket', {
          ticketId: item._id,
          page: 1,
          size: 5,
        })
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
