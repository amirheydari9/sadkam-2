<template>
  <v-dialog v-model="show" max-width="800px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
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
                    v-model="product.enTitle"
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
                    v-model="product.faTitle"
                    label="نام فارسی"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="3"
              >
                <v-text-field
                    v-model="product.startYear"
                    label="سال شروع"
                    type="number"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="3"
              >
                <v-text-field
                    v-model="product.endYear"
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
                    v-model="product.duration"
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
                    v-model="product.rate"
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
                    v-model="product.directors"
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
                    v-model="product.language"
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
                    v-model="product.genres"
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
                    v-model="product.writers"
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
                  sm="8"
              >
                <v-combobox
                    :rules="[
                            multiSelectRequired('این فیلد الزامی است'),
                            ]"
                    v-model="product.actors"
                    label="بازیگران"
                    multiple
                    chips
                    append-icon=""
                    persistent-hint
                    deletable-chips
                ></v-combobox>
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
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    v-model="product.imdbId"
                    label="آی دی imdb"
                    type="number"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="4"
              >
                <v-autocomplete
                    v-model="product.entryType"
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    label="نوع ورودی"
                    :items="entryType"
                    item-text="fa"
                    item-value="en"
                ></v-autocomplete>
              </v-col>
              <v-col
                  cols="12"
                  sm="4"
              >
                <v-autocomplete
                    v-model="product.titleType"
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    label="عنوان ورودی"
                    :items="titleTypes"
                    item-text="fa"
                    item-value="en"
                ></v-autocomplete>
              </v-col>
              <v-col
                  cols="12"
              >
                <v-text-field
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    v-model="product.description"
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
import {entryType} from "../../../plugins/constant";

export default {
  name: "ProductDetailsDialog",
  props: {
    showDialog: {Boolean, isRequired: true},
    isCreate: {Boolean, isRequired: true},
    jusTCreate: {Boolean, isRequired: false, default: false}
  },
  data() {
    return {
      required,
      verifyMobilePhone,
      verifyUserName,
      multiSelectRequired,
      entryType,
    }
  },
  mounted() {
    this.$store.dispatch('product/fetchAllGeneres')
    this.$store.dispatch('product/fetchAllTitleTypes')
  },
  computed: {
    show() {
      return this.showDialog
    },
    product() {
      return this.$store.getters['product/getProduct']
    },
    // isSuperAdmin() {
    //   return permission().isSuperAdmin()
    // },
    generes() {
      return this.$store.getters['product/getGeneres']
    },
    titleTypes() {
      return this.$store.getters['product/getTitleTypes']
    },
    // organizationList() {
    //   return this.$store.getters['organization/getOrganizations']
    // },
    formTitle() {
      return this.isCreate ? 'افزودن محصول' : 'ویرایش محصول'
    },
  },
  methods: {
    close() {
      this.$refs.productForm.resetValidation()
      this.$emit('closeDialog')
    },
    async save() {
      if (this.$refs.productForm.validate()) {
        this.$emit('handleSave', this.product)
        this.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
