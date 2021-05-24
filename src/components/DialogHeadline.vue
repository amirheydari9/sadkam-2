<template>
  <v-card-title class="grey lighten-2 text-right pa-4">
    {{ title }}
  </v-card-title>
</template>

<script>
  export default {
    name: 'DialogHeadline',
    props: {
      title: {
        String,
        isRequired: true,
      },
    },
  }
</script>

<style scoped>

</style>
