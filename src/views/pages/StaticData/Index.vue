<template>
  <v-container>
    <v-tabs
      v-model="tabsMenu"
      class="mt-5"
      color="grey darken-3"
    >
      <v-tab
        href="#rules"
      >
        مدیریت رول ها
      </v-tab>
      <v-tab
        href="#generes"
      >
        مدیریت ژانرها
      </v-tab>
      <v-tab
        href="#productCategory"
      >
        مدیریت دسته بندی محصولات
      </v-tab>
    </v-tabs>
    <v-divider />
    <v-tabs-items>
      <v-tab-item
        class="mt-5"
        value="rules"
      >
        <v-col cols="4">
          <v-data-table
            :headers="headers"
            :items="subjectsRule"
            no-results-text="اطلاعاتی یافت نشد"
            class="w-100"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              />
            </template>
          </v-data-table>
        </v-col>
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
      }
    },
    computed: {
      subjectsRule () {
        return this.$store.getters['staticData/getSubjectsRule']
      },
    },
    mounted () {
      this.$store.dispatch('staticData/fetchRulesList')
    },
  }
</script>

<style scoped>

</style>
