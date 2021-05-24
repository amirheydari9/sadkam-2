<template>
  <v-content>
    <overlay />
    <router-view />

<!--    <dashboard-core-footer />-->
  </v-content>
</template>

<script>
  import Overlay from '../../../../components/Overlay'
  export default {
    name: 'DashboardCoreView',
    components: { Overlay },
    // components: {
    //   DashboardCoreFooter: () => import('./Footer'),
    // },
  }
</script>
