<template>
  <v-dialog
    v-model="show"
    max-width="800px"
    persistent
  >
    <v-card>
      <dialog-headline :title="formTitle " />
      <v-card-text>
        <v-container>
          <v-form ref="productForm">
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="product.enTitle"
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
                  v-model="product.faTitle"
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
                  v-model="product.startYear"
                  label="سال شروع"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  type="number"
                  v-mask="'####'"
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <v-text-field
                  v-model="product.endYear"
                  label="سال پایان"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  type="number"
                  v-mask="'####'"
                />
              </v-col>
              <v-col
                cols="12"
                sm="3"
              >
                <v-text-field
                  v-model="product.duration"
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
                  v-model="product.rate"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="امتیاز"
                  type="number"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <v-combobox
                  v-model="product.directors"
                  :rules="[
                    multiSelectRequired('این فیلد الزامی است'),
                  ]"
                  label="کارگردان"
                  multiple
                  chips
                  append-icon=""
                  persistent-hint
                  deletable-chips
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <v-combobox
                  v-model="product.language"
                  :rules="[
                    multiSelectRequired('این فیلد الزامی است'),
                  ]"
                  label="زبان"
                  multiple
                  chips
                  append-icon=""
                  persistent-hint
                  deletable-chips
                />
              </v-col>

              <v-col
                cols="12"
                sm="4"
              >
                <v-autocomplete
                  v-model="product.genres"
                  :rules="[
                    multiSelectRequired('این فیلد الزامی است'),
                  ]"
                  :items="generes"
                  item-text="fa"
                  item-value="en"
                  chips
                  label="ژاتر ها"
                  multiple
                  deletable-chips
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <v-combobox
                  v-model="product.writers"
                  :rules="[
                    multiSelectRequired('این فیلد الزامی است'),
                  ]"
                  label="نویسندگان"
                  multiple
                  chips
                  append-icon=""
                  persistent-hint
                  deletable-chips
                />
              </v-col>
              <v-col
                cols="12"
                sm="8"
              >
                <v-combobox
                  v-model="product.actors"
                  :rules="[
                    multiSelectRequired('این فیلد الزامی است'),
                  ]"
                  label="بازیگران"
                  multiple
                  chips
                  append-icon=""
                  persistent-hint
                  deletable-chips
                />
              </v-col>
              <!--              <v-col-->
              <!--                  cols="12"-->
              <!--                  sm="4"-->
              <!--                  v-if="isSuperAdmin"-->
              <!--              >-->
              <!--                <v-autocomplete-->
              <!--                    v-model="product.submittedBy"-->
              <!--                    label="ایجاد توسط"-->
              <!--                    :items="organizationList"-->
              <!--                    item-text="name"-->
              <!--                    item-value="_id"-->
              <!--                ></v-autocomplete>-->
              <!--              </v-col>-->
              <v-col
                cols="12"
                sm="4"
              >
                <v-text-field
                  v-model="product.imdbId"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="آی دی imdb"
                  type="number"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <v-autocomplete
                  v-model="product.episodeCountType"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="نوع ورودی"
                  :items="entryType"
                  item-text="fa"
                  item-value="en"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <v-autocomplete
                  v-model="product.category"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="عنوان ورودی"
                  :items="productCategoryData"
                  item-text="fa"
                  item-value="en"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="product.description"
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
  import { entryType } from '../../../plugins/constant'
  import DialogHeadline from '../../../components/DialogHeadline'

  export default {
    name: 'ProductDetailsDialog',
    components: { DialogHeadline },
    props: {
      showDialog: {
        Boolean,
        isRequired: true,
      },
      isCreate: {
        Boolean,
        isRequired: true,
      },
      jusTCreate: {
        Boolean,
        isRequired: false,
        default: false,
      },
    },
    data () {
      return {
        required,
        verifyMobilePhone,
        verifyUserName,
        multiSelectRequired,
        entryType,
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
      product () {
        return this.$store.getters['product/getProduct']
      },
      // isSuperAdmin() {
      //   return permission().isSuperAdmin()
      // },
      generes () {
        return this.$store.getters['staticData/getGeneres']
      },
      productCategoryData () {
        return this.$store.getters['staticData/getProductCategoryData']
      },
      // organizationList() {
      //   return this.$store.getters['organization/getOrganizations']
      // },
      formTitle () {
        return this.isCreate ? 'افزودن محصول' : 'ویرایش محصول'
      },
    },
    mounted () {
      this.$store.dispatch('staticData/fetchAllGeneres')
      this.$store.dispatch('staticData/fetchListOfCategoryData')
    },
    methods: {
      close () {
        this.$refs.productForm.resetValidation()
        this.$emit('closeDialog')
      },
      async save () {
        if (this.$refs.productForm.validate()) {
          this.$emit('handleSave', this.product)
          this.close()
        }
      },
    },
  }
</script>

<style scoped>

</style>
