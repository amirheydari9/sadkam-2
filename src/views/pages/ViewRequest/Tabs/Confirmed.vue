<template>
  <v-tab-item
    class="mt-5"
    value="confirmed"
  >
    <v-data-table
      :page="page"
      :pageCount="numberOfPages"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      :headers="headers"
      :items="confirmed"
      no-results-text="اطلاعاتی یافت نشد"
      :items-per-page="5"
      :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
    >
      <template v-slot:item.status="{ item }">
        {{ transformRequestStatus(item.status) }}
      </template>
      <template v-slot:item.submitDate="{ item }">
        {{ transformDateToJalali(item.submitDate) }}
      </template>
      <template v-slot:item.actions="{item}">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              v-if="canSetStatusAndAssignToBrokerage"
              small
              class="mr-2"
              @click="changeStatus(item)"
            >
              mdi-refresh
            </v-icon>
          </template>
          <span>تغییر وضعیت</span>
        </v-tooltip>
        <!--          <v-icon-->
        <!--            v-if="canSetStatusAndAssignToBrokerage"-->
        <!--            small-->
        <!--            class="mr-2"-->
        <!--            @click="calculateCost(item)"-->
        <!--          >-->
        <!--            mdi-cash-->
        <!--          </v-icon>-->
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              small
              class="mr-2"
              @click="seeDetails(item)"
            >
              mdi-eye
            </v-icon>
          </template>
          <span>مشاهد جزئیات</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-tab-item>
</template>

<script>
  import { transformDateToJalali, transformRequestStatus } from '../../../../plugins/transformData'
  import { permission } from '../../../../plugins/permission'

  export default {
    name: 'Confirmed',
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
      confirmed: {
        get () {
          return this.$store.getters['request/getConfirmed']
        },
        set (value) {
          return this.$store.commit('request/SET_CONFIRMED', value)
        },
      },
    },
    methods: {
      async readDataFromAPI () {
        this.loading = true
        const {
          page,
          itemsPerPage,
        } = this.options
        let data = await this.$store.dispatch('request/fetchAssessmentListByStatus', {
          status: 3,
          page: page,
          size: itemsPerPage,
        })
        this.loading = false
        this.confirmed = data.data.items
        this.totalItems = data.data.paginator.itemCount
        this.numberOfPages = data.data.paginator.totalPages
      },
      changeStatus (item) {
        this.$emit('changeStatus', { ...item }, 3, this.options.page, this.options.itemsPerPage)
      },
      calculateCost (item) {
        this.$emit('calculateCost', { ...item }, 3, this.options.page, this.options.itemsPerPage)
      },
      seeDetails (item) {
        this.$emit('seeDetails', { ...item })
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
  }
</script>

<style scoped>

</style>
