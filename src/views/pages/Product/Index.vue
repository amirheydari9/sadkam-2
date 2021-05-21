<template>
  <div class="w-100">
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
          <v-btn
              color="primary"
              dark
              @click="createProductItem"
          >
            افزودن محصول جدید
          </v-btn>
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
      <template v-slot:item.active="{ item }">
        <v-simple-checkbox
            v-model="item.active"
            disabled
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            class="mr-2"
            @click="getEpisodesList(item)"
        >
          mdi-tooltip-plus
        </v-icon>
      </template>
    </v-data-table>
    <product-details-dialog
        v-if="showProductDetailsDialog"
        :showDialog="showProductDetailsDialog"
        :isCreate="isCreate"
        @closeDialog="closeProductDetailsDialog"
        @handleSave="handleProductDetailsSave"
    />
    <dialog-list-episode
        v-if="showEpisodesListDialog"
        :showDialog="showEpisodesListDialog"
        @closeDialog="closeEpisodeListDialog"
    />
  </div>
</template>

<script>
import {entryType} from '../../../plugins/constant'
import {
  transformEntryType,
  transformTitleType,
  transformDateToJalali,
} from '../../../plugins/transformData'
import ProductDetailsDialog from "./ProductDetailsDialog";
import DialogListEpisode from "../Episode/DialogListEpisode";

export default {
  components: {
    DialogListEpisode,
    ProductDetailsDialog,
  },
  name: "Index",
  data: () => ({
    showProductDetailsDialog: false,
    isCreate: true,
    showEpisodesListDialog: false,
    search: '',
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
    editedIndex: -1,
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
        text: 'مدیریت محصولات',
        disabled: true,
        exact: true
      },
    ],
    entryType,
    transformEntryType,
    transformTitleType,
    transformDateToJalali,
  }),
  mounted() {
    this.$store.dispatch('organization/fetchOrganizations')
    this.$store.dispatch('product/fetchAllProducts')
    this.$store.commit('SET_BREADCRUMBS', this.breadcrumbs)
  },
  computed: {
    products: {
      get() {
        return this.$store.getters['product/getProducts']
      },
      set(value) {
        return this.$store.commit('product/SET_PRODUCTS', value)
      }
    },
  },
  beforeDestroy() {
    return this.$store.commit('product/SET_PRODUCTS', [])
  },
  methods: {
    async editItem(item) {
      this.editedIndex = this.products.indexOf(item)
      await this.$store.dispatch('product/getProduct', item._id)
      this.isCreate = false
      this.showProductDetailsDialog = true
    },
    async createProductItem() {
      await this.$store.commit('product/SET_PRODUCT', {...this.defaultItem})
      this.isCreate = true
      this.showProductDetailsDialog = true
      this.editedIndex = -1
    },
    async handleProductDetailsSave(product) {
      if (this.editedIndex > -1) {
        await this.$store.dispatch('product/updateProduct', product)
        Object.assign(this.products[this.editedIndex], product)
        this.editedIndex = -1
      } else {
        await this.$store.dispatch('product/createProduct', product)
        await this.$store.dispatch('product/fetchAllProducts')
      }
    },
    closeProductDetailsDialog() {
      this.showProductDetailsDialog = false
    },

    async getEpisodesList(item) {
      if (item.entryType === 'multiple') {
        await this.$store.dispatch('episode/fetchAllEpisodes', item._id)
        await this.$store.commit('episode/SET_PARENT_ID', item._id)
        this.showEpisodesListDialog = true
      } else {
        await this.$store.commit('episode/SET_PARENT_ID', null)
        this.$toast.info('امکلن تعریف اپیزود برای این محصول امکان پدیر نیست')
      }
    },
    closeEpisodeListDialog() {
      this.showEpisodesListDialog = false
    },
  },
}
</script>

<style scoped>

</style>
