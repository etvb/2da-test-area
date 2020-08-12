<template>
  <div>
    <div
      :class="{ 'is-active': $store.state.auth.isActiveModalLogIn }"
      class="modal -log-in-modal"
    >
      <div class="modal-background" />
      <div class="modal-content">
        <card title="Log In">
          <template v-slot:body>
            <b-message
              v-if="errorsValidation && uncatchedError === false"
              type="is-danger"
              class="-is-spaced"
            >
              {{ errorsValidation }}
            </b-message>
            <b-message
              v-if="uncatchedError"
              type="is-danger"
              class="-is-spaced"
            >
              We had a problem with your data
            </b-message>
            <b-field label="Email">
              <b-input
                v-model="email"
                type="email"
              />
            </b-field>
            <b-field label="Password">
              <b-input
                v-model="password"
                type="password"
              />
            </b-field>
          </template>
          <template v-slot:footer-right-actions>
            <div>
              <div
                @click.prevent="login"
                :class="{'is-loading': loading}"
                class="button -has-bg-primary has-text-white"
              >
                Login
              </div>
            </div>
          </template>
          <template v-slot:help>
            <div class="has-text-centered is-size-7">
              <p class="is-size-7">
                Don't have an account?
              </p>
              <a
                @click.prevent="$store.commit('auth/openModalSignUp')"
                href="#"
              >Sign In</a>
              <br><br>
              <a
                @click.prevent="forgotPassword"
                href="#"
              >
                Forgot your password?
              </a>
            </div>
          </template>
        </card>
      </div>
      <button
        @click.prevent="$store.commit('auth/closeModalLogIn')"
        class="modal-close is-large"
        aria-label="close"
      />
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
      loading: false,
      email: '',
      password: '',
      uncatchedError: false,
      errorsValidation: false
    }
  },
  methods: {
    forgotPassword() {
      this.$store.commit('auth/closeModalLogIn')
      this.$router.push('/auth/reset-password')
    },
    login() {
      this.loading = true
      const url = process.env.apiUrl + 'auth/login'
      const data = {
        email: this.email,
        password: this.password
      }
      axios
        .post(url, data)
        .then(response => {
          // eslint-disable-next-line no-console
          // console.log(response.data)
          this.loading = false
          const user = response.data
          this.$store.commit('auth/logInUser', user.user)
          this.$store.commit('auth/access', {
            access_token: user.access_token,
            expires_at: user.expires_at
          })
          this.$store.commit('auth/closeModalLogIn')
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          // console.log(error.response)
          this.loading = false
          if (error.response.status === 401) {
            this.uncatchedError = false
            // this.errorsValidation = error.response.data.errors
            this.errorsValidation = 'Bad credentials'
            return
          }
          this.errorsValidation = false
          this.uncatchedError = true
        })
    }
  }
}
</script>
<style lang="sass">
  .-log-in-modal
    z-index: 999
    .modal-content
      max-width: 500px
</style>
