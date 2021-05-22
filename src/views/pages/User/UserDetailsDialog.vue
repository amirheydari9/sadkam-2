<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="userForm">
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="user.nickname"
                  :rules="[required('این فیلد الزامی است'),]"
                  label="نام کاربر"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="user.phone"
                  :rules="[required('این فیلد الزامی است'),verifyMobilePhone()]"
                  label="شماره تماس"
                />
              </v-col>
              <v-col
                v-if="isSuperAdmin"
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  v-model="user.organization"
                  :rules="[ required('این فیلد الزامی است'),]"
                  label="نام سازمان"
                  :items="organizationList"
                  item-text="name"
                  item-value="_id"
                />
              </v-col>
              <v-col
                v-if="isSuperAdmin"
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  v-model="user.organizationType"
                  :rules="[ required('این فیلد الزامی است'),]"
                  label="نوع سازمان"
                  :items="organizationType"
                  item-text="fa"
                  item-value="type"
                />
              </v-col>
              <v-col
                cols="12"
              >
                <v-autocomplete
                  v-model="user.organizationRoles"
                  :rules="[multiSelectRequired('این فیلد الزامی است'),]"
                  :items="roles"
                  item-text="fa"
                  item-value="role"
                  chips
                  label="سطح دسترسی"
                  multiple
                  deletable-chips
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-switch
                  v-model="user.active"
                  label="فعال است"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
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
  import { multiSelectRequired, verifyMobilePhone, verifyUserName, required } from '../../../plugins/rule'
  import { permission } from '../../../plugins/permission'

  export default {
    name: 'UserDetailsDialog',
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
      user () {
        return this.$store.getters['user/getUser']
      },
      isSuperAdmin () {
        return permission().isSuperAdmin()
      },
      isUserManager () {
        return permission().isUserManager()
      },
      currentUser () {
        return this.$store.getters.getCurrentUser
      },
      organizationList () {
        return this.$store.getters['organization/getOrganizations']
      },
      organizationType () {
        return this.$store.getters['organization/getOrganizationTypes']
      },
      roles () {
        return this.$store.getters['user/getAllRoles']
      },
      formTitle () {
        return this.isCreate ? 'افزودن کاربر' : 'ویرایش کاربر'
      },
    },
    methods: {
      close () {
        // this.$refs.userForm.reset()
        this.$refs.userForm.resetValidation()
        this.$emit('closeDialog')
      },
      save () {
        if (this.$refs.userForm.validate()) {
          let data = this.user
          if (!this.isSuperAdmin && this.isUserManager) {
            data = {
              ...data,
              organization: this.currentUser.organization,
              organizationType: this.currentUser.organizationType,
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
