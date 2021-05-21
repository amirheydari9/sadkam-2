<template>
  <v-container>
    <v-tabs class="mt-5" color="grey darken-3" v-model="tabsMenu">
      <v-tab
          href="#submitted"
          @click="handleTab1"
      >ایجاد شده
      </v-tab>
      <v-tab
          href="#inqueu"
          @click="handleTab2"
      >در صف
      </v-tab>
      <v-tab
          href="#assigned"
          @click="handleTab3"
      >ارجاع شده
      </v-tab>
      <v-tab
          href="#confirmed"
          @click="handleTab4"
      >تایید شده
      </v-tab>
      <v-tab
          href="#working"
          @click="handleTab5"
      >در حال بررسی
      </v-tab>
      <v-tab
          href="#completed"
          @click="handleTab6"
      >تکمیل شده
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>

    <v-tabs-items v-model="tabsMenu">

      <v-tab-item class="mt-5" value="submitted">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="submitted"
              :search="search1"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search1"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{item}">
              <v-icon
                  small
                  class="mr-2"
                  @click="changeStatus(item,0)"
                  v-if="canSetStatusAndAssignToBrokerage"
              >
                mdi-eye
              </v-icon>
              <v-icon
                  small
                  class="mr-2"
                  @click="changeBrokerage(item,0)"
                  v-if="canSetStatusAndAssignToBrokerage"
              >
                mdi-cloud
              </v-icon>
              <v-icon
                  small
                  class="mr-2"
                  @click="seeDetails(item,0)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
            </template>
            <template v-slot:item.submitDate="{ item }">
              {{ transformDateToJalali(item.submitDate) }}
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>

      <v-tab-item class="mt-5" value="inqueu">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="inqueu"
              :search="search2"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search2"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{item}">
              <v-icon
                  small
                  class="mr-2"
                  @click="assignedToMe(item,1)"
                  v-if="canAssignTome"
              >
                mdi-cloud
              </v-icon>
              <v-icon
                  small
                  class="mr-2"
                  @click="seeDetails(item,0)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
            </template>
            <template v-slot:item.submitDate="{ item }">
              {{ transformDateToJalali(item.submitDate) }}
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>

      <v-tab-item class="mt-5" value="assigned">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="assigned"
              :search="search3"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search3"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{item}">
              <v-icon
                  small
                  class="mr-2"
                  @click="unAssignMe(item,2)"
                  v-if="canAssignTome"
              >
                mdi-eye
              </v-icon>
              <v-icon
                  small
                  class="mr-2"
                  @click="seeDetails(item,0)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
            </template>
            <template v-slot:item.submitDate="{ item }">
              {{ transformDateToJalali(item.submitDate) }}
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>

      <v-tab-item class="mt-5" value="confirmed">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="confirmed"
              :search="search4"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search4"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
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
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>

      <v-tab-item class="mt-5" value="working">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="working"
              :search="search5"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search5"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
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
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>

      <v-tab-item class="mt-5" value="completed">
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="completed"
              :search="search6"
              no-results-text="اطلاعاتی یافت نشد"
              class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search6"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item.status="{ item }">
              {{ transformAssessmentRequestStatus(item.status) }}
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
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-tab-item>
    </v-tabs-items>

    <!--    statusDialog-->
    <v-dialog
        v-model="statusDialog"
        persistent
        max-width="300px"
    >
      <v-card>
        <v-card-text>
          <v-select
              :items="assessmentRequestStatus"
              item-text="fa"
              item-value="code"
              v-model="statusSelectValue"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="saveStatus()"
          >
            تایید
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="closeStatus"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    statusDialog-->

    <!--    brokerage-->
    <v-dialog
        v-model="brokerageDialog"
        persistent
        max-width="300px"
    >
      <v-card>
        <v-card-text>
          <v-select
              :items="brokerage"
              item-text="name"
              item-value="_id"
              v-model="brokerageValue"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="saveBrokerage"
          >
            تایید
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="closeBrokerage"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    brokerage-->

    <!--    تب ها-->
    <v-dialog
        v-model="tabsDialog"
        persistent
        max-width="800px"
    >
      <v-card>
        <v-card-text>
          <v-tabs class="mt-5" color="grey darken-3" v-model="detailsTabsMenu">
            <v-tab
                href="#assessment"
                @click="handleDetailTab1"
            >ارزیابی
            </v-tab>
            <v-tab
                href="#chat"
                @click="handleDetailTab2"
            >گفتگوها
            </v-tab>
            <v-tab
                href="#file"
                @click="handleDetailTab3"
            >فایل
            </v-tab>
          </v-tabs>
          <v-divider></v-divider>

          <v-tabs-items v-model="detailsTabsMenu">

            <v-tab-item class="mt-5" value="assessment">
              <v-col cols="12">
                <template>
                  <v-row v-if="assessmentRequestInfoObject">
                    <v-col cols="12" sm="4">
                      <v-text-field
                          :value="transformAssessmentRequestStatus(assessmentRequestInfoObject.status)"
                          label="وضعیت"
                          readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                          :value="transformDateToJalali(assessmentRequestInfoObject.submitDate)"
                          label="تاریخ ثبت درخواست"
                          readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                          v-model="assessmentRequestInfoObject.description"
                          label="توضیحات"
                          readonly
                      ></v-text-field>
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

            <v-tab-item class="mt-1" value="chat">
              <v-container>
                <v-form ref="dialogForm">
                  <v-row>
                    <v-col
                        cols="12"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="dialogEditedItem.message"
                          label="متن"
                      ></v-text-field>
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
                      ></v-autocomplete>
                    </v-col>
                    <v-btn
                        color="primary"
                        depressed
                        @click="saveDialog"
                        class="mr-auto"
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
                    ></v-text-field>
                  </v-toolbar>
                </template>
                <template v-slot:item.submitDate="{ item }">
                  {{ transformDateToJalali(item.submitDate) }}
                </template>
              </v-data-table>
            </v-tab-item>

            <v-tab-item class="mt-1" value="file">
              <v-container>
                <v-form v-if="canUploadFile" ref="fileForm">
                  <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="fileEditedItem.fileUrl"
                          label="آدرس فایل"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="fileEditedItem.accessKey"
                          label="accessKey"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-text-field
                          :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                          v-model="fileEditedItem.secretKey"
                          label="secretKey"
                      ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <v-text-field
                          v-model="fileEditedItem.desc"
                          label="توضیحات"
                      ></v-text-field>
                    </v-col>
                    <v-btn
                        color="primary"
                        depressed
                        @click="saveFile"
                        class="mr-auto"
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
                    ></v-text-field>
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
          <v-spacer></v-spacer>
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
          <video-tag :url="videoUrl" :file="fileId" :assessment="assessmentId"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
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
import {transformDateToJalali, transformAssessmentRequestStatus} from '../../../plugins/transformData'
import {assessmentRequestStatus} from "../../../plugins/constant";
import {permission} from "../../../plugins/permission";
import {assessmentRequestService} from "../../../service/assessmentRequestService";
import {required} from "../../../plugins/rule";
import VideoTag from "../../../components/VideoTag";
// import {assessmentService} from "../../../service/assessmentService";
// import {ruleService} from "../../../service/ruleService";

export default {
  name: "Index",
  components: {
    VideoTag
  },
  data() {
    return {
      tabsMenu: null,
      search1: '',
      search2: '',
      search3: '',
      search4: '',
      search5: '',
      search6: '',
      headers: [
        {text: 'وضعیت', value: 'status'},
        {text: 'تاریخ ایجاد', value: 'submitDate'},
        {text: 'توضیحات', value: 'description'},
        {text: 'عملیات', value: 'actions', sortable: false},
      ],
      statusDialog: false,
      brokerageDialog: false,
      currentItem: null,
      currentTab: null,
      assessmentRequestStatus,
      statusSelectValue: 0,
      brokerageValue: null,
      transformDateToJalali,
      transformAssessmentRequestStatus,
      required,
      tabsDialog: false,
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
        {text: 'متن پیام', value: 'message'},
        {text: 'ارسال کننده', value: 'user.nickname'},
        {text: 'تاریخ ارسال', value: 'submitDate'},
        {text: 'شناسه کوتاه', value: 'humanId'},
      ],
      fileHeaders: [
        {text: 'آدرس فایل', value: 'fileUrl'},
        {text: 'آپلود کننده', value: 'user.nickname'},
        {text: 'تاریخ ارسال', value: 'submitDate'},
        {text: 'شناسه کوتاه', value: 'humanId'},
        {text: 'مدت زمان', value: 'duration'},
        {text: 'توضیحات', value: 'desc'},
        {text: 'عملیات', value: 'actions', sortable: false},
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
    canUploadFile() {
      return permission().isPlatform() && permission().isOrders()
    },
    canSetStatusAndAssignToBrokerage() {
      return permission().isSecretariant() && permission().isOrders()
    },
    canAssignTome() {
      return permission().isBrokerage() && permission().isOrders()
    },
    brokerage() {
      return this.$store.getters['getBrokerage']
    },
    submitted: {
      get() {
        return this.$store.getters['assessmentRequest/getSubmitted']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_SUBMITTED', value)
      }
    },
    inqueu: {
      get() {
        return this.$store.getters['assessmentRequest/getInqueu']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_INQUEU', value)
      }
    },
    assigned: {
      get() {
        return this.$store.getters['assessmentRequest/getAssigned']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_ASSIGNED', value)
      }
    },
    confirmed: {
      get() {
        return this.$store.getters['assessmentRequest/getConfirmed']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_CONFIRMED', value)
      }
    },
    working: {
      get() {
        return this.$store.getters['assessmentRequest/getWorking']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_WORKING', value)
      }
    },
    completed: {
      get() {
        return this.$store.getters['assessmentRequest/getCompleted']
      },
      set(value) {
        return this.$store.commit('assessmentRequest/SET_COMPLETED', value)
      }
    },
  },
  beforeDestroy() {
    this.$store.commit('assessmentRequest/SET_SUBMITTED', [])
    this.$store.commit('assessmentRequest/SET_INQUEU', [])
    this.$store.commit('assessmentRequest/SET_ASSIGNED', [])
    this.$store.commit('assessmentRequest/SET_CONFIRMED', [])
    this.$store.commit('assessmentRequest/SET_WORKING', [])
    this.$store.commit('assessmentRequest/SET_COMPLETED', [])
  },
  mounted() {
    if (this.canSetStatusAndAssignToBrokerage) {
      this.$store.dispatch('fetchOrganizations')
    }
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
    this.fetchAssessmentListByStatus(0)
  },
  methods: {
    fetchAssessmentListByStatus(status) {
      try {
        this.$store.dispatch('assessmentRequest/fetchAssessmentListByStatus', status)
      } catch (e) {
        this.$toast.error('خظا در دریافت اطلاعات')
      }
    },
    handleTab1() {
      this.fetchAssessmentListByStatus(0)
    },
    handleTab2() {
      this.fetchAssessmentListByStatus(1)
    },
    handleTab3() {
      this.fetchAssessmentListByStatus(2)
    },
    handleTab4() {
      this.fetchAssessmentListByStatus(3)
    },
    handleTab5() {
      this.fetchAssessmentListByStatus(4)
    },
    handleTab6() {
      this.fetchAssessmentListByStatus(5)
    },
    changeStatus(item, currentTab) {
      this.statusDialog = true
      this.item = item
      this.currentTab = currentTab
    },
    changeBrokerage(item, currentTab) {
      this.brokerageDialog = true
      this.item = item
      this.currentTab = currentTab
    },
    async saveStatus() {
      try {
        const assessment = {
          status: this.statusSelectValue,
          assessmentRequestId: this.item._id
        }
        await this.$store.dispatch('assessmentRequest/setStatusOfAssessmentRequest', assessment)
        this.fetchAssessmentListByStatus(this.currentTab)
        this.$toast.success('عملیات با موفقیت انجام شد')
        this.closeStatus()
      } catch (e) {
        this.$toast.error('عملیات انجام نشد')
      }
    },
    async assignedToMe(item, index) {
      const brokerage = {
        brokerageId: this.brokerageValue,
        assessmentRequestId: item._id
      }
      try {
        await this.$store.dispatch('assessmentRequest/assignAssessmentRequestToBrokerage', brokerage)
        this.fetchAssessmentListByStatus(index)
        this.$toast.success('عملیات با موفقیت انجام شد')
      } catch (e) {
        this.$toast.error('عملیات انجام نشد')
      }
    },
    async saveBrokerage() {
      try {
        if (!this.brokerageValue) {
          this.$toast.error('کارگزاری را انتخاب کنید')
          return false
        }
        const brokerage = {
          brokerageId: this.brokerageValue,
          assessmentRequestId: this.item._id
        }
        await this.$store.dispatch('assessmentRequest/assignAssessmentRequestToBrokerage', brokerage)
        this.fetchAssessmentListByStatus(this.currentTab)
        this.$toast.success('عملیات با موفقیت انجام شد')
        this.closeBrokerage()
      } catch (e) {
        this.$toast.error('عملیات انجام نشد')
      }
    },
    closeStatus() {
      this.statusDialog = false
      this.item = null
      this.currentTab = null
    },
    closeBrokerage() {
      this.brokerageDialog = false
      this.item = null
      this.currentTab = null
    },
    async unAssignMe(item, index) {
      try {
        const data = {
          assessmentRequestId: item._id
        }
        await this.$store.dispatch('assessmentRequest/unAssignAssessmentRequestToBrokerage', data)
        this.fetchAssessmentListByStatus(index)
        this.$toast.success('عملیات با موفقیت انجام شد')
      } catch (e) {
        this.$toast.error('عملیات انجام نشد')
      }
    },
    seeDetails(item) {
      console.log(item);
      this.currentEpisode = item.episode
      assessmentRequestService().getAssessmentRequest(item._id).then(({data}) => {
        this.assessmentRequestInfoObject = data.data
        this.files = data.data.files
        data.data.dialogs.forEach(value => {
          const obj = this.files.find(item => {
            if (value.targetFile) {
              return item._id === value.targetFile
            }
          })
          if (obj) {
            value['humanId'] = obj.desc ? `${obj.desc}-${obj.humanId}` : `${obj.humanId}`
          } else {
            value['humanId'] = 'ندارد'
          }
        })
        this.dialogs = data.data.dialogs
        this.tabsDialog = true
        // if (data.data.assessment) {
        //   this.assessmentInfo = data.data.assessment
        // } else {
        //   if (this.canAssignTome) {
        //     this.$toast.info('حداقل یک فایل بارگزاری کنید')
        //   }
        // }
      }).catch(() => this.$toast.error('خطایی رخ داده است'))
    },
    handleDetailTab1() {
      this.seeDetails(this.assessmentRequestInfoObject)
    },
    handleDetailTab2() {
      this.seeDetails(this.assessmentRequestInfoObject)
      this.files.forEach(item => {
        const row = {title: `${item.desc} - ${item.humanId}`, id: item._id}
        this.targetFiles.push(row)
      })
    },
    handleDetailTab3() {
      this.seeDetails(this.assessmentRequestInfoObject)
    },
    saveDialog() {
      if (this.$refs.dialogForm.validate()) {
        const dialog = {...this.dialogEditedItem, _id: this.assessmentRequestInfoObject._id}
        assessmentRequestService().createDialog(dialog).then(() => {
          this.seeDetails(this.assessmentRequestInfoObject)
          this.$refs.dialogForm.reset();
          this.$refs.dialogForm.resetValidation();
        })
      }
    },
    saveFile() {
      if (this.$refs.fileForm.validate()) {
        const file = {...this.fileEditedItem, _id: this.assessmentRequestInfoObject._id}
        assessmentRequestService().createFile(file).then(() => {
          this.seeDetails(this.assessmentRequestInfoObject)
          this.$refs.fileForm.reset();
          this.$refs.fileForm.resetValidation();
        })
      }
    },
    async handleFileRule(item) {
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
    closeVideoTags() {
      this.videoTagDialog = false
      this.$nextTick(() => {
        this.videoUrl = null
        this.assessmentId = null
        this.fileId = null
      })
    },
    closeDetailsTabs() {
      this.tabsDialog = false;
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
