<template>
  <card title="Payments">
    <template v-slot:body>
      <b-message type="is-info">
        Enter your paypal email. <br>
        Skillzzbox will transfer all your incomes to this account. <br>
        If you do not have a PayPal account yet, please create one
        <a href="https://paypal.com" target="_blank">here</a>.
      </b-message>
      <form @submit.prevent="submit" action="#">
        <b-field grouped>
          <b-input
            v-model="instructor.paypal_email"
            placeholder="user@gmail.com"
            expanded
            required
          />
          <p class="control">
            <button
              :class="{'is-loading': loading}"
              class="button -has-bg-primary has-text-white"
            >
              Save
            </button>
          </p>
        </b-field>
      </form>
    </template>
  </card>
</template>
<script>
import Card from '~/components/general/Card.vue'
import axios from 'axios'
export default {
  components: {
    Card
  },
  props: {
    instructor: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    submit() {
      this.loading = true
      const instructor = this.instructor
      const url =
        process.env.apiUrl + 'instructors/' + instructor.id + '/paypal-email'
      const data = { email: this.instructor.paypal_email }
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .put(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          this.success()
        })
        .catch(error => {
          this.loading = false
          if (error.response.status === 422) {
            alert('Your email is already taken')
          }
          alert('We have an error trying to update your data')
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
