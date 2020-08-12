<template>
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
        <td :class="day.enabled ? '':'colorStart'">
          {{ day.name }}
        </td>
        <td>
          <!-- <select id="" name="">
            <option value="0">
              00
            </option>
          </select> -->
          <b-timepicker 
            id="prueba"
            v-model="day.start_at"
            :increment-minutes="60"
            :max-time="maxTime()"
            :disabled="!day.enabled"
            size="is-small"
            inline
          />                  
        </td>
        <td>
          <b-timepicker
            v-model="day.end_at"
            :increment-minutes="60"
            :min-time="minTime(day.start_at)"
            :disabled="!day.enabled"
            size="is-small"
            inline
          />
        </td>
        <td>
          <button
            v-if="day.enabled"
            @click.prevent="disableDay(day)"
            class="button1 is-danger2 -disable2 is-block2 -is-fullwidth2"
          >
            Disable
          </button>
          <button
            v-else
            @click.prevent="enableDay(day)"
            class="button2 is-primary2 -enable2  -is-fullwidth2"
          >
            Enable 
          </button>
          <!-- <button
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
                  </button> -->
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
            class="button3 -has-bg-primary has-text-white -is-fullwidth2"
          >
            &nbsp; Save &nbsp;
          </button>
        </td>
      </tr>
    </tfoot>
    <!-- <disable-dates /> -->
  </table>
</template>
<script>
// import Card from '~/components/general/Card.vue'
// import DisableDates from '~/components/panel/instructor/classes/schedule/DisableDates.vue'
import axios from 'axios'
import moment from 'moment'
const midnight = new Date(new Date().setHours(0, 0, 0, 0))
// const midnight = new Date()
// const midnight = '00:00:00'
export default {
  // layout: 'panel',
  components: {
    // Card,
    // DisableDates
  },
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
      ],
      schedules: []
    }
  },
  mounted() {
    this.getInstructorSchedules()
    this.deletMinuts()
  },
  methods: {
    deletMinuts() {
      const colon = document.querySelectorAll('.is-colon')
      const minuts = document.querySelectorAll('.timepicker select')
      // eslint-disable-next-line no-console
      console.log(minuts)
      minuts[1].style.display = 'none'
      minuts[3].style.display = 'none'
      minuts[5].style.display = 'none'
      minuts[7].style.display = 'none'
      minuts[9].style.display = 'none'
      minuts[11].style.display = 'none'
      minuts[13].style.display = 'none'
      minuts[15].style.display = 'none'
      minuts[17].style.display = 'none'
      minuts[19].style.display = 'none'
      minuts[21].style.display = 'none'
      minuts[23].style.display = 'none'
      minuts[25].style.display = 'none'
      minuts[27].style.display = 'none'
      // for (let i = 0; minuts.length >= i; i++) {
      //   if (i / 2 !== 0) {
      //     minuts[i].style.display = 'none'
      //   }
      // }

      for (const item of colon) {
        item.textContent = ''
      }
    },
    test() {
      /* alert('dewdw') */
      return new Date()
    },
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
          // this.schedules = response.data
          const schedules = response.data
          this.mergeDays(schedules)
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
    mergeDays(schedules) {
      const days = this.days
      days.forEach(day => {
        schedules.forEach(schedule => {
          if (day.day === schedule.day) {
            day.enabled = true
            // day.start_at = new Date(schedule.start_at) // creates a Date Object using the clients current time
            day.end_at = new Date(schedule.end_at) // creates a Date Object using the clients current time
            day.start_at = this.parseDateToUserTimezone(schedule.start_at)
            day.end_at = this.parseDateToUserTimezone(schedule.end_at)
          }
        })
      })
    },
    // we use the user timezone saved in our database
    parseDateToUserTimezone(UTCDate) {
      // Difference in minutes betweenn UTCa and user timezone saved in our database
      const offsetMinutesTimezone = this.$store.state.auth.auth.user
        .offset_minutes_timezone
      const date = new Date()
      // Difference in minutes between UTC and user browser timezone
      const browserOffset = date.getTimezoneOffset()
      // read more about returned value with gettimeoffset on https://www.w3schools.com/jsref/jsref_gettimezoneoffset.asp
      const totalOffset = offsetMinutesTimezone + browserOffset
      const newDate = moment(UTCDate).utc()
      totalOffset > 0
        ? newDate.add(totalOffset, 'minutes')
        : newDate.subtract(totalOffset, 'minutes')

      return newDate.toDate()
    },
    prepareSchedules() {
      const schedules = []
      const days = this.days

      days.forEach(day => {
        if (day.enabled) {
          const newDay = {}

          const name = day.name
          delete day.name

          // We store tue time in user timezone to handle user's timezone changes
          newDay.start_at = day.start_at.toString().substring(16, 25)
          newDay.end_at = day.end_at.toString().substring(16, 25)

          // We use toISOString to send date in UTC timezone
          /* newDay.start_at = day.start_at.toISOString().substring(11, 23)
          newDay.end_at = day.end_at.toISOString().substring(11, 23)  */

          newDay.day = day.day

          // schedules.push(day)
          schedules.push(newDay)
          day.name = name
        }
      })
      return schedules
    },
    success() {
      const urlNow = window.location.href
      // eslint-disable-next-line no-console
      console.log(urlNow)
      if (urlNow !== 'https://skillzzbox.com/panel/instructor/stepper') {
        this.$snackbar.open({
          message: `Schedule was updated succesfully`,
          position: 'is-top-right'
        })
      }
      this.$emit('completed')
    },
    minTime(date) {
      const hour = date.getHours()
      const min = hour + 1
      // create new date to handle two way data binding problems
      const newDate = new Date(date)
      newDate.setHours(min)
      return newDate
    },
    maxTime() {
      const max = new Date()
      max.setHours(22)
      return max
    }
  }
}
</script>
<style scoped>
td {
  vertical-align: middle;
}
.colorStart {
  color: darkgrey;
}
.is-danger2 {
  background-color: rgb(228, 224, 224);
}
button:focus {
  outline: none;
}
.button2,
.button1,
.button3 {
  text-decoration: none;
  font-size: 16px;
  color: #010db4;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: white;
  border-width: 1px;
  border-style: solid;
  border-color: #010db4;
  border-radius: 9px;
  cursor: pointer;
}
.button2:hover,
.button1:hover,
.button3:hover {
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.button1 {
  background-color: rgb(228, 224, 224);
}
.button3 {
  background-color: #167df0;
}
/* .timepicker {
  display: none;
} */
</style>
