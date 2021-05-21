<template>
  <v-container fluid class="pa-0 ma-0" :class="$vuetify.breakpoint.mdAndUp ? 'h-100' : 'h-40'">
    <v-row :class="$vuetify.breakpoint.mdAndUp ? 'h-100' : 'h-40'">
      <AuthBanner/>
      <v-col cols="12" md="4" class="d-flex align-center">
        <v-form ref="loginForm" class="w-100 mx-5">
          <span class="blue--text font-weight-bold">ورود به حساب کاربری</span>
          <v-text-field label="شماره موبایل"
                        outlined
                        rounded
                        class="mt-9"
                        v-model="form.phone"
                        :rules="[
                            required('این فیلد الزامی است'),
                            ]"
          ></v-text-field>
          <div class="d-flex justify-space-between align-center">
            <v-btn color="info" class="px-6" rounded @click="login">
              <template>
                ارسال شماره موبایل
                <v-icon class="mr-2">mdi-chevron-left</v-icon>
              </template>
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {required, moreThan} from "../../plugins/rule";
import AuthBanner from '../../components/AuthBanner'

export default {
  name: "Login",
  components: {
    AuthBanner
  },
  data() {
    return {
      form: {
        phone: '09129329989',
        // phone: '',
      },
      required,
      moreThan
    }
  },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch('login', this.form.phone).then(() => {
          this.$router.push({name: 'LoginCheck'})
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
