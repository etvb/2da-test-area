<template>
  <div class="hero is-medium">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h4 class="subtitle is-5">
              Get in touch
            </h4>
            <p>
              We’re here to help and answer any question you might have. We look forward to hearing from you
            </p>
            <ul class="-is-spaced-top">
              <li>
                <b-icon
                  pack="fas"
                  icon="user"
                  size="is-medium"
                />
                hello@skillzzbox.com
              </li>
            </ul>
          </div>
          <div v-if="sent" class="column">
            <b-message type="is-success" has-icon>
              Your message was sent.
            </b-message>
          </div>
          <div v-else class="column">
            <h4 class="subtitle is-5">
              Contact Form
            </h4>
            <form @submit.prevent="send()" action="#">
              <b-field>
                <b-input
                  v-model="form.name"
                  placeholder="Name"
                  icon-pack="fas"
                  icon="user"
                  size="is-medium"
                  required
                />
              </b-field>
              <b-field>
                <b-input
                  v-model="form.email"
                  placeholder="Email"
                  type="email"
                  icon-pack="fas"
                  icon="envelope"
                  size="is-medium"
                  required
                />
              </b-field>
              <b-field label="Message">
                <b-input v-model="form.message" type="textarea" size="is-medium" required />
              </b-field>

              <button
                :class="{'is-loading': loading}"
                class="button -has-bg-primary has-text-white is-medium is-pulled-right"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        message: ''
      },
      loading: false,
      sent: false
    }
  },
  methods: {
    send() {
      const url = process.env.apiUrl + 'contact'
      const data = this.form
      this.loading = true
      axios
        .post(url, data)
        .then(() => {
          this.loading = false
          this.sent = true
        })
        .catch(() => {
          alert('We had an error trying to send your message')
          this.loading = false
        })
    }
  }
}
</script>
