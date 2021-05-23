<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">ایجاد پیغام جدید</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="messageForm"
          >
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="message"
                  :rules="[required('این فیلد الزامی است'),]"
                  label="پیغام"
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
    name: 'MessageDialog',
    props: {
      showDialog: {
        Boolean,
        isRequired: true,
      },
    },
    data () {
      return {
        message: '',
        required,
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
    },
    methods: {
      close () {
        this.$refs.messageForm.resetValidation()
        this.$emit('closeDialog')
      },
      save () {
        if (this.$refs.messageForm.validate()) {
          this.$emit('handleSave', this.message)
          this.close()
        }
      },
    },
  }
</script>

<style scoped>

</style>
