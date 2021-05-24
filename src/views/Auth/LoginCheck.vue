<!--<template>-->
<!--  <div class="parent d-flex align-center justify-center">-->
<!--    <v-col-->
<!--      cols="6"-->
<!--      class="login-container d-flex flex-row align-center pa-3"-->
<!--    >-->
<!--      <v-col-->
<!--        cols="6"-->
<!--      >-->
<!--        <v-img src="/big-satra.jpg" />-->
<!--      </v-col>-->
<!--      <v-col-->
<!--        cols="6"-->
<!--        style="border-right: 1px solid #152070; padding-right: 30px"-->
<!--      >-->
<!--        <v-form-->
<!--          ref="verifyCodeForm"-->
<!--        >-->
<!--          <span-->
<!--            class="font-weight-bold"-->
<!--            style="color: #152070"-->
<!--          >ارسال کد</span>-->
<!--          <v-text-field-->
<!--            v-model="form.code"-->
<!--            label="کد تاییده"-->
<!--            outlined-->
<!--            readonly-->
<!--            rounded-->
<!--            class="mt-9 w-100"-->
<!--            :rules="[-->
<!--              required('این فیلد الزامی است'),-->
<!--            ]"-->
<!--          />-->
<!--          <div class="d-flex justify-space-between align-center">-->
<!--            <v-btn-->
<!--              color="#152070"-->
<!--              class="px-6 ma-0"-->
<!--              rounded-->
<!--              @click="loginCheck"-->
<!--            >-->
<!--              ارسال کد تایید-->
<!--              <v-icon>mdi-chevron-left</v-icon>-->
<!--            </v-btn>-->
<!--            <v-btn-->
<!--              color="#152070"-->
<!--              class="px-6 mr-auto"-->
<!--              rounded-->
<!--              @click="$router.push({name:'Login'})"-->
<!--            >-->
<!--              بازگشت-->
<!--              <v-icon>mdi-chevron-left</v-icon>-->
<!--            </v-btn>-->
<!--          </div>-->
<!--        </v-form>-->
<!--      </v-col>-->
<!--    </v-col>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import { required } from '../../plugins/rule'-->

<!--  export default {-->
<!--    name: 'LoginCheck',-->
<!--    data () {-->
<!--      return {-->
<!--        form: {-->
<!--          code: '1234',-->
<!--        },-->
<!--        required,-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      loginCheck () {-->
<!--        if (this.$refs.verifyCodeForm.validate()) {-->
<!--          this.$store.dispatch('loginCheck', this.form.code).then(() => {-->
<!--            this.$router.push({ name: 'Dashboard' })-->
<!--          })-->
<!--        }-->
<!--      },-->
<!--    },-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->
<!--.parent {-->
<!--  background-color: #eee;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->

<!--.login-container {-->
<!--  background-color: white;-->
<!--  border-radius: 10px;-->
<!--}-->
<!--</style>-->

<template>
  <section>
    <div class="box">
      <div
        class="square"
        style="--i:0;"
      />
      <div
        class="square"
        style="--i:1;"
      />
      <div
        class="square"
        style="--i:2;"
      />
      <div
        class="square"
        style="--i:3;"
      />
      <div
        class="square"
        style="--i:4;"
      />
      <div
        class="square"
        style="--i:5;"
      />

      <div class="container">
        <div class="form">
          <v-form
            ref="loginForm"
            class="w-100"
          >
            <span
              class="font-weight-bold"
              style="display:block ;color: white ; margin-bottom: 20px"
            >کد تایید را وارد نمایید</span>
            <div class="inputBx password">
              <input
                id="password-input"
                v-model="code"
                v-mask="'####'"
              >
              <div class="d-flex justify-space-between align-center mt-3">
                <v-btn
                  color="rgba(255, 255, 255, 0.2)"
                  class="px-6 ma-0"
                  rounded
                  :disabled="disableForm"
                  @click="loginCheck"
                >
                  <template>
                    ارسال کد تایید
                    <v-icon class="mr-2">
                      mdi-chevron-left
                    </v-icon>
                  </template>
                </v-btn>

                <v-btn
                  color="rgba(255, 255, 255, 0.2)"
                  class="px-6 mr-auto"
                  rounded
                  @click="$router.push({name:'Login'})"
                >
                  بازگشت
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
              </div>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        code: '1234',
        // code: '',
        disableForm: false,
      }
    },
    watch: {
      code (value) {
        if (!value.trim() || value.trim().length !== 4) {
          this.disableForm = true
        } else {
          this.disableForm = false
        }
      },
    },
    methods: {
      loginCheck () {
        if (!this.disableForm) {
          this.$store.dispatch('loginCheck', this.code).then(() => {
            this.$router.push({ name: 'Dashboard' })
          })
        }
      },
    },
  }
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=El+Messiri:wght@700&display=swap');
//* {
//  margin: 0;
//  padding: 0;
//  font-family: 'El Messiri', sans-serif;
//}

body {
  background: #031323;
  overflow: hidden;
}

img {
  width: 32px;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.box {
  position: relative;

  .square {
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 15px;
    animation: square 10s linear infinite;
    animation-delay: calc(-1s * var(--i));
  }

  @keyframes square {
    0%, 100% {
      transform: translateY(-20px);
    }

    50% {
      transform: translateY(20px);
    }
  }

  .square:nth-child(1) {
    width: 100px;
    height: 100px;
    top: -15px;
    right: -45px;
  }

  .square:nth-child(2) {
    width: 150px;
    height: 150px;
    top: 105px;
    left: -125px;
    z-index: 2;
  }

  .square:nth-child(3) {
    width: 60px;
    height: 60px;
    bottom: 85px;
    right: -45px;
    z-index: 2;
  }

  .square:nth-child(4) {
    width: 50px;
    height: 50px;
    bottom: 35px;
    left: -95px;
  }

  .square:nth-child(5) {
    width: 50px;
    height: 50px;
    top: -15px;
    left: -25px;
  }

  .square:nth-child(6) {
    width: 85px;
    height: 85px;
    top: 165px;
    right: -155px;
    z-index: 2;
  }
}

.container {
  position: relative;
  padding: 15px;
  width: 300px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
}

.container::after {
  content: '';
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  border-radius: 5px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.1) 2%
  );
}

.form {
  position: relative;
  width: 100%;
  height: 100%;

  h2 {
    color: #fff;
    letter-spacing: 2px;
    margin-bottom: 30px;
  }

  .inputBx {
    position: relative;
    width: 100%;
    margin-bottom: 20px;

    input {
      width: 100%;
      outline: none;
      border: none;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.2);
      padding: 8px 10px;
      padding-left: 40px;
      border-radius: 15px;
      color: #fff;
      font-size: 16px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }

    .password-control {
      position: absolute;
      top: 11px;
      right: 10px;
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url(https://snipp.ru/demo/495/view.svg) 0 0 no-repeat;
      transition: 0.5s;
    }

    .view {
      background: url(https://snipp.ru/demo/495/no-view.svg) 0 0 no-repeat;
      transition: 0.5s;
    }

    img {
      position: absolute;
      top: 6px;
      left: 8px;
      transform: scale(0.6);
      filter: invert(1);
    }

    input[type="submit"] {
      background: #fff;
      color: #111;
      max-width: 100px;
      padding: 8px 10px;
      box-shadow: none;
      letter-spacing: 1px;
      cursor: pointer;
      transition: 1.5s;
    }

    input[type="submit"]:hover {
      background: linear-gradient(115deg,
        rgba(0, 0, 0, 0.10),
        rgba(255, 255, 255, 0.25));
      color: #fff;
      transition: .5s;
    }

    input::placeholder {
      color: #fff;
    }

    span {
      position: absolute;
      left: 30px;
      padding: 10px;
      display: inline-block;
      color: #fff;
      transition: .5s;
      pointer-events: none;
    }

    input:focus ~ span,
    input:valid ~ span {
      transform: translateX(-30px) translateY(-25px);
      font-size: 12px;
    }
  }

  p {
    color: #fff;
    font-size: 15px;
    margin-top: 5px;

    a {
      color: #fff;
    }

    a:hover {
      background-color: #000;
      background-image: linear-gradient(to right, #434343 0%, black 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.remember {
  position: relative;
  display: inline-block;
  color: #fff;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
