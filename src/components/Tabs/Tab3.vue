<template>
  <v-tab-item
    class="mt-1"
    value="file"
  >
    <v-container>
      <v-form v-if="canUploadFile" ref="fileForm">
<!--      <v-form ref="fileForm">-->
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              :rules="[required('این فیلد الزامی است')]"
              v-model="form.fileUrl"
              label="آدرس فایل"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              :rules="[required('این فیلد الزامی است')]"
              v-model="form.accessKey"
              label="accessKey"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              :rules="[required('این فیلد الزامی است')]"
              v-model="form.secretKey"
              label="secretKey"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="form.desc"
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
      :items="request.files"
      :search="fileSearch"
      no-results-text="اطلاعاتی یافت نشد"
      class="elevation-1 w-100 mt-3"
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
        <v-btn
          small
          download
          :href="item.fileUrl"
          class="ma-2"
          outlined
          text
        >
          <v-icon
            small
          >
            mdi-cloud
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="videoTagDialog"
      persistent
    >
      <v-card>
        <v-card-text>
<!--          <video-tag-second-->
<!--            :url="videoUrl"-->
<!--            :file="fileId"-->
<!--            :assessment="assessmentId"-->
<!--          />-->
          <video-tag
            :url="videoUrl"
            :file="fileId"
            :assessment="assessmentId"
            :files="request.files"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
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

  </v-tab-item>
</template>

<script>
  import { permission } from '../../plugins/permission'
  import { required} from '../../plugins/rule'
  import { transformDateToJalali } from '../../plugins/transformData'
  import { requestService } from '../../service/requestService'
  import VideoTagSecond from '../VideoTag-second'
  import VideoTag from '../VideoTag'


  export default {
    name: 'Tab3',
    components: { VideoTagSecond ,VideoTag},
    data(){
      return{
        videoTagDialog: false,
        assessmentId: null,
        fileId: null,
        videoUrl: null,
        fileSearch:'',
        form: {
          desc: '',
          fileUrl: 'http://techslides.com/demos/sample-videos/small.mp4',
          accessKey: '',
          secretKey: '',
        },
        fileHeaders: [
          { text: 'آدرس فایل', value: 'fileUrl' },
          { text: 'آپلود کننده', value: 'user.nickname' },
          { text: 'تاریخ ارسال', value: 'submitDate' },
          { text: 'شناسه کوتاه', value: 'humanId' },
          { text: 'مدت زمان', value: 'duration' },
          { text: 'توضیحات', value: 'desc' },
          { text: 'عملیات', value: 'actions', sortable: false },
        ],
        required,
        transformDateToJalali
      }
    },
    computed: {
      canUploadFile () {
        return permission().isPlatform() && permission().isOrders()
      },
      request () {
        return this.$store.getters['request/getRequest']
      },
    },
    mounted () {
      // this.$emit('getData')
    },
    methods: {
      saveFile () {
        if (this.$refs.fileForm.validate()) {
          const file = { ...this.form, _id: this.request._id }
          requestService().createFile(file).then(() => {
            this.$emit('getData')
            this.$toast.success('عملیات با موفقیت انجام شد')
            // this.$refs.fileForm.reset()
            this.form ={
              desc: '',
                fileUrl: 'http://techslides.com/demos/sample-videos/small.mp4',
                accessKey: '',
                secretKey: '',
            },
            this.$refs.fileForm.resetValidation()
          })
        }
      },
      async handleFileRule (item) {
        try {
          await this.$store.dispatch('rule/fetchAllListRulesOfFile', item._id)
          this.videoUrl = item.fileUrl
          this.assessmentId = this.request._id
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
    },
  }
</script>

<style scoped>

</style>
