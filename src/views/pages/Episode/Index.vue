<template>
  <v-container>
    <div class="w-100 d-flex flex-column justify-start">
      <breadcrumbs :items="breadcrumbs"/>
      <v-col
        cols="12"
        sm="4"
      >
        <v-autocomplete
          :items="filteredProducts"
          :loading="isLoading"
          :search-input.sync="productSearch"
          item-text="enTitle"
          item-value="_id"
          label="جستجو در محصولات"
          return-object
          outlined
          @change="findEpisodes"
        />
      </v-col>
      <episode-table
        v-if="productIsAvailable"
        class="w-100"
      />
    </div>
  </v-container>
</template>

<script>
  import {
    transformOrganization,
    transformDateToJalali,
  } from '../../../plugins/transformData'

  import EpisodeTable from './EpisodeTable'
  import Breadcrumbs from '../../../components/Breadcrumbs'

  export default {
    name: 'Index',
    components: {
      EpisodeTable,
      Breadcrumbs,
    },
    data: () => ({
      isLoading: false,
      productSearch: null,
      filteredProducts: [],
      productIsAvailable: false,
      defaultItem: {
        enTitle: '',
        faTitle: '',
        duration: '',
        releaseDate: '',
        submittedBy: '',
        parent: '',
        seasonNumber: '',
        episodeNumber: '',
        rate: '',
        description: '',
      },
      breadcrumbs: [
        {
          text: 'داشبورد',
          disabled: false,
          to: { name: 'Panel' },
          exact: true,
        },
        {
          text: 'مدیریت اپیزودها',
          disabled: true,
          exact: true,
        },
      ],
      transformOrganization,
      transformDateToJalali,
    }),
    watch: {
      productSearch (value) {
        if (this.$store.getters['episode/getEpisodes'].length > 0 || (!value || value.trim().length <= 0)) {
          this.$store.commit('episode/SET_EPISODES', [])
          this.$store.commit('episode/SET_PARENT_ID', null)
          this.productIsAvailable = false
          return false
        }
        if (this.isLoading) return
        this.isLoading = true
        this.$store.dispatch('product/searchProduct', value).then(({ data }) => {
          if (data.data && data.data.length) {
            const result = data.data.filter(item => item.episodeCountType === 'multiple')
            // if (result.length > 0) {
            //   result.forEach(item => {
            //     console.log(item)
            //     item.compositionName = `${item.enTitle}/${item.faTitle}/${transformTitleType(item.titleType)}`
            //   })
            //   this.filteredProducts = result
            // }
            this.filteredProducts = result
          }
          // eslint-disable-next-line no-return-assign
        }).finally(() => this.isLoading = false)
      },
    },
    mounted () {
      this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
    },
    beforeDestroy () {
      this.$store.commit('episode/SET_EPISODES', [])
      this.$store.commit('episode/SET_PARENT_ID', null)
    },
    methods: {
      findEpisodes (event) {
        this.productIsAvailable = true
        this.$store.dispatch('episode/fetchAllEpisodes', {
          productId: event._id,
          page: 1,
          size: 5,
        })
        this.$store.commit('episode/SET_PARENT_ID', event._id)
      },
    },
  }
</script>

<style>

</style>
