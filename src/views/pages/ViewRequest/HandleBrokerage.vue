<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="300px"
  >
    <v-card>
      <dialog-headline title="ارجاع به کارگزاری"/>
      <v-card-text>
        <v-select
          v-model="brokerageValue"
          :items="brokerage"
          item-text="title"
          item-value="_id"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          rounded
          @click="save"
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
  import DialogHeadline from '../../../components/DialogHeadline'

  export default {
    name: 'HandleBrokerage',
    components: { DialogHeadline },
    props: {
      showDialog: {
        Boolean,
        isRequired: true,
      },
    },
    data () {
      return {
        brokerageValue: null,
      }
    },
    computed: {
      brokerage () {
        return this.$store.getters.getBrokerage
      },
      show () {
        return this.showDialog
      },
    },
    methods: {
      close () {
        this.$emit('closeDialog')
      },
      save () {
        if (!this.brokerageValue) {
          this.$toast.error('کارگزاری را انتخاب کنید')
          return false
        }
        this.$emit('saveDialog', this.brokerageValue)
        this.close()
      },
    },
  }
</script>

<style scoped>

</style>
