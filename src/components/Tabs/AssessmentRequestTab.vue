<template>
  <v-tab-item class="mt-1" value="file">
    <v-container>
      <p>TabFile</p>
      <!--      <v-form v-if="canUploadFile" ref="fileForm">-->
      <!--        <v-row>-->
      <!--          <v-col-->
      <!--              cols="12"-->
      <!--              sm="6"-->
      <!--          >-->
      <!--            <v-text-field-->
      <!--                :rules="[-->
      <!--                            required('این فیلد الزامی است'),-->
      <!--                            ]"-->
      <!--                v-model="fileEditedItem.fileUrl"-->
      <!--                label="آدرس فایل"-->
      <!--            ></v-text-field>-->
      <!--          </v-col>-->
      <!--          <v-col-->
      <!--              cols="12"-->
      <!--              sm="6"-->
      <!--          >-->
      <!--            <v-text-field-->
      <!--                :rules="[-->
      <!--                            required('این فیلد الزامی است'),-->
      <!--                            ]"-->
      <!--                v-model="fileEditedItem.accessKey"-->
      <!--                label="accessKey"-->
      <!--            ></v-text-field>-->
      <!--          </v-col>-->
      <!--          <v-col-->
      <!--              cols="12"-->
      <!--              sm="6"-->
      <!--          >-->
      <!--            <v-text-field-->
      <!--                :rules="[-->
      <!--                            required('این فیلد الزامی است'),-->
      <!--                            ]"-->
      <!--                v-model="fileEditedItem.secretKey"-->
      <!--                label="secretKey"-->
      <!--            ></v-text-field>-->
      <!--          </v-col>-->
      <!--          <v-col-->
      <!--              cols="12"-->
      <!--              sm="6"-->
      <!--          >-->
      <!--            <v-text-field-->
      <!--                v-model="fileEditedItem.desc"-->
      <!--                label="توضیحات"-->
      <!--            ></v-text-field>-->
      <!--          </v-col>-->
      <!--          <v-btn-->
      <!--              color="primary"-->
      <!--              depressed-->
      <!--              @click="saveFile"-->
      <!--              class="mr-auto"-->
      <!--          >-->
      <!--            ارسال فایل-->
      <!--          </v-btn>-->
      <!--        </v-row>-->
      <!--      </v-form>-->
    </v-container>
    <v-data-table
        :headers="fileHeaders"
        :items="files"
        :search="fileSearch"
        no-results-text="اطلاعاتی یافت نشد"
        class="elevation-1 w-100 mt-3"
    >
      <template v-slot:top>
        <v-toolbar
            flat
        >
          <v-text-field
              v-model="fileSearch"
              label="جست جو"
              single-line
              hide-details
              autofocus
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.submitDate="{ item }">
        {{ transformDateToJalali(item.submitDate) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            @click="handleFileRule(item)"
        >
          mdi-pen
        </v-icon>
        <!--                  <v-btn-->
        <!--                      small-->
        <!--                      download-->
        <!--                      :href="item.fileUrl"-->
        <!--                      class="ma-2"-->
        <!--                      outlined-->
        <!--                      text-->
        <!--                  >-->
        <!--                    <v-icon-->
        <!--                        small-->
        <!--                    >-->
        <!--                      mdi-cloud-->
        <!--                    </v-icon>-->
        <!--                  </v-btn>-->
      </template>
    </v-data-table>
  </v-tab-item>
</template>

<script>
export default {
  name: "AssessmentTab",
  computed: {
    assessmentRequest() {
      return this.$store.getters['assessmentRequest/getAssessmentRequest']
    }
  },
  mounted() {
    this.$emit('getData')
  },
  methods: {
    // createAssessmentRequest() {
    //   this.$store.dispatch('assessmentRequest/createAssessmentRequest', this.episode._id).then(({data}) => {
    //     this.$store.dispatch('assessmentRequest/fetchAssessmentRequest', data.data.id)
    //   })
    // }
  }

}
</script>

<style scoped>

</style>
