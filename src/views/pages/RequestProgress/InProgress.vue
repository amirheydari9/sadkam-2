<template>
  <v-tab-item
    class="mt-5"
    value="inProgress"
  >
    <v-data-table
      :page="page"
      :pageCount="numberOfPages"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      :headers="headers"
      :items="inProgress"
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
      <template v-slot:item.status="{ item }">
        {{ transformRequestStatus(item.status) }}
      </template>
      <template v-slot:item.updatedAt="{ item }">
        {{ transformDateToJalali(item.updatedAt) }}
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ transformDateToJalali(item.createdAt) }}
      </template>
      <template v-slot:item.actions="{item}">
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

    <tabs-wrapper
      v-if="tabsDialog"
      :show-dialog="tabsDialog"
      @closeDialog="closeTabsDialog"
    />
  </v-tab-item>

</template>

<script>
  import { transformDateToJalali, transformRequestStatus } from '@/plugins/transformData'
  import TabsWrapper from '@/components/Tabs/TabsWrapper'

  export default {
    name: 'InProgress',
    components: {
      TabsWrapper,
    },
    props: {
      getData: {
        Boolean,
        isRequired: true,
      },
    },
    data () {
      return {
        tabsDialog: false,
        currentItem: null,
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
            text: 'عنوان محتوا',
            value: 'faProductType',
          },
          {
            text: 'آخرین به روز رسانی',
            value: 'updatedAt',
          },
          {
            text: 'تاریخ ایجاد',
            value: 'createdAt',
          },
          {
            text: 'توضیحات',
            value: 'description',
          },
          {
            text: 'ایجاد شده توسط',
            value: 'organization.title',
          },
          {
            text: 'ارجاع شده به',
            value: 'assignedTo.title',
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
      inProgress: {
        get () {
          return this.$store.getters['request/getListInProgress']
        },
        set (value) {
          return this.$store.commit('request/SET_LIST_IN_PROGRESS', value)
        },
      },
    },
    methods: {
      async seeDetails (item) {
        await this.$store.dispatch('episode/getEpisode', item.episode._id).then(() => {
          this.tabsDialog = true
        })
      },
      closeTabsDialog () {
        this.$store.commit('episode/SET_EPISODE', null)
        this.tabsDialog = false
      },

      async readDataFromAPI () {
        this.loading = true
        const {
          page,
          itemsPerPage,
        } = this.options
        let data = await this.$store.dispatch('request/fetchListInProgress', {
          page: page ? page : 1,
          size: itemsPerPage ? itemsPerPage : 5,
        })
        this.loading = false
        this.totalItems = data.data.paginator.itemCount
        this.numberOfPages = data.data.paginator.totalPages
        this.options.page = data.data.paginator.currentPage
        this.options.itemsPerPage = +data.data.paginator.perPage
      },
    },
    watch: {
      options: {
        deep: true,
        handler () {
          this.readDataFromAPI()
        },
      },
      getData (val) {
        if (val) {
          this.readDataFromAPI()
          this.$emit('loaded')
        }
      },
    },
  }
</script>

<style scoped>

</style>
