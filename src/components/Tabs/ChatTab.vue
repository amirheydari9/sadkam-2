<template>
  <v-tab-item class="mt-1" value="chat">
    <v-container>
      <p>Chat</p>
      <!--      <v-form ref="dialogForm">-->
      <!--        <v-row>-->
      <!--          <v-col-->
      <!--              cols="12"-->
      <!--          >-->
      <!--            <v-text-field-->
      <!--                :rules="[-->
      <!--                            required('این فیلد الزامی است'),-->
      <!--                            ]"-->
      <!--                v-model="dialogEditedItem.message"-->
      <!--                label="متن"-->
      <!--            ></v-text-field>-->
      <!--          </v-col>-->
      <!--          <v-col-->
      <!--              cols="12"-->
      <!--              sm="6"-->
      <!--          >-->
      <!--            <v-autocomplete-->
      <!--                v-model="dialogEditedItem.targetFile"-->
      <!--                label="فایل"-->
      <!--                :items="targetFiles"-->
      <!--                item-text="title"-->
      <!--                item-value="id"-->
      <!--                dense-->
      <!--            ></v-autocomplete>-->
      <!--          </v-col>-->
      <!--          <v-btn-->
      <!--              color="primary"-->
      <!--              depressed-->
      <!--              @click="saveDialog"-->
      <!--              class="mr-auto"-->
      <!--          >-->
      <!--            ایجاد پیام-->
      <!--          </v-btn>-->
      <!--        </v-row>-->
      <!--      </v-form>-->
    </v-container>
    <!--    <v-data-table-->
    <!--        :headers="dialogHeaders"-->
    <!--        :items="dialogs"-->
    <!--        :search="dialogSearch"-->
    <!--        no-results-text="اطلاعاتی یافت نشد"-->
    <!--        class="elevation-1 w-100 mt-3"-->
    <!--    >-->
    <!--      <template v-slot:top>-->
    <!--        <v-toolbar-->
    <!--            flat-->
    <!--        >-->
    <!--          <v-text-field-->
    <!--              v-model="dialogSearch"-->
    <!--              label="جست جو"-->
    <!--              single-line-->
    <!--              hide-details-->
    <!--              autofocus-->
    <!--          ></v-text-field>-->
    <!--        </v-toolbar>-->
    <!--      </template>-->
    <!--      <template v-slot:item.submitDate="{ item }">-->
    <!--        {{ transformDateToJalali(item.submitDate) }}-->
    <!--      </template>-->
    <!--    </v-data-table>-->
  </v-tab-item>

</template>

<script>
export default {
  name: "ChatTab",
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
