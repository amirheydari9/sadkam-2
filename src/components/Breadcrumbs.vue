<template>
  <v-card>
    <v-card-text
      class="pa-0"
    >
      <v-breadcrumbs
        :items="items"
        large
      />
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'Breadcrumbs',
    props: {
      items: {
        Array,
        isRequired: true,
      },
    },
  }
</script>

<style scoped>

</style>
