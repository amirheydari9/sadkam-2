<template>
  <v-dialog v-model="show" max-width="800px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="episodeForm">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    v-model="episode.enTitle"
                    label="نام انگلیسی"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    v-model="episode.faTitle"
                    label="نام فارسی"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    v-model="episode.duration"
                    label="زمان"
                    type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    v-model="episode.rate"
                    label="امتیاز"
                    type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    v-model="episode.seasonNumber"
                    label="شماره فصل"
                    type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    v-model="episode.episodeNumber"
                    label="شماره قسمت"
                    type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6"
              >
                <!--                <v-text-field-->
                <!--                    id="my-custom-input"-->
                <!--                    persistent-hint-->
                <!--                    readonly-->
                <!--                    v-model="releaseDate"-->
                <!--                    label="زمان انتشار"-->
                <!--                    :rules="[required('این فیلد الزامی است')]"-->
                <!--                ></v-text-field>-->
                <v-date-picker
                    auto-submit
                    v-model="releaseDate"
                >
                </v-date-picker>
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
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    v-model="episode.description"
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
            @click="save"
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
</template>

<script>
import {multiSelectRequired, verifyMobilePhone, verifyUserName, required} from "../../../plugins/rule";
// import {permission} from "../../../plugins/permission";
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import {entryType} from "../../../plugins/constant";
import {transformDateToJalali, transformJalaliDateToGeorgian} from "../../../plugins/transformData";

export default {
  name: "EpisodeDetailsDialog",
  components: {
    vDatePicker: VuePersianDatetimePicker,
  },
  props: {
    showDialog: {Boolean, isRequired: true},
    isCreate: {Boolean, isRequired: true}
  },
  data() {
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
    show() {
      return this.showDialog
    },
    episode() {
      return this.$store.getters['episode/getEpisode']
    },
    releaseDate: {
      get() {
        return transformDateToJalali(this.episode.releaseDate)
      },
      set(value) {
        console.log(value)
      }
    },
    formTitle() {
      return this.isCreate ? 'افزودن اپیزود' : 'ویرایش اپیزود'
    },
  },
  mounted() {

  },
  watch: {
    productSearch(value) {
      if (!value || value.trim().length <= 0) this.filteredProducts = []
      if (this.isLoading) return;
      this.isLoading = true;
      this.$store.dispatch('product/searchProduct', value).then(({data}) => {
        if (data.data && data.data.length) {
          const result = data.data.filter(item => item.entryType === 'multiple');
          // if (result.length > 0) {
          //   result.forEach(item => {
          //     console.log(item)
          //     item.compositionName = `${item.enTitle}/${item.faTitle}/${transformTitleType(item.titleType)}`
          //   })
          //   this.filteredProducts = result
          // }
          this.filteredProducts = result
        }
      }).finally(() => this.isLoading = false)
    },
  },
  methods: {
    // handleSelectProductName(event) {
    //   console.log(event);
    //   // console.log(event.split('/'));
    //   // this.editedItem.parent = event._id
    // },
    close() {
      this.$refs.episodeForm.resetValidation()
      this.$emit('closeDialog')
    },
    save() {
      if (this.$refs.episodeForm.validate()) {
        console.log(this.episode)
        let data = {
          ...this.episode,
          releaseDate: new Date(transformJalaliDateToGeorgian(this.releaseDate)).getTime(),
        }
        if (this.isCreate) {
          data = {
            ...data,
            parent: this.$store.getters['episode/getParentId']
          }
        }
        console.log(data);
        console.log(this.$store.getters['episode/getParentId']);
        this.$emit('handleSave', data)
        this.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
