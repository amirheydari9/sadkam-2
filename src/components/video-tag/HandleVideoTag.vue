<template>
  <v-dialog
    v-model="show"
    persistent
  >
    <v-card>
      <v-card-text>
        <div>
          <v-row>
            <v-col cols="6">
              <!--        ویدیو-->
              <video
                ref="video"
                :src="fileItem.fileUrl"
                controls
                class="w-100"
              />
              <!--        ویدیو-->
            </v-col>
            <!--        زمانبندی-->
            <v-col
              v-if="canManageRule"
              cols="6"
            >
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
                              v-model="startTime"
                              :rules="[
                            required('این فیلد الزامی است'),
                          ]"
                              label="زمان شروع"
                              readonly
                            />
                          </v-row>
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <v-row>
                            <v-btn
                              color="primary"
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
                              v-model="endTime"
                              :rules="[
                            required('این فیلد الزامی است'),
                          ]"
                              label="زمان پایان"
                              readonly
                            />
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn
                    color="primary"
                    :disabled="!formIsValid"
                    @click="addRule"
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
            <!--        زمانبندی-->
          </v-row>

          <v-row>

            <v-col cols="6">

              <v-autocomplete
                v-model="fileId"
                label="فایل"
                :items="files"
                item-text="humanId"
                item-value="_id"
                dense
              ></v-autocomplete>

              <v-data-table
                v-if="type==='request'"
                :headers="headers"
                :items="comparisonListRulesOfFile"
                :search="search"
                no-results-text="اطلاعاتی یافت نشد"
                class="elevation-1 w-100"
                :items-per-page="5"
                :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
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
                    />
                    <v-spacer/>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <!--                  <v-icon-->
                  <!--                    v-if="canManageRule"-->
                  <!--                    small-->
                  <!--                    class="mr-2"-->
                  <!--                    @click="editItem(item)"-->
                  <!--                  >-->
                  <!--                    mdi-pencil-->
                  <!--                  </v-icon>-->
                  <!--                  <v-icon-->
                  <!--                    v-if="canManageRule"-->
                  <!--                    small-->
                  <!--                    class="mr-2"-->
                  <!--                    @click="deleteItem(item)"-->
                  <!--                  >-->
                  <!--                    mdi-delete-->
                  <!--                  </v-icon>-->
                  <!--                  <v-icon-->
                  <!--                    small-->
                  <!--                    class="mr-2"-->
                  <!--                    @click="handleSeekToTime(item.fromTime)"-->
                  <!--                  >-->
                  <!--                    mdi-play-->
                  <!--                  </v-icon>-->
                  <v-icon
                    v-if="canManageRule && !item.confirmed"
                    small
                    class="mr-2 font-weight-bold"
                    color="primary"
                    @click="handleSetConfirm(item)"
                  >
                    mdi-check
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

            <v-col cols="6">

              <!--        لیست رول ها request-->
              <v-data-table
                v-if="type==='request'"
                :headers="headers"
                :items="rulesOfFile"
                :search="search"
                no-results-text="اطلاعاتی یافت نشد"
                class="elevation-1 w-100"
                :items-per-page="5"
                :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
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
                    />
                    <v-spacer/>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    v-if="canManageRule"
                    small
                    class="mr-2"
                    @click="editItem(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    v-if="canManageRule"
                    small
                    class="mr-2"
                    @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                  <v-icon
                    v-if="canSetDesc"
                    small
                    class="mr-2"
                    @click="setDesc(item)"
                  >
                    mdi-comment
                  </v-icon>
                  <v-icon
                    small
                    class="mr-2"
                    @click="handleSeekToTime(item.fromTime)"
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
              <!--        لیست رول ها request-->

              <!--        لیست رول ها assessment-->
              <v-data-table
                v-if="type==='assessment'"
                :headers="headers"
                :items="assessmentRulesData"
                :search="search"
                no-results-text="اطلاعاتی یافت نشد"
                class="elevation-1 w-100"
                items-per-page="5"
                :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
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
                    />
                    <v-spacer/>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <!--              <v-icon-->
                  <!--                  small-->
                  <!--                  class="mr-2"-->
                  <!--                  @click="editItem(item)"-->
                  <!--                  v-if="canManageRule"-->
                  <!--              >-->
                  <!--                mdi-pencil-->
                  <!--              </v-icon>-->
                  <!--              <v-icon-->
                  <!--                  small-->
                  <!--                  class="mr-2"-->
                  <!--                  @click="deleteItem(item)"-->
                  <!--                  v-if="canManageRule"-->
                  <!--              >-->
                  <!--                mdi-cloud-->
                  <!--              </v-icon>-->
                  <v-icon
                    small
                    class="mr-2"
                    @click="handleSeekToTime(item.fromTime)"
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
              <!--        لیست رول ها assessment-->

            </v-col>

          </v-row>

        </div>
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

    <handle-rule
      v-if="showRuleDialog"
      :show-dialog="showRuleDialog"
      :item="ruleItem"
      @closeDialog="closeRuleDialog"
      @handleSave="handleSaveRule"
    />

    <handle-set-description
      v-if="showRuleDescDialog"
      :show-dialog="showRuleDescDialog"
      :item="ruleItem"
      @closeDialog="closeRuleDescDialog"
      @handleSave="handleSaveRuleDesc"
    />

  </v-dialog>
</template>

<script>
  import DialogHeadline from '../DialogHeadline'
  import { required } from '../../plugins/rule'
  import { transformVideoTimeFormat, transformVideoTimeToSecond } from '../../plugins/transformData'
  import { permission } from '../../plugins/permission'
  import HandleRule from './HandleRule'
  import HandleSetDescription from './HandleSetDescription'

  export default {
    name: 'HandleVideoTag',
    components: {
      HandleSetDescription,
      HandleRule,
      DialogHeadline,
    },
    props: {
      showDialog: {
        Boolean,
        isRequired: true,
      },
      fileItem: {
        Object,
        isRequired: true,
      },
      assessment: {
        String,
        isRequired: true,
      },
      assessmentRules: {
        Array,
        isRequired: false,
      },
      type: {
        String,
        isRequired: false,
        default: 'request',
      },
      files: {
        Array,
        isRequired: false,
      },
    },
    data () {
      return {
        showRuleDialog: false,
        showRuleDescDialog: false,
        ruleItem: null,
        startTime: null,
        endTime: null,
        formIsValid: false,
        videoIsPlaying: false,
        search: '',
        headers: [
          {
            text: 'شماره',
            value: 'rowNumber',
          },
          {
            text: 'از',
            value: 'fromTime',
          },
          {
            text: 'تا',
            value: 'toTime',
          },
          {
            text: 'موضوع',
            value: 'subject',
          },
          {
            text: 'نوع',
            value: 'type',
          },
          {
            text: 'عملیات',
            value: 'action',
          },
          {
            text: 'اولویت',
            value: 'priority',
          },
          {
            text: 'پیغام',
            value: 'message',
          },
          {
            text: 'توضیحات',
            value: 'desc',
          },
          {
            text: 'توضیحات پلتفرم',
            value: 'platformDesc',
          },
          {
            text: 'عملیات',
            value: 'actions',
            sortable: false,
          },
        ],
        editedIndex: -1,
        fileId: '',
        transformVideoTimeFormat,
        transformVideoTimeToSecond,
        required,
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
      canManageRule () {
        return (permission().isBrokerage() && permission().isOrders())
      },
      canSetDesc () {
        return (permission().isPlatform() && permission().isOrders())
      },
      rulesOfFile: {
        get () {
          return this.$store.getters['rule/getListRulesOfFile']
        },
        set (value) {
          return this.$store.commit('rule/SET_LIST_RULES_OF_FILE', value)
        },
      },
      comparisonListRulesOfFile () {
        return this.$store.getters['rule/getComparisonListRulesOfFile']
      },
      assessmentRulesData () {
        return this.assessmentRules
      },
    },
    mounted () {
      // this.$store.dispatch('rule/fetchAllListRulesOfFile', this.file)
      if (this.canManageRule) {
        this.$refs.video.addEventListener('play', this.handlePlayVideo)
        this.$refs.video.addEventListener('timeupdate', this.handleTimeUpdateVideo)
        this.$refs.video.addEventListener('pause', this.handlePauseVideo)
      }
    },
    beforeDestroy () {
      this.$store.commit('rule/SET_LIST_RULES_OF_FILE', [])
      this.$store.commit('rule/SET_COMPARISON_LIST_RULES_OF_FILE', [])
      this.$refs.video.removeEventListener('play', this.handlePlayVideo)
      this.$refs.video.removeEventListener('pause', this.handlePauseVideo)
      this.startTime = null
      this.endTime = null
    },
    methods: {
      addRule () {
        this.editedIndex = -1
        this.ruleItem = null
        this.showRuleDialog = true
      },
      clearRule () {
        this.$refs.videoTagForm.reset()
        this.$refs.videoTagForm.resetValidation()
        this.formIsValid = false
      },
      handlePlayVideo () {

      },
      handleTimeUpdateVideo () {
        this.videoIsPlaying = true
      },
      handlePauseVideo () {
        this.videoIsPlaying = false
      },
      handleStartTimeRule () {
        if (this.$refs.video.currentTime === 0) {
          this.$toast.info('ویدیو پلی نیست')
          return false
        }
        const startTime = this.$refs.video.currentTime
        let endTime = null
        if (this.endTime) {
          endTime = this.transformVideoTimeToSecond(this.endTime)
          if (startTime >= endTime) {
            this.$toast.error('زمان شروع نمی تواند بزرگتر یا مساوی  زمان پایان باشد ')
            return false
          }
        }
        this.startTime = this.transformVideoTimeFormat(startTime)
      },
      handleResetStartTimeRule () {
        if (this.endTime) {
          this.$toast.error('زمان پایان موجود است')
          return false
        }
        this.startTime = null
        this.formIsValid = false
      },
      handleEndTimeRule () {
        if (this.$refs.video.currentTime === 0) {
          this.$toast.info('ویدیو پلی نیست')
          return false
        }
        if (!this.startTime) {
          this.$toast.error('زمان شروع خالی است')
          return false
        }
        const startTime = this.transformVideoTimeToSecond(this.startTime)
        const endTime = this.$refs.video.currentTime
        if (startTime >= endTime) {
          this.$toast.error('زمان پایان نمی تواند کوچکتر یا مساوی شروع باشد')
          return false
        }
        this.endTime = this.transformVideoTimeFormat(endTime)
        this.formIsValid = true
        this.$refs.video.pause()
      },
      handleResetEndTimeRule () {
        this.endTime = null
        this.formIsValid = false
      },
      handleSeekToTime (second) {
        console.log(second)
        this.$refs.video.currentTime = second
      },
      editItem (item) {
        this.editedIndex = this.rulesOfFile.indexOf(item)
        this.ruleItem = { ...item }
        this.showRuleDialog = true
      },
      closeRuleDialog () {
        this.showRuleDialog = false
      },
      async handleSaveRule (rule) {
        let item = {
          subject: rule.subject,
          type: rule.type,
          action: rule.action,
          priority: rule.priority,
          message: rule.message,
          desc: rule.desc,
          file: this.fileItem._id,
        }
        if (this.editedIndex > -1) {
          const data = {
            ...item,
            _id: rule._id,
            fromTime: rule.fromTime,
            toTime: rule.toTime,
            rowNumber: rule.rowNumber,
          }
          await this.$store.dispatch('rule/updateRule', data)
          Object.assign(this.rulesOfFile[this.editedIndex], rule)
        } else {
          const data = {
            ...item,
            fromTime: this.transformVideoTimeToSecond(this.startTime),
            toTime: this.transformVideoTimeToSecond(this.endTime),
            rowNumber: this.rulesOfFile.length ? this.rulesOfFile.length + 1 : 1,
          }
          if (this.type === 'request') {
            await this.$store.dispatch('rule/createRuleForRequest', {
              requestId: this.assessment,
              ...data,
            })
            await this.$store.dispatch('rule/fetchAllListRulesOfFile', this.fileItem._id)
          } else {
            await this.$store.dispatch('rule/createRuleForAssessment', {
              assessmentId: this.assessment,
              ...data,
            }).then((res) => {
              console.log(res.data.id)
            })
          }
        }
      },
      deleteItem (item) {
        this.$confirm(
          {
            message: 'آیا از حذف این رکورد اطمینان دارید ؟',
            button: {
              no: 'خیر',
              yes: 'بله',
            },
            callback: async confirm => {
              if (confirm) {
                await this.$store.dispatch('rule/deleteRule', item._id)
                await this.$store.dispatch('rule/fetchAllListRulesOfFile', this.fileItem._id)
              }
            },
          },
        )
      },
      setDesc (item) {
        this.editedIndex = this.rulesOfFile.indexOf(item)
        this.ruleItem = { ...item }
        this.showRuleDescDialog = true
      },
      closeRuleDescDialog () {
        this.showRuleDescDialog = false
      },
      async handleSaveRuleDesc (desc) {
        const data = {
          _id: this.ruleItem._id,
          desc: desc,
        }
        await this.$store.dispatch('rule/setDescriptionForPlatform', data)
        Object.assign(this.rulesOfFile[this.editedIndex], {
          ...this.ruleItem,
          platformDesc: desc,
        })
      },
      handleSetConfirm (item) {
        this.editedIndex = this.comparisonListRulesOfFile.indexOf(item)
        this.ruleItem = { ...item }
        this.$confirm(
          {
            message: 'آیا از تایید این رول اطمینان دارید ؟',
            button: {
              no: 'خیر',
              yes: 'بله',
            },
            callback: async confirm => {
              if (confirm) {
                const data = {
                  _id: item._id,
                  confirmed: true,
                }
                await this.$store.dispatch('rule/setConfirmationBrokerageUser', data)
                Object.assign(this.comparisonListRulesOfFile[this.editedIndex], {
                  ...this.ruleItem,
                  confirmed: true,
                })
              }
            },
          },
        )
      },
      closeVideoTags () {
        this.$emit('closeDialog')
      },
    },
    watch: {
      async fileId (val) {
        await this.$store.dispatch('rule/fetchAllComparisonListRulesOfFile', val)
      },
    },
  }
</script>

<style scoped>

</style>
