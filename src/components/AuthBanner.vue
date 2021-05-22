<template>
  <v-col
    cols="4"
    :md="md"
    class="gra-bg"
  >
    <v-img
      src="/big-satra.jpg"
      width="600px"
      height="600px"
      class="text-center"
      style="margin:50px auto"
    />
  </v-col>
</template>

<script>
  export default {
    name: 'AuthBanner',
    props: {
      md: {
        type: String,
        default: '8',
      },
    },
  }
</script>

<style scoped>
.gra-bg {
  background-image: linear-gradient(to bottom right, #054592, #1897d4);
}
</style>
