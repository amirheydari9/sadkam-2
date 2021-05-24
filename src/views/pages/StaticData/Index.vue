<template>
  <v-container>
    <breadcrumbs :items="breadcrumbs" />
    <v-tabs
      v-model="tabsMenu"
      class="mt-5"
      color="primary"
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
          <v-col
            cols="4"
          >
            <base-material-card
              color="primary"
              class="pa-0"
            >
              <template v-slot:heading>
                <div class="font-weight-light">
                  مدیریت موضوعات
                </div>
              </template>
              <v-card-text>
                <v-data-table
                  :items-per-page="5"
                  :headers="headers"
                  :items="subjectsRule"
                  no-results-text="اطلاعاتی یافت نشد"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editRule(item,'subject')"
                    >
                      mdi-pencil
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card-text>
            </base-material-card>
          </v-col>
          <v-col
            cols="4"
          >
            <base-material-card
              color="primary"
              class="pa-0"
            >
              <template v-slot:heading>
                <div class="font-weight-light">
                  مدیریت اکشن ها
                </div>
              </template>
              <v-card-text>
                <v-data-table
                  :items-per-page="5"
                  :headers="headers"
                  :items="actionRule"
                  no-results-text="اطلاعاتی یافت نشد"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editRule(item,'action')"
                    >
                      mdi-pencil
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card-text>
            </base-material-card>
          </v-col>
          <v-col
            cols="4"
          >
            <base-material-card
              color="primary"
              class="pa-0"
            >
              <template v-slot:heading>
                <div class="font-weight-light">
                  مدیریت نوع
                </div>
              </template>
              <v-card-text>
                <v-data-table
                  :items-per-page="5"
                  :headers="headers"
                  :items="typeRule"
                  no-results-text="اطلاعاتی یافت نشد"
                >
                  <template v-slot:item.actions="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editRule(item,'type')"
                    >
                      mdi-pencil
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card-text>
            </base-material-card>
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
    <rule
      v-if="showRuleDialog"
      :show-dialog="showRuleDialog"
      :rule="rule"
      @handleSave="handleRuleSave"
      @closeDialog="closeRule"
    />
    <genere
      v-if="showGenereDialog"
      :show-dialog="showGenereDialog"
      :genere="genere"
      @handleSave="handleSaveGenere"
      @closeDialog="closeGenere"
    />
    <product-category
      v-if="showProductCategoryDialog"
      :show-dialog="showProductCategoryDialog"
      :product-category="productCategory"
      @handleSave="handleSaveProductCategory"
      @closeDialog="closeProductCategory"
    />
  </v-container>
</template>

<script>
  import Genere from './genere'
  import Breadcrumbs from '../../../components/Breadcrumbs'
  import ProductCategory from './productCategory'
  import rule from './rule'

  export default {
    name: 'Index',
    components: {
      ProductCategory,
      Genere,
      Breadcrumbs,
      rule,
    },
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
          {
            text: 'عنوان',
            value: 'fa',
          },
          {
            text: 'عملیات',
            value: 'actions',
            sortable: false,
          },
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
        showRuleDialog: false,
        rule: null,
        ruleType: null,
        ruleIndex: -1,
        showGenereDialog: false,
        genere: null,
        genereIndex: -1,
        showProductCategoryDialog: false,
        productCategory: null,
        productCategoryIndex: -1,
      }
    },
    computed: {
      subjectsRule () {
        return this.$store.getters['staticData/getSubjectRuleForStaticData']
      },
      actionRule () {
        return this.$store.getters['staticData/getActionRuleForStaticData']
      },
      typeRule () {
        return this.$store.getters['staticData/getTypeRuleForStaticData']
      },
      generes: {
        get () {
          return this.$store.getters['staticData/getGeneres']
        },
        set (value) {
          return this.$store.commit('staticData/SET_GENERES', value)
        },
      },
      listOfProductCategory: {
        get () {
          return this.$store.getters['staticData/getProductCategoryData']
        },
        set (value) {
          return this.$store.commit('staticData/SET_PRODUCT_CATEGORY_DATA', value)
        },
      },
    },
    mounted () {
      this.$store.dispatch('staticData/fetchRulesList')
      this.$store.dispatch('staticData/fetchAllGeneres')
      this.$store.dispatch('staticData/fetchListOfCategoryData')
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
      editRule (item, ruleType) {
        this.rule = { ...item }
        this.ruleType = ruleType
        switch (ruleType) {
          case 'subject':
            this.ruleIndex = this.subjectsRule.indexOf(item)
            break
          case 'action':
            this.ruleIndex = this.actionRule.indexOf(item)
            break
          case 'type':
            this.ruleIndex = this.typeRule.indexOf(item)
            break
        }
        this.showRuleDialog = true
      },
      closeRule () {
        this.rule = null
        this.ruleType = null
        this.ruleIndex = -1
        this.showRuleDialog = false
      },
      async handleRuleSave (rule) {
        const data = {
          subjects: this.subjectsRule,
          actions: this.actionRule,
          type: this.typeRule,
        }
        switch (this.ruleType) {
          case 'subject':
            Object.assign(this.subjectsRule[this.ruleIndex], rule)
            break
          case 'action':
            Object.assign(this.actionRule[this.ruleIndex], rule)
            break
          case 'type':
            Object.assign(this.typeRule[this.ruleIndex], rule)
            break
        }
        const finalData = {
          subjects: [],
          actions: [],
          type: [],
        }
        data.subjects.forEach(item => finalData.subjects.push(item.fa))
        data.actions.forEach(item => finalData.actions.push(item.fa))
        data.type.forEach(item => finalData.type.push(item.fa))
        await this.$store.dispatch('staticData/updateRulesData', finalData)
        await this.$store.dispatch('staticData/fetchRulesList')
        this.rule = null
        this.ruleType = null
        this.ruleIndex = -1
        this.$toast.success('عملیات با موفقیت انجام شد')
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
        this.$toast.success('عملیات با موفقیت انجام شد')
      },
      editProductCategory (item) {
        this.productCategory = { ...item }
        this.productCategoryIndex = this.listOfProductCategory.indexOf(item)
        this.showProductCategoryDialog = true
      },
      closeProductCategory () {
        this.productCategory = null
        this.productCategoryIndex = -1
        this.showProductCategoryDialog = false
      },
      async handleSaveProductCategory (productCategory) {
        Object.assign(this.listOfProductCategory[this.productCategoryIndex], productCategory)
        await this.$store.dispatch('staticData/updateProductCategoryData', this.listOfProductCategory)
        await this.$store.dispatch('staticData/fetchListOfCategoryData')
        this.productCategory = null
        this.productCategoryIndex = -1
        this.$toast.success('عملیات با موفقیت انجام شد')
      },
    },
  }
</script>

<style scoped>

</style>
