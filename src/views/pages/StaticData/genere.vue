<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    persistent
  >
    <v-card>
      <dialog-headline title="ویرایش ژانر" />
      <v-card-text>
        <v-container>
          <v-form
            ref="genereForm"
          >
            <v-row>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="genere.fa"
                  :rules="[required('این فیلد الزامی است'),]"
                  label="پیغام"
                />
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="genere.en"
                  :rules="[required('این فیلد الزامی است'),]"
                  label="پیغام"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          rounded
          @click="save"
        >
          ذخیره
        </v-btn>
        <v-btn
          color="warning"
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
  import { required } from '../../../plugins/rule'
  import DialogHeadline from '../../../components/DialogHeadline'

  export default {
    name: 'Genere',
    components: { DialogHeadline },
    props: {
      showDialog: {
        Boolean,
        isRequired: true,
      },
      genere: {
        Object,
        isRequired: true,
      },
    },
    data () {
      return {
        required,
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
    },
    methods: {
      close () {
        this.$refs.genereForm.resetValidation()
        this.$emit('closeDialog')
      },
      save () {
        if (this.$refs.genereForm.validate()) {
          this.$emit('handleSave', this.genere)
          this.close()
        }
      },
    },
  }
</script>

<style scoped>

</style>
