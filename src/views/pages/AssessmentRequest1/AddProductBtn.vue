<template>
  <div>
    <v-btn
        color="primary"
        @click="addProduct"
        class="mr-3"
    >
      افزودن محصول
    </v-btn>
    <product-details-dialog
        v-if="productDialog"
        :showDialog="productDialog"
        :isCreate="true"
        @closeDialog="closeProductDetailsDialog"
        @handleSave="handleProductDetailsSave"
    />
  </div>
</template>

<script>
import ProductDetailsDialog from "../Product/ProductDetailsDialog";

export default {
  name: "AddProductBtn",
  components: {
    ProductDetailsDialog,
  },
  data() {
    return {
      productDialog: false,
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
    }
  },
  methods: {
    async addProduct() {
      await this.$store.commit('product/SET_PRODUCT', {...this.defaultItem})
      this.productDialog = true
    },
    async handleProductDetailsSave(product) {
      try {
        await this.$store.dispatch('product/createProduct', product)
        const {data} = await this.$store.dispatch('product/searchProduct', product.enTitle)
        await this.$store.commit('product/SET_PRODUCTS', data.data)
        await this.$toast.success('عملیات با موفقیت انجام نشد')
      } catch (e) {
        this.$toast.error('عملیات انجام نشد')
      }
    },
    closeProductDetailsDialog() {
      this.productDialog = false
    }
  }
}
</script>

<style scoped>

</style>
