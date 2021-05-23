<template>
  <v-container>
    <v-tabs
      v-model="tabsMenu"
      class="mt-5"
      color="grey darken-3"
    >
      <v-tab
        href="#rules"
        @click="handleTab1"
      >
        مدیریت رول ها
      </v-tab>
      <v-tab
        href="#generes"
        @click="handleTab2"
      >
        مدیریت ژانرها
      </v-tab>
      <v-tab
        href="#productCategory"
        @click="handleTab3"
      >
        مدیریت دسته بندی محصولات
      </v-tab>
    </v-tabs>
    <v-divider />
    <v-tabs-items v-model="tabsMenu">
      <v-tab-item
        class="mt-5"
        value="rules"
      >
       <div class="d-flex flex-row">
         <v-col cols="4">
           <v-data-table
             :items-per-page="5"
             :headers="headers"
             :items="subjectsRule"
             no-results-text="اطلاعاتی یافت نشد"
           >
           </v-data-table>
         </v-col>
         <v-col cols="4">
           <v-data-table
             :items-per-page="5"
             :headers="headers"
             :items="actionRule"
             no-results-text="اطلاعاتی یافت نشد"
           >
           </v-data-table>
         </v-col>
         <v-col cols="4">
           <v-data-table
             :headers="headers"
             :items="typeRule"
             no-results-text="اطلاعاتی یافت نشد"
           >
           </v-data-table>
         </v-col>
       </div>
      </v-tab-item>
      <v-tab-item
        value="generes"
        class="mt-5"
      >
        <v-data-table
          :headers="listOfCategoryHeader"
          :items="listOfProductCategory"
          no-results-text="اطلاعاتی یافت نشد"
          class="w-100"
        >
        </v-data-table>
      </v-tab-item>
      <v-tab-item
        value="productCategory"
        class="mt-5"
      >
        <v-data-table
          :headers="listOfCategoryHeader"
          :items="listOfProductCategory"
          no-results-text="اطلاعاتی یافت نشد"
          class="w-100"
        >
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        tabsMenu: null,
        headers: [
          { text: 'عنوان' },
        ],
        listOfCategoryHeader: [
          {
            text: 'عنوان فارسی',
            value: 'fa',
          },
          {
            text: 'عنوان انگلیسی',
            value: 'en',
          },
        ],
      }
    },
    computed: {
      subjectsRule () {
        return this.$store.getters['staticData/getSubjectsRule']
      },
      actionRule () {
        return this.$store.getters['staticData/getActionsRule']
      },
      typeRule () {
        return this.$store.getters['staticData/getTypesRule']
      },
      listOfProductCategory () {
        return this.$store.getters['staticData/getProductCategoryData']
      },
    },
    mounted () {
      this.$store.dispatch('staticData/fetchRulesList')
    },
    methods: {
      handleTab1 () {
        this.$store.dispatch('staticData/fetchRulesList')
      },
      handleTab2 () {
        this.$store.dispatch('staticData/fetchAllGeneres')
      },
      handleTab3 () {
        this.$store.dispatch('staticData/fetchListOfCategoryData')
      },
    },
  }
</script>

<style scoped>

</style>
