<template>
  <div class="container">
    <div class="columns">
      <div class="column is-5">
        <h4 class="title is-5">
          Overview Current Month
        </h4>
        <monthly-estimated-classes />
        <monthly-estimated-income />
        <hr class="-is-transparent">
        <h4 class="title is-5 -is-spaced-top">
          Overview lifetime
        </h4>
        <total-payments />
      </div>
      <div class="column">
        <h4 class="title is-5">
          Payment Overview
        </h4>
        <monthly-estimated-payments :payments="payments" />
      </div>
    </div>
  </div>
</template>
<script>
import MonthlyEstimatedClasses from '~/components/panel/instructor/dashboard/MonthlyEstimatedClasses.vue'
import MonthlyEstimatedPayments from '~/components/panel/instructor/dashboard/MonthlyEstimatedPayments.vue'
import MonthlyEstimatedIncome from '~/components/panel/instructor/dashboard/MonthlyEstimatedIncome.vue'
import TotalPayments from '~/components/panel/instructor/dashboard/TotalPayments.vue'
import axios from 'axios'
export default {
  layout: 'panel',
  components: {
    MonthlyEstimatedClasses,
    MonthlyEstimatedPayments,
    MonthlyEstimatedIncome,
    TotalPayments
  },
  data() {
    return {
      payments: []
    }
  },
  mounted() {
    this.getEstimatedPayments()
    this.alreadyFilledProfile()
  },
  methods: {
    getEstimatedPayments() {
      const user = this.$store.getters['auth/loggedUser']
      const url = process.env.apiUrl + 'instructors/' + user.id + '/payments'
      const authorization = this.$store.getters['auth/headerAuthorization']
      const data = {
        year: new Date().getFullYear()
      }
      axios
        .get(url, {
          params: data,
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.payments = response.data
        })
    },
    alreadyFilledProfile() {
      const user = this.$store.getters['auth/loggedUser']
      if (!user.language_id) {
        this.$router.push('/panel/instructor/stepper')
      }
    }
    /* getInstructor() {
      const user = this.$store.getters['auth/loggedUser']
      const url = process.env.apiUrl + 'instructor/' + user.id
      axios.get(url).then(response => {
        // eslint-disable-next-line no-console
        console.log(response.data)
        return response.data
      })
    } */
  }
}
</script>
