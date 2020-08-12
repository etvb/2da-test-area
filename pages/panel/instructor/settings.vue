<template>
  <div class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8">
          <payment :instructor="instructor" />
          <zoom :instructor="instructor" />
          <b-collapse
            :open="false"
            class="panel"
          >
            <div
              slot="trigger"
              class="panel-heading"
              role="button"
            >
              <strong>Switch Profile</strong>
            </div>
            <switch-account />
          </b-collapse>
          <b-collapse
            :open="false"
            aria-id="contentIdForA11y2"
            class="panel"
          >
            <div
              slot="trigger"
              class="panel-heading"
              role="button"
              aria-controls="contentIdForA11y2"
            >
              <strong>Delete Account</strong>
            </div>
            <delete-account />
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Payment from '~/components/panel/instructor/settings/Payments.vue'
import Zoom from '~/components/panel/instructor/settings/Zoom.vue'
import DeleteAccount from '~/components/panel/shared/settings/DeleteAccount.vue'
import SwitchAccount from '~/components/panel/shared/settings/SwitchAccount.vue'
import axios from 'axios'
export default {
  layout: 'panel',
  components: {
    Payment,
    Zoom,
    DeleteAccount,
    SwitchAccount
  },
  data() {
    return {
      instructor: []
    }
  },
  mounted() {
    this.setInstructor()
  },
  methods: {
    setInstructor() {
      const user = this.$store.getters['auth/loggedUser']
      const url = process.env.apiUrl + 'instructor/' + user.id
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.instructor = response.data
        })
    }
  }
}
</script>
