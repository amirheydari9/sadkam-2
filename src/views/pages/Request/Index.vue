<template>
  <v-container>
    <div class="w-100 d-flex flex-column justify-start">
      <breadcrumbs :items="breadcrumbs"/>
      <v-col
        cols="12"
        sm="5"
        class="d-flex flex-row justify-end"
      >
        <v-text-field
          v-model="productSearch"
          label="جستجو در محصولات"
          :loading="isLoading"
          outlined
        />
        <add-product-btn />
      </v-col>
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        no-results-text="اطلاعاتی یافت نشد"
        class="elevation-1 w-100"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-text-field
              v-model="search"
              label="جست جو"
              single-line
              hide-details
              autofocus
            />
            <v-spacer />
          </v-toolbar>
        </template>
        <template v-slot:item.episodeCountType="{ item }">
          {{ transformEntryType(item.episodeCountType) }}
        </template>
        <template v-slot:item.category="{ item }">
          {{ transformTitleType(item.category) }}
        </template>
<!--        <template v-slot:item.lastUpdate="{ item }">-->
<!--          {{ transformDateToJalali(item.lastUpdate) }}-->
<!--        </template>-->
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="goToTabsOrSeeEpisodes(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
      <dialog-list-episode
        v-if="showEpisodesListDialog"
        :show-dialog="showEpisodesListDialog"
        @closeDialog="closeEpisodeListDialog"
      />
      <tabs-wrapper
        v-if="showTabs"
        :show-dialog="showTabs"
        @closeDialog="closeTabsDialog"
      />
    </div>
  </v-container>
</template>
<script>
  import {
    transformDateToJalali,
    transformTitleType,
    transformEntryType,
  } from '../../../plugins/transformData'
  import AddProductBtn from './AddProductBtn'
  import DialogListEpisode from '../Episode/DialogListEpisode'
  import TabsWrapper from '../../../components/Tabs/TabsWrapper'
  import Breadcrumbs from '../../../components/Breadcrumbs'

  export default {
    name: 'Index',
    components: {
      AddProductBtn,
      DialogListEpisode,
      TabsWrapper,
      Breadcrumbs
    },
    data: () => ({
      isLoading: false,
      productSearch: null,
      filteredProducts: [],
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
          text: 'زمان شروع',
          value: 'startYear',
        },
        {
          text: 'آی دی imdb',
          value: 'imdbId',
        },
        {
          text: 'نوع ورودی',
          value: 'episodeCountType',
        },
        {
          text: 'عنوان ورودی',
          value: 'category',
        },
        {
          text: 'عملیات',
          value: 'actions',
          sortable: false,
        },
      ],
      search: '',
      breadcrumbs: [
        {
          text: 'داشبورد',
          disabled: false,
          to: { name: 'Panel' },
          exact: true,
        },
        {
          text: 'درخواست ارزیابی',
          disabled: true,
          exact: true,
        },
      ],
      transformDateToJalali,
      transformTitleType,
      transformEntryType,
      showEpisodesListDialog: false,
      showTabs: false,
    }),
    computed: {
      products: {
        get () {
          return this.$store.getters['product/getProducts']
        },
        set () {
          return this.$store.commit('product/SET_PRODUCTS', [])
        },
      },
    },
    watch: {
      productSearch (value) {
        if (this.filteredProducts.length > 0 || (!value || value.trim().length <= 0)) {
          this.$store.commit('product/SET_PRODUCTS', [])
          return false
        }
        if (this.isLoading) return
        this.isLoading = true
        this.$store.dispatch('product/searchProduct', value).then(({ data }) => {
          if (data.data && data.data.length) {
            console.log(data.data)
            const result = data.data
            // if (result.length > 0) {
            //   result.forEach(item => {
            //     console.log(item)
            //     item.compositionName = `${item.enTitle}/${item.faTitle}/${transformTitleType(item.titleType)}`
            //   })
            //   this.filteredProducts = result
            // }
            this.$store.commit('product/SET_PRODUCTS', result)
          }
        }).finally(() => this.isLoading = false)
      },
    },
    mounted () {
      this.$store.dispatch('staticData/fetchListOfCategoryData')
      this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
    },
    beforeDestroy () {
      this.$store.commit('product/SET_PRODUCTS', [])
    },
    methods: {
      async goToTabsOrSeeEpisodes (item) {
        if (item.episodeCountType === 'single') {
          this.$store.commit('episode/SET_EPISODE', item)
          this.showTabs = true
        } else {
          await this.$store.dispatch('episode/fetchAllEpisodes', {
            productId: item._id,
            page: 1,
            size: 5,
          })
          await this.$store.commit('episode/SET_PARENT_ID', item._id)
          this.showEpisodesListDialog = true
        }
      },
      async closeEpisodeListDialog () {
        await this.$store.commit('episode/SET_EPISODES', [])
        await this.$store.commit('episode/SET_PARENT_ID', null)
        this.showEpisodesListDialog = false
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
