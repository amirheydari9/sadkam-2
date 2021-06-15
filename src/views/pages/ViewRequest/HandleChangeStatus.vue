<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="300px"
  >
    <v-card>
      <dialog-headline title="مدیریت وضعیت درخواست"/>
      <v-card-text>
        <v-select
          v-model="status"
          :items="assessmentRequestStatus"
          item-text="fa"
          item-value="code"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          rounded
          @click="save()"
        >
          تایید
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
  import { assessmentRequestStatus } from '../../../plugins/constant'
  import DialogHeadline from '../../../components/DialogHeadline'

  export default {
    name: 'HandleChangeStatus',
    components: { DialogHeadline },
    props: {
      showDialog: {
        Boolean,
        isRequired: true,
      },
    },
    data () {
      return {
        status: 0,
        assessmentRequestStatus,
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
    },
    methods: {
      close () {
        this.$emit('closeDialog')
      },
      save () {
        this.$emit('saveDialog', this.status)
        this.close()
      },
    },
  }
</script>

<style scoped>

</style>
