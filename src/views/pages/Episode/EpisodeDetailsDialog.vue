<template>
  <v-dialog
    v-model="show"
    max-width="800px"
    persistent
  >
    <v-card>
      <dialog-headline :title="formTitle" />
      <v-card-text>
        <v-container>
          <v-form ref="episodeForm">
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="episode.enTitle"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="نام انگلیسی"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="episode.faTitle"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="نام فارسی"
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <v-text-field
                  v-model="episode.duration"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="زمان"
                  type="number"
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <v-text-field
                  v-model="episode.rate"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="امتیاز"
                  type="number"
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <v-text-field
                  v-model="episode.seasonNumber"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="شماره فصل"
                  type="number"
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <v-text-field
                  v-model="episode.episodeNumber"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="شماره قسمت"
                  type="number"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  id="my-custom-input"
                  persistent-hint
                  readonly
                  v-model="episode.releaseDate"
                  label="زمان انتشار"
                  :rules="[required('این فیلد الزامی است')]"
                ></v-text-field>
                <v-date-picker
                  v-model="episode.releaseDate"
                  auto-submit
                  element="my-custom-input"
                  format="jYYYY/jMM/jDD"
                />
              </v-col>

              <!--              <v-col cols="12">-->
              <!--                <v-autocomplete-->
              <!--                    :rules="[-->
              <!--                                            required('این فیلد الزامی است'),-->
              <!--                                            ]"-->
              <!--                    :loading="isLoading"-->
              <!--                    :items="filteredProducts"-->
              <!--                    :search-input.sync="productSearch"-->
              <!--                    item-text="enTitle"-->
              <!--                    :item-value="episode.parent"-->
              <!--                    label="نام محصول"-->
              <!--                    @change="handleSelectProductName"-->
              <!--                    return-object-->
              <!--                ></v-autocomplete>-->
              <!--              </v-col>-->

              <v-col cols="12">
                <v-text-field
                  v-model="episode.description"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="توضیحات"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          rounded
          @click="save"
        >
          ذخیره
        </v-btn>
        <v-btn
          color="warning"
          text
          @click="close"
        >
          انصراف
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { multiSelectRequired, verifyMobilePhone, verifyUserName, required } from '../../../plugins/rule'
  // import {permission} from "../../../plugins/permission";
  import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
  import { entryType } from '../../../plugins/constant'
  import { transformDateToJalali, transformJalaliDateToGeorgian } from '../../../plugins/transformData'
  import DialogHeadline from '../../../components/DialogHeadline'

  export default {
    name: 'EpisodeDetailsDialog',
    components: {
      vDatePicker: VuePersianDatetimePicker,
      DialogHeadline,
    },
    props: {
      showDialog: { Boolean, isRequired: true },
      isCreate: { Boolean, isRequired: true },
    },
    data () {
      return {
        required,
        verifyMobilePhone,
        verifyUserName,
        multiSelectRequired,
        entryType,
        isLoading: false,
        filteredProducts: [],
        productSearch: '',
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
      episode () {
        return this.$store.getters['episode/getEpisode']
      },
      // releaseDate: {
      //   get () {
      //     return transformDateToJalali(this.episode.releaseDate)
      //   },
      //   set (value) {
      //     console.log(value)
      //   },
      // },
      formTitle () {
        return this.isCreate ? 'افزودن اپیزود' : 'ویرایش اپیزود'
      },
    },
    watch: {
      productSearch (value) {
        if (!value || value.trim().length <= 0) this.filteredProducts = []
        if (this.isLoading) return
        this.isLoading = true
        this.$store.dispatch('product/searchProduct', value).then(({ data }) => {
          if (data.data && data.data.length) {
            const result = data.data.filter(item => item.entryType === 'multiple')
            // if (result.length > 0) {
            //   result.forEach(item => {
            //     console.log(item)
            //     item.compositionName = `${item.enTitle}/${item.faTitle}/${transformTitleType(item.titleType)}`
            //   })
            //   this.filteredProducts = result
            // }
            this.filteredProducts = result
          }
          // eslint-disable-next-line no-return-assign
        }).finally(() => this.isLoading = false)
      },
    },
    mounted () {

    },
    methods: {
      // handleSelectProductName(event) {
      //   console.log(event);
      //   // console.log(event.split('/'));
      //   // this.editedItem.parent = event._id
      // },
      close () {
        this.$refs.episodeForm.resetValidation()
        this.$emit('closeDialog')
      },
      save () {
        if (this.$refs.episodeForm.validate()) {
          let data = {
            ...this.episode,
            releaseDate: new Date(transformJalaliDateToGeorgian(this.episode.releaseDate)).getTime(),
          }
          if (this.isCreate) {
            data = {
              ...data,
              parent: this.$store.getters['episode/getParentId'],
            }
          }
          this.$emit('handleSave', data)
          this.close()
        }
      },
    },
  }
</script>

<style scoped>

</style>
