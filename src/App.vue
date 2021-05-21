<template>
  <v-app>
    <vue-confirm-dialog></vue-confirm-dialog>
    <router-view />
  </v-app>
</template>

<script>
  export default {
    name: 'App',
  }
</script>
<style>
@import "assets/css/font.css";
@import "assets/css/app.css";
</style>
