<template>
  <div class="w-100">
    <v-data-table
      :page="page"
      :pageCount="numberOfPages"
      :options.sync="options"
      :server-items-length="totalEpisodes"
      :loading="loading"
      :headers="headers"
      :items="episodes"
      no-results-text="اطلاعاتی یافت نشد"
      class="elevation-1 w-100"
      :items-per-page="5"
      :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-spacer/>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="createItem"
          >
            افزودن اپیزود جدید
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.submittedBy="{ item }">
        {{ transformOrganization(item.submittedBy) }}
      </template>
      <template v-slot:item.releaseDate="{ item }">
        {{ transformDateToJalali(item.releaseDate) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>ویرایش اپیزود</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              v-on="on"
              small
              class="mr-2"
              @click="goToAssessment(item)"
            >
              mdi-eye
            </v-icon>
          </template>
          <span>مدیریت درخواست</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <episode-details-dialog
      v-if="showDialog"
      :show-dialog="showDialog"
      :is-create="isCreate"
      @closeDialog="closeDialog"
      @handleSave="handleSave"
    />
    <tabs-wrapper
      v-if="showTabs"
      :show-dialog="showTabs"
      @closeDialog="closeTabsDialog"
    />
  </div>
</template>

<script>
  import EpisodeDetailsDialog from './EpisodeDetailsDialog'
  import {
    transformOrganization,
    transformDateToJalali,
    transformJalaliDateToGeorgian,
  } from '../../../plugins/transformData'
  import TabsWrapper from '../../../components/Tabs/TabsWrapper'

  export default {
    name: 'EpisodeTable',
    components: {
      TabsWrapper,
      EpisodeDetailsDialog,
    },
    data () {
      return {
        page: 1,
        totalEpisodes: 0,
        numberOfPages: 0,
        loading: true,
        options: {},
        showDialog: false,
        isCreate: true,
        search: '',
        showAssessmentIcon: false,
        showTabs: false,
        headers: [
          {
            text: 'نام انگلسیی',
            value: 'enTitle',
          },
          {
            text: 'نام فارسی',
            value: 'faTitle',
          },
          {
            text: 'شماره فصل',
            value: 'seasonNumber',
          },
          {
            text: 'شماره قسمت',
            value: 'episodeNumber',
          },
          {
            text: 'زمان',
            value: 'duration',
          },
          {
            text: 'امتیاز',
            value: 'rate',
          },
          {
            text: 'تاریخ انتشار',
            value: 'releaseDate',
          },
          {
            text: 'عملیات',
            value: 'actions',
            sortable: false,
          },
        ],
        transformOrganization,
        transformDateToJalali,
        transformJalaliDateToGeorgian,
      }
    },
    computed: {
      episodes: {
        get () {
          return this.$store.getters['episode/getEpisodes']
        },
        set (value) {
          return this.$store.commit('episode/SET_EPISODES', value)
        },
      },
    },
    watch: {
      options: {
        handler () {
          this.readDataFromAPI()
        },
      },
      deep: true,
    },
    methods: {
      async readDataFromAPI () {
        this.loading = true
        const {
          page,
          itemsPerPage,
        } = this.options
        let data = await this.$store.dispatch('episode/fetchAllEpisodes', {
          productId: this.$store.getters['episode/getParentId'],
          page: page,
          size: itemsPerPage,
        })
        this.loading = false
        this.episodes = data.data.items
        this.totalEpisodes = data.data.paginator.itemCount
        this.numberOfPages = data.data.paginator.totalPages
      },
      async editItem (item) {
        this.editedIndex = this.episodes.indexOf(item)
        await this.$store.dispatch('episode/getEpisode', item._id)
        this.isCreate = false
        this.showDialog = true
      },
      async createItem () {
        await this.$store.commit('episode/SET_EPISODE', { ...this.defaultItem })
        this.isCreate = true
        this.showDialog = true
        this.editedIndex = -1
      },
      async handleSave (episode) {
        if (this.editedIndex > -1) {
          await this.$store.dispatch('episode/updateEpisode', episode)
          Object.assign(this.episodes[this.editedIndex], episode)
          this.editedIndex = -1
        } else {
          await this.$store.dispatch('episode/createEpisode', episode)
          await this.readDataFromAPI()
        }
      },
      closeDialog () {
        this.showDialog = false
      },
      goToAssessment (item) {
        this.showTabs = true
        this.$store.commit('episode/SET_EPISODE', item)
      },
      closeTabsDialog () {
        this.showTabs = false
        this.$store.commit('episode/SET_EPISODE', null)
      },
    },
  }
</script>

<style scoped>

</style>
