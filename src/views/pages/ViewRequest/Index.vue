<template>

  <v-container>

    <v-tabs
      v-model="tabsMenu"
      class="mt-5"
      color="grey darken-3"
    >
      <v-tab
        href="#submitted"
        @click="getData(1)"
      >
        ایجاد شده
      </v-tab>
      <v-tab
        href="#inqueu"
        @click="getData(2)"
      >
        در صف
      </v-tab>
      <v-tab
        href="#assigned"
        @click="getData(3)"
      >
        ارجاع شده
      </v-tab>
      <v-tab
        href="#confirmed"
        @click="getData(4)"
      >
        تایید شده
      </v-tab>
      <v-tab
        href="#working"
        @click="getData(5)"
      >
        در حال بررسی
      </v-tab>
      <v-tab
        href="#completed"
        @click="getData(6)"
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

    <!--    تب ها-->
    <v-dialog
      v-model="tabsDialog"
      persistent
      max-width="800px"
    >
      <v-card>
        <v-card-text>
          <v-tabs
            v-model="detailsTabsMenu"
            class="mt-5"
            color="grey darken-3"
          >
            <v-tab
              href="#assessment"
              @click="handleDetailTab1"
            >
              ارزیابی
            </v-tab>
            <v-tab
              href="#chat"
              @click="handleDetailTab2"
            >
              گفتگوها
            </v-tab>
            <v-tab
              href="#file"
              @click="handleDetailTab3"
            >
              فایل
            </v-tab>
          </v-tabs>
          <v-divider/>

          <v-tabs-items v-model="detailsTabsMenu">
            <v-tab-item
              class="mt-5"
              value="assessment"
            >
              <v-col cols="12">
                <template>
                  <v-row v-if="assessmentRequestInfoObject">
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-text-field
                        :value="transformRequestStatus(assessmentRequestInfoObject.status)"
                        label="وضعیت"
                        readonly
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-text-field
                        :value="transformDateToJalali(assessmentRequestInfoObject.submitDate)"
                        label="تاریخ ثبت درخواست"
                        readonly
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                    >
                      <v-text-field
                        v-model="assessmentRequestInfoObject.description"
                        label="توضیحات"
                        readonly
                      />
                    </v-col>
                  </v-row>
                  <!--                  <v-row v-if="!assessmentInfo && canAssignTome">-->
                  <!--                    <v-btn-->
                  <!--                        @click="createAssessment"-->
                  <!--                    >ارزیابی-->
                  <!--                    </v-btn>-->
                  <!--                  </v-row>-->
                </template>
              </v-col>
            </v-tab-item>

            <v-tab-item
              class="mt-1"
              value="chat"
            >
              <v-container>
                <v-form ref="dialogForm">
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        v-model="dialogEditedItem.message"
                        :rules="[
                          required('این فیلد الزامی است'),
                        ]"
                        label="متن"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-autocomplete
                        v-model="dialogEditedItem.targetFile"
                        label="فایل"
                        :items="targetFiles"
                        item-text="title"
                        item-value="id"
                        dense
                      />
                    </v-col>
                    <v-btn
                      color="primary"
                      depressed
                      class="mr-auto"
                      @click="saveDialog"
                    >
                      ایجاد پیام
                    </v-btn>
                  </v-row>
                </v-form>
              </v-container>
              <v-data-table
                :headers="dialogHeaders"
                :items="dialogs"
                :search="dialogSearch"
                no-results-text="اطلاعاتی یافت نشد"
                class="elevation-1 w-100 mt-3"
              >
                <template v-slot:top>
                  <v-toolbar
                    flat
                  >
                    <v-text-field
                      v-model="dialogSearch"
                      label="جست جو"
                      single-line
                      hide-details
                      autofocus
                    />
                  </v-toolbar>
                </template>
                <template v-slot:item.submitDate="{ item }">
                  {{ transformDateToJalali(item.submitDate) }}
                </template>
              </v-data-table>
            </v-tab-item>

            <v-tab-item
              class="mt-1"
              value="file"
            >
              <v-container>
                <v-form
                  v-if="canUploadFile"
                  ref="fileForm"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="fileEditedItem.fileUrl"
                        :rules="[
                          required('این فیلد الزامی است'),
                        ]"
                        label="آدرس فایل"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="fileEditedItem.accessKey"
                        :rules="[
                          required('این فیلد الزامی است'),
                        ]"
                        label="accessKey"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="fileEditedItem.secretKey"
                        :rules="[
                          required('این فیلد الزامی است'),
                        ]"
                        label="secretKey"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-text-field
                        v-model="fileEditedItem.desc"
                        label="توضیحات"
                      />
                    </v-col>
                    <v-btn
                      color="primary"
                      depressed
                      class="mr-auto"
                      @click="saveFile"
                    >
                      ارسال فایل
                    </v-btn>
                  </v-row>
                </v-form>
              </v-container>
              <v-data-table
                :headers="fileHeaders"
                :items="files"
                :search="fileSearch"
                no-results-text="اطلاعاتی یافت نشد"
                class="elevation-1 w-100 mt-3"
              >
                <template v-slot:top>
                  <v-toolbar
                    flat
                  >
                    <v-text-field
                      v-model="fileSearch"
                      label="جست جو"
                      single-line
                      hide-details
                      autofocus
                    />
                  </v-toolbar>
                </template>
                <template v-slot:item.submitDate="{ item }">
                  {{ transformDateToJalali(item.submitDate) }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    small
                    @click="handleFileRule(item)"
                  >
                    mdi-pen
                  </v-icon>
                  <!--                  <v-btn-->
                  <!--                      small-->
                  <!--                      download-->
                  <!--                      :href="item.fileUrl"-->
                  <!--                      class="ma-2"-->
                  <!--                      outlined-->
                  <!--                      text-->
                  <!--                  >-->
                  <!--                    <v-icon-->
                  <!--                        small-->
                  <!--                    >-->
                  <!--                      mdi-cloud-->
                  <!--                    </v-icon>-->
                  <!--                  </v-btn>-->
                </template>
              </v-data-table>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <!--          <v-btn-->
          <!--              color="blue darken-1"-->
          <!--              text-->
          <!--              @click="completeAssessmentRequest"-->
          <!--              v-if="!assessmentRequestIsCompleted && canAssignTome"-->
          <!--          >-->
          <!--            تایید کارگزار-->
          <!--          </v-btn>-->
          <!--          <v-btn-->
          <!--              color="blue darken-1"-->
          <!--              text-->
          <!--              @click="viewAllAssessments"-->
          <!--              v-if="assessmentRequestIsCompleted && canUploadFile"-->
          <!--          >-->
          <!--            مشاهده ارزیابی ها-->
          <!--          </v-btn>-->
          <v-btn
            color="blue darken-1"
            text
            @click="closeDetailsTabs"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    تب ها-->

    <!--    &lt;!&ndash;    ویدیو تگ&ndash;&gt;-->
    <!--    <v-dialog-->
    <!--        v-model="videoTagDialog"-->
    <!--        persistent-->
    <!--    >-->
    <!--      <v-card>-->
    <!--        <v-card-text>-->
    <!--          <video-tag :url="videoUrl" :file="fileId" :assessment="assessmentId" :assessment-rules="assessmentRules"-->
    <!--                     :type="type"/>-->
    <!--        </v-card-text>-->
    <!--        <v-card-actions>-->
    <!--          <v-spacer></v-spacer>-->
    <!--          <v-btn-->
    <!--              color="blue darken-1"-->
    <!--              text-->
    <!--              @click="closeVideoTags"-->
    <!--          >-->
    <!--            انصراف-->
    <!--          </v-btn>-->
    <!--        </v-card-actions>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->
    <!--    &lt;!&ndash;    ویدیو تگ&ndash;&gt;-->

    <!--    ویدیو تگ-->
    <v-dialog
      v-model="videoTagDialog"
      persistent
    >
      <v-card>
        <v-card-text>
          <video-tag
            :url="videoUrl"
            :file="fileId"
            :assessment="assessmentId"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="blue darken-1"
            text
            @click="closeVideoTags"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    ویدیو تگ-->

    <!--    &lt;!&ndash;    دیدبن assessment ها&ndash;&gt;-->
    <!--    <v-dialog-->
    <!--        v-model="assessmentDialog"-->
    <!--        persistent-->
    <!--    >-->
    <!--      <v-card>-->
    <!--        <v-card-text>-->

    <!--        </v-card-text>-->
    <!--        <v-card-actions>-->
    <!--          <v-btn-->
    <!--              @click="closeAssessmentDialog"-->
    <!--          >-->
    <!--            بستن-->
    <!--          </v-btn>-->
    <!--        </v-card-actions>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->
    <!--    &lt;!&ndash;    دیدبن assessment ها&ndash;&gt;-->
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
        assessmentRequestStatus,
        statusSelectValue: 0,
        brokerageValue: null,
        transformDateToJalali,
        transformRequestStatus,
        required,
        detailsTabsMenu: null,
        dialogs: [],
        files: [],
        assessmentRequestInfoObject: null,
        assessmentInfo: null,
        dialogEditedItem: {
          message: '',
          targetFile: '',
        },
        dialogEditedDefaultItem: {
          message: '',
          targetFile: '',
        },
        targetFiles: [],
        dialogHeaders: [
          {
            text: 'متن پیام',
            value: 'message',
          },
          {
            text: 'ارسال کننده',
            value: 'user.nickname',
          },
          {
            text: 'تاریخ ارسال',
            value: 'submitDate',
          },
          {
            text: 'شناسه کوتاه',
            value: 'humanId',
          },
        ],
        fileHeaders: [
          {
            text: 'آدرس فایل',
            value: 'fileUrl',
          },
          {
            text: 'آپلود کننده',
            value: 'user.nickname',
          },
          {
            text: 'تاریخ ارسال',
            value: 'submitDate',
          },
          {
            text: 'شناسه کوتاه',
            value: 'humanId',
          },
          {
            text: 'مدت زمان',
            value: 'duration',
          },
          {
            text: 'توضیحات',
            value: 'desc',
          },
          {
            text: 'عملیات',
            value: 'actions',
            sortable: false,
          },
        ],
        dialogSearch: '',
        fileSearch: '',
        fileEditedItem: {
          desc: '',
          fileUrl: 'http://techslides.com/demos/sample-videos/small.mp4',
          accessKey: '',
          secretKey: '',
        },
        fileEditedDefaultItem: {
          desc: '',
          fileUrl: 'http://techslides.com/demos/sample-videos/small.mp4',
          accessKey: '',
          secretKey: '',
        },
        videoTagDialog: false,
        videoUrl: null,
        fileId: null,
        currentEpisode: null,
        assessmentId: null,
        assessmentRules: [],
        type: 'assessment',
        assessmentRequestIsCompleted: false,
        canViewAllAssessments: false,
        assessmentDialog: false,
        assessmentDialogData: [],
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
      this.getData(0)
      if (this.canSetStatusAndAssignToBrokerage) {
        this.$store.dispatch('fetchOrganizations')
      }
      this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
    },
    methods: {
      getData (status) {
        this.$store.dispatch('request/fetchAssessmentListByStatus', status)
      },

      // handle status
      changeStatus (item, currentTab) {
        this.statusDialog = true
        this.item = item
        this.currentTab = currentTab
      },
      closeStatus () {
        this.statusDialog = false
      },
      async saveStatus (status) {
        const data = {
          status: status,
          requestId: this.item._id,
        }
        await this.$store.dispatch('request/setStatusOfRequest', data)
        await this.getData(this.currentTab)
        this.$toast.success('عملیات با موفقیت انجام شد')
      },
      // handle status

      // handle brokerage
      changeBrokerage (item, currentTab) {
        this.brokerageDialog = true
        this.item = item
        this.currentTab = currentTab
      },
      closeBrokerage () {
        this.brokerageDialog = false
      },
      async saveBrokerage (brokerageValue) {
        const data = {
          brokerageId: brokerageValue,
          requestId: this.item._id,
        }
        await this.$store.dispatch('request/assignRequestToBrokerage', data)
        await this.getData(this.currentTab)
        this.$toast.success('عملیات با موفقیت انجام شد')
      },
      // handle brokerage

      // handle assign
      async assignedToMe (item, index) {
        const data = {
          brokerageId: brokerageValue,
          requestId: this.item._id,
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
