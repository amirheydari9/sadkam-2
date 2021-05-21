<template>
  <div class="w-100 d-flex flex-column justify-start">
    <v-col cols="12" sm="5" class="d-flex flex-row justify-end">
      <v-text-field
          v-model="productSearch"
          label="جستجو در محصولات"
          :loading="isLoading"
          outlined
      ></v-text-field>
      <add-product-btn/>
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
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.entryType="{ item }">
        {{ transformEntryType(item.entryType) }}
      </template>
      <template v-slot:item.titleType="{ item }">
        {{ transformTitleType(item.titleType) }}
      </template>
      <template v-slot:item.lastUpdate="{ item }">
        {{ transformDateToJalali(item.lastUpdate) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="goToAssessmentTabsOrSeeEpisodes(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
    <dialog-list-episode
        v-if="showEpisodesListDialog"
        :showDialog="showEpisodesListDialog"
        @closeDialog="closeEpisodeListDialog"
    />
    <TabsWrapper
        v-if="showTabs"
        :showDialog="showTabs"
        @closeDialog="closeTabsDialog"
    />
  </div>
</template>
<script>
import {
  transformDateToJalali,
  transformTitleType,
  transformEntryType
} from "../../../plugins/transformData";
import AddProductBtn from "./AddProductBtn";
import DialogListEpisode from "../Episode/DialogListEpisode";
import TabsWrapper from "../../../components/Tabs/TabsWrapper";

export default {
  name: "Index",
  components: {
    AddProductBtn,
    DialogListEpisode,
    TabsWrapper
  },
  data: () => ({
    isLoading: false,
    productSearch: null,
    filteredProducts: [],
    headers: [
      {text: 'نام انگلسیی', value: 'enTitle',},
      {text: 'نام فارسی', value: 'faTitle'},
      {text: 'زمان شروع', value: 'startYear'},
      {text: 'زمان پایان', value: 'endYear'},
      {text: 'آی دی imdb', value: 'imdbId'},
      {text: 'نوع ورودی', value: 'entryType'},
      {text: 'عنوان ورودی', value: 'titleType'},
      {text: 'آخرین ویرایش', value: 'lastUpdate'},
      {text: 'عملیات', value: 'actions', sortable: false},
    ],
    search: '',
    defaultItem: {
      enTitle: '',
      faTitle: '',
      directors: [],
      language: [],
      duration: '',
      genres: [],
      startYear: [],
      endYear: [],
      writers: [],
      actors: [],
      submittedBy: '',
      imdbId: '',
      entryType: '',
      titleType: '',
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
    transformDateToJalali,
    transformTitleType,
    transformEntryType,
    showEpisodesListDialog: false,
    showTabs: false
  }),
  mounted() {
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  computed: {
    products: {
      get() {
        return this.$store.getters['product/getProducts']
      },
      set() {
        return this.$store.commit('product/SET_PRODUCTS', [])
      }
    }
  },
  beforeDestroy() {
    this.$store.commit('product/SET_PRODUCTS', [])
  },
  watch: {
    productSearch(value) {
      if (this.filteredProducts.length > 0 || (!value || value.trim().length <= 0)) {
        this.$store.commit('product/SET_PRODUCTS', [])
      }
      if (this.isLoading) return;
      this.isLoading = true;
      this.$store.dispatch('product/searchProduct', value).then(({data}) => {
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
  methods: {
    async goToAssessmentTabsOrSeeEpisodes(item) {
      if (item.entryType === 'single') {
        this.$store.commit('episode/SET_EPISODE', item)
        this.showTabs = true
      } else {
        await this.$store.dispatch('episode/fetchAllEpisodes', item._id)
        await this.$store.commit('episode/SET_PARENT_ID', item._id)
        this.showEpisodesListDialog = true
      }
    },
    async closeEpisodeListDialog() {
      await this.$store.commit('episode/SET_EPISODES', [])
      await this.$store.commit('episode/SET_PARENT_ID', null)
      this.showEpisodesListDialog = false
    },
    closeTabsDialog() {
      this.showTabs = false
      this.$store.commit('episode/SET_EPISODE', null)
    }
  }
}
</script>

<style scoped>

</style>

