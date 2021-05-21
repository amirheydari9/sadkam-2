<template>
  <div>

    <v-container>

      <v-row>
        <v-col cols="8">
          <video ref="video" :src="url" controls/>
        </v-col>
        <v-col v-if="hasPermission" cols="4">
          <v-card>
            <v-card-text>
              <v-form ref="videoTagForm">
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                    >
                      <v-row>
                        <v-btn
                            color="success"
                            @click="handleStartTimeRule"
                        >
                          زمان شروع
                        </v-btn>
                        <v-btn
                            color="warning"
                            @click="handleResetStartTimeRule"
                        >
                          ریست
                        </v-btn>
                        <v-text-field
                            :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                            v-model="startTime"
                            label="زمان شروع"
                            readonly
                        ></v-text-field>
                      </v-row>
                    </v-col>
                    <v-col
                        cols="12"
                    >
                      <v-row>
                        <v-btn
                            color="success"
                            @click="handleEndTimeRule"
                        >
                          زمان پایان
                        </v-btn>
                        <v-btn
                            color="warning"
                            @click="handleResetEndTimeRule"
                        >
                          ریست
                        </v-btn>
                        <v-text-field
                            :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                            v-model="endTime"
                            label="زمان پایان"
                            readonly
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  @click="addRule"
                  :disabled="!formIsValid"
              >
                افزودن رول
              </v-btn>
              <v-btn
                  color="warning"
                  @click="clearRule"
              >
                ریست
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-data-table
              :headers="headers"
              :items="rulesOfFile"
              :search="search"
              no-results-text="اطلاعاتی یافت نشد"
              class="elevation-1 w-100"
              v-if="type==='assessmentRequest'"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                  v-if="hasPermission"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                  small
                  class="mr-2"
                  @click="deleteItem(item)"
                  v-if="hasPermission"
              >
                mdi-delete
              </v-icon>
              <v-icon
                  small
                  class="mr-2"
                  @click="seekToTime(item.fromTime)"
              >
                mdi-play
              </v-icon>
            </template>
            <template v-slot:item.fromTime="{ item }">
              {{ transformVideoTimeFormat(item.fromTime) }}
            </template>
            <template v-slot:item.toTime="{ item }">
              {{ transformVideoTimeFormat(item.toTime) }}
            </template>
          </v-data-table>

          <v-data-table
              :headers="headers"
              :items="assessmentRulesData"
              :search="search"
              no-results-text="اطلاعاتی یافت نشد"
              class="elevation-1 w-100"
              v-if="type==='assessment'"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="search"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <!--              <v-icon-->
              <!--                  small-->
              <!--                  class="mr-2"-->
              <!--                  @click="editItem(item)"-->
              <!--                  v-if="hasPermission"-->
              <!--              >-->
              <!--                mdi-pencil-->
              <!--              </v-icon>-->
              <!--              <v-icon-->
              <!--                  small-->
              <!--                  class="mr-2"-->
              <!--                  @click="deleteItem(item)"-->
              <!--                  v-if="hasPermission"-->
              <!--              >-->
              <!--                mdi-cloud-->
              <!--              </v-icon>-->
              <v-icon
                  small
                  class="mr-2"
                  @click="seekToTime(item.fromTime)"
              >
                mdi-play
              </v-icon>
            </template>
            <template v-slot:item.fromTime="{ item }">
              {{ transformVideoTimeFormat(item.fromTime) }}
            </template>
            <template v-slot:item.toTime="{ item }">
              {{ transformVideoTimeFormat(item.toTime) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>

    </v-container>

    <v-dialog
        v-model="dialog"
        max-width="600px"
        persistent
    >
      <v-card>
        <v-card-title>
          <span class="headline">افزودن رول</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="ruleForm">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                      v-model="editedItem.subject"
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      label="موضوع"
                      :items="subjects"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                      v-model="editedItem.action"
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      label="موضوع"
                      :items="actions"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                      v-model="editedItem.type"
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      label="نوع"
                      :items="types"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                      v-model="editedItem.priority"
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      label="اولویت"
                      :items="priority"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                      v-model="editedItem.message"
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      label="پیام"
                      :items="priority"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                      v-model="editedItem.desc"
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      label="توضیحات"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="saveRule"
          >
            ذخیره
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="close"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {required} from "../plugins/rule";
import {transformVideoTimeFormat, transformVideoTimeToSecond} from '../plugins/transformData'
import {permission} from "../plugins/permission";

export default {
  name: "VideoTag",
  props: {
    url: {String, isRequired: true},
    assessment: {String, isRequired: true},
    file: {String, isRequired: false},
    assessmentRules: {Array, isRequired: false},
    type: {String, isRequired: false, default: 'assessmentRequest'}
  },
  data() {
    return {
      required,
      startTime: null,
      endTime: null,
      formIsValid: false,
      videoIsPlaying: false,
      dialog: false,
      priority: [1, 2, 3, 4, 5],
      search: '',
      headers: [
        {text: 'شماره', value: 'rowNumber'},
        {text: 'از', value: 'fromTime',},
        {text: 'تا', value: 'toTime'},
        {text: 'موضوع', value: 'subject'},
        {text: 'نوع', value: 'type'},
        {text: 'عملیات', value: 'action'},
        {text: 'اولویت', value: 'priority'},
        {text: 'پیغام', value: 'message'},
        {text: 'توضیحات', value: 'desc'},
        {text: 'عملیات', value: 'actions', sortable: false},
      ],
      editedIndex: -1,
      editedItem: {
        subject: '',
        type: '',
        action: '',
        priority: '',
        message: '',
        desc: ''
      },
      defaultItem: {
        subject: '',
        type: '',
        action: '',
        priority: '',
        message: '',
        desc: ''
      },
      transformVideoTimeFormat,
      transformVideoTimeToSecond
    }
  },
  computed: {
    hasPermission() {
      return (permission().isBrokerage() && permission().isOrders())
    },
    rulesOfFile: {
      get() {
        return this.$store.getters['rule/getListRulesOfFile']
      },
      set(value) {
        return this.$store.commit('rule/SET_LIST_RULES_OF_FILE', value)
      }
    },
    assessmentRulesData() {
      return this.assessmentRules
    },
    subjects() {
      return this.$store.getters['staticData/getSubjectsRule']
    },
    actions() {
      return this.$store.getters['staticData/getActionsRule']
    },
    types() {
      return this.$store.getters['staticData/getTypesRule']
    }
  },
  mounted() {
    // this.$store.dispatch('rule/fetchAllListRulesOfFile', this.file)
    if (this.hasPermission) {
      this.$store.dispatch('staticData/fetchRulesList')
      this.$refs.video.addEventListener('play', this.handlePlayVideo)
      this.$refs.video.addEventListener('timeupdate', this.handleTimeUpdateVideo)
      this.$refs.video.addEventListener('pause', this.handlePauseVideo)
    }
  },
  beforeDestroy() {
    this.$store.commit('rule/SET_LIST_RULES_OF_FILE', [])
    this.$refs.video.removeEventListener('play', this.handlePlayVideo)
    this.$refs.video.removeEventListener('pause', this.handlePauseVideo)
    this.startTime = null
    this.endTime = null
  },
  methods: {
    addRule() {
      if (this.$refs.videoTagForm.validate()) {
        this.$refs.video.pause()
        this.dialog = true
      }
    },
    clearRule() {
      this.$refs.videoTagForm.reset()
      this.$refs.videoTagForm.resetValidation()
      this.formIsValid = false
    },
    handlePlayVideo() {

    },
    handleTimeUpdateVideo() {
      this.videoIsPlaying = true
    },
    handlePauseVideo() {
      this.videoIsPlaying = false
    },
    handleStartTimeRule() {
      if (this.$refs.video.currentTime === 0) {
        this.$toast.info('ویدیو پلی نیست')
        return false
      }
      const startTime = this.$refs.video.currentTime
      let endTime = null;
      if (this.endTime) {
        endTime = this.transformVideoTimeToSecond(this.endTime);
        if (startTime >= endTime) {
          this.$toast.error('زمان شروع نمی تواند بزرگتر یا مساوی  زمان پایان باشد ')
          return false;
        }
      }
      this.startTime = this.transformVideoTimeFormat(startTime)
    },
    handleResetStartTimeRule() {
      if (this.endTime) {
        this.$toast.error('زمان پایان موجود است')
        return false
      }
      this.startTime = null
      this.formIsValid = false
    },
    handleEndTimeRule() {
      if (this.$refs.video.currentTime === 0) {
        this.$toast.info('ویدیو پلی نیست')
        return false
      }
      if (!this.startTime) {
        this.$toast.error('زمان شروع خالی است')
        return false
      }
      const startTime = this.transformVideoTimeToSecond(this.startTime);
      const endTime = this.$refs.video.currentTime
      if (startTime >= endTime) {
        this.$toast.error('زمان پایان نمی تواند کوچکتر یا مساوی شروع باشد')
        return false;
      }
      this.endTime = this.transformVideoTimeFormat(endTime)
      this.formIsValid = true
    },
    handleResetEndTimeRule() {
      this.endTime = null
      this.formIsValid = false
    },
    editItem(item) {
      this.editedIndex = this.rulesOfFile.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true;
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$refs.ruleForm.resetValidation()
      })
    },
    deleteItem(item) {
      this.$confirm(
          {
            message: `آیا از حذف این رکورد اظمینان دارید ؟`,
            button: {
              no: 'خیر',
              yes: 'بله'
            },
            callback: async confirm => {
              if (confirm) {
                try {
                  await this.$store.dispatch('rule/deleteRule', item._id)
                  await this.$store.dispatch('rule/fetchAllListRulesOfFile', this.file)
                  this.successAction()
                } catch (e) {
                  this.failAction()
                }
              }
            }
          }
      )
    },
    async saveRule() {
      if (this.$refs.ruleForm.validate()) {
        try {
          let rule = {
            ...this.editedItem,
            fromTime: this.transformVideoTimeToSecond(this.startTime),
            toTime: this.transformVideoTimeToSecond(this.endTime),
            rowNumber: this.rulesOfFile.length ? this.rulesOfFile.length + 1 : 1,
            file: this.file
          }
          if (this.type === 'assessmentRequest') {
            rule = {...rule, assessmentRequestId: this.assessment,}
          } else {
            rule = {...rule, assessmentId: this.assessment}
          }
          if (this.editedIndex > -1) {
            await this.$store.dispatch('rule/updateRule', rule)
          } else {
            if (this.type === 'assessmentRequest') {
              await this.$store.dispatch('rule/createRuleForAssessmentRequest', rule)
              await this.$store.dispatch('rule/fetchAllListRulesOfFile', this.file)
              this.successAction()
            } else {
              await this.$store.dispatch('rule/createRuleForAssessment', rule).then((data)=>{
                console.log(data.data.id)
              })
            }
          }
          // if (this.type === 'assessmentRequest') {
          //   await this.$store.dispatch('rule/fetchAllListRulesOfFile', this.file)
          // }
          // this.successAction()
        } catch (e) {
          this.failAction()
        }
      }
    },
    seekToTime(second) {
      console.log(second)
      this.$refs.video.currentTime = second
    },
    successAction() {
      this.$toast.success('عملیات با موفیت انجام شد')
      this.close();
    },
    failAction() {
      this.$toast.error('عملیات انجام نشد')
    },
  }
}
</script>

<style scoped>

</style>
