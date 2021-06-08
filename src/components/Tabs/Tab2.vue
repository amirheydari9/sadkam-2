<template>
  <v-tab-item
    class="mt-1"
    value="chat"
  >
    <v-container>
      <v-form ref="dialogForm">
        <v-row>
          <v-col
            cols="12"
          >
            <v-text-field
              :rules="[required('این فیلد الزامی است'),]"
              v-model="form.message"
              label="متن"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-autocomplete
              v-model="form.targetFile"
              label="فایل"
              :items="targetFiles"
              item-text="title"
              item-value="id"
              dense
            ></v-autocomplete>
          </v-col>
          <v-btn
            color="primary"
            depressed
            @click="saveDialog"
            class="mr-auto"
          >
            ایجاد پیام
          </v-btn>
        </v-row>
      </v-form>
    </v-container>
    <v-data-table
      :headers="dialogHeaders"
      :items="dialogs"
      :search="dialogSearch"
      no-results-text="اطلاعاتی یافت نشد"
      class="elevation-1 w-100 mt-3"
      :items-per-page="5"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-text-field
            v-model="dialogSearch"
            label="جست جو"
            single-line
            hide-details
            autofocus
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.submitDate="{ item }">
        {{ transformDateToJalali(item.submitDate) }}
      </template>
    </v-data-table>
  </v-tab-item>
</template>

<script>
  import { requestService } from '../../service/requestService'
  import { required } from '../../plugins/rule'
  import { transformDateToJalali } from '../../plugins/transformData'

  export default {
    name: 'Tab2',
    props: {
      targetFiles: {
        Array,
        isRequired: true,
      },
      dialogs: {
        Array,
        isRequired: true,
      },
    },
    data () {
      return {
        dialogSearch: '',
        form: {
          message: '',
          targetFile: '',
        },
        dialogHeaders: [
          {
            text: 'متن پیام',
            value: 'message',
          },
          {
            text: 'ارسال کننده',
            value: 'user.nickname',
          },
          {
            text: 'تاریخ ارسال',
            value: 'submitDate',
          },
          {
            text: 'شناسه کوتاه',
            value: 'humanId',
          },
        ],
        required,
        transformDateToJalali,
      }
    },
    computed: {
      request () {
        return this.$store.getters['request/getRequest']
      },
    },
    mounted () {
      // this.$emit('getData')
    },
    methods: {
      createRequest () {
        this.$store.dispatch('request/createRequest', this.episode._id).then(({ data }) => {
          this.$store.dispatch('request/fetchRequest', data.data.id)
        })
      },
      saveDialog () {
        if (this.$refs.dialogForm.validate()) {
          const dialog = {
            ...this.form,
            _id: this.request._id,
          }
          requestService().createDialog(dialog).then(() => {
            this.$emit('getData')
            this.$toast.success('عملیات با موفقیت انجام شد')
            this.$refs.dialogForm.reset()
            this.$refs.dialogForm.resetValidation()
          })
        }
      },
    },
  }
</script>

<style scoped>

</style>
