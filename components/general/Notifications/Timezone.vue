<template>
  <div class="-notificaton -has-bg-primary has-text-white">
    <div v-show="loggedIn && differentTimezones && !timezoneMessage" class="-message">
      Your browser's timezone is different from your timezone saved in our app.
      <br>
      Do you want to save your current timezone to improve your search results?
      <div>
        <button @click="turnOffTimezone" class="button is-outlined is-small">
          Don't show this message again
        </button>
        <button @click="updateTimezone" class="button is-outlined is-small">
          Save {{ timezoneBrowser }} as my timezone
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      timezoneBrowser: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  },
  computed: {
    ...mapGetters({
      loggedUser: 'auth/loggedUser',
      authorization: 'auth/headerAuthorization'
    }),
    loggedIn() {
      return this.$store.state.auth.auth.loggedIn
    },
    differentTimezones() {
      return this.timezoneBrowser !== this.userTimezone
    },
    userTimezone() {
      return this.$store.state.auth.auth.user.timezone
    },
    timezoneMessage() {
      return this.$store.state.messages.turnOffTimezoneMessage
    }
  },
  methods: {
    ...mapMutations({
      timezone: 'auth/timezone',
      turnOffTimezone: 'messages/turnOffTimezone'
    }),
    updateTimezone() {
      const endpoint = `${process.env.apiUrl}users/${
        this.loggedUser.id
      }/timezone`
      const data = {
        timezone: this.timezoneBrowser
      }
      axios
        .patch(endpoint, data, {
          headers: {
            Authorization: 'Bearer ' + this.authorization
          }
        })
        .then(response => {
          this.timezone({
            timezone: this.timezoneBrowser,
            offsetMinutesTimezone: response.data
          })
          this.updatedTimezone()
        })
        .catch(error => {
          // eslint-disable-next-line
          console.log(error)
          alert('We could not update your timezone')
        })
    },
    updatedTimezone() {
      this.$snackbar.open({
        message: `Timezone was updated`,
        position: 'is-top-right'
      })
    }
  }
}
</script>
<style lang="sass" scoped>
@import "~/assets/css/_media-queries.sass"
.-notificaton
  position: fixed
  top: 0
  z-index: 99
  width: 100%
  .-message
    padding: 1rem
    +tablet
      display: flex
      justify-content: space-between
      align-items: center
  .button
    background: transparent
    color: white
    display: block
    width: 100%
    &:not(:last-child)
      margin-bottom: 5px
</style>
