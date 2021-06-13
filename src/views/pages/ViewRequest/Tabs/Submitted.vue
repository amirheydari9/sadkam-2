<template>
  <v-tab-item
    class="mt-5"
    value="submitted"
  >
    <v-col cols="12">
      <v-data-table
        :page="page"
        :pageCount="numberOfPages"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        :headers="headers"
        :items="submitted"
        no-results-text="اطلاعاتی یافت نشد"
        class="w-100"
        :items-per-page="5"
        :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
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
        page: 1,
        totalItems: 0,
        numberOfPages: 0,
        loading: true,
        options: {},
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
          return this.$store.getters['request/getSubmitted']
        },
        set (value) {
          return this.$store.commit('request/SET_SUBMITTED', value)
        },
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
        let data = await this.$store.dispatch('request/fetchAssessmentListByStatus', {
          status: 0,
          page: page,
          size: itemsPerPage,
        })
        console.log(data)
        this.loading = false
        this.submitted = data.data.items
        this.totalItems = data.data.paginator.itemCount
        this.numberOfPages = data.data.paginator.totalPages
      },
      changeStatus (item) {
        this.$emit('changeStatus', { ...item }, 0, this.options.page, this.options.itemsPerPage)
      },
      changeBrokerage (item) {
        this.$emit('changeBrokerage', { ...item }, 0, this.options.page, this.options.itemsPerPage)
      },
      seeDetails (item) {
        this.$emit('seeDetails', { ...item })
      },
    },
  }
</script>

<style scoped>

</style>
