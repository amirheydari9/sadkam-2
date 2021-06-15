<template>
  <v-tab-item
    class="mt-1"
    value="file"
  >
    <v-container v-if="canUploadFile">
      <v-form ref="fileForm">
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
              v-model="form.accessKey"
              label="accessKey"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              small
              @click="handleFileRule(item)"
            >
              mdi-pen
            </v-icon>
          </template>
          <span>مدیریت رول</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              class="mr-2"
              v-on="on"
              small
              @click="downloadFile(item)"
            >
              mdi-download
            </v-icon>
          </template>
          <span>دانلود فایل</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <handle-video-tag
      v-if="videoTagDialog"
      :show-dialog="videoTagDialog"
      :file-item="fileItem"
      :assessment="assessmentId"
      :files="request.files"
      @closeDialog="closeVideoTags"
    />

  </v-tab-item>
</template>

<script>
  import { permission } from '../../plugins/permission'
  import { required } from '../../plugins/rule'
  import { transformDateToJalali } from '../../plugins/transformData'
  import { requestService } from '../../service/requestService'
  import VideoTag from '../VideoTag'
  import HandleVideoTag from '../video-tag/HandleVideoTag'

  export default {
    name: 'Tab3',
    components: {
      HandleVideoTag,
      VideoTag,
    },
    data () {
      return {
        videoTagDialog: false,
        assessmentId: null,
        fileItem: null,
        fileSearch: '',
        form: {
          desc: '',
          fileUrl: 'http://techslides.com/demos/sample-videos/small.mp4',
          accessKey: '',
          secretKey: '',
        },
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
            width:'80px'
          },
        ],
        required,
        transformDateToJalali,
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
    methods: {
      downloadFile (item) {
        window.open(item.fileUrl, '_blank')
      },
      async saveFile () {
        if (this.$refs.fileForm.validate()) {
          const file = {
            ...this.form,
            _id: this.request._id,
          }
          await this.$store.dispatch('request/createFile', file)
          await this.$emit('getData')
          this.form = {
            desc: '',
            fileUrl: 'http://techslides.com/demos/sample-videos/small.mp4',
            accessKey: '',
            secretKey: '',
          }
          this.$refs.fileForm.resetValidation()
          this.$toast.success('عملیات با موفقیت انجام شد')
        }
      },
      async handleFileRule (item) {
        try {
          await this.$store.dispatch('rule/fetchAllListRulesOfFile', item._id)
          this.assessmentId = this.request._id
          this.fileItem = { ...item }
          this.videoTagDialog = true
        } catch (e) {
          this.$toast.error('خطایی رخ داده است')
        }
      },
      closeVideoTags () {
        this.videoTagDialog = false
        this.assessmentId = null
        this.fileItem = null
      },
    },
  }
</script>

<style scoped>

</style>
