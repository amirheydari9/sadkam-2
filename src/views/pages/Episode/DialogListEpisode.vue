<template>
  <v-dialog v-model="show" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">لیست اپیزود ها</span>
      </v-card-title>
      <v-card-text>
        <EpisodeTable/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="close"
        >
          بستن
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EpisodeTable from "./EpisodeTable";

export default {
  name: "DialogListEpisode",
  props: {
    showDialog: {Boolean, isRequired: true},
    isAssessmentMode: {Boolean, isRequired: false, default: false},
  },
  components: {EpisodeTable},
  computed: {
    show() {
      return this.showDialog
    },
  },
  methods: {
    async close() {
      this.$emit('closeDialog')
      await this.$store.commit('episode/SET_PARENT_ID', null)
    }
  }
}
</script>

<style scoped>

</style>
