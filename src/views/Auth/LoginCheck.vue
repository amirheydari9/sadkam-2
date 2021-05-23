<template>
  <div class="parent d-flex align-center justify-center">
    <v-col
      cols="6"
      class="login-container d-flex flex-row align-center pa-3"
    >
      <v-col
        cols="6"
      >
        <v-img src="/big-satra.jpg" />
      </v-col>
      <v-col
        cols="6"
        style="border-right: 1px solid #152070; padding-right: 30px"
      >
        <v-form
          ref="verifyCodeForm"
        >
          <span
            class="font-weight-bold"
            style="color: #152070"
          >ارسال کد</span>
          <v-text-field
            v-model="form.code"
            label="کد تاییده"
            outlined
            readonly
            rounded
            class="mt-9 w-100"
            :rules="[
              required('این فیلد الزامی است'),
            ]"
          />
          <div class="d-flex justify-space-between align-center">
            <v-btn
              color="#152070"
              class="px-6 ma-0"
              rounded
              @click="loginCheck"
            >
              ارسال کد تایید
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              color="#152070"
              class="px-6 mr-auto"
              rounded
              @click="$router.push({name:'Login'})"
            >
              بازگشت
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-col>
  </div>
</template>

<script>
  import { required } from '../../plugins/rule'

  export default {
    name: 'LoginCheck',
    data () {
      return {
        form: {
          code: '1234',
        },
        required,
      }
    },
    methods: {
      loginCheck () {
        if (this.$refs.verifyCodeForm.validate()) {
          this.$store.dispatch('loginCheck', this.form.code).then(() => {
            this.$router.push({ name: 'Dashboard' })
          })
        }
      },
    },
  }
</script>

<style scoped>
.parent {
  background-color: #eee;
  width: 100%;
  height: 100%;
}

.login-container {
  background-color: white;
  border-radius: 10px;
}
</style>
