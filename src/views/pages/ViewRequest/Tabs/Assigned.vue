<template>
  <v-tab-item
    class="mt-5"
    value="assigned"
  >
    <v-data-table
      :page="page"
      :pageCount="numberOfPages"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      :headers="headers"
      :items="assigned"
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              v-if="canAssignTome"
              small
              class="mr-2"
              @click="unAssignMe(item)"
            >
              mdi-minus-box
            </v-icon>
          </template>
          <span>عدم اختصاص</span>
        </v-tooltip>
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
      <template v-slot:item.status="{ item }">
        {{ transformRequestStatus(item.status) }}
      </template>
      <template v-slot:item.submitDate="{ item }">
        {{ transformDateToJalali(item.submitDate) }}
      </template>
    </v-data-table>
  </v-tab-item>
</template>

<script>
  import { permission } from '../../../../plugins/permission'
  import { transformDateToJalali, transformRequestStatus } from '../../../../plugins/transformData'

  export default {
    name: 'Assigned',
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
      canAssignTome () {
        return permission().isBrokerage() && permission().isOrders()
      },
      assigned: {
        get () {
          return this.$store.getters['request/getAssigned']
        },
        set (value) {
          return this.$store.commit('request/SET_ASSIGNED', value)
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
          status: 2,
          page: page,
          size: itemsPerPage,
        })
        this.loading = false
        this.assigned = data.data.items
        this.totalItems = data.data.paginator.itemCount
        this.numberOfPages = data.data.paginator.totalPages
      },
      changeStatus (item) {
        this.$emit('changeStatus', { ...item }, 2, this.options.page, this.options.itemsPerPage)
      },
      unAssignMe (item) {
        this.$emit('unAssignMe', { ...item }, 2, this.options.page, this.options.itemsPerPage)
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
