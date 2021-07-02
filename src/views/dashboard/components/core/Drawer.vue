<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1"/>

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="/user.png"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="text-h4"
            v-text="currentUser.nickname"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2"/>

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div/>

      <template v-for="(item, i) in computedItems">
        <!--        <base-item-group-->
        <!--          v-if="item.children"-->
        <!--          :key="`group-${i}`"-->
        <!--          :item="item"-->
        <!--        >-->
        <!--  -->
        <!--        </base-item-group>-->

        <base-item
          v-if="canShowLink(item.roles,item.organizationTypes)"
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div/>
    </v-list>

    <!--    <template v-slot:append>-->
    <!--      <base-item-->
    <!--        :item="{-->
    <!--          title: $t('upgrade'),-->
    <!--          icon: 'mdi-package-up',-->
    <!--          to: '/upgrade',-->
    <!--        }"-->
    <!--      />-->
    <!--    </template>-->
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          title: 'داشبورد',
          icon: 'mdi-view-dashboard',
          to: '/',
          roles: [],
          organizationTypes: [],
        },
        {
          title: 'مدیریت کاربران',
          icon: 'mdi-account-circle',
          to: '/users',
          roles: ['USER_MANAGER'],
          organizationTypes: ['SECRETARIAT', 'PLATFORM', 'BROKERAGE'],
        },
        {
          title: 'مدیریت سازمان ها',
          icon: 'mdi-office-building',
          to: '/organizations',
          roles: ['USER_MANAGER'],
          organizationTypes: ['SECRETARIAT'],
        },
        {
          title: 'مدیریت محتوا',
          icon: 'mdi-video',
          to: '/products',
          roles: ['ORDERS'],
          organizationTypes: ['SECRETARIAT', 'PLATFORM'],
        },
        {
          title: 'مدیریت اپیزودها',
          icon: 'mdi-play',
          to: '/episodes',
          roles: ['ORDERS'],
          organizationTypes: ['SECRETARIAT', 'PLATFORM'],
        },
        {
          title: 'درخواست ارزیابی',
          icon: 'mdi-flash-outline',
          to: '/request',
          roles: ['ORDERS'],
          organizationTypes: ['PLATFORM'],
        },
        // {
        //   title: 'درخواست ارزیابی 1',
        //   icon: 'mdi-account-circle',
        //   to: '/assessmentRequest1',
        //   permission: 'USER_MANAGER',
        // },
        {
          title: 'مشاهده درخواست ارزیابی',
          icon: 'mdi-table-eye',
          to: '/viewRequest',
          roles: ['ORDERS'],
          organizationTypes: ['SECRETARIAT'],
        },
        {
          title: 'پیشرفت درخواست ارزیابی',
          icon: 'mdi-table-eye',
          to: '/requestProgress',
          roles: ['ORDERS'],
          organizationTypes: ['PLATFORM', 'BROKERAGE'],
        },
        {
          title: 'مدیریت تیکت',
          icon: 'mdi-clipboard-check',
          to: '/ticket',
          roles: ['USER_MANAGER', 'FINANCIAL', 'ORDERS'],
          organizationTypes: ['SECRETARIAT', 'PLATFORM', 'BROKERAGE'],
        },
        {
          title: 'مدیریت اطلاعات پایه',
          icon: 'mdi-database',
          to: '/staticData',
          roles: ['ORDERS'],
          organizationTypes: ['SECRETARIAT'],
        },
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
      currentUser () {
        return this.$store.getters.getCurrentUser
      },
    },
    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
      canShowLink (roles, organizationTypes) {
        if (roles.length === 0 && organizationTypes.length === 0) return true
        return (
          roles.some(role => this.currentUser.organizationRoles.includes(role)) &&
          organizationTypes.indexOf(this.currentUser.organizationType) > -1
        )
      },
    },
  }
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
        margin-right: 24px
        margin-left: 12px !important

      +rtl()
        margin-left: 24px
        margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
        padding-left: 8px

      +rtl()
        padding-right: 8px

    .v-list-group__header
      +ltr()
        padding-right: 0

      +rtl()
        padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
          margin-right: 8px

        +rtl()
          margin-left: 8px
</style>
