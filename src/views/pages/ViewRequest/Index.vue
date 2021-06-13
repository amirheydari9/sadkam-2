<template>

  <v-container>

    <v-tabs
      v-model="tabsMenu"
      class="mt-5"
      color="grey darken-3"
    >
      <v-tab
        href="#submitted"
        @click="getData(0,1,5)"
      >
        ایجاد شده
      </v-tab>
      <v-tab
        href="#inqueu"
        @click="getData(1,1,5)"
      >
        در صف
      </v-tab>
      <v-tab
        href="#assigned"
        @click="getData(2,1,5)"
      >
        ارجاع شده
      </v-tab>
      <v-tab
        href="#confirmed"
        @click="getData(3,1,5)"
      >
        تایید شده
      </v-tab>
      <v-tab
        href="#working"
        @click="getData(4,1,5)"
      >
        در حال بررسی
      </v-tab>
      <v-tab
        href="#completed"
        @click="getData(5,1,5)"
      >
        تکمیل شده
      </v-tab>
    </v-tabs>

    <v-divider/>

    <v-tabs-items v-model="tabsMenu">

      <Submitted
        @changeStatus="changeStatus"
        @changeBrokerage="changeBrokerage"
        @seeDetails="seeDetails"
      />
      <Inqueu
        @changeStatus="changeStatus"
        @assignToMe="assignedToMe"
        @seeDetails="seeDetails"
      />
      <Assigned
        @changeStatus="changeStatus"
        @unAssignMe="unAssignMe"
        @seeDetails="seeDetails"
      />
      <Confirmed
        @changeStatus="changeStatus"
        @seeDetails="seeDetails"
        @calculateCost="calculateCost"
      />
      <Working
        @changeStatus="changeStatus"
        @seeDetails="seeDetails"
      />
      <Completed
        @changeStatus="changeStatus"
        @seeDetails="seeDetails"
      />

    </v-tabs-items>

    <HandleChangeStatus
      v-if="statusDialog"
      :show-dialog="statusDialog"
      @closeDialog="closeStatus"
      @saveDialog="saveStatus"
    />

    <HandleBrokerage
      v-if="brokerageDialog"
      :show-dialog="brokerageDialog"
      @closeDialog="closeBrokerage"
      @saveDialog="saveBrokerage"
    />

    <tabs-wrapper
      v-if="tabsDialog"
      :show-dialog="tabsDialog"
      @closeDialog="closeTabsDialog"
    />

    <handle-cost
      v-if="costDialog"
      :show-dialog="costDialog"
      @closeDialog="closeCostDialog"
      @saveDialog="saveCost"
    />

  </v-container>
</template>

<script>
  import { permission } from '../../../plugins/permission'
  import Assigned from './Tabs/Assigned'
  import Submitted from './Tabs/Submitted'
  import Inqueu from './Tabs/Inqueu'
  import Confirmed from './Tabs/Confirmed'
  import Working from './Tabs/Working'
  import Completed from './Tabs/Completed'
  import HandleChangeStatus from './HandleChangeStatus'
  import HandleBrokerage from './HandleBrokerage'
  import TabsWrapper from '../../../components/Tabs/TabsWrapper'
  import HandleCost from './HandleCost'

  export default {
    name: 'Index',
    components: {
      HandleCost,
      HandleChangeStatus,
      HandleBrokerage,
      Completed,
      Working,
      Confirmed,
      Inqueu,
      Submitted,
      Assigned,
      TabsWrapper,
    },
    data () {
      return {
        tabsMenu: null,
        statusDialog: false,
        brokerageDialog: false,
        tabsDialog: false,
        costDialog: false,
        currentItem: null,
        currentTab: null,
        page: null,
        size: null,
      }
    },
    computed: {
      canSetStatusAndAssignToBrokerage () {
        return permission().isSecretariant() && permission().isOrders()
      },
    },
    beforeDestroy () {
      this.$store.commit('request/SET_SUBMITTED', [])
      this.$store.commit('request/SET_INQUEU', [])
      this.$store.commit('request/SET_ASSIGNED', [])
      this.$store.commit('request/SET_CONFIRMED', [])
      this.$store.commit('request/SET_WORKING', [])
      this.$store.commit('request/SET_COMPLETED', [])
      this.$store.commit('episode/SET_EPISODE', null)
    },
    mounted () {
      this.getData(0, 1, 5)
      if (this.canSetStatusAndAssignToBrokerage) {
        this.$store.dispatch('fetchOrganizations')
      }
      this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
    },
    methods: {
      getData (status, page, size) {
        this.$store.dispatch('request/fetchAssessmentListByStatus', {
          status: status,
          page: page,
          size: size,
        })
      },

      // handle status
      changeStatus (item, currentTab, page, size) {
        this.statusDialog = true
        this.currentItem = item
        this.currentTab = currentTab
        this.page = page
        this.size = size
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
        await this.getData(this.currentTab, this.page, this.size)
        this.$toast.success('عملیات با موفقیت انجام شد')
      },
      // handle status

      // handle brokerage
      changeBrokerage (item, currentTab, page, size) {
        this.brokerageDialog = true
        this.currentItem = item
        this.currentTab = currentTab
        this.page = page
        this.size = size
      },
      closeBrokerage () {
        this.brokerageDialog = false
      },
      async saveBrokerage (brokerageValue) {
        const data = {
          brokerageId: brokerageValue,
          requestId: this.currentItem._id,
        }
        await this.$store.dispatch('request/assignRequestToBrokerage', data)
        await this.getData(this.currentTab, this.page, this.size)
        this.$toast.success('عملیات با موفقیت انجام شد')
      },
      // handle brokerage

      // handle assign
      async assignedToMe (item, index, page, size) {
        const data = {
          brokerageId: this.$store.getters.getCurrentUser.organization,
          requestId: item._id,
        }
        await this.$store.dispatch('request/assignRequestToBrokerage', data)
        await this.getData(index, page, size)
        this.$toast.success('عملیات با موفقیت انجام شد')
      },

      async unAssignMe (item, index, page, size) {
        const data = {
          requestId: item._id,
        }
        await this.$store.dispatch('request/unAssignRequestToBrokerage', data)
        await this.getData(index, page, size)
        this.$toast.success('عملیات با موفقیت انجام شد')
      },
      // handle assign

      // see details
      async seeDetails (item) {
        await this.$store.dispatch('episode/getEpisode', item.episode).then(() => {
          this.tabsDialog = true
        })
      },
      closeTabsDialog () {
        this.$store.commit('episode/SET_EPISODE', null)
        this.tabsDialog = false
      },
      // see details

      // handle cost
      async calculateCost (item) {
        await this.$store.dispatch('request/calculateCost', item._id)
      },
      async saveCost (item) {
        await this.$store.dispatch('episode/getEpisode', item.episode)
        this.tabsDialog = true
      },
      closeCostDialog () {
        this.costDialog = false
      },
      // handle cost
    },
  }
</script>

<style scoped>

</style>
