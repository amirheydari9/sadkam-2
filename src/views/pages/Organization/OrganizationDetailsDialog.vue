<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    persistent
  >
    <v-card>
      <dialog-headline :title="formTitle " />
      <v-card-text>
        <v-container>
          <v-form ref="organizationForm">
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="organization.title"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="نام سازمان"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="organization.agentName"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="نام واسط"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="organization.agentPhone"
                  type="number"
                  :rules="[
                    required('این فیلد الزامی است'),
                    verifyMobilePhone()
                  ]"
                  label="شماره تماس واسط"
                />
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
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="organization.usersLimitCount"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="محدودیت تعریف کاربران"
                  type="number"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-switch
                  v-model="organization.isActive"
                  label="فعال است"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="organization.address"
                  :rules="[
                    required('این فیلد الزامی است'),
                  ]"
                  label="آدرس سازمان"
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
  import DialogHeadline from '../../../components/DialogHeadline'

  export default {
    name: 'OrganizationDetailsDialog',
    components: { DialogHeadline },
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
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
      organization () {
        return this.$store.getters['organization/getOrganization']
      },
      organizationType () {
        return this.$store.getters['staticData/getOrganizationTypes']
      },
      formTitle () {
        return this.isCreate ? 'افزودن سازمان' : 'ویرایش سازمان'
      },
    },
    methods: {
      close () {
        // this.$refs.organizationForm.reset()
        this.$refs.organizationForm.resetValidation()
        this.$emit('closeDialog')
      },
      save () {
        if (this.$refs.organizationForm.validate()) {
          this.$emit('handleSave', this.organization)
          this.close()
        }
      },
    },
  }
</script>

<style scoped>

</style>
