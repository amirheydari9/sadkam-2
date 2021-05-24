<template>
  <v-card-title class="primary lighten-2 text-right pa-4">
    <p
      class="pa-0 ma-0"
      style="color: white"
    >
      {{ title }}
    </p>
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
