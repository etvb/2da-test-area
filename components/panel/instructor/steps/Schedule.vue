<template>
  <div>
    <!-- this component is not used yet, changed for SChedule2 -->
    <b-message type="is-info">
      Select the days and times that you will be available to teach
    </b-message>
    <table class="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th>Day</th>
          <th>Start time</th>
          <th>End time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in days" :key="day.day">
          <td>
            {{ day.name }}
          </td>
          <td>
            <!-- <b-timepicker v-model="day.start_at" size="is-small" inline /> -->
            <input v-model="day.start_at" type="time" class="input">
          </td>
          <td>
            <!-- <b-timepicker
              v-model="day.end_at"
              :time-parser="day.end_at"
              size="is-small"
              inline
            /> -->
            <input v-model="day.end_at" type="time" class="input">
          </td>
          <td>
            <button
              v-if="day.enabled"
              @click.prevent="disableDay(day)"
              class="button is-danger -disable -is-fullwidth"
            >
              Disable
            </button>
            <button
              v-else
              @click.prevent="enableDay(day)"
              class="button is-primary -enable is-block -is-fullwidth"
            >
              Enable
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td />
          <td />
          <td />
          <td>
            <button
              @click.prevent="updateSchedule"
              :class="{'is-loading': loading}"
              class="button -has-bg-primary has-text-white -is-fullwidth"
            >
              &nbsp; Save &nbsp;
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
const midnight = '00:00'
export default {
  data() {
    return {
      loading: false,
      days: [
        {
          name: 'Monday',
          day: 1,
          start_at: midnight,
          end_at: midnight,
          enabled: false
        },
        {
          name: 'Tuesday',
          day: 2,
          start_at: midnight,
          end_at: midnight,
          enabled: false
        },
        {
          name: 'Wednesday',
          day: 3,
          start_at: midnight,
          end_at: midnight,
          enabled: false
        },
        {
          name: 'Thursday',
          day: 4,
          start_at: midnight,
          end_at: midnight,
          enabled: false
        },
        {
          name: 'Friday',
          day: 5,
          start_at: midnight,
          end_at: midnight,
          enabled: false
        },
        {
          name: 'Saturday',
          day: 6,
          start_at: midnight,
          end_at: midnight,
          enabled: false
        },
        {
          name: 'Sunday',
          day: 0,
          start_at: midnight,
          end_at: midnight,
          enabled: false
        }
      ]
    }
  },
  mounted() {
    this.getInstructorSchedules()
  },
  methods: {
    getInstructorSchedules() {
      const user = this.$store.getters['auth/loggedUser']
      const authorization = this.$store.getters['auth/headerAuthorization']
      const url = process.env.apiUrl + 'instructors/' + user.id + '/schedules'

      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          const schedules = response.data
          this.mergeDays(schedules)
        })
    },
    mergeDays(schedules) {
      const days = this.days
      days.forEach(day => {
        schedules.forEach(schedule => {
          if (day.day === schedule.day) {
            day.enabled = true
            day.start_at = schedule.start_at.substring(0, 5)
            day.end_at = schedule.end_at.substring(0, 5)
          }
        })
      })
    },
    enableDay(day) {
      day.enabled = true
    },
    disableDay(day) {
      day.enabled = false
    },
    updateSchedule() {
      const user = this.$store.getters['auth/loggedUser']
      const authorization = this.$store.getters['auth/headerAuthorization']
      const url = process.env.apiUrl + 'instructors/' + user.id + '/schedules'
      const data = this.prepareSchedules()
      this.loading = true
      axios
        .post(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          this.success()
        })
        .catch(() => {
          alert('We had an error updating yuour data')
          this.loading = false
        })
    },
    prepareSchedules() {
      const schedules = []
      const days = this.days
      days.forEach(day => {
        if (day.enabled) {
          const name = day.name
          delete day.name
          // day.start_at = day.start_at.getTime()
          // day.end_at = day.end_at.toString().substring(18, 25)
          schedules.push(day)
          day.name = name
        }
      })
      return schedules
    },
    success() {
      this.$emit('completed')
    }
  }
}
</script>
