<template>
  <card
    :lineBottom="false"
    :lineTop="false"
  >
    <template v-slot:body>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total earnings</th>
            <th>Subtracted Skillzzbox fees</th>
            <th>Paid Out*</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in payments" :key="index">
            <td>
              <!-- {{ payment.month_year_date }} -->
              {{ payment.created_at }}
            </td>
            <td>
              <!-- ${{ calculatePaidAmount(payment.amount) }} -->
              ${{ payment.amount }}
            </td>
            <td>
              <!-- USD 2.50 Per class -->
              ${{ payment.amount - payment.paid }}
            </td>
            <td class="-has-text-secondary">
              ${{ payment.paid }}
            </td>
          </tr>
        </tbody>
      </table>
      <span class="is-size-7">
        *Please be informed that additional fees charged by Paypal are not considered.
      </span>
    </template>
  </card>
</template>
<script>
import Card from '~/components/general/Card.vue'
export default {
  components: {
    Card
  },
  props: {
    payments: {
      type: Object,
      default: () => ({})
    }
  }
  // methods: {
  //   calculatePaidAmount(paid) {
  //     const inc = paid - paid * 0.135
  //     return inc
  //   }
  // }
}
</script>
