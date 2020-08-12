<template>
  <div>
    <div class="hero is-medium -has-bg-primary">
      <div class="hero-body">
        <h4 class="subtitle is-2 has-text-centered has-text-white">
          Offer classes in Skillzzbox
        </h4>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <h4 class="title is-5 has-text-centered">
          Why teach with us?
        </h4>
        <div class="columns">
          <div class="column">
            <div class="box has-text-centered">
              <b-icon
                pack="fas"
                icon="hand-holding-usd"
                size="is-medium"
                custom-class="-has-text-primary"
              />
              <h5 class="title is-5 -is-spaced-top -is-marginless-bottom">
                Earn money flexibly
              </h5>
              <p>
                Teach online from your home and on your schedule.
              </p>
            </div>
          </div>
          <div class="column">
            <div class="box has-text-centered">
              <b-icon
                pack="fas"
                icon="users"
                size="is-medium"
                custom-class="-has-text-primary"
              />
              <h5 class="title is-5 -is-spaced-top -is-marginless-bottom">
                Motivated learners
              </h5>
              <p>
                Work with learners who have chosen to be at your class.
              </p>
            </div>
          </div>
          <div class="column">
            <div class="box has-text-centered">
              <b-icon
                pack="fas"
                icon="book-open"
                size="is-medium"
                custom-class="-has-text-primary"
              />
              <h5 class="title is-5 -is-spaced-top -is-marginless-bottom">
                Be creative
              </h5>
              <p>
                Design your curriculum and teach the way you want.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section -has-bg-light">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6">
            <form @submit.prevent="register" action="/register">
              <card title="Sign up as instructor">
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
                    We have a problem with your register
                  </b-message>
                  <b-field label="First Name">
                    <b-input v-model="name" required />
                  </b-field>
                  <b-field label="Last Name">
                    <b-input v-model="lastname" required />
                  </b-field>
                  <b-field label="Email">
                    <b-input
                      v-model="email"
                      type="email"
                      required
                    />
                  </b-field>
                  <b-field label="Password">
                    <b-input
                      v-model="password"
                      type="password"
                      required
                    />
                  </b-field>
                  <div class="field">
                    <b-checkbox
                      v-model="acceptGeneralTerms"
                      name="acceptGeneralTerms"
                      type="is-info"
                      required
                    >
                      Accept our
                      <nuxt-link to="/terms-and-conditions" target="_blank" class="has-text-info">
                        general terms
                      </nuxt-link>
                    </b-checkbox>
                  </div>
                  <div class="field">
                    <b-checkbox
                      v-model="acceptPricingTerms"
                      name="acceptPricingTerms"
                      type="is-info"
                      required
                    >
                      Accept our
                      <nuxt-link to="/pricing-terms" target="_blank" class="has-text-info">
                        pricing terms
                      </nuxt-link>
                    </b-checkbox>
                  </div>
                </template>
                <template v-slot:footer-right-actions>
                  <div>
                    <button
                      :class="{'is-loading': loading}"
                      type="submit"
                      class="button -has-bg-primary has-text-white is-medium"
                    >
                      Register
                    </button>
                  </div>
                </template>
              </card>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container has-text-centered">
        <h4 class="subtitle is-5 is-inline">
          Have questions?
        </h4>
        <a class="-has-text-primary">Contact Us</a>
      </div>
    </section>
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
      name: '',
      email: '',
      lastname: '',
      password: '',
      uncatchedError: false,
      errorsValidation: false,
      acceptGeneralTerms: false,
      acceptPricingTerms: false
    }
  },
  methods: {
    register() {
      if (this.$store.state.auth.auth.loggedIn) {
        alert('Logout before register a new instructor')
        return
      }
      this.loading = true
      const url = process.env.apiUrl + 'auth/signup'
      const data = {
        name: this.name,
        email: this.email,
        lastname: this.lastname,
        password: this.password,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        role: 'instructor',
        acceptGeneralTerms: this.acceptGeneralTerms,
        acceptPricingTerms: this.acceptPricingTerms
      }
      axios
        .post(url, data)
        .then(response => {
          this.loading = false
          const user = response.data
          // this.$store.commit('auth/logInUser', user)
          this.$store.commit('auth/logInUser', user.user)
          this.$store.commit('auth/access', {
            access_token: user.access_token,
            expires_at: user.expires_at
          })
          // this.setLoggedAs(user)
          this.success()
          this.goToPanel()
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          // console.log(error.response)
          this.loading = false
          if (error.response.status === 422) {
            this.uncatchedError = false
            this.errorsValidation = error.response.data.errors
            return
          }
          this.errorsValidation = false
          this.uncatchedError = true
        })
    },
    success() {
      this.errorsValidation = false
      this.name = ''
      this.email = ''
      this.password = ''
      this.$snackbar.open({
        duration: 7000,
        message: 'Successfully registered instructor!',
        type: 'is-success',
        position: 'is-top-right',
        actionText: 'Ok'
      })
    },
    goToPanel() {
      window.fbq('track', 'CompleteRegistration')
      this.$router.push('/panel/instructor')
    }
  }
}
</script>
