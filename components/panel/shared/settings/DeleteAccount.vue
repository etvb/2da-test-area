<template>
  <div>
    <!-- <card title="Delete Account"> -->
    <card>
      <template v-slot:body>
        <b-message type="is-info">
          Delete your account is an irreversible action,
          click only if you are sure that you want to delete your account.
        </b-message>
        <div class="has-text-centered">
          <button
            @click="deleteAccount"
            :class="{'is-loading': loading}"
            class="button is-medium is-info"
          >
            Delete Account
          </button>
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
  data() {
    return {
      loading: false
    }
  },
  methods: {
    deleteAccount() {
      const confirmation = confirm('¿Are you sure to delete your account?')
      if (!confirmation) {
        return
      }
      this.loading = true
      const user = this.$store.getters['auth/loggedUser']
      const url = process.env.apiUrl + 'users/' + user.id
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .delete(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          this.$store.commit('auth/logOutUser')
          this.$router.push('/')
          this.success()
        })
        .catch(() => {
          this.loading = false
          alert('We could not delete your account')
        })
    },
    success() {
      this.$snackbar.open({
        message: `Your account was deleted successfully`,
        position: 'is-top-right'
      })
    }
  }
}
</script>
