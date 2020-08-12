<template>
  <div class="hero">
    <div class="hero-body">
      <div v-if="success" class="container">
        <b-message
          type="is-success"
          class="-is-spaced"
        >
          {{ success }}
        </b-message>
      </div>
      <div v-else class="container">
        <div v-show="$store.state.auth.auth.loggedIn">
          <b-message
            type="is-warning"
            class="-is-spaced"
          >
            Logout to reset your password
          </b-message>
        </div>
        <div
          v-show="!$store.state.auth.auth.loggedIn"
          class="columns is-centered"
        >
          <div class="column is-6">
            <card title="Reset Password">
              <template v-slot:body>
                <b-message
                  v-if="errorsValidation && uncatchedError === false"
                  type="is-danger"
                  class="-is-spaced"
                >
                  <ul>
                    <li 
                      v-for="(error, index) in errorsValidation"
                      :key="index"
                    >
                      {{ error[0] }}
                    </li>
                  </ul>
                </b-message>
                <b-message
                  v-if="uncatchedError"
                  type="is-danger"
                  class="-is-spaced"
                >
                  Unable to send reset link
                </b-message>
                <b-field label="Email">
                  <b-input
                    v-model="email"
                    type="email"
                  />
                </b-field>
              </template>
              <template v-slot:footer-right-actions>
                <div>
                  <div
                    @click.prevent="resetPassword"
                    :class="{'is-loading': loading}"
                    class="button -has-bg-primary has-text-white -is-spaced-top"
                  >
                    Send email
                  </div>
                </div>
              </template>
              <template v-slot:help>
                <div class="has-text-centered is-size-7">
                  <p class="is-size-7">
                    We are going to send you an email with instructions for reset your password
                  </p>
                </div>
              </template>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from '~/components/general/Card.vue'
import axios from 'axios'
export default {
  components: {
    Card
  },
  data() {
    return {
      success: false,
      loading: false,
      email: '',
      uncatchedError: false,
      errorsValidation: false
    }
  },
  methods: {
    resetPassword() {
      this.loading = true
      const url = process.env.apiUrl + 'auth/password/email'
      const data = {
        email: this.email
      }
      axios
        .post(url, data)
        .then(response => {
          // eslint-disable-next-line no-console
          // console.log(response.data)
          this.success = response.data.message
          this.loading = false
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error.response)
          this.loading = false
          if (error.response.status === 422) {
            this.uncatchedError = false
            this.errorsValidation = error.response.data.errors
            return
          }
          this.errorsValidation = false
          this.uncatchedError = true
        })
    }
  }
}
</script>
