<template>
  <v-tab-item
    class="mt-5"
    value="confirmed"
  >
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="confirmed"
        no-results-text="اطلاعاتی یافت نشد"
        class="w-100"
      >
        <template v-slot:item.status="{ item }">
          {{ transformRequestStatus(item.status) }}
        </template>
        <template v-slot:item.submitDate="{ item }">
          {{ transformDateToJalali(item.submitDate) }}
        </template>
        <template v-slot:item.actions="{item}">
          <v-icon
            small
            class="mr-2"
            @click="seeDetails(item)"
          >
            mdi-eye
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-tab-item>
</template>

<script>
  import { transformDateToJalali, transformRequestStatus } from '../../../../plugins/transformData'

  export default {
    name: 'Confirmed',
    data () {
      return {
        headers: [
          {
            text: 'وضعیت',
            value: 'status',
          },
          {
            text: 'تاریخ ایجاد',
            value: 'submitDate',
          },
          {
            text: 'توضیحات',
            value: 'description',
          },
          {
            text: 'عملیات',
            value: 'actions',
            sortable: false,
          },
        ],
        transformDateToJalali,
        transformRequestStatus,
      }
    },
    computed:{
      confirmed: {
        get () {
          return this.$store.getters['assessmentRequest/getConfirmed']
        },
        set (value) {
          return this.$store.commit('assessmentRequest/SET_CONFIRMED', value)
        },
      },
    },
    methods:{
      seeDetails (item) {
        this.$emit('seeDetails', { ...item }, 0)
      },
    }
  }
</script>

<style scoped>

</style>
