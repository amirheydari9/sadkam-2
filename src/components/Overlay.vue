<template>
  <v-overlay :value="overlay" :z-index="99999">
    <v-progress-circular
      color="primary"
      indeterminate
      :size="80"
      :width="7"
    />
  </v-overlay>
</template>

<script>
  export default {
    name: 'Overlay',
    computed: {
      overlay () {
        return this.$store.getters.getOverlay
      },
    },
  }
</script>

<style scoped>

</style>
