<template>
  <v-container>
    <breadcrumbs :items="breadcrumbs"/>
    <v-tabs
      v-model="tabsMenu"
      class="mt-5"
      color="grey darken-3"
    >
      <v-tab
        href="#inProgress"
        @click="fetchInProgress = true"
      >
        در حال انجام
      </v-tab>
      <v-tab
        href="#finished"
        @click="fetchFinished=true"
      >
        خاتمه یافته
      </v-tab>
    </v-tabs>

    <v-divider/>

    <v-tabs-items v-model="tabsMenu">

      <InProgress
        :getData="fetchInProgress"
        @loaded="fetchInProgress = false"
      />
      <Finished
        :getData="fetchFinished"
        @loaded="fetchFinished = false"
      />

    </v-tabs-items>

  </v-container>

</template>

<script>
  import InProgress from '@/views/pages/RequestProgress/InProgress'
  import Finished from '@/views/pages/RequestProgress/Finished'
  import Breadcrumbs from '@/components/Breadcrumbs'

  export default {
    name: 'Index',
    components: {
      Breadcrumbs,
      Finished,
      InProgress,
    },
    data () {
      return {
        tabsMenu: null,
        fetchInProgress: false,
        fetchFinished: false,
        currentItem: null,
        currentTab: null,
        page: null,
        size: null,
        breadcrumbs: [
          {
            text: 'داشبورد',
            disabled: false,
            to: { name: 'Panel' },
            exact: true,
          },
          {
            text: 'پیشرفت درخواست ارزیابی',
            disabled: true,
            exact: true,
          },
        ],
      }
    },
    beforeDestroy () {
      this.$store.commit('request/SET_LIST_IN_PROGRESS', [])
      this.$store.commit('request/SET_LIST_FINISHED', [])
    },
  }
</script>

<style scoped>

</style>
