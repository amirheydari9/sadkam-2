<template>

  <v-container>

    <v-tabs
      v-model="tabsMenu"
      class="mt-5"
      color="grey darken-3"
    >
      <v-tab
        href="#submitted"
        @click="getData(1,1,5)"
      >
        ایجاد شده
      </v-tab>
      <v-tab
        href="#inqueu"
        @click="getData(2,1,5)"
      >
        در صف
      </v-tab>
      <v-tab
        href="#assigned"
        @click="getData(3,1,5)"
      >
        ارجاع شده
      </v-tab>
      <v-tab
        href="#confirmed"
        @click="getData(4,1,5)"
      >
        تایید شده
      </v-tab>
      <v-tab
        href="#working"
        @click="getData(5,1,5)"
      >
        در حال بررسی
      </v-tab>
      <v-tab
        href="#completed"
        @click="getData(6,1,5)"
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
        @assignToMe="assignedToMe"
        @seeDetails="seeDetails"
      />
      <Assigned
        @unAssignMe="unAssignMe"
        @seeDetails="seeDetails"
      />
      <Confirmed
        @seeDetails="seeDetails"
      />
      <Working
        @seeDetails="seeDetails"
      />
      <Completed
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

  </v-container>
</template>

<script>
  import { transformDateToJalali, transformRequestStatus } from '../../../plugins/transformData'
  import { assessmentRequestStatus } from '../../../plugins/constant'
  import { permission } from '../../../plugins/permission'
  import { requestService } from '../../../service/requestService'
  import { required } from '../../../plugins/rule'
  import VideoTag from '../../../components/VideoTag'
  import Assigned from './Tabs/Assigned'
  import Submitted from './Tabs/Submitted'
  import Inqueu from './Tabs/Inqueu'
  import Confirmed from './Tabs/Confirmed'
  import Working from './Tabs/Working'
  import Completed from './Tabs/Completed'
  import HandleChangeStatus from './HandleChangeStatus'
  import HandleBrokerage from './HandleBrokerage'
  import TabsWrapper from '../../../components/Tabs/TabsWrapper'
  // import {assessmentService} from "../../../service/assessmentService";
  // import {ruleService} from "../../../service/ruleService";

  export default {
    name: 'Index',
    components: {
      HandleChangeStatus,
      HandleBrokerage,
      Completed,
      Working,
      Confirmed,
      Inqueu,
      Submitted,
      Assigned,
      VideoTag,
      TabsWrapper,
    },
    data () {
      return {
        tabsMenu: null,
        statusDialog: false,
        brokerageDialog: false,
        tabsDialog: false,
        currentItem: null,
        currentTab: null,
        page: null,
        size: null,
        assessmentRequestStatus,
        statusSelectValue: 0,
        brokerageValue: null,
        transformDateToJalali,
        transformRequestStatus,
        required,
      }
    },
    computed: {
      // canUploadFile () {
      //   return permission().isPlatform() && permission().isOrders()
      // },
      canSetStatusAndAssignToBrokerage () {
        return permission().isSecretariant() && permission().isOrders()
      },
      // canAssignTome () {
      //   return permission().isBrokerage() && permission().isOrders()
      // },
      // brokerage () {
      //   return this.$store.getters.getBrokerage
      // },
    },
    beforeDestroy () {
      this.$store.commit('assessmentRequest/SET_SUBMITTED', [])
      this.$store.commit('assessmentRequest/SET_INQUEU', [])
      this.$store.commit('assessmentRequest/SET_ASSIGNED', [])
      this.$store.commit('assessmentRequest/SET_CONFIRMED', [])
      this.$store.commit('assessmentRequest/SET_WORKING', [])
      this.$store.commit('assessmentRequest/SET_COMPLETED', [])
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
      async assignedToMe (item, index) {
        const data = {
          brokerageId: brokerageValue,
          requestId: this.currentItem._id,
        }
        await this.$store.dispatch('request/assignRequestToBrokerage', data)
        await this.getData(index)
        this.$toast.success('عملیات با موفقیت انجام شد')
      },

      async unAssignMe (item, index) {
        const data = {
          requestId: item._id,
        }
        await this.$store.dispatch('request/unAssignRequestToBrokerage', data)
        await this.getData(index)
        this.$toast.success('عملیات با موفقیت انجام شد')
      },
      // handle assign

      seeDetails (item) {
        this.$store.commit('episode/SET_EPISODE', item.episode._id)
        // this.currentEpisode = item.episode
        this.tabsDialog = true

        // requestService().getRequest(item._id).then(({ data }) => {
        //   this.assessmentRequestInfoObject = data.data
        //   this.files = data.data.files
        //   data.data.dialogs.forEach(value => {
        //     const obj = this.files.find(item => {
        //       if (value.targetFile) {
        //         return item._id === value.targetFile
        //       }
        //     })
        //     if (obj) {
        //       value.humanId = obj.desc ? `${obj.desc}-${obj.humanId}` : `${obj.humanId}`
        //     } else {
        //       value.humanId = 'ندارد'
        //     }
        //   })
        //   this.dialogs = data.data.dialogs
        //   this.tabsDialog = true
        // if (data.data.assessment) {
        //   this.assessmentInfo = data.data.assessment
        // } else {
        //   if (this.canAssignTome) {
        //     this.$toast.info('حداقل یک فایل بارگزاری کنید')
        //   }
        // }
        // }).catch(() => this.$toast.error('خطایی رخ داده است'))
      },

      saveDialog () {
        if (this.$refs.dialogForm.validate()) {
          const dialog = {
            ...this.dialogEditedItem,
            _id: this.assessmentRequestInfoObject._id,
          }
          requestService().createDialog(dialog).then(() => {
            this.seeDetails(this.assessmentRequestInfoObject)
            this.$refs.dialogForm.reset()
            this.$refs.dialogForm.resetValidation()
          })
        }
      },
      saveFile () {
        if (this.$refs.fileForm.validate()) {
          const file = {
            ...this.fileEditedItem,
            _id: this.assessmentRequestInfoObject._id,
          }
          requestService().createFile(file).then(() => {
            this.seeDetails(this.assessmentRequestInfoObject)
            this.$refs.fileForm.reset()
            this.$refs.fileForm.resetValidation()
          })
        }
      },
      async handleFileRule (item) {
        try {
          await this.$store.dispatch('rule/fetchAllListRulesOfFile', item._id)
          this.videoUrl = item.fileUrl
          this.assessmentId = this.assessmentRequestInfoObject._id
          this.fileId = item._id
          this.videoTagDialog = true
        } catch (e) {
          this.$toast.error('خطایی رخ داده است')
        }
      },
      closeVideoTags () {
        this.videoTagDialog = false
        this.$nextTick(() => {
          this.videoUrl = null
          this.assessmentId = null
          this.fileId = null
        })
      },
      closeTabsDialog () {
        this.tabsDialog = false
        this.$store.commit('episode/SET_EPISODE', null)
        this.assessmentRequestInfoObject = null
        this.assessmentInfo = null
        this.currentEpisode = null
        this.assessmentRequestIsCompleted = false
        this.canViewAllAssessments = false
      },

      // createAssessment() {
      //   try {
      //     const assessment = {
      //       episode: this.currentEpisode,
      //       assessmentRequest: this.assessmentRequestInfoObject._id
      //     }
      //     console.log(assessment, 'assessment')
      //     this.$store.dispatch('assessment/createAssessment', assessment).then((data) => {
      //       console.log(data, 'forid', data.data.id);
      //       assessmentService().getRulesByAssessmentId(data.data.id).then((value) => {
      //         this.videoTagDialog = true
      //         this.videoUrl = this.assessmentRequestInfoObject.files[0].fileUrl;
      //         this.fileId = this.assessmentRequestInfoObject.files[0]._id
      //         this.assessmentId = data.data.id
      //         console.log(value, 'value', value.data.data.rules);
      //         this.assessmentRules = value.data.data.rules
      //       })
      //     })
      //   } catch (e) {
      //     this.$toast.error('عملیات انجام نشد')
      //   }
      // },

      // completeAssessmentRequest() {
      //   console.log(this.assessmentInfo, 'this.assessmentInfo')
      //   const data = {
      //     status: 4,
      //     _id: this.assessmentInfo._id
      //   }
      //   this.$store.dispatch('assessmentRequest/setStatusOfAssessmentRequest', data).then(() => {
      //     this.assessmentRequestIsCompleted = true
      //   })
      // },
      // viewAllAssessments() {
      //     ruleService().getListRulesOfAssessment(this.assessmentId)
      // },
      // closeAssessmentDialog() {
      //   this.assessmentDialog = false
      // }
    },
  }
</script>

<style scoped>

</style>
