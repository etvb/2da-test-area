<template>
  <div class="hero">
    <div class="hero-body">
      <div class="container">
        <div v-show="$store.state.auth.auth.loggedIn">
          <b-message
            type="is-warning"
            class="-is-spaced"
          >
            You are already logged In
          </b-message>
        </div>
        <div
          v-show="!$store.state.auth.auth.loggedIn"
          class="columns is-centered"
        >
          <div class="column is-4">
            <card title="Log In">
              <template v-slot:body>
                <b-message
                  v-if="errorsValidation && uncatchedError === false"
                  type="is-danger"
                  class="-is-spaced"
                >
                  <!-- <ul>
                    <li 
                      v-for="(error, index) in errorsValidation"
                      :key="index"
                    >
                      {{ error[0] }}
                    </li>
                  </ul> -->
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
                  <nuxt-link to="/auth/signup">
                    Sign Up
                  </nuxt-link>
                  <br><br>
                  <nuxt-link to="/auth/reset-password">
                    Forgot your password?
                  </nuxt-link>
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
      loading: false,
      email: '',
      password: '',
      uncatchedError: false,
      errorsValidation: false
    }
  },
  methods: {
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
          this.goToPanel(user.user.roles[0].name)
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
    },
    goToPanel(rol) {
      // const loggedAs = this.$store.getters.loggedAs
      // this.$router.push('/panel/student')
      if (rol === 'instructor') {
        this.$router.push('/panel/instructor')
      } else {
        this.$router.push('/panel/student')
      }
    }
  }
}
</script>
