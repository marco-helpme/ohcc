<template>
  <validation-observer ref="obs" v-slot="{ invalid, validated, passes, validate }">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>VeeValidate Providers</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <validation-provider v-slot="{ errors, valid }" name="Name" rules="required|max:10">
            <v-text-field
              v-model="name"
              :counter="10"
              :error-messages="errors"
              :success="valid"
              label="Name"
              required
            />
          </validation-provider>
          <validation-provider v-slot="{ errors, valid }" name="email" rules="required|email">
            <v-text-field
              v-model="email"
              :error-messages="errors"
              :success="valid"
              label="E-mail"
              required
            />
          </validation-provider>

          <validation-provider v-slot="{ errors, valid }" name="select" rules="required">
            <v-select
              :items="items"
              v-model="select"
              :error-messages="errors"
              :success="valid"
              label="Select"
              required
            />
          </validation-provider>

          <validation-provider v-slot="{ errors, valid }" rules="required" name="checkbox">
            <v-checkbox
              v-model="checkbox"
              :error-messages="errors"
              :success="valid"
              value="1"
              label="Option"
              type="checkbox"
              required
            />
          </validation-provider>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="clear">
          Clear
        </v-btn>
        <v-spacer />
        <v-btn @click="validate()">
          Validate
        </v-btn>
        <v-btn
          @click="passes(submit)"
          :disabled="invalid || !validated"
          color="primary"
        >
          Sign Up
        </v-btn>
      </v-card-actions>
    </v-card>
  </validation-observer>
</template>

<script>
import { extend } from 'vee-validate'
extend('required')
export default {
  data: () => ({
    items: ['', 'Foo', 'Bar'],
    name: '',
    email: '',
    select: '',
    checkbox: ''
  }),
  methods: {
    clear () {
      this.name = this.email = this.select = this.checkbox = ''
      requestAnimationFrame(() => {
        this.$refs.obs.reset()
      })
    },
    submit () {
      console.log('submitting!')
    }
  }
}
</script>
