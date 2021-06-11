<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    persistent
  >
    <v-card>
      <v-card-title>
        <dialog-headline title="توضیحات رول"/>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="descForm">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="desc"
                  :rules="[
                      required('این فیلد الزامی است'),
                    ]"
                  label="توضیحات"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="blue darken-1"
          text
          @click="save"
        >
          ذخیره
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          انصراف
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import DialogHeadline from '../DialogHeadline'
  import { required } from '../../plugins/rule'

  export default {
    name: 'HandleSetDescription',
    components: { DialogHeadline },
    props: {
      showDialog: {
        Boolean,
        isRequired: true,
      },
      item: {
        Object,
        isRequired: false,
      },
    },
    data () {
      return {
        desc: '',
        required,
      }
    },
    mounted () {
      if (this.item) {
        this.desc = this.item.platformDesc
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
    },
    methods: {
      save () {
        if (this.$refs.descForm.validate()) {
          this.$emit('handleSave', this.desc)
          this.close()
        }
      },
      close () {
        this.$refs.descForm.resetValidation()
        this.$emit('closeDialog')
      },
    },
  }
</script>

<style scoped>

</style>
