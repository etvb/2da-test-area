<template>
  <div>
    <card
      :lineBottom="false"
      title="Total of expected payments for this month"
      title-size="6"
    >
      <template v-slot:titleIcon>
        <b-icon
          pack="fas"
          icon="file-invoice-dollar"
          size="is-large"
          custom-class="-has-text-secondary"
        />
      </template>
      <template v-slot:action>
        <h4 class="title is-4 -has-text-secondary">
          <!-- ${{ quantity }} -->
          ${{ parseInt(monthlyEstimatedIncome) }}
        </h4>
      </template>
      <template v-slot:body>
        <div class="columns">
          <div class="column">
            <span class="subtitle is-6">
              ...thereof already paid out
            </span>
          </div>
          <div class="column is-narrow">
            <h4 class="title is-4 -has-text-secondary">
              ${{ monthlyPayment }}
            </h4>
          </div>
        </div>
      </template>
    </card>
  </div>
</template>
<script>
import Card from '~/components/general/Card.vue'
import axios from 'axios'
export default {
  components: {
    Card
  },
  // props: {
  //   quantity: {
  //     type: String,
  //     default: '0'
  //   }
  // }
  data() {
    return {
      monthlyEstimatedIncome: 0,
      monthlyPayment: 0
    }
  },
  mounted() {
    this.getEstimatedIncome()
    this.getMonthlyPayments()
  },
  methods: {
    getEstimatedIncome() {
      const user = this.$store.getters['auth/loggedUser']
      const url = process.env.apiUrl + 'instructors/' + user.id + '/incomes'
      const authorization = this.$store.getters['auth/headerAuthorization']
      const date = new Date()
      const month = date.getMonth()
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          },
          params: {
            month: month + 1,
            beforeDateTime: new Date()
              .toJSON()
              .slice(0, 19)
              .replace('T', ' ')
          }
        })
        .then(response => {
          this.monthlyEstimatedIncome = response.data
        })
    },
    getMonthlyPayments() {
      const user = this.$store.getters['auth/loggedUser']
      const url = process.env.apiUrl + 'instructors/' + user.id + '/payments'
      const authorization = this.$store.getters['auth/headerAuthorization']
      const date = new Date()
      const month = date.getMonth()

      const data = {
        month: month + 1,
        column: 'created_at'
      }
      axios
        .get(url, {
          params: data,
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.monthlyPayment = this.calculateMonthlyPayment(response.data)
        })
    },
    calculateMonthlyPayment(payments) {
      let total = 0
      payments.forEach(payment => {
        total += parseInt(payment.paid)
      })
      return total
    }
  }
}
</script>
