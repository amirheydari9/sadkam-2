<template>
  <div>
    <v-btn
      color="primary"
      class="mr-3"
      @click="addProduct"
    >
      افزودن محتوا
    </v-btn>
    <product-details-dialog
      v-if="productDialog"
      :show-dialog="productDialog"
      :is-create="true"
      @closeDialog="closeProductDetailsDialog"
      @handleSave="handleProductDetailsSave"
    />
  </div>
</template>

<script>
  import ProductDetailsDialog from '../Product/ProductDetailsDialog'

  export default {
    name: 'AddProductBtn',
    components: {
      ProductDetailsDialog,
    },
    data () {
      return {
        productDialog: false,
        defaultItem: {
          enTitle: '',
          faTitle: '',
          directors: [],
          language: [],
          duration: '',
          genres: [],
          startYear: '',
          endYear: '',
          writers: [],
          actors: [],
          imdbId: '',
          episodeCountType: '',
          category: '',
          rate: '',
          description: '',
        },
      }
    },
    methods: {
      async addProduct () {
        await this.$store.commit('product/SET_PRODUCT', { ...this.defaultItem })
        this.productDialog = true
      },
      async handleProductDetailsSave (product) {
        await this.$store.dispatch('product/createProduct', product)
        const { data } = await this.$store.dispatch('product/searchProduct', product.enTitle)
        await this.$store.commit('product/SET_PRODUCTS', data.data)
      },
      closeProductDetailsDialog () {
        this.productDialog = false
      },
    },
  }
</script>

<style scoped>

</style>
