<template>
  <v-dialog
    v-model="show"
    max-width="600px"
    persistent
  >
    <v-card>
      <v-card-title>
        <dialog-headline title="مدیریت رول"/>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="ruleForm">
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  v-model="rule.subject"
                  :rules="[
                      required('این فیلد الزامی است'),
                    ]"
                  label="موضوع"
                  :items="subjects"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  v-model="rule.action"
                  :rules="[
                      required('این فیلد الزامی است'),
                    ]"
                  label="موضوع"
                  :items="actions"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  v-model="rule.type"
                  :rules="[
                      required('این فیلد الزامی است'),
                    ]"
                  label="نوع"
                  :items="types"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  v-model="rule.priority"
                  :rules="[
                      required('این فیلد الزامی است'),
                    ]"
                  label="اولویت"
                  :items="priority"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="rule.message"
                  :rules="[
                      required('این فیلد الزامی است'),
                    ]"
                  label="پیام"
                  :items="priority"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="rule.desc"
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
  import { permission } from '../../plugins/permission'
  import DialogHeadline from '../DialogHeadline'
  import { required } from '../../plugins/rule'

  export default {
    name: 'HandleRule',
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
        rule: {
          subject: '',
          type: '',
          action: '',
          priority: '',
          message: '',
          desc: '',
        },
        priority: [1, 2, 3, 4, 5],
        required,
      }
    },
    mounted () {
      this.$store.dispatch('staticData/fetchRulesList')
      if (this.item) {
        this.rule = this.item
      }
    },
    computed: {
      show () {
        return this.showDialog
      },
      subjects () {
        return this.$store.getters['staticData/getSubjectsRule']
      },
      actions () {
        return this.$store.getters['staticData/getActionsRule']
      },
      types () {
        return this.$store.getters['staticData/getTypesRule']
      },
    },
    methods: {
      save () {
        if (this.$refs.ruleForm.validate()) {
          console.log(this.rule)
          this.$emit('handleSave', this.rule)
          this.close()
        }
      },
      close () {
        this.$refs.ruleForm.resetValidation()
        this.$emit('closeDialog')
      },
    },
  }
</script>

<style scoped>

</style>
