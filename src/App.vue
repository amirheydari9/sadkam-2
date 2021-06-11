<template>
  <v-app>
    <vue-confirm-dialog></vue-confirm-dialog>
    <router-view />
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    mounted () {
      console.log(this.$store.getters.getCurrentUser,'cu')
    }
  }
</script>
<style>
@import "assets/css/font.css";
@import "assets/css/app.css";
</style>
