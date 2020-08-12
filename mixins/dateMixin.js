import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'auth/loggedUser',
      loggedIn: 'auth/loggedIn'
    })
  },
  methods: {
    utcToUserDate(utcDate) {
      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (this.loggedIn) timezone = this.user.timezone
      // const momentDate = this.$moment_timezone(utcDate).tz(timezone)
      const momentDate = this.$moment_timezone(new Date(utcDate)).tz(timezone)
      return momentDate.format('LLL')
    }
  }
}
