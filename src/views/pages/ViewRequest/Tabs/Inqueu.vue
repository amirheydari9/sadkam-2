<template>
  <v-tab-item
    class="mt-5"
    value="inqueu"
  >
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="inqueu"
        no-results-text="اطلاعاتی یافت نشد"
        class="w-100"
      >
        <template v-slot:item.actions="{item}">
          <v-icon
            v-if="canAssignTome"
            small
            class="mr-2"
            @click="assignedToMe(item)"
          >
            mdi-plus-box
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
  import { permission } from '../../../../plugins/permission'

  export default {
    name: 'Inqueu',
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
      }
    },
    computed: {
      canAssignTome () {
        return permission().isBrokerage() && permission().isOrders()
      },
      inqueu: {
        get () {
          return this.$store.getters['assessmentRequest/getInqueu']
        },
        set (value) {
          return this.$store.commit('assessmentRequest/SET_INQUEU', value)
        },
      },
    },
    methods: {
      assignedToMe (item) {
        this.$emit('assignToMe', { ...item }, 1)
      },
      seeDetails (item) {
        this.$emit('seeDetails', { ...item }, 0)
      },
    },
  }
</script>

<style scoped>

</style>
