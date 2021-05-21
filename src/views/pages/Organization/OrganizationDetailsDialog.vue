<template>
  <v-dialog v-model="show" max-width="600px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="organizationForm">
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-text-field
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    v-model="organization.name"
                    label="نام سازمان"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-text-field
                    :rules="[
                            required('این فیلد الزامی است'),
                            verifyMobilePhone()
                            ]"
                    v-model="organization.agent_phone"
                    label="شماره تماس واسط"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-autocomplete
                    v-model="organization.organizationType"
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    label="نوع سازمان"
                    :items="organizationType"
                    item-text="fa"
                    item-value="type"
                    dense
                ></v-autocomplete>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-switch
                    v-model="organization.active"
                    label="فعال است"
                ></v-switch>
              </v-col>
              <v-col
                  cols="12"
              >
                <v-text-field
                    :rules="[
                            required('این فیلد الزامی است'),
                            ]"
                    v-model="organization.address"
                    label="آدرس سازمان"
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

export default {
  name: "OrganizationDetailsDialog",
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
    }
  },
  computed: {
    show() {
      return this.showDialog
    },
    organization() {
      return this.$store.getters['organization/getOrganization']
    },
    organizationType() {
      return this.$store.getters['organization/getOrganizationTypes']
    },
    formTitle() {
      return this.isCreate ? 'افزودن سازمان' : 'ویرایش سازمان'
    },
  },
  methods: {
    close() {
      // this.$refs.organizationForm.reset()
      this.$refs.organizationForm.resetValidation()
      this.$emit('closeDialog')
    },
    save() {
      if (this.$refs.organizationForm.validate()) {
        this.$emit('handleSave', this.organization)
        this.close()
      }
    }
  }
}
</script>

<style scoped>

</style>
