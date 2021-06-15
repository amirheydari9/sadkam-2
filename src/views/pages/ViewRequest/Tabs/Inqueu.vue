<template>
  <v-tab-item
    class="mt-5"
    value="inqueu"
  >
    <v-data-table
      :page="page"
      :pageCount="numberOfPages"
      :options.sync="options"
      :server-items-length="totalItems"
      :loading="loading"
      :headers="headers"
      :items="inqueu"
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
              @click="assignedToMe(item)"
            >
              mdi-plus-box
            </v-icon>
          </template>
          <span>اختصاص به من</span>
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

    <HandleChangeStatus
      v-if="statusDialog"
      :show-dialog="statusDialog"
      @closeDialog="closeStatus"
      @saveDialog="saveStatus"
    />

    <tabs-wrapper
      v-if="tabsDialog"
      :show-dialog="tabsDialog"
      @closeDialog="closeTabsDialog"
    />

  </v-tab-item>
</template>

<script>
  import { permission } from '../../../../plugins/permission'
  import { transformDateToJalali, transformRequestStatus } from '../../../../plugins/transformData'
  import HandleChangeStatus from '../HandleChangeStatus'
  import TabsWrapper from '../../../../components/Tabs/TabsWrapper'

  export default {
    name: 'Inqueu',
    props: {
      getData: {
        Boolean,
        isRequired: true,
      },
    },
    components: {
      HandleChangeStatus,
      TabsWrapper
    },
    data () {
      return {
        statusDialog: false,
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
      inqueu: {
        get () {
          return this.$store.getters['request/getInqueu']
        },
        set (value) {
          return this.$store.commit('request/SET_INQUEU', value)
        },
      },
    },
    methods: {

      changeStatus (item) {
        this.statusDialog = true
        this.currentItem = item
      },
      closeStatus () {
        this.statusDialog = false
      },
      async saveStatus (status) {
        const data = {
          status: status,
          requestId: this.currentItem._id,
        }
        await this.$store.dispatch('request/setStatusOfRequest', data)
        await this.readDataFromAPI()
        this.$toast.success('عملیات با موفقیت انجام شد')
      },

      async assignedToMe (item) {
        const data = {
          brokerageId: this.$store.getters.getCurrentUser.organization,
          requestId: item._id,
        }
        await this.$store.dispatch('request/assignRequestToBrokerage', data)
        await this.readDataFromAPI()
        this.$toast.success('عملیات با موفقیت انجام شد')
      },

      async seeDetails (item) {
        await this.$store.dispatch('episode/getEpisode', item.episode).then(() => {
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
        let data = await this.$store.dispatch('request/fetchAssessmentListByStatus', {
          status: 1,
          page: page,
          size: itemsPerPage,
        })
        this.loading = false
        this.inqueu = data.data.items
        this.totalItems = data.data.paginator.itemCount
        this.numberOfPages = data.data.paginator.totalPages
        this.options.page = data.data.paginator.currentPage
        this.options.itemsPerPage = +data.data.paginator.perPage
      },
      // changeStatus (item) {
      //   this.$emit('changeStatus', { ...item }, 1, this.options.page, this.options.itemsPerPage)
      // },
      // assignedToMe (item) {
      //   this.$emit('assignToMe', { ...item }, 1, this.options.page, this.options.itemsPerPage)
      // },
      // seeDetails (item) {
      //   this.$emit('seeDetails', { ...item })
      // },
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
