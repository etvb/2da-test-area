<template>
  <div>
    <b-message type="is-info">
      Here you can disable specific dates.
    </b-message>
    <card title="Disabled dates" class="-overflow-unset -disabled-dates-card">
      <template v-slot:body>
        <b-field
          v-for="disabledDate in disabledDates"
          :key="disabledDate.id"
          grouped
        >
          <b-datepicker
            v-model="disabledDate.date"
            placeholder="Select a date..."
            icon="calendar-today"
            expanded
          />
          <p class="control">
            <button
              @click.prevent="removeDisabledDate(disabledDate)"
              :class="{'is-loading': disabledDate.loading}"
              class="button is-danger"
            >
              Remove
            </button>
          </p>
        </b-field>
        <b-field grouped>
          <b-datepicker
            v-model="date"
            placeholder="Select a date..."
            icon="calendar-today"
            expanded
          />
          <p class="control">
            <button
              @click.prevent="disableDate"
              :class="{'is-loading': loading}"
              class="button is-primary"
            >
              Save date
            </button>
          </p>
        </b-field>
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
      // date: '',
      date: new Date(),
      loading: false,
      disabledDates: []
    }
  },
  mounted() {
    this.getDisabledDates()
  },
  methods: {
    getDisabledDates() {
      const user = this.$store.getters['auth/loggedUser']
      const authorization = this.$store.getters['auth/headerAuthorization']
      const url =
        process.env.apiUrl + 'instructors/' + user.id + '/dates/disabled'
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          // eslint-disable-next-line no-console
          // console.log(response.data)
          const dates = response.data
          this.disabledDates = this.parseDates(dates)
        })
        .catch(() => {
          this.loading = false
          alert(
            'We could not load your disabled dates, try loading your browser again'
          )
        })
    },
    parseDates(dates) {
      dates.forEach(date => {
        // const parsedDate = date.date.replace(/-/g, ', ')
        const parsedDate = date.date + 'T' + '00:00:00' // For safari compatibility
        date.date = new Date(parsedDate)
        date.loading = false
      })
      return dates
    },
    disableDate() {
      if (this.date === '') {
        alert('Select a date to add')
        return
      }
      this.loading = true
      const user = this.$store.getters['auth/loggedUser']
      const authorization = this.$store.getters['auth/headerAuthorization']
      const url =
        process.env.apiUrl + 'instructors/' + user.id + '/dates/disable'
      // const data = { date: this.date.toJSON().slice(0, 10) }
      const data = { date: this.prepareDate() }
      axios
        .post(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          this.success('Date was added succesfully')
          this.getDisabledDates()
        })
        .catch(() => {
          this.loading = false
          alert('We could not save the date')
        })
    },
    prepareDate() {
      const date = this.date
      const day = date.getDate() // Get the day as a number (1-31)
      const month = date.getMonth() // Get the month as a number (0-11)
      const year = date.getFullYear() // Get the year as a four digit number (yyyy)

      const fullDate = `${year}-${month + 1}-${day}`
      return fullDate
    },
    removeDisabledDate(date) {
      // eslint-disable-next-line no-console
      console.log(date)
      date.loading = true
      const authorization = this.$store.getters['auth/headerAuthorization']
      const url = process.env.apiUrl + 'disabled-dates/' + date.id
      axios
        .delete(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          date.loading = false
          this.getDisabledDates()
          this.success('Date was removed succesfully')
        })
        .catch(() => {
          date.loading = false
          alert('We could not delete the date')
        })
    },
    success(message) {
      this.$snackbar.open({
        message: message,
        position: 'is-top-right'
      })
    }
  }
}
</script>
<style lang="sass">
.-disabled-dates-card
  .button
    min-width: 100px
</style>
