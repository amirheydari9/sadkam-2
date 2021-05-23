<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="ticketForm">
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
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="save"
        >
          ذخیره
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          انصراف
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { required } from '../../../plugins/rule'

  export default {
    name: 'CreateTicket',
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
        required,
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
      formTitle () {
        return this.isCreate ? 'ایجاد تیکت' : 'ایجاد پیغام'
      },
    },
    methods: {
      close () {
        this.$refs.ticketForm.resetValidation()
        this.$emit('closeDialog')
      },
      save () {
        if (this.$refs.ticketForm.validate()) {
          this.$emit('handleSave', this.ticket)
          this.close()
        }
      },
    },
  }
</script>

<style scoped>

</style>
