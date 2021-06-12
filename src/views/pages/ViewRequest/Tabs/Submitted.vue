<template>
  <v-tab-item
    class="mt-5"
    value="submitted"
  >
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="submitted"
        no-results-text="اطلاعاتی یافت نشد"
        class="w-100"
      >

        <template v-slot:item.actions="{item}">
          <v-icon
            v-if="canSetStatusAndAssignToBrokerage"
            small
            class="mr-2"
            @click="changeStatus(item)"
          >
            mdi-refresh
          </v-icon>
          <v-icon
            v-if="canSetStatusAndAssignToBrokerage"
            small
            class="mr-2"
            @click="changeBrokerage(item)"
          >
            mdi-account-convert
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="seeDetails(item)"
          >
            mdi-eye
          </v-icon>
        </template>
        <template v-slot:item.status="{ item }">
          {{ transformRequestStatus(item.status) }}
        </template>
        <template v-slot:item.submitDate="{ item }">
          {{ transformDateToJalali(item.submitDate) }}
        </template>
      </v-data-table>
    </v-col>
  </v-tab-item>
</template>

<script>
  import { transformDateToJalali, transformRequestStatus } from '../../../../plugins/transformData'
  import { permission } from '../../../../plugins/permission'

  export default {
    name: 'Submitted',
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
    computed: {
      canSetStatusAndAssignToBrokerage () {
        return permission().isSecretariant() && permission().isOrders()
      },
      submitted: {
        get () {
          return this.$store.getters['assessmentRequest/getSubmitted']
        },
        set (value) {
          return this.$store.commit('assessmentRequest/SET_SUBMITTED', value)
        },
      },
    },
    methods: {
      changeStatus (item) {
        this.$emit('changeStatus', { ...item }, 0)
      },
      changeBrokerage (item) {
        this.$emit('changeBrokerage', { ...item }, 0)
      },
      seeDetails (item) {
        this.$emit('seeDetails', { ...item }, 0)
      },
    },
  }
</script>

<style scoped>

</style>
