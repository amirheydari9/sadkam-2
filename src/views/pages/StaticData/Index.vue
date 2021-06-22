<template>
  <v-container>
    <breadcrumbs :items="breadcrumbs"/>
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
        مدیریت دسته بندی محتوا
      </v-tab>
    </v-tabs>
    <v-divider/>
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
                  :search="searchSubject"
                  :headers="headers"
                  :items="subjectsRule"
                  no-results-text="اطلاعاتی یافت نشد"
                  :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
                >
                  <template v-slot:top>
                    <v-toolbar
                      flat
                    >
                      <v-text-field
                        v-model="searchSubject"
                        label="جست جو"
                        single-line
                        hide-details
                        autofocus
                      />
                      <v-spacer/>
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="createRule('subject')"
                      >
                        ایجاد موضوع
                      </v-btn>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editRule(item,'subject')"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      class="mr-2"
                      @click="deleteRule(item,'subject')"
                    >
                      mdi-delete
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
                  :search="searchAction"
                  no-results-text="اطلاعاتی یافت نشد"
                  :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
                >
                  <template v-slot:top>
                    <v-toolbar
                      flat
                    >
                      <v-text-field
                        v-model="searchAction"
                        label="جست جو"
                        single-line
                        hide-details
                        autofocus
                      />
                      <v-spacer/>
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="createRule('action')"
                      >
                        ایجاد اکشن
                      </v-btn>
                    </v-toolbar>
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editRule(item,'action')"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      class="mr-2"
                      @click="deleteRule(item,'action')"
                    >
                      mdi-delete
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
                  :search="searchType"
                  :headers="headers"
                  :items="typeRule"
                  no-results-text="اطلاعاتی یافت نشد"
                  :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
                >
                  <template v-slot:top>
                    <v-toolbar
                      flat
                    >
                      <v-text-field
                        v-model="searchType"
                        label="جست جو"
                        single-line
                        hide-details
                        autofocus
                      />
                      <v-spacer/>
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="createRule('type')"
                      >
                        ایجاد نوع
                      </v-btn>
                    </v-toolbar>
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editRule(item,'type')"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      class="mr-2"
                      @click="deleteRule(item,'type')"
                    >
                      mdi-delete
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
          :search="searchGenere"
          :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-text-field
                v-model="searchGenere"
                label="جست جو"
                single-line
                hide-details
                autofocus
              />
              <v-spacer/>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="createGenere"
              >
                افزودن ژانر
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editGenere(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deleteGenere(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-tab-item>

      <v-tab-item
        value="productCategory"
        class="mt-5"
      >
        <v-data-table
          :items-per-page="5"
          :headers="listOfCategoryHeader"
          :items="listOfProductCategory"
          no-results-text="اطلاعاتی یافت نشد"
          :search="searchProductCategory"
          class="w-100"
          :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-plus',
      nextIcon: 'mdi-minus'
    }"
        >
          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-text-field
                v-model="searchProductCategory"
                label="جست جو"
                single-line
                hide-details
                autofocus
              />
              <v-spacer/>
              <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="createProductCategory"
              >
                ایجاد دسته بندی محتوا
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editProductCategory(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deleteProductCategory(item)"
            >
              mdi-delete
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
        searchSubject: '',
        searchAction: '',
        searchType: '',
        searchGenere: '',
        searchProductCategory: '',
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
      subjectsRule: {
        get () {
          return this.$store.getters['staticData/getSubjectRuleForStaticData']
        },
        set (value) {
          this.$store.commit('staticData/SET_SUBJECT_RULE', value)
        },
      },
      actionRule: {
        get () {
          return this.$store.getters['staticData/getActionRuleForStaticData']
        },
        set (value) {
          this.$store.commit('staticData/SET_ACTION_RULE', value)
        },
      },
      typeRule: {
        get () {
          return this.$store.getters['staticData/getTypeRuleForStaticData']
        },
        set (value) {
          this.$store.commit('staticData/SET_TYPE_RULE', value)
        },
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

      //handle Rule
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
      createRule (ruleType) {
        this.ruleType = ruleType
        this.ruleIndex = -1
        this.rule = {}
        this.showRuleDialog = true
      },
      closeRule () {
        this.rule = null
        this.ruleType = null
        this.ruleIndex = -1
        this.showRuleDialog = false
      },
      async handleRuleSave (rule) {
        switch (this.ruleType) {
          case 'subject':
            if (this.ruleIndex > -1) {
              Object.assign(this.subjectsRule[this.ruleIndex], rule)
            } else {
              this.subjectsRule = [...this.subjectsRule, rule]
            }
            break
          case 'action':
            if (this.ruleIndex > -1) {
              Object.assign(this.actionRule[this.ruleIndex], rule)
            } else {
              this.actionRule = [...this.actionRule, rule]
            }
            break
          case 'type':
            if (this.ruleIndex > -1) {
              Object.assign(this.typeRule[this.ruleIndex], rule)
            } else {
              this.typeRule = [...this.typeRule, rule]
            }
            break
        }
        const finalData = {
          subjects: [],
          actions: [],
          type: [],
        }
        this.subjectsRule.forEach(item => finalData.subjects.push(item.fa))
        this.actionRule.forEach(item => finalData.actions.push(item.fa))
        this.typeRule.forEach(item => finalData.type.push(item.fa))
        await this.$store.dispatch('staticData/updateRulesData', finalData)
        await this.$store.dispatch('staticData/fetchRulesList')
        this.rule = null
        this.ruleType = null
        this.ruleIndex = -1
      },

      deleteRule (item, ruleType) {
        this.$confirm(
          {
            message: 'آیا از حذف این رکورد اطمینان دارید ؟',
            button: {
              no: 'خیر',
              yes: 'بله',
            },
            callback: async confirm => {
              if (confirm) {
                const finalData = {
                  subjects: [],
                  actions: [],
                  type: [],
                }
                if (ruleType === 'subject') {
                  const subject = this.subjectsRule.find(value => value.fa === item.fa)
                  this.subjectsRule = this.subjectsRule.filter(value => value.fa !== subject.fa)
                }
                if (ruleType === 'action') {
                  const action = this.actionRule.find(value => value.fa === item.fa)
                  this.actionRule = this.actionRule.filter(value => value.fa !== action.fa)
                }
                if (ruleType === 'type') {
                  const type = this.typeRule.find(value => value.fa === item.fa)
                  this.typeRule = this.typeRule.filter(value => value.fa !== type.fa)
                }
                this.subjectsRule.forEach(item => finalData.subjects.push(item.fa))
                this.actionRule.forEach(item => finalData.actions.push(item.fa))
                this.typeRule.forEach(item => finalData.type.push(item.fa))
                await this.$store.dispatch('staticData/updateRulesData', finalData)
                await this.$store.dispatch('staticData/fetchRulesList')
                this.rule = null
                this.ruleType = null
                this.ruleIndex = -1
              }
            },
          },
        )

      },
      //handle Rule

      //handle Genere
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
      createGenere () {
        this.showGenereDialog = true
        this.genereIndex = -1
        this.genere = {}
      },
      async handleSaveGenere (genere) {
        if (this.genereIndex > -1) {
          Object.assign(this.generes[this.genereIndex], genere)
        } else {
          this.generes = [...this.generes, genere]
        }
        await this.$store.dispatch('staticData/updateGeneresData', this.generes)
        await this.$store.dispatch('staticData/fetchAllGeneres')
        this.genere = null
        this.genereIndex = -1
      },

      async deleteGenere (item) {
        this.$confirm(
          {
            message: 'آیا از حذف این رکورد اطمینان دارید ؟',
            button: {
              no: 'خیر',
              yes: 'بله',
            },
            callback: async confirm => {
              if (confirm) {
                const index = this.generes.indexOf(item)
                this.generes.splice(index, 1)
                await this.$store.dispatch('staticData/updateGeneresData', this.generes)
                await this.$store.dispatch('staticData/fetchAllGeneres')
              }
            },
          },
        )
      },
      //handle Genere

      //handle Product Category
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
      createProductCategory () {
        this.productCategory = {}
        this.productCategoryIndex = -1
        this.showProductCategoryDialog = true
      },
      async handleSaveProductCategory (productCategory) {
        if (this.productCategoryIndex > -1) {
          Object.assign(this.listOfProductCategory[this.productCategoryIndex], productCategory)
        } else {
          this.listOfProductCategory = [...this.listOfProductCategory, productCategory]
        }
        await this.$store.dispatch('staticData/updateProductCategoryData', this.listOfProductCategory)
        await this.$store.dispatch('staticData/fetchListOfCategoryData')
        this.productCategory = null
        this.productCategoryIndex = -1
      },
      deleteProductCategory (item) {
        this.$confirm(
          {
            message: 'آیا از حذف این رکورد اطمینان دارید ؟',
            button: {
              no: 'خیر',
              yes: 'بله',
            },
            callback: async confirm => {
              if (confirm) {
                const index = this.listOfProductCategory.indexOf(item)
                this.listOfProductCategory.splice(index, 1)
                await this.$store.dispatch('staticData/updateProductCategoryData', this.listOfProductCategory)
                await this.$store.dispatch('staticData/fetchListOfCategoryData')
              }
            },
          },
        )
      },
      //handle Product Category

    },
  }
</script>

<style scoped>

</style>
