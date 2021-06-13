<template>
  <v-tab-item
    class="mt-5"
    value="completed"
  >
    <v-col cols="12">
      <v-data-table
        :page="page"
        :pageCount="numberOfPages"
        :options.sync="options"
        :server-items-length="totalItems"
        :loading="loading"
        :headers="headers"
        :items="completed"
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
            @click="seeDetails(item,0)"
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
    name: 'Completed',
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
      completed: {
        get () {
          return this.$store.getters['request/getCompleted']
        },
        set (value) {
          return this.$store.commit('request/SET_COMPLETED', value)
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
          status: 5,
          page: page,
          size: itemsPerPage,
        })
        this.loading = false
        this.working = data.data.items
        this.totalItems = data.data.paginator.itemCount
        this.numberOfPages = data.data.paginator.totalPages
      },
      seeDetails (item) {
        this.$emit('seeDetails', { ...item }, 0)
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
