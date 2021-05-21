<template>
  <v-dialog
      v-model="show"
      persistent
  >
    <v-card>
      <v-card-text>
        <v-tabs class="mt-5" color="grey darken-3" v-model="tabsMenu">
          <v-tab
              href="#assessment"
          >ارزیابی
          </v-tab>
          <v-tab
              href="#chat"
          >گفتگوها
          </v-tab>
          <v-tab
              href="#file"
          >فایل
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>

        <v-tabs-items v-model="tabsMenu">

          <!--          <v-tab-item class="mt-5" value="assessment">-->
          <!--            <v-col cols="12">-->
          <!--              <template v-if="assessmentRequestInfoObject">-->
          <!--                <v-row>-->
          <!--                  <v-col cols="12" sm="4">-->
          <!--                    <v-text-field-->
          <!--                        :value="transformAssessmentRequestStatus(assessmentRequestInfoObject.status)"-->
          <!--                        label="وضعیت"-->
          <!--                        readonly-->
          <!--                    ></v-text-field>-->
          <!--                  </v-col>-->
          <!--                  <v-col cols="12" sm="4">-->
          <!--                    <v-text-field-->
          <!--                        :value="transformDateToJalali(assessmentRequestInfoObject.submitDate)"-->
          <!--                        label="تاریخ ثبت درخواست"-->
          <!--                        readonly-->
          <!--                    ></v-text-field>-->
          <!--                  </v-col>-->
          <!--                  <v-col cols="12" sm="4">-->
          <!--                    <v-text-field-->
          <!--                        v-model="assessmentRequestInfoObject.description"-->
          <!--                        label="توضیحات"-->
          <!--                        readonly-->
          <!--                    ></v-text-field>-->
          <!--                  </v-col>-->
          <!--                </v-row>-->
          <!--              </template>-->
          <!--              <template v-if="!assessmentRequestInfoObject && canUploadFile">-->
          <!--                <v-text-field-->
          <!--                    v-model="tab1Desc"-->
          <!--                    outlined-->
          <!--                    label="توضیحات"-->
          <!--                ></v-text-field>-->
          <!--                <v-btn-->
          <!--                    color="primary"-->
          <!--                    @click="createAssessmentRequest">-->
          <!--                  درخواست ارزیابی-->
          <!--                </v-btn>-->
          <!--              </template>-->
          <!--              <template>-->
          <!--                &lt;!&ndash;                  <v-row v-if="assessmentRequestInfoObject && (!assessmentInfo && canCreateAssessment)">&ndash;&gt;-->
          <!--                &lt;!&ndash;                    <v-btn&ndash;&gt;-->
          <!--                &lt;!&ndash;                        @click="createAssessment"&ndash;&gt;-->
          <!--                &lt;!&ndash;                    >ارزیابی&ndash;&gt;-->
          <!--                &lt;!&ndash;                    </v-btn>&ndash;&gt;-->
          <!--                &lt;!&ndash;                  </v-row>&ndash;&gt;-->
          <!--              </template>-->
          <!--            </v-col>-->
          <!--          </v-tab-item>-->

          <!--                <v-tab-item class="mt-1" value="chat">-->
          <!--                  <v-container>-->
          <!--                    <v-form ref="dialogForm">-->
          <!--                      <v-row>-->
          <!--                        <v-col-->
          <!--                            cols="12"-->
          <!--                        >-->
          <!--                          <v-text-field-->
          <!--                              :rules="[-->
          <!--                                            required('این فیلد الزامی است'),-->
          <!--                                            ]"-->
          <!--                              v-model="dialogEditedItem.message"-->
          <!--                              label="متن"-->
          <!--                          ></v-text-field>-->
          <!--                        </v-col>-->
          <!--                        <v-col-->
          <!--                            cols="12"-->
          <!--                            sm="6"-->
          <!--                        >-->
          <!--                          <v-autocomplete-->
          <!--                              v-model="dialogEditedItem.targetFile"-->
          <!--                              label="فایل"-->
          <!--                              :items="targetFiles"-->
          <!--                              item-text="title"-->
          <!--                              item-value="id"-->
          <!--                              dense-->
          <!--                          ></v-autocomplete>-->
          <!--                        </v-col>-->
          <!--                        <v-btn-->
          <!--                            color="primary"-->
          <!--                            depressed-->
          <!--                            @click="saveDialog"-->
          <!--                            class="mr-auto"-->
          <!--                        >-->
          <!--                          ایجاد پیام-->
          <!--                        </v-btn>-->
          <!--                      </v-row>-->
          <!--                    </v-form>-->
          <!--                  </v-container>-->
          <!--                  <v-data-table-->
          <!--                      :headers="dialogHeaders"-->
          <!--                      :items="dialogs"-->
          <!--                      :search="dialogSearch"-->
          <!--                      no-results-text="اطلاعاتی یافت نشد"-->
          <!--                      class="elevation-1 w-100 mt-3"-->
          <!--                  >-->
          <!--                    <template v-slot:top>-->
          <!--                      <v-toolbar-->
          <!--                          flat-->
          <!--                      >-->
          <!--                        <v-text-field-->
          <!--                            v-model="dialogSearch"-->
          <!--                            label="جست جو"-->
          <!--                            single-line-->
          <!--                            hide-details-->
          <!--                            autofocus-->
          <!--                        ></v-text-field>-->
          <!--                      </v-toolbar>-->
          <!--                    </template>-->
          <!--                    <template v-slot:item.submitDate="{ item }">-->
          <!--                      {{ transformDateToJalali(item.submitDate) }}-->
          <!--                    </template>-->
          <!--                  </v-data-table>-->
          <!--                </v-tab-item>-->

          <!--                <v-tab-item class="mt-1" value="file">-->
          <!--                  <v-container>-->
          <!--                    <v-form v-if="canUploadFile" ref="fileForm">-->
          <!--                      <v-row>-->
          <!--                        <v-col-->
          <!--                            cols="12"-->
          <!--                            sm="6"-->
          <!--                        >-->
          <!--                          <v-text-field-->
          <!--                              :rules="[-->
          <!--                                            required('این فیلد الزامی است'),-->
          <!--                                            ]"-->
          <!--                              v-model="fileEditedItem.fileUrl"-->
          <!--                              label="آدرس فایل"-->
          <!--                          ></v-text-field>-->
          <!--                        </v-col>-->
          <!--                        <v-col-->
          <!--                            cols="12"-->
          <!--                            sm="6"-->
          <!--                        >-->
          <!--                          <v-text-field-->
          <!--                              :rules="[-->
          <!--                                            required('این فیلد الزامی است'),-->
          <!--                                            ]"-->
          <!--                              v-model="fileEditedItem.accessKey"-->
          <!--                              label="accessKey"-->
          <!--                          ></v-text-field>-->
          <!--                        </v-col>-->
          <!--                        <v-col-->
          <!--                            cols="12"-->
          <!--                            sm="6"-->
          <!--                        >-->
          <!--                          <v-text-field-->
          <!--                              :rules="[-->
          <!--                                            required('این فیلد الزامی است'),-->
          <!--                                            ]"-->
          <!--                              v-model="fileEditedItem.secretKey"-->
          <!--                              label="secretKey"-->
          <!--                          ></v-text-field>-->
          <!--                        </v-col>-->
          <!--                        <v-col-->
          <!--                            cols="12"-->
          <!--                            sm="6"-->
          <!--                        >-->
          <!--                          <v-text-field-->
          <!--                              v-model="fileEditedItem.desc"-->
          <!--                              label="توضیحات"-->
          <!--                          ></v-text-field>-->
          <!--                        </v-col>-->
          <!--                        <v-btn-->
          <!--                            color="primary"-->
          <!--                            depressed-->
          <!--                            @click="saveFile"-->
          <!--                            class="mr-auto"-->
          <!--                        >-->
          <!--                          ارسال فایل-->
          <!--                        </v-btn>-->
          <!--                      </v-row>-->
          <!--                    </v-form>-->
          <!--                  </v-container>-->
          <!--                  <v-data-table-->
          <!--                      :headers="fileHeaders"-->
          <!--                      :items="files"-->
          <!--                      :search="fileSearch"-->
          <!--                      no-results-text="اطلاعاتی یافت نشد"-->
          <!--                      class="elevation-1 w-100 mt-3"-->
          <!--                  >-->
          <!--                    <template v-slot:top>-->
          <!--                      <v-toolbar-->
          <!--                          flat-->
          <!--                      >-->
          <!--                        <v-text-field-->
          <!--                            v-model="fileSearch"-->
          <!--                            label="جست جو"-->
          <!--                            single-line-->
          <!--                            hide-details-->
          <!--                            autofocus-->
          <!--                        ></v-text-field>-->
          <!--                      </v-toolbar>-->
          <!--                    </template>-->
          <!--                    <template v-slot:item.submitDate="{ item }">-->
          <!--                      {{ transformDateToJalali(item.submitDate) }}-->
          <!--                    </template>-->
          <!--                    <template v-slot:item.actions="{ item }">-->
          <!--                      <v-icon-->
          <!--                          small-->
          <!--                          @click="handleFileRule(item)"-->
          <!--                      >-->
          <!--                        mdi-pen-->
          <!--                      </v-icon>-->
          <!--                      &lt;!&ndash;                  <v-btn&ndash;&gt;-->
          <!--                      &lt;!&ndash;                      small&ndash;&gt;-->
          <!--                      &lt;!&ndash;                      download&ndash;&gt;-->
          <!--                      &lt;!&ndash;                      :href="item.fileUrl"&ndash;&gt;-->
          <!--                      &lt;!&ndash;                      class="ma-2"&ndash;&gt;-->
          <!--                      &lt;!&ndash;                      outlined&ndash;&gt;-->
          <!--                      &lt;!&ndash;                      text&ndash;&gt;-->
          <!--                      &lt;!&ndash;                  >&ndash;&gt;-->
          <!--                      &lt;!&ndash;                    <v-icon&ndash;&gt;-->
          <!--                      &lt;!&ndash;                        small&ndash;&gt;-->
          <!--                      &lt;!&ndash;                    >&ndash;&gt;-->
          <!--                      &lt;!&ndash;                      mdi-cloud&ndash;&gt;-->
          <!--                      &lt;!&ndash;                    </v-icon>&ndash;&gt;-->
          <!--                      &lt;!&ndash;                  </v-btn>&ndash;&gt;-->
          <!--                    </template>-->
          <!--                  </v-data-table>-->
          <!--                </v-tab-item>-->

          <assessment-tab/>
          <chat-tab
              v-if="assessmentRequest"
              @getData="getData"
          />
          <assessment-request-tab
              v-if="assessmentRequest"
              @getData="getData"
          />

          <!--        </v-tabs-items>-->

          <!--      </v-card-text>-->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="close"
            >
              انصراف
            </v-btn>
          </v-card-actions>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AssessmentTab from "./AssessmentTab";
import ChatTab from "./ChatTab";
import AssessmentRequestTab from "./AssessmentRequestTab";

export default {
  name: "TabsWrapper",
  components: {AssessmentTab, ChatTab, AssessmentRequestTab},
  props: {
    showDialog: {Boolean, isRequired: true},
  },
  data() {
    return {
      tabsMenu: null
    }
  },
  computed: {
    show() {
      return this.showDialog
    },
    episode() {
      return this.$store.getters['episode/getEpisode']
    },
    assessmentRequestInfoByEpisodeId() {
      return this.$store.getters['assessmentRequest/getAssessmentRequestInfoByEpisodeId']
    },
    assessmentRequest() {
      return this.$store.getters['assessmentRequest/getAssessmentRequest']
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('assessmentRequest/fetchAssessmentRequestByEpisodeId', this.episode._id).then(() => {
        this.$store.dispatch('assessmentRequest/fetchAssessmentRequest', this.assessmentRequestInfoByEpisodeId._id)
      }).catch(() => {
        this.$toast.error('خظا در دریافت اطلاعات')
        this.close()
      })
    },
    close() {
      this.$store.commit('assessmentRequest/SET_ASSESSMENT_REQUEST_INFO_BY_EPISODE_ID', null)
      this.$store.commit('assessmentRequest/SET_ASSESSMENT_REQUEST', null)
      this.$emit('closeDialog')
    }
  }
}
</script>

<style scoped>

</style>
