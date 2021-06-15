<template>
  <div>
    <v-dialog
      v-model="show"
      max-width="600px"
      persistent
    >
      <v-card>
        <dialog-headline :title="formTitle "/>
        <v-card-text>
          <v-container>
            <v-form
              v-if="isCreate"
              ref="ticketForm"
            >
              <v-row>
                <v-col
                  v-if="isCreate"
                  cols="12"
                >
                  <v-text-field
                    v-model="ticket.title"
                    :rules="[required('این فیلد الزامی است'),]"
                    label="عنوان"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-text-field
                    v-model="ticket.message"
                    :rules="[required('این فیلد الزامی است'),]"
                    label="پیام"
                  />
                </v-col>
              </v-row>
            </v-form>
            <v-data-table
              v-else
              :headers="headers"
              :items="ticket[0].messages"
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
<!--                  <v-text-field-->
<!--                    v-model="search"-->
<!--                    label="جست جو"-->
<!--                    single-line-->
<!--                    hide-details-->
<!--                    autofocus-->
<!--                  />-->
                  <v-spacer/>
                  <v-btn
                    color="primary"
                    dark
                    @click="createMessage"
                  >
                    ایجاد پیغام جدید
                  </v-btn>
                </v-toolbar>
              </template>
              <template v-slot:item.createdAt="{ item }">
                {{ transformDateToJalali(item.createdAt) }}
              </template>
              <template v-slot:item.originalOwner="{ item }">
                {{ transformOrganization(item.originalOwner) }}
              </template>
              <!--            <template v-slot:item.actions="{ item }">-->
              <!--              <v-icon-->
              <!--                small-->
              <!--                class="mr-2"-->
              <!--                @click="createMessage(item)"-->
              <!--              >-->
              <!--                mdi-pencil-->
              <!--              </v-icon>-->
              <!--            </template>-->
            </v-data-table>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            rounded
            @click="save"
          >
            ذخیره
          </v-btn>
          <v-btn
            color="warning"
            text
            @click="close"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <message-dialog
      v-if="showMessageDialog"
      :show-dialog="showMessageDialog"
      @closeDialog="closeMessageDialog"
      @handleSave="handleSaveMessageDialog"
    />
  </div>
</template>

<script>
  import { required } from '../../../plugins/rule'
  import { transformDateToJalali, transformOrganization } from '../../../plugins/transformData'
  import MessageDialog from './MessageDialog'
  import DialogHeadline from '../../../components/DialogHeadline'

  export default {
    name: 'CreateTicket',
    components: {
      MessageDialog,
      DialogHeadline,
    },
    props: {
      showDialog: {
        Boolean,
        isRequired: true,
      },
      isCreate: {
        Boolean,
        isRequired: true,
      },
    },
    data () {
      return {
        page: 1,
        totalItems: 0,
        numberOfPages: 0,
        loading: true,
        options: {},
        showMessageDialog: false,
        headers: [
          {
            text: 'عنوان',
            value: 'message',
          },
          {
            text: 'کاربر',
            value: 'user.nickname',
          },
          {
            text: 'تاریخ ایجاد',
            value: 'createdAt',
          },
        ],
        search: '',
        transformDateToJalali,
        transformOrganization,
        required,
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
      ticket: {
        get () {
          return this.$store.getters['ticket/getTicket']
        },
        set (value) {
          return this.$store.commit('ticket/SET_TICKET', value)
        },
      },
      formTitle () {
        return this.isCreate ? 'ایجاد تیکت' : 'مدیریت پیغام ها'
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
    methods: {

      async readDataFromAPI () {
        this.loading = true
        const {
          page,
          itemsPerPage,
        } = this.options
        let data = await this.$store.dispatch('ticket/fetchTicket', {
          ticketId: this.ticket[0]._id,
          page: page,
          size: itemsPerPage,
        })
        this.loading = false
        // this.ticket = data.data.items[0].messages
        this.totalItems = data.data.paginator.itemCount
        this.numberOfPages = data.data.paginator.totalPages
        this.options.page = data.data.paginator.currentPage
        this.options.itemsPerPage = +data.data.paginator.perPage
      },

      close () {
        if (this.$refs.ticketForm) {
          this.$refs.ticketForm.resetValidation()
        }
        this.$emit('closeDialog')
      },
      save () {
        if (this.isCreate) {
          if (this.$refs.ticketForm && this.$refs.ticketForm.validate()) {
            this.$emit('handleSave', this.ticket)
            this.close()
          }
        } else {
          this.close()
        }
      },

      createMessage () {
        this.showMessageDialog = true
      },
      closeMessageDialog () {
        this.showMessageDialog = false
      },
      async handleSaveMessageDialog (message) {
        const data = {
          ticketId: this.ticket[0]._id,
          message: message,
        }
        try {
          await this.$store.dispatch('ticket/createMessage', data)
          // await this.$store.dispatch('ticket/fetchTicket', this.ticket[0]._id)
          await this.readDataFromAPI()
          this.$toast.success('عملیات با موفقیت انجام شد')
        } catch (e) {
          this.$toast.success('عملیات انجام نشد')
        }
      },
    },
  }
</script>

<style scoped>

</style>
