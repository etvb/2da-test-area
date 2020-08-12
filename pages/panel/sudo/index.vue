<template>
  <div class="container">
    <card
      :lineBottom="false"
      class="-box-estimated-payment"
      title="Estimated payments"
    >
      <template v-slot:body>
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Date</th>
              <th>Instructor</th>
              <th>Mail</th>
              <th>Mail paypal</th>
              <th>Outstanding Payments</th>
              <th>Estimated payment</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="payment in payments">
              <tr v-for="lessons in payment" :key="lessons.id">
                <!-- date -->
                <td>
                  {{ lessons[0].month_year_date }}
                </td>
                <!-- Instructor -->
                <td>
                  {{ lessons[0].instructor.user.parsed_name }}
                </td>
                <!-- Mail -->
                <td>
                  {{ lessons[0].instructor.user.email }}
                </td>
                <!-- Mail paypal -->
                <td>
                  {{ lessons[0].instructor.paypal_email }}
                </td>
                <!-- Outstanding Payments -->
                <td>
                  ${{ monthlyIncome(lessons) }}
                </td>
                <!-- Estimated payment -->
                <td>
                  <template v-if="!lessons[0].edit_payment">
                    <span>
                      ${{ lessons[0].estimated_payment }}
                    </span>
                    <a @click.prevent="editPayment(lessons[0])">
                      <b-icon
                        pack="fas"
                        icon="pen"
                        size="is-small"
                        class="has-text-link"
                      />
                    </a>
                  </template>
                  <template v-else>
                    <b-field custom-class="is-small">
                      <b-input
                        v-model="lessons[0].estimated_payment"
                        size="is-small"
                        autofocus
                      />
                      <p class="control">
                        <button
                          @click.prevent="updatePayment(lessons[0])"
                          class="button -has-bg-secondary is-small has-text-white"
                        >
                          save
                        </button>
                      </p>
                    </b-field>
                  </template>
                </td>
                <!-- options -->
                <td>
                  <payment-details
                    :month="lessons[0].date"
                    :instructor="lessons[0].instructor"
                  />
                  <b-tooltip
                    v-if="lessons[0].estimated_payment > 0 "
                    label="Mark as paid"
                    type="is-light"
                  >
                    <a
                      @click.prevent="markAsPaid(lessons)"
                      class="button is-small"
                    >
                      <span class="icon is-small">
                        <i class="fas fa-check" />
                      </span>
                    </a>
                  </b-tooltip>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </template>
    </card>
  </div>
</template>
<style lang="sass">
.-box-estimated-payment
  padding-bottom: 2rem
</style>

<script>
import Card from '~/components/general/Card.vue'
import PaymentDetails from '~/components/panel/sudo/payments/details.vue'
import axios from 'axios'
export default {
  layout: 'panel',
  components: {
    Card,
    PaymentDetails
  },
  data() {
    return {
      payments: [],
      loadingPay: false
    }
  },
  created() {
    this.$nuxt.$on('payment-removed', data => {
      this.getPayments()
    })
  },
  mounted() {
    this.getPayments()
  },
  methods: {
    monthlyIncome(lessons) {
      let total = 0
      lessons.forEach(lesson => {
        total += parseFloat(lesson.price)
      })
      const paid = lessons[0].paid
      total = total - paid
      return total.toFixed(2)
    },
    editPayment(lesson) {
      lesson.edit_payment = true
    },
    updatePayment(lesson) {
      lesson.edit_payment = false
    },
    getPayments() {
      const url = process.env.apiUrl + 'lessons'
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          params: {
            groupBy: 'month'
          },
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.payments = response.data
        })
    },
    markAsPaid(lessons) {
      this.loadingPay = true
      const url = process.env.apiUrl + 'payments'
      const authorization = this.$store.getters['auth/headerAuthorization']
      const amount = this.monthlyIncome(lessons)
      const paid = lessons[0].estimated_payment

      const data = {
        amount: amount,
        instructor_id: lessons[0].instructor_id,
        paid: paid,
        date: lessons[0].date
      }

      axios
        .post(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          // lesson.estimated_payment = response.data
          // eslint-disable-next-line
          console.log(response.data)
          this.success()
          this.getPayments()
        })
        .catch(() => {
          alert('We had an error updating your data')
        })
    },
    success() {
      this.$snackbar.open({
        message: `Data was updated succesfully`,
        position: 'is-top-right'
      })
    }
  }
}
</script>
