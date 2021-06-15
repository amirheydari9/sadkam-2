<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="850px"
  >
    <v-card>
      <v-card-text>
        <v-tabs
          v-model="tabsMenu"
          class="mt-5"
          color="grey darken-3"
        >
          <v-tab
            href="#assessment"
            @click="getData"
          >
            ارزیابی
          </v-tab>
          <v-tab
            v-if="request"
            href="#chat"
            @click="getData"
          >
            گفتگوها
          </v-tab>
          <v-tab
            v-if="request"
            href="#file"
            @click="getData"
          >
            فایل
          </v-tab>
        </v-tabs>
        <v-divider/>

        <v-tabs-items v-model="tabsMenu">
          <tab1/>
          <tab2
            v-if="request"
            :dialogs="dialogs"
            :targetFiles="targetFiles"
            @getData="getData"
          />
          <tab3
            v-if="request"
            @getData="getData"
          />
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              بستن
            </v-btn>
          </v-card-actions>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import Tab1 from './Tab1'
  import Tab2 from './Tab2'
  import tab3 from './Tab3'

  export default {
    name: 'TabsWrapper',
    components: {
      Tab1,
      Tab2,
      tab3,
    },
    props: {
      showDialog: {
        Boolean,
        isRequired: true,
      },
    },
    data () {
      return {
        tabsMenu: null,
        targetFiles: [],
        dialogs: [],
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
      episode () {
        return this.$store.getters['episode/getEpisode']
      },
      requestInfoByEpisodeId () {
        return this.$store.getters['request/getRequestInfoByEpisodeId']
      },
      request () {
        return this.$store.getters['request/getRequest']
      },
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        await this.$store.dispatch('request/fetchRequestByEpisodeId', this.episode._id)
        if (this.requestInfoByEpisodeId) {
          await this.$store.dispatch('request/fetchRequest', this.requestInfoByEpisodeId._id)
          this.request.dialogs.forEach(value => {
            const obj = this.request.files.find(item => {
              if (value.targetFile) {
                return item._id === value.targetFile
              }
            })
            if (obj) {
              value.humanId = obj.humanId
            } else {
              value.humanId = 'ندارد'
            }
          })
          this.dialogs = [...this.request.dialogs]
          this.request.files.forEach(item => {
            const row = {
              title: `${item.desc} - ${item.humanId}`,
              id: item._id,
            }
            this.targetFiles.push(row)
          })
        }
      },
      close () {
        this.$store.commit('request/SET_REQUEST_INFO_BY_EPISODE_ID', null)
        this.$store.commit('request/SET_REQUEST', null)
        this.$emit('closeDialog')
      },
    },
  }
</script>

<style scoped>

</style>
