<template>
  <div>
    <!-- <card
      :lineBottom="false"
      title="Total Payments"
    >
      <template v-slot:body>
        <div>
          <b-icon
            pack="fas"
            icon="receipt"
            size="is-large"
            custom-class="-has-text-secondary"
          />
          <span class="subtitle is-4">
            ${{ payment }}
          </span>
        </div>
        <p class="is-size-7 -is-spaced-top">
          *Please be informed that additional fees charged by Paypal are not considered.
        </p>
      </template>
    </card> -->
    <div class="box is-radiusless is-marginless">
      <div class="columns is-mobile">
        <div class="column is-narrow">
          <b-icon
            pack="fas"
            icon="calendar-alt"
            size="is-large"
            custom-class="-has-text-secondary"
          />
        </div>
        <div class="column -vertical-flex-align">
          <h5 class="title is-6">
            Number of booked classes
          </h5>
        </div>
        <div class="column is-narrow -vertical-flex-align">
          <h5 class="title is-4 -has-text-secondary">
            {{ lifetimeClasses }}
          </h5>
        </div>
      </div>
    </div>
    <div class="box is-radiusless">
      <div class="columns is-mobile">
        <div class="column is-narrow">
          <b-icon
            pack="fas"
            icon="file-invoice-dollar"
            size="is-large"
            custom-class="-has-text-secondary"
          />
        </div>
        <div class="column -vertical-flex-align">
          <h5 class="title is-6">
            Total of paid out earnings
          </h5>
        </div>
        <div class="column is-narrow -vertical-flex-align">
          <h5 class="title is-4 -has-text-secondary">
            ${{ lifetimePaid }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Card from '~/components/general/Card.vue'
import axios from 'axios'
export default {
  // components: {
  //   Card
  // },
  // props: {
  //   payment: {
  //     type: Number,
  //     default: 0
  //   }
  // }
  data() {
    return {
      lifetimeClasses: 0,
      lifetimePaid: 0
    }
  },
  mounted() {
    this.getLifetimeClasses()
    this.getLifetimePayments()
  },
  methods: {
    getLifetimeClasses() {
      const user = this.$store.getters['auth/loggedUser']
      const url = process.env.apiUrl + 'instructors/' + user.id + '/lessons'
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.lifetimeClasses = response.data.total
        })
    },
    getLifetimePayments() {
      const user = this.$store.getters['auth/loggedUser']
      const url = process.env.apiUrl + 'instructors/' + user.id + '/payments'
      const authorization = this.$store.getters['auth/headerAuthorization']

      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.lifetimePaid = this.calculateLifetimePayment(response.data)
        })
    },
    calculateLifetimePayment(payments) {
      let total = 0
      payments.forEach(payment => {
        total += parseInt(payment.paid)
      })
      return total
    }
  }
}
</script>
