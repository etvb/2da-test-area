<template>
  <div class="is-inline">
    <b-tooltip label="Details" type="is-light">
      <a @click.prevent="details" class="button is-small">
        <span class="icon is-small">
          <i class="fas fa-eye" />
        </span>
      </a>
    </b-tooltip>
    <b-modal :active.sync="isModalActive">
      <card
        :lineBottom="false"
        :title="title"
      >
        <template v-slot:body>
          <table v-if="payments.length" class="table is-fullwidth">
            <thead>
              <tr>
                <th>Instructor Amount</th>
                <th>Paid</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in payments" :key="payment.id">
                <td>${{ payment.amount }} </td>
                <td>${{ payment.paid }}</td>
                <td>{{ payment.created_at }}</td>
                <td>
                  <b-tooltip label="Remove" type="is-light">
                    <a
                      @click.prevent="remove(payment)"
                      class="button is-small is-danger"
                    >
                      <span class="icon is-small has-text-white">
                        <i class="fas fa-trash" />
                      </span>
                    </a>
                  </b-tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </card>
    </b-modal>
  </div>
</template>
<script>
import Card from '~/components/general/Card.vue'
import axios from 'axios'
export default {
  components: {
    Card
  },
  props: {
    month: {
      type: String,
      required: true
    },
    instructor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isModalActive: false,
      lessons: [],
      payments: [],
      title: ''
    }
  },
  methods: {
    details() {
      this.isModalActive = true
      this.getPayments()
    },
    setTitle(payments) {
      if (!payments.length) {
        this.title = 'No data to display'
      } else {
        const instructorName = this.instructor.user.parsed_name
        const month = payments[0].month_year_date
        this.title = instructorName + ' ' + month
      }
    },
    remove(payment) {
      const url = process.env.apiUrl + 'payments/' + payment.id
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .delete(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.getPayments()
          this.$nuxt.$emit('payment-removed')
        })
    },
    getPayments() {
      const url =
        process.env.apiUrl + 'instructors/' + this.instructor.id + '/payments'
      const authorization = this.$store.getters['auth/headerAuthorization']
      const data = {
        month: this.month.charAt(6)
      }
      axios
        .get(url, {
          params: data,
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          const payments = response.data
          this.payments = payments
          this.setTitle(payments)
        })
    }
  }
}
</script>
