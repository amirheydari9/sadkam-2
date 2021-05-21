<template>
  <div class="w-100 d-flex flex-column justify-start">
    <v-col cols="12" sm="4">
      <v-autocomplete
          :items="filteredProducts"
          :loading="isLoading"
          :search-input.sync="productSearch"
          @change="findEpisodes"
          item-text="enTitle"
          item-value="_id"
          label="جستجو در محصولات"
          return-object
          outlined
      ></v-autocomplete>
    </v-col>
    <episode-table v-if="productIsAvailable" class="w-100"/>
  </div>
</template>

<script>
import {
  transformOrganization,
  transformDateToJalali,
} from "../../../plugins/transformData";

import EpisodeTable from "./EpisodeTable";

export default {
  name: "Index",
  components: {
    EpisodeTable,
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
      description: ''
    },
    breadcrumbs: [
      {
        text: 'داشبورد',
        disabled: false,
        to: {name: 'Panel'},
        exact: true
      },
      {
        text: 'مدیریت اپیزودها',
        disabled: true,
        exact: true
      },
    ],
    transformOrganization,
    transformDateToJalali
  }),
  mounted() {
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  beforeDestroy() {
    this.$store.commit('episode/SET_EPISODES', [])
    this.$store.commit('episode/SET_PARENT_ID', null)
  },
  watch: {
    productSearch(value) {
      if (this.$store.getters['episode/getEpisodes'].length > 0 || (!value || value.trim().length <= 0)) {
        this.$store.commit('episode/SET_EPISODES', [])
        this.$store.commit('episode/SET_PARENT_ID', null)
        this.productIsAvailable = false
      }
      if (this.isLoading) return;
      this.isLoading = true;
      this.$store.dispatch('product/searchProduct', value).then(({data}) => {
        if (data.data && data.data.length) {
          const result = data.data.filter(item => item.entryType === 'multiple');
          // if (result.length > 0) {
          //   result.forEach(item => {
          //     console.log(item)
          //     item.compositionName = `${item.enTitle}/${item.faTitle}/${transformTitleType(item.titleType)}`
          //   })
          //   this.filteredProducts = result
          // }
          this.filteredProducts = result
        }
      }).finally(() => this.isLoading = false)
    },
  },
  methods: {
    findEpisodes(event) {
      this.productIsAvailable = true
      this.$store.dispatch('episode/fetchAllEpisodes', event._id)
      this.$store.commit('episode/SET_PARENT_ID', event._id)
    },
  },
}
</script>

<style>

</style>
