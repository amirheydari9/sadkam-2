<template>
  <v-tab-item
    class="mt-5"
    value="assigned"
  >
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="assigned"
        no-results-text="اطلاعاتی یافت نشد"
        class="w-100"
      >
        <template v-slot:item.actions="{item}">
          <v-icon
            v-if="canAssignTome"
            small
            class="mr-2"
            @click="unAssignMe(item)"
          >
            mdi-minus-box
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="seeDetails(item,0)"
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
  import { permission } from '../../../../plugins/permission'
  import { transformDateToJalali, transformRequestStatus } from '../../../../plugins/transformData'

  export default {
    name: 'Assigned',
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
      canAssignTome () {
        return permission().isBrokerage() && permission().isOrders()
      },
      assigned: {
        get () {
          return this.$store.getters['assessmentRequest/getAssigned']
        },
        set (value) {
          return this.$store.commit('assessmentRequest/SET_ASSIGNED', value)
        },
      },
    },
    methods: {
      unAssignMe (item) {
        this.$emit('unAssignMe', { ...item }, 2)
      },
      seeDetails (item) {
        this.$emit('seeDetails', { ...item }, 0)
      },
    },
  }
</script>

<style scoped>

</style>
