<template>
  <div class="hero">
    <div class="hero-body">
      <div class="container">
        <b-message
          v-show="!$store.getters['auth/loggedIn']"
          type="is-warning"
          class="-is-spaced"
        >
          <a @click.prevent="openLogin">Log in</a>
          or
          <a @click.prevent="openSignUp">Sign up</a>
          to continue
        </b-message>
        <div v-if="lessons.instructor" class="columns is-centered">
          <div v-show="$store.state.auth.auth.loggedIn" class="column is-6">
            <card title="Your class">
              <template v-slot:body>
                <h4 class="subtitle is-5 -is-marginless-bottom">
                  Instructor:
                </h4>
                <h5 class="subtitle is-6">
                  {{ lessons.instructor.user.name }}
                </h5>

                <h4 class="subtitle is-5 is-marginless">
                  Language:
                </h4>
                <h5 class="subtitle is-6">
                  {{ language.english }}
                </h5>

                <h4 class="subtitle is-5 is-marginless">
                  Your {{ language.english }} level:
                </h4>
                <h5 class="subtitle is-6">
                  {{ lessons.languageLevel }}
                </h5>

                <h4 class="subtitle is-5 -is-marginless-bottom">
                  Date:
                </h4>
                <h5 class="subtitle is-6">
                  {{ lessons.date }}
                </h5>

                <h4 class="subtitle is-5 -is-marginless-bottom">
                  Time:
                </h4>
                <h5 class="subtitle is-6">
                  {{ lessons.time }}
                </h5>

                <h4 class="subtitle is-5 -is-marginless-bottom">
                  Price:
                </h4>
                <h5 class="subtitle is-6">
                  ${{ lessons.instructor.price_by_class }}
                </h5>
              </template>
              <template v-slot:footer-right-actions>
                <!-- <div>
                  <button
                    @click.prevent="storeLessons"
                    :class="{'is-loading': loading}"
                    class="button -has-bg-primary has-text-white"
                  >
                    Pay
                  </button>
                </div> -->
                <no-ssr>
                  <paypal-checkout
                    v-if="loggedIn"
                    :client="paypal"
                    @payment-completed="paymentCompleted"
                    :amount="lessons.instructor.price_by_class"
                    :button-style="{color: 'blue', size: 'medium'}"
                    currency="USD"
                    class="has-text-centered"
                  />
                </no-ssr>
                <!-- <b-message
                    type="is-info"
                    class="-is-spaced"
                >
                  Booking will be enabled on January 1st, 2020.
                </b-message> -->
              </template>
            </card>
          </div>
        </div>
        <div v-else>
          <b-message
            type="is-info"
            class="-is-spaced"
          >
            <span v-show="!booked">
              Your cart is empty.
            </span>
            <span v-show="booked">
              Thank you for your booking.
            </span>
          </b-message>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from '~/components/general/Card.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'
// import moment from 'moment'
export default {
  components: {
    Card
  },
  data() {
    return {
      loading: false,
      lessons: false,
      booked: false,
      language: '',
      timezone: [],
      items: [],
      paypal: {
        sandbox:
          'AfZ43TDHpnlF6ZgQfthF-spFnTvf3Jy6n52Wy1i_E2r1XYpdlGLu4KMZgXYJwK3YCezX_Sqf06L0dsH5',
        production:
          'ARKaFYhYbJN9ys0WEiSsg35JYSoknRiK3F1b2Dpd4wlX2QMzB4YKI-_diYm2E8Obl68BQZKAH3S24deG'
      },
      loggedIn: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/loggedUser'
    }),
    instructorDate() {
      return this.lessons.date + ' ' + this.lessons.time + ':00'
    }
  },
  async asyncData({ params }) {
    const idInstructor = params.id
    const { data } = await axios.get(
      `${process.env.apiUrl}languages/${idInstructor}`
    )
    return { instructor: data }
  },
  mounted() {
    this.getLessons()
    this.verifyLoggedIn()
  },
  methods: {
    getLessons() {
      const lessons = this.$store.getters['cart/lessons']
      this.lessons = lessons
      if (lessons.instructor) {
        this.getLanguage(lessons.language)
        this.getTimezone(lessons.instructor.user.timezone_id)
      }
    },
    getLanguage(idLanguage) {
      const url = `${process.env.apiUrl}languages/${idLanguage}`

      axios.get(url).then(response => {
        this.language = response.data
      })
    },
    getTimezone(idTimezone) {
      const url = `${process.env.apiUrl}timezones/${idTimezone}`

      axios.get(url).then(response => {
        this.timezone = response.data
      })
    },
    verifyLoggedIn() {
      const loggedIn = this.$store.getters['auth/loggedIn']
      if (!loggedIn && this.lessons.length) {
        this.$store.commit('auth/openModalSignUp')
        this.loggedIn = false
      } else {
        this.loggedIn = true
      }
    },
    openSignUp() {
      this.$store.commit('auth/openModalSignUp')
    },
    openLogin() {
      this.$store.commit('auth/openModalLogIn')
    },
    paymentCompleted(data) {
      this.storeLessons()
    },
    // pay() {
    //   const loggedIn = this.$store.getters['auth/loggedIn']
    //   if (!loggedIn) {
    //     this.$store.commit('auth/openModalSignUp')
    //     return
    //   }
    //   this.storeLessons()
    // },
    storeLessons() {
      const url = `${process.env.apiUrl}lessons`
      const user = this.$store.getters['auth/loggedUser']
      const authorization = this.$store.getters['auth/headerAuthorization']
      const data = {
        language_id: this.lessons.language,
        instructor_id: this.lessons.instructor.id,
        student_id: user.id,
        topic: this.lessons.topic,
        level: this.lessons.languageLevel,
        date: this.convertDateToUTC(this.lessons.date, this.lessons.time),
        localDate: this.lessons.date + ' ' + this.lessons.time + ':00', // parsed for correct carbon parse,
        instructorDate: this.instructorDate,
        price: this.lessons.instructor.price_by_class
      }
      this.loading = true

      axios
        .post(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          this.cleanCart()
          this.success()
        })
        .catch(() => {
          this.loading = false
          alert('Could not book your class, try again')
        })
    },
    convertDateToUTC(date, time) {
      const timezone = this.user.timezone
      const [hour] = time.split(':')
      const [year] = date.split('-')
      let [, day, month] = date.split('-')
      // add 0's to the beginning to prevent parsing errors
      if (day.length < 2) day = `0${day}`
      if (month.length < 2) month = `0${month}`
      if (hour.length < 2) time = `0${time}`
      const parsedDate = `${year}-${day}-${month}`
      const fullDate = `${parsedDate} ${time}:00`
      const momentDate = this.$moment_timezone.tz(fullDate, timezone)
      const ISODate = momentDate.toISOString()
      const UTCDateParsed = ISODate.substring(0, 19) // parsed for correct carbon parse
      return UTCDateParsed.replace('T', ' ')
    },
    success() {
      this.booked = true
      this.$snackbar.open({
        message: `Class has been booked succesfully`,
        position: 'is-top-right'
      })
    },
    cleanCart() {
      this.$store.commit('cart/cleanCartLessons')
      this.getLessons()
    }
  }
}
</script>
