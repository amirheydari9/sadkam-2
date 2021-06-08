<template>
  <v-dialog
    v-model="show"
    persistent
  >
    <v-card>
      <v-card-title>
        <dialog-headline :title="'لیست اپیزود ها'" />
      </v-card-title>
      <v-card-text>
        <episode-table />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
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
  import EpisodeTable from './EpisodeTable'
  import DialogHeadline from '../../../components/DialogHeadline'

  export default {
    name: 'DialogListEpisode',
    components: { DialogHeadline, EpisodeTable},
    props: {
      showDialog: { Boolean, isRequired: true },
      isAssessmentMode: { Boolean, isRequired: false, default: false },
    },
    computed: {
      show () {
        return this.showDialog
      },
    },
    methods: {
      async close () {
        this.$emit('closeDialog')
        await this.$store.commit('episode/SET_PARENT_ID', null)
      },
    },
  }
</script>

<style scoped>

</style>
