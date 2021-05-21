<template>
  <v-container fluid class="pa-0 ma-0" :class="$vuetify.breakpoint.mdAndUp ? 'h-100' : 'h-40' ">
    <v-row :class="$vuetify.breakpoint.mdAndUp ? 'h-100' : 'h-40'">
      <AuthBanner/>
      <v-col cols="12" md="4" class="d-flex align-center">
        <v-form ref="verifyCodeForm" class="w-100 mx-5">
          <span class="blue--text font-weight-bold">ارسال کد</span>
          <v-text-field label="کد تاییده"
                        outlined
                        readonly
                        rounded
                        class="mt-9"
                        v-model="form.code"
                        :rules="[
                            required('این فیلد الزامی است'),
                            ]"
          ></v-text-field>
          <div class="d-flex justify-space-between align-center">
            <v-btn color="info" class="px-6" rounded @click="loginCheck">
              ارسال کد تایید
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn color="info" class="px-6 mr-auto" rounded @click="$router.push({name:'Login'})">
              بازگشت
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthBanner from '../../components/AuthBanner'
import {required} from "../../plugins/rule";

export default {
  name: "LoginCheck",
  components: {
    AuthBanner
  },
  data() {
    return {
      form: {
        code: '1234'
      },
      required
    }
  },
  methods: {
    loginCheck() {
      if (this.$refs.verifyCodeForm.validate()) {
        this.$store.dispatch('loginCheck', this.form.code).then(() => {
          this.$router.push({name: 'Dashboard'})
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
