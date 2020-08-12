<template>
  <div class="hero">
    <div class="hero-body">
      <div class="container">
        <b-message
          v-if="message.text"
          :type="message.type"
          class="-is-spaced"
        >
          {{ message.text }}
        </b-message>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      token: this.$route.query.token,
      message: {
        text: false,
        type: 'is-danger'
      }
    }
  },
  mounted() {
    this.verifyEmail()
  },
  methods: {
    verifyEmail() {
      const userId = this.$route.query.id
      const url = process.env.apiUrl + 'auth/email/verify/' + userId
      const data = { token: this.token }
      axios
        .put(url, data)
        .then(response => {
          this.message.text = 'Email verified succesfully'
          this.message.type = 'is-success'
        })
        .catch(error => {
          if (error.response.status === 302) {
            this.message.text = error.response.data.message
            return
          }
          this.message.text = "Couldn't verify your email"
        })
    }
  }
}
</script>
