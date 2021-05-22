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
  </v-container>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        tabsMenu: null,
      }
    },
    mounted () {
      this.$store.dispatch('staticData/fetchRulesList')
    },
  }
</script>

<style scoped>

</style>
