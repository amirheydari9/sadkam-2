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
          ref="loginForm"
          class="w-100"
        >
          <span
            class="font-weight-bold"
            style="color: #152070"
          >ورود به حساب کاربری</span>
          <v-text-field
            v-model="form.phone"
            label="شماره موبایل"
            outlined
            rounded
            class="mt-9"
            :rules="[
              required('این فیلد الزامی است'),
            ]"
          />
          <div class="d-flex justify-space-between align-center">
            <v-btn
              color="#152070"
              class="px-6 ma-0"
              rounded
              @click="login"
            >
              <template>
                ارسال شماره موبایل
                <v-icon class="mr-2">
                  mdi-chevron-left
                </v-icon>
              </template>
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-col>
  </div>
</template>

<script>
  import { required, moreThan } from '../../plugins/rule'

  export default {
    name: 'Login',
    data () {
      return {
        form: {
          phone: '09129329989',
        // phone: '',
        },
        required,
        moreThan,
      }
    },
    methods: {
      login () {
        if (this.$refs.loginForm.validate()) {
          this.$store.dispatch('login', this.form.phone).then(() => {
            this.$router.push({ name: 'LoginCheck' })
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
