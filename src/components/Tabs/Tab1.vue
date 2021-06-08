<template>
  <v-tab-item
    class="mt-5"
    value="assessment"
  >
    <v-col cols="12">
      <template v-if="request">
        <v-row>
          <v-col
            cols="12"
            sm="4"
          >
            <v-text-field
              :value="transformRequestStatus(request.status)"
              label="وضعیت"
              readonly
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <v-text-field
              :value="transformDateToJalali(request.submitDate)"
              label="تاریخ ثبت درخواست"
              readonly
            />
          </v-col>
          <v-col
            cols="12"
            sm="4"
          >
            <v-text-field
              v-model="request.description"
              label="توضیحات"
              readonly
            />
          </v-col>
        </v-row>
      </template>
      <template v-if="!request">
        <v-text-field
          v-model="tab1Desc"
          outlined
          label="توضیحات"
        />
        <v-btn
          color="primary"
          @click="createRequest"
        >
          درخواست ارزیابی
        </v-btn>
      </template>
      <!--      <template v-if="!requestInfoObject && canUploadFile">-->
      <!--        <v-text-field-->
      <!--            v-model="tab1Desc"-->
      <!--            outlined-->
      <!--            label="توضیحات"-->
      <!--        ></v-text-field>-->
      <!--        <v-btn-->
      <!--            color="primary"-->
      <!--            @click="createRequest">-->
      <!--          درخواست ارزیابی-->
      <!--        </v-btn>-->
      <!--      </template>-->
      <template />
    </v-col>
  </v-tab-item>
</template>

<script>
  import { transformDateToJalali, transformRequestStatus } from '../../plugins/transformData'

  export default {
    name: 'Tab1',
    data () {
      return {
        transformDateToJalali,
        transformRequestStatus,
        tab1Desc: '',
      }
    },
    computed: {
      episode () {
        return this.$store.getters['episode/getEpisode']
      },
      request () {
        return this.$store.getters['request/getRequest']
      },
    },
    mounted () {
      this.$emit('getData')
    },
    methods: {
      createRequest () {
        const data = {
          episode: this.episode._id,
          description: this.tab1Desc,
        }
        this.$store.dispatch('request/createRequest', data).then(() => {
          // this.$store.dispatch('request/fetchRequest', data.data.id)
          this.$emit('getData')
        })
      },
    },
  }
</script>

<style scoped>

</style>
