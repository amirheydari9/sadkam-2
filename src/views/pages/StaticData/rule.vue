<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    persistent
  >
    <v-card>
      <dialog-headline title="ویرایش رول" />
      <v-card-text>
        <v-container>
          <v-form
            ref="ruleForm"
          >
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="rule.fa"
                  :rules="[required('این فیلد الزامی است'),]"
                  label="عنوان فارسی"
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
    name: 'rule',
    components: { DialogHeadline },
    props: {
      showDialog: {
        Boolean,
        isRequired: true,
      },
      rule: {
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
        this.$refs.ruleForm.resetValidation()
        this.$emit('closeDialog')
      },
      save () {
        if (this.$refs.ruleForm.validate()) {
          this.$emit('handleSave', this.rule)
          this.close()
        }
      },
    },
  }
</script>
<style scoped>

</style>
