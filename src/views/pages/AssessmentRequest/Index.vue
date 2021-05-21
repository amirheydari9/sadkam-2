<template>
  <div class="w-100 d-flex flex-column justify-start">
    <v-col cols="12" sm="5" class="d-flex justify-center align-center">
      <v-text-field
          v-model="productSearch"
          label="جستجو در محصولات"
          :loading="isLoading"
          outlined
      ></v-text-field>
      <v-dialog
          v-model="productDialog"
          max-width="800px"
          persistent
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              dark
              class="mr-3"
              v-bind="attrs"
              v-on="on"
          >
            افزودن محصول جدید
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">محصول جدید</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-form ref="productForm">
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                  >
                    <v-text-field
                        :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.enTitle"
                        label="نام انگلیسی"
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
                        v-model="productEditedItem.faTitle"
                        label="نام فارسی"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="3"
                  >
                    <v-text-field
                        v-model="productEditedItem.startYear"
                        label="سال شروع"
                        type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="3"
                  >
                    <v-text-field
                        v-model="productEditedItem.endYear"
                        label="سال پایان"
                        type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="3"
                  >
                    <v-text-field
                        :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.duration"
                        label="زمان"
                        type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="3"
                  >
                    <v-text-field
                        :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.rate"
                        label="امتیاز"
                        type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="4"
                  >
                    <v-combobox
                        :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.directors"
                        label="کارگردان"
                        multiple
                        chips
                        append-icon=""
                        persistent-hint
                        deletable-chips
                    ></v-combobox>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="4"
                  >
                    <v-combobox
                        :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.language"
                        label="زبان"
                        multiple
                        chips
                        append-icon=""
                        persistent-hint
                        deletable-chips
                    ></v-combobox>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="4"
                  >
                    <v-autocomplete
                        :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.genres"
                        :items="generes"
                        item-text="fa"
                        item-value="en"
                        chips
                        label="ژاتر ها"
                        multiple
                        deletable-chips
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="4"
                  >
                    <v-combobox
                        :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.writers"
                        label="نویسندگان"
                        multiple
                        chips
                        append-icon=""
                        persistent-hint
                        deletable-chips
                    ></v-combobox>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="4"
                  >
                    <v-combobox
                        :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.actors"
                        label="بازیگران"
                        multiple
                        chips
                        append-icon=""
                        persistent-hint
                        deletable-chips
                    ></v-combobox>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="4"
                      v-if="isSuperAdmin"
                  >
                    <v-autocomplete
                        v-model="productEditedItem.submittedBy"
                        label="تایید توسط"
                        :items="organizationList"
                        item-text="name"
                        item-value="_id"
                        dense
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="4"
                  >
                    <v-text-field
                        :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.imdbId"
                        label="آی دی imdb"
                        type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="4"
                  >
                    <v-autocomplete
                        v-model="productEditedItem.entryType"
                        :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                        label="نوع ورودی"
                        :items="entryType"
                        item-text="fa"
                        item-value="en"
                        dense
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="4"
                  >
                    <v-autocomplete
                        v-model="productEditedItem.titleType"
                        :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                        label="عنوان ورودی"
                        :items="titleTypes"
                        item-text="fa"
                        item-value="en"
                        dense
                    ></v-autocomplete>
                  </v-col>
                  <v-col
                      cols="12"
                  >
                    <v-text-field
                        :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                        v-model="productEditedItem.description"
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
                @click="saveProduct"
            >
              ذخیره
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="closeProduct"
            >
              انصراف
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-data-table
        :headers="productHeaders"
        :items="filteredProducts"
        :search="search"
        no-results-text="اطلاعاتی یافت نشد"
        class="elevation-1 w-100"
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
        </v-toolbar>
      </template>
      <template v-slot:item.entryType="{ item }">
        {{ transformEntryType(item.entryType) }}
      </template>
      <template v-slot:item.titleType="{ item }">
        {{ transformTitleType(item.titleType) }}
      </template>
      <template v-slot:item.lastUpdate="{ item }">
        {{ transformDateToJalali(item.lastUpdate) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="assessmentRequest(item)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>

    <!--    ایجاد اپیزود-->
    <v-dialog
        v-model="episodeDialog"
        max-width="800px"
        persistent
    >
      <!--      <template v-slot:activator="{ on, attrs }">-->
      <!--        <v-btn-->
      <!--            color="primary"-->
      <!--            dark-->
      <!--            class="mb-2"-->
      <!--            v-bind="attrs"-->
      <!--            v-on="on"-->
      <!--        >-->
      <!--          افزودن اپیزود جدید1-->
      <!--        </v-btn>-->
      <!--      </template>-->
      <v-card>
        <v-card-title>
          <span class="headline">ایجاد اپیزود</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="episodeForm">
              <v-row>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-text-field
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      v-model="episodeEditedItem.enTitle"
                      label="نام انگلیسی"
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
                      v-model="episodeEditedItem.faTitle"
                      label="نام فارسی"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="3"
                >
                  <v-text-field
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      v-model="episodeEditedItem.duration"
                      label="زمان"
                      type="number"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="3"
                >
                  <v-text-field
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      v-model="episodeEditedItem.rate"
                      label="امتیاز"
                      type="number"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="3"
                >
                  <v-text-field
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      v-model="episodeEditedItem.seasonNumber"
                      label="شماره فصل"
                      type="number"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="3"
                >
                  <v-text-field
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      v-model="episodeEditedItem.episodeNumber"
                      label="شماره قسمت"
                      type="number"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <!--                  <v-text-field-->
                  <!--                      :rules="[-->
                  <!--                            required('این فیلد الزامی است'),-->
                  <!--                            ]"-->
                  <!--                      v-model="episodeEditedItem.releaseDate"-->
                  <!--                      label="زمان انتشار"-->
                  <!--                  ></v-text-field>-->
                  <v-text-field
                      id="my-custom-input"
                      persistent-hint
                      readonly
                      v-model="episodeEditedItem.releaseDate"
                      label="زمان انتشار"
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                  ></v-text-field>
                  <date-picker
                      auto-submit
                      v-model="episodeEditedItem.releaseDate"
                      element="my-custom-input"
                  >
                  </date-picker>
                  <!--                  <date-picker-->
                  <!--                      :autoSubmit="true"-->
                  <!--                      placeholder='زمان انتشار'-->
                  <!--                      v-model="episodeEditedItem.releaseDate" style="margin-top: 20px !important;"></date-picker>-->
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    v-if="isSuperAdmin"
                >
                  <v-autocomplete
                      v-model="episodeEditedItem.submittedBy"
                      label="تایید توسط"
                      :items="organizationList"
                      item-text="name"
                      item-value="_id"
                      dense
                  ></v-autocomplete>
                </v-col>
                <v-col
                    cols="12"
                >
                  <v-text-field
                      :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                      v-model="episodeEditedItem.description"
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
              @click="saveEpisode"
          >
            ذخیره
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="closeEpisode"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    ایجاد اپیزود-->

    <!--    لیست اپیزود-->
    <v-dialog
        v-model="episodeListDialog"
        persistent
    >
      <v-card>
        <v-card-text>
          <v-data-table
              :headers="episodeHeaders"
              :items="episodes"
              :search="episodeSearch"
              no-results-text="اطلاعاتی یافت نشد"
              class="elevation-1 w-100"
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >
                <v-text-field
                    v-model="episodeSearch"
                    label="جست جو"
                    single-line
                    hide-details
                    autofocus
                ></v-text-field>
                <v-spacer></v-spacer>
                <template>
                  <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      @click="handleOpenEpisodeDialog"
                  >
                    افزودن اپیزود جدید
                  </v-btn>
                </template>
              </v-toolbar>
            </template>
            <template v-slot:item.submittedBy="{ item }">
              {{ transformOrganization(item.submittedBy) }}
            </template>
            <template v-slot:item.releaseDate="{ item }">
              {{ transformDateToJalali(item.releaseDate) }}
            </template>
            <template v-slot:item.actions="{item}">
              <v-icon
                  small
                  class="mr-2"
                  @click="handleTabsDialogInEpisodeList(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="closeEpisodeList"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    لیست اپیزود-->

    <!--    تب ها-->
    <v-dialog
        v-model="tabsDialog"
        persistent
        max-width="800px"
    >
      <v-card>
        <v-card-text>
          <v-tabs class="mt-5" color="grey darken-3" v-model="tabsMenu">
            <v-tab
                href="#assessment"
                @click="handleTab1"
            >ارزیابی
            </v-tab>
            <v-tab
                href="#chat"
                v-if="assessmentRequestInfoObject"
                @click="handleTab2"
            >گفتگوها
            </v-tab>
            <v-tab
                href="#file"
                v-if="assessmentRequestInfoObject"
                @click="handleTab3"
            >فایل
            </v-tab>
          </v-tabs>
          <v-divider></v-divider>

          <v-tabs-items v-model="tabsMenu">

            <v-tab-item class="mt-5" value="assessment">
              <v-col cols="12">
                <template v-if="assessmentRequestInfoObject">
                  <v-row>
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
                </template>
                <template v-if="!assessmentRequestInfoObject && canUploadFile">
                  <v-text-field
                      v-model="tab1Desc"
                      outlined
                      label="توضیحات"
                  ></v-text-field>
                  <v-btn
                      color="primary"
                      @click="createAssessmentRequest">
                    درخواست ارزیابی
                  </v-btn>
                </template>
                <template>
<!--                  <v-row v-if="assessmentRequestInfoObject && (!assessmentInfo && canCreateAssessment)">-->
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
          <v-btn
              color="blue darken-1"
              text
              @click="closeTabs"
          >
            انصراف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--    تب ها-->

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

  </div>
</template>

<script>
import {required, verifyMobilePhone, verifyUserName, multiSelectRequired} from "../../../plugins/rule";
import {
  transformOrganization,
  transformDateToJalali,
  transformTitleType,
  transformEntryType, transformJalaliDateToGeorgian,
  transformAssessmentRequestStatus
} from "../../../plugins/transformData";
import {permission} from "../../../plugins/permission";
import axios from 'axios'
import {productService} from "../../../service/productService";
import {entryType} from "../../../plugins/constant";
import {episodeService} from "../../../service/episodeService";
import {assessmentRequestService} from "../../../service/assessmentRequestService";
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import VideoTag from "../../../components/VideoTag";


export default {
  name: "Index",
  components: {
    VideoTag,
    datePicker: VuePersianDatetimePicker,

  },
  data: () => ({
    productDialog: false,
    episodeListDialog: false,
    episodeDialog: false,
    tabsDialog: false,
    videoTagDialog: false,
    isLoading: false,
    productSearch: null,
    filteredProducts: [],
    episodes: [],
    productIdForHandleEpisode: null,
    tabsMenu: null,
    search: '',
    episodeSearch: '',
    dialogSearch: '',
    fileSearch: '',
    productHeaders: [
      {text: 'نام انگلسیی', value: 'enTitle',},
      {text: 'نام فارسی', value: 'faTitle'},
      {text: 'زمان شروع', value: 'startYear'},
      {text: 'زمان پایان', value: 'endYear'},
      {text: 'آی دی imdb', value: 'imdbId'},
      {text: 'نوع ورودی', value: 'entryType'},
      {text: 'عنوان ورودی', value: 'titleType'},
      {text: 'آخرین ویرایش', value: 'lastUpdate'},
      {text: 'عملیات', value: 'actions', sortable: false},
    ],
    episodeHeaders: [
      {text: 'نام انگلسیی', value: 'enTitle'},
      {text: 'نام فارسی', value: 'faTitle'},
      {text: 'شماره فصل', value: 'seasonNumber'},
      {text: 'شماره قسمت', value: 'episodeNumber'},
      {text: 'زمان', value: 'duration'},
      {text: 'امتیاز', value: 'rate'},
      {text: 'تاریخ انتشار', value: 'releaseDate'},
      {text: 'عملیات', value: 'actions', sortable: false},
    ],
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
    productEditedIndex: -1,
    episodeEditedIndex: -1,
    productEditedItem: {
      enTitle: '',
      faTitle: '',
      directors: [],
      language: [],
      duration: '',
      genres: [],
      startYear: [],
      endYear: [],
      writers: [],
      actors: [],
      submittedBy: '',
      imdbId: '',
      entryType: '',
      titleType: '',
      rate: '',
      description: ''
    },
    productDefaultItem: {
      enTitle: '',
      faTitle: '',
      duration: '',
      releaseDate: '',
      submittedBy: '',
      parent: '',
      seasonNumber: '',
      episodeNumber: '',
      rate: '',
      description: ''
    },
    episodeEditedItem: {
      enTitle: '',
      faTitle: '',
      duration: '',
      releaseDate: '',
      submittedBy: '',
      parent: '',
      seasonNumber: '',
      episodeNumber: '',
      rate: '',
      description: ''
    },
    episodeDefaultItem: {
      enTitle: '',
      faTitle: '',
      duration: '',
      releaseDate: '',
      submittedBy: '',
      parent: '',
      seasonNumber: '',
      episodeNumber: '',
      rate: '',
      description: ''
    },
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
    dialogEditedItem: {
      message: '',
      targetFile: '',
    },
    dialogEditedDefaultItem: {
      message: '',
      targetFile: '',
    },
    breadcrumbs: [
      {
        text: 'داشبورد',
        disabled: false,
        to: {name: 'Panel'},
        exact: true
      },
      {
        text: 'در خواست ارزیابی',
        disabled: true,
        exact: true
      },
    ],
    episodeIdForTab1: null,
    episodeHasAssessmentRequest: false,
    tab1Desc: null,
    assessmentRequestInfoObject: null,
    assessmentInfo: null,
    dialogs: [],
    targetFiles: [],
    files: [],
    showVideoTag: false,
    assessmentId: null,
    fileId: null,
    videoUrl: null,
    required,
    verifyMobilePhone,
    verifyUserName,
    transformOrganization,
    multiSelectRequired,
    transformDateToJalali,
    transformTitleType,
    transformEntryType,
    transformAssessmentRequestStatus,
    entryType,
  }),
  mounted() {
    this.$store.dispatch('fetchOrganizations')
    this.$store.dispatch('product/fetchAllProducts')
    this.$store.dispatch('product/fetchAllGeneres')
    this.$store.dispatch('product/fetchAllTitleTypes')
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  // beforeDestroy() {
  //   this.$store.commit('episode/SET_EPISODES', [])
  // },
  computed: {
    canCreateAssessment() {
      return permission().isBrokerage() && permission().isOrders()
    },
    canUploadFile() {
      return permission().isPlatform() && permission().isOrders()
    },
    isSuperAdmin() {
      return permission().isSuperAdmin()
    },
    // episodes() {
    //   return this.$store.getters['episode/getEpisodes']
    // },
    products() {
      return this.$store.getters['product/getProducts']
    },
    generes() {
      return this.$store.getters['product/getGeneres']
    },
    titleTypes() {
      return this.$store.getters['product/getTitleTypes']
    },
    organizationList() {
      return this.$store.getters['getOrganizations']
    },
  },

  watch: {
    productDialog(val) {
      val || this.closeProduct()
    },
    productSearch(value) {
      if (!value) {
        this.filteredProducts = [];
        return;
      }
      if (value.length <= 0) return;
      if (this.isLoading) return;
      this.isLoading = true;
      axios.get(`http://sadkam.lincast.ir/api/products/search/${value}`)
          .then(({data}) => {
            this.$nextTick(() => this.filteredProducts = data.data)
          })
          .finally(() => this.isLoading = false)
    },
    episodeDialog(val) {
      val || this.closeEpisode()
    },
    episodeListDialog(val) {
      val || this.closeEpisodeList()
    },
    tabsDialog(val) {
      if (val) {
        this.handleTab1()
      }
      val || this.closeTabs()
    },
  },

  methods: {
    closeProduct() {
      this.productDialog = false
      this.$nextTick(() => {
        this.productEditedItem = Object.assign({}, this.productDefaultItem)
        this.productEditedIndex = -1
        this.$refs.productForm.resetValidation()
      })
    },
    closeEpisode() {
      this.episodeDialog = false
      this.$nextTick(() => {
        this.episodeEditedItem = Object.assign({}, this.episodeDefaultItem)
        this.episodeEditedIndex = -1
        this.$refs.episodeForm.resetValidation()
      })
    },
    closeEpisodeList() {
      this.episodes = [];
      this.productIdForHandleEpisode = null;
      this.episodeListDialog = false
    },

    handleOpenEpisodeDialog() {
      this.episodeEditedItem.parent = this.productIdForHandleEpisode
      this.episodeDialog = true;
    },
    saveProduct() {
      if (this.$refs.productForm.validate()) {
        productService().createProduct(this.productEditedItem).then(() => {
          axios.get(`http://sadkam.lincast.ir/api/products/search/${this.productSearch}`)
              .then(({data}) => {
                this.$nextTick(() => this.filteredProducts = data.data)
                this.closeProduct()
              })
              .finally(() => this.isLoading = false)
        })
      }
    },

    saveEpisode() {
      if (this.$refs.episodeForm.validate()) {
        this.episodeEditedItem = {
          ...this.episodeEditedItem,
          releaseDate: new Date(transformJalaliDateToGeorgian(this.episodeEditedItem.releaseDate)).getTime()
        }
        episodeService().createEpisode(this.episodeEditedItem).then(() => {
          episodeService().getAllEpisodes(this.episodeEditedItem.parent).then(({data}) => {
            this.episodes = data.data
            this.closeEpisode()
          })
        })
      }
    },

    assessmentRequest(item) {
      if (item.entryType === 'single') {
        episodeService().getAllEpisodes(item._id).then(({data}) => {
          this.episodeIdForTab1 = data.data[0]._id
          this.tabsDialog = true
        })
      } else if (item.entryType === 'multiple') {
        episodeService().getAllEpisodes(item._id).then(({data}) => {
          this.productIdForHandleEpisode = item._id;
          this.episodes = data.data
          this.episodeListDialog = true
        })
      }
    },

    handleTab1() {
      assessmentRequestService().getAssessmentRequestByEpisode(this.episodeIdForTab1).then(({data}) => {
        if (data.data.length === 0) {
          this.episodeHasAssessmentRequest = false
          this.assessmentRequestInfoObject = null
        } else {
          this.episodeHasAssessmentRequest = true
          assessmentRequestService().getAssessmentRequest(data.data[0]._id).then((res) => {
            this.assessmentRequestInfoObject = res.data.data
            this.files = res.data.data.files
            res.data.data.dialogs.forEach(value => {
              const obj = this.files.find(item => {
                if (value.targetFile) {
                  return item._id === value.targetFile
                }
              })
              if (obj) {
                value['humanId'] = obj.humanId
              } else {
                value['humanId'] = 'ندارد'
              }
            })
            this.dialogs = res.data.data.dialogs
            // if (res.data.data.assessment) {
            //   this.assessmentInfo = data.data.assessment
            // } else {
            //   if (this.canCreateAssessment) {
            //     this.$toast.info('حداقل یک فایل بارگزاری کنید')
            //   }
            // }
          })
        }
      })
    },
    createAssessmentRequest() {
      const assessmentRequest = {
        episode: this.episodeIdForTab1,
        description: this.tab1Desc
      }
      assessmentRequestService().createAssessmentRequest(assessmentRequest).then(({data}) => {
        this.episodeHasAssessmentRequest = true;
        assessmentRequestService().getAssessmentRequest(data.data.id).then((res) => {
          this.assessmentRequestInfoObject = res.data.data
          this.files = res.data.data.files
          res.data.data.dialogs.forEach(value => {
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
          this.dialogs = res.data.data.dialogs
          // if (res.data.data.assessment) {
          //   this.assessmentInfo = data.data.assessment
          // } else {
          //   if (this.canCreateAssessment) {
          //     this.$toast.info('حداقل یک فایل بارگزاری کنید')
          //   }
          // }
        })
      })
    },
    handleTab2() {
      this.handleTab1()
      this.files.forEach(item => {
        const row = {title: `${item.desc} - ${item.humanId}`, id: item._id}
        this.targetFiles.push(row)
      })
    },
    saveDialog() {
      if (this.$refs.dialogForm.validate()) {
        const dialog = {...this.dialogEditedItem, _id: this.assessmentRequestInfoObject._id}
        assessmentRequestService().createDialog(dialog).then(() => {
          this.handleTab1()
          this.$refs.dialogForm.reset();
          this.$refs.dialogForm.resetValidation();
        })
      }
    },

    handleTab3() {
      this.handleTab1()
    },
    saveFile() {
      if (this.$refs.fileForm.validate()) {
        const file = {...this.fileEditedItem, _id: this.assessmentRequestInfoObject._id}
        assessmentRequestService().createFile(file).then(() => {
          this.handleTab1()
          this.$refs.fileForm.reset();
          this.$refs.fileForm.resetValidation();
        })
      }
    },

    handleTabsDialogInEpisodeList(item) {
      this.episodeIdForTab1 = item._id
      this.tabsDialog = true
    },
    closeTabs() {
      this.$nextTick(() => {
        this.episodeIdForTab1 = null;
        this.assessmentRequestInfoObject = null;
        this.assessmentInfo = null;
        this.fileEditedItem = Object.assign({}, this.fileEditedDefaultItem)
        this.dialogEditedItem = Object.assign({}, this.dialogEditedDefaultItem)
        if (this.$refs.dialogForm) {
          this.$refs.dialogForm.reset();
          this.$refs.dialogForm.resetValidation();
        }
        if (this.$refs.fileForm) {
          this.$refs.fileForm.reset();
          this.$refs.fileForm.resetValidation();
        }
        this.dialogs = [];
        this.targetFiles = [];
        this.files = [];
        this.tabsDialog = false;
      })
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
    // async createAssessment() {
    //   try {
    //     const data = {
    //       episode: this.episodeIdForTab1,
    //       assessmentRequest: this.assessmentRequestInfoObject._id
    //     }
    //     await this.$store.dispatch('assessment/createAssessment', data)
    //   } catch (e) {
    //     this.$toast.error('عملیات انجام نشد')
    //   }
    // }
  },
}
</script>

<style scoped>

</style>

