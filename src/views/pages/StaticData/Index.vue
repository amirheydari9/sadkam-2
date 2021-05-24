<template>
  <v-container>
    <breadcrumbs :items="breadcrumbs" />
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
        href="#generesHeader"
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
            />
          </v-col>
          <v-col cols="4">
            <v-data-table
              :items-per-page="5"
              :headers="headers"
              :items="actionRule"
              no-results-text="اطلاعاتی یافت نشد"
            />
          </v-col>
          <v-col cols="4">
            <v-data-table
              :headers="headers"
              :items="typeRule"
              no-results-text="اطلاعاتی یافت نشد"
            />
          </v-col>
        </div>
      </v-tab-item>
      <v-tab-item
        value="generesHeader"
        class="mt-5"
      >
        <v-data-table
          :items-per-page="5"
          :headers="generesHeader"
          :items="generes"
          no-results-text="اطلاعاتی یافت نشد"
          class="w-100"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editGenere(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
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
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editProductCategory(item)"
            >
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
    <genere
      v-if="showGenereDialog"
      :show-dialog="showGenereDialog"
      :genere="genere"
      @handleSave="handleSaveGenere"
      @closeDialog="closeGenere"
    />
  </v-container>
</template>

<script>
  import Genere from './genere'
  import Breadcrumbs from '../../../components/Breadcrumbs'

  export default {
    name: 'Index',
    components: { Genere, Breadcrumbs },
    data () {
      return {
        breadcrumbs: [
          {
            text: 'داشبورد',
            disabled: false,
            to: { name: 'Panel' },
            exact: true,
          },
          {
            text: 'مدیریت اطلاعات پایه',
            disabled: true,
            exact: true,
          },
        ],
        tabsMenu: null,
        headers: [
          { text: 'عنوان' },
        ],
        generesHeader: [
          {
            text: 'عنوان فارسی',
            value: 'fa',
          },
          {
            text: 'عنوان انگلیسی',
            value: 'en',
          },
          {
            text: 'عملیات',
            value: 'actions',
            sortable: false,
          },
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
          {
            text: 'عملیات',
            value: 'actions',
            sortable: false,
          },
        ],
        showGenereDialog: false,
        genere: null,
        genereIndex: -1,
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
      generes: {
        get () {
          return this.$store.getters['staticData/getGeneres']
        },
        set (value) {
          return this.$store.commit('staticData/SET_GENERES', value)
        },
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
      editGenere (item) {
        this.genere = { ...item }
        this.genereIndex = this.generes.indexOf(item)
        this.showGenereDialog = true
      },
      closeGenere () {
        this.genere = null
        this.genereIndex = -1
        this.showGenereDialog = false
      },
      async handleSaveGenere (genere) {
        Object.assign(this.generes[this.genereIndex], genere)
        await this.$store.dispatch('staticData/updateGeneresData', this.generes)
        await this.$store.dispatch('staticData/fetchAllGeneres')
        this.genere = null
        this.genereIndex = -1
      },
    },
  }
</script>

<style scoped>

</style>
