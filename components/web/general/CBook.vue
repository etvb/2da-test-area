<template>
<div class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8">
          <b-modal
            :active.sync="isCalendarModalActive"
            class="-has-bg-primary"
          >
            <div class="box is-radiusless -box-schedule">
              <b-message type="is-info">
                All times shown are in your local time.
              </b-message>
              <h5 class="title is-5 has-text-centered">
                <!-- Select date and time -->
                Fill in the required data to book your class
              </h5>
              <div class="columns is-centered">
                <div class="column is-narrow">
                  <b-field
                    :label="languageToTeach.english + ' level'"
                    :message="langLevelMessage"
                    type="is-info"
                    class="-field-level"
                  >
                    <b-select
                      v-model="selectedOptionLevel"
                      @input="changedLangLevel"
                      expanded
                    >
                      <option
                        v-for="option in optionsLevel"
                        :value="option.level"
                        :key="option.id"
                      >
                        {{ option.level }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-field
                    label="Do you have a topic you would like to cover in this lesson? (e.g. grammar, vocabulary, conversation etc.)"
                    class="-field-level"
                  >
                    <b-input
                      v-model="topic"
                      type="textarea"
                      rows="1"
                      placeholder="I want to learn about animals."
                    />
                  </b-field>
                  <div
                    id="calendar-box"
                    class="box is-inline-block is-paddingless -is-shadowless-desktop"
                  >
                    <b-datepicker
                      v-model="date"
                      :unselectable-days-of-week="unselectableDays"
                      :unselectable-dates="unselectableTimes"
                      :min-date="minDate"
                      :max-date="maxDate"
                      @input="changeTimesSchedule(date)"
                      inline
                    />
                  </div>
                </div>
                <div class="column is-narrow">
                  <div class="box is-fullwidth -times">
                    <h4 class="title is-6">
                      Time
                    </h4>
                    <hr>
                    <div
                      v-for="time in times"
                      :key="time"
                      class="field"
                    >
                      <b-radio
                        v-model="radio"
                        :native-value="time"
                      >
                        {{ time }}
                      </b-radio>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="columns">
                <div class="column" />
                <div class="column is-narrow">
                  <div class="field is-grouped">
                    <p class="control">
                      <a
                        @click.prevent="book"
                        :class="{'is-loading': loadingBook}"
                        class="button -has-bg-primary has-text-white"
                      >
                        Book
                      </a>
                    </p>
                    <p class="control">
                      <a
                        @click.prevent="cancelBook"
                        class="button"
                      >
                        Cancel
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="sass">
@import '~/assets/css/_media-queries.sass'
.-box-schedule
  border: 1px solid red
  margin: 0 1rem
  .-times
    +tablet
      margin-top: 140px
</style>
<script>
import axios from 'axios'
export default {
  props: {
    isCalendarModalActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const today = new Date()
    return {
      isCardModalIntroductionVideo: false,
      date: today,
      minDate: new Date(),
      // minDate: new Date(2020, 0),
      // maxDate: new Date(2020, 3),
      // maxDate from below will be used after january
      maxDate: new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 60
      ),
      // instructor: {
      //   course: {
      //     img: '/english-course.jpg'
      //   }
      // },
      loadingBook: false,
      instructorLanguage: [],
      instructorTimezone: false,
      instructor: [],
      times: [],
      radio: '',
      schedules: [],
      unselectableTimes: [],
      languageToTeach: '',
      optionsLevel: [
        { level: 'Proficient', id: 1 },
        { level: 'Advanced', id: 2 },
        { level: 'Upper-intermediate', id: 3 },
        { level: 'Intermediate', id: 4 },
        { level: 'Pre-intermediate', id: 5 },
        { level: 'Elementary', id: 6 },
        { level: 'Beginner', id: 7 }
      ],
      selectedOptionLevel: 'Beginner',
      topic: '',
      langLevelMessage: 'You only know a few words of the language, if that.'
    }
  },
  computed: {
    unselectableDays() {
      const schedules = this.schedules
      const days = [1, 2, 3, 4, 5, 6, 0]
      const selectableDays = this.selectableDays(schedules)
      const unselectableDays = days.filter(x => !selectableDays.includes(x))
      return unselectableDays
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // this.getLanguage()
    // this.getTimezone()
    // this.getInstructorSchedules()
    // this.unselectableDates()
    this.getLanguageToTeach()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getLanguageToTeach(idLanguage) {
      idLanguage = this.$route.params.lang
      const url = `${process.env.apiUrl}languages/${idLanguage}`

      axios.get(url).then(response => {
        this.languageToTeach = response.data
      })
    },
    selectableDays(schedules) {
      const days = []
      schedules.forEach(schedule => {
        days.push(schedule.day)
      })
      return days
    },
    unselectableDates() {
      const dates = this.instructor.disabled_dates
      const unselectableDates = []
      dates.forEach(date => {
        const parsedDate = date.date + 'T' + '00:00:00' // For safari compatibility
        unselectableDates.push(new Date(parsedDate))
      })
      this.unselectableTimes = unselectableDates
    },
    changeTimesSchedule(date) {
      const instructor = this.instructor
      this.getInstructorAvailableTimesAtSpecificDate(instructor.id, date)
    },
    getInstructorAvailableTimesAtSpecificDate(instructorId, date) {
      // const weekDay = date.getDay() // Get the weekday as a number (0-6)
      const day = date.getDate() // Get the day as a number (1-31)
      const month = date.getMonth() // Get the month as a number (0-11)
      const year = date.getFullYear() // Get the year as a four digit number (yyyy)

      const fullDate = `${year}-${month + 1}-${day}`
      const data = { date: fullDate }
      const url = `${
        process.env.apiUrl
      }instructor/${instructorId}/available-times`
      axios
        .get(url, {
          params: data
        })
        .then(response => {
          const data = response.data
          // reverse array to start from lowest
          this.changeClassesToUserTimezone(data.reverse())
        })
        .catch(() => {
          alert('Tuvimos un problema para obtener el calendario del instructor')
        })
    },
    changeClassesToUserTimezone(availableTimesUTC) {
      let times = []
      times = availableTimesUTC.map(time => {
        const date = this.parseDateToUserTimezone(time)
        return date
      })
      this.times = times
    },
    parseDateToUserTimezone(UTCDate) {
      // const timezoneInstructor = this.instructor.user.timezone
      let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (this.loggedIn) timezone = this.user.timezone
      const d = new Date(UTCDate).toLocaleString('en-US', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
      // remove 0's at the begin of the time
      const dWithout0AtTheBeginning = d.indexOf('0') === 0 ? d.substring(1) : d
      return dWithout0AtTheBeginning
    },
    book() {
      const time = this.radio
      if (!time.length) return alert('Please select a time')

      this.loadingBook = true
      const date = this.date
      // const parsedDate = date.toJSON().slice(0, 10)
      // const weekDay = date.getDay() // Get the weekday as a number (0-6)
      const day = date.getDate() // Get the day as a number (1-31)
      const month = date.getMonth() // Get the month as a number (0-11)
      const year = date.getFullYear() // Get the year as a four digit number (yyyy)
      const parsedDate = `${year}-${month + 1}-${day}`
      this.$store.commit('cart/addClassToCart', {
        languageLevel: this.selectedOptionLevel,
        time: time,
        topic: this.topic,
        date: parsedDate,
        instructor: this.instructor,
        language: this.$route.params.lang
      })
      this.$router.push('/cart')
    },
    cancelBook() {
      this.isCalendarModalActive = false
    },
    getLanguage() {
      if (this.instructor.user.language_id) {
        const url = `${process.env.apiUrl}languages/${
          this.instructor.user.language_id
        }`
        axios.get(url).then(response => {
          this.instructorLanguage = response.data
        })
      }
    },
    getTimezone() {
      const url = `${process.env.apiUrl}timezones/${
        this.instructor.user.timezone_id
      }`
      axios.get(url).then(response => {
        this.instructorTimezone = response.data
      })
    },
    changedLangLevel() {
      const selectedOptionLevel = this.selectedOptionLevel
      switch (selectedOptionLevel) {
        case 'Proficient':
          this.langLevelMessage =
            "You're fluent, pretty much mother tongue, extremely comfortable, you have complete control over the language."
          break

        case 'Advanced':
          this.langLevelMessage =
            'Comfortable in most situations, strong vocabulary, few errors.'
          break

        case 'Upper-intermediate':
          this.langLevelMessage =
            "You're comfortable in most situations, still some good mistakes."
          break

        case 'Intermediate':
          this.langLevelMessage =
            'Now you can converse in many situations, with less serius errors.'
          break

        case 'Pre-intermediate':
          this.langLevelMessage =
            'Limited vocabulary, but with some help you can participate in basic conversations. You still make a lot of big mistakes.'
          break

        case 'Elementary':
          this.langLevelMessage =
            'You can ask a few basic questions and ideas, but with a lot of mistakes'
          break

        case 'Beginner':
          this.langLevelMessage =
            'You only know a few words of the language, if that'
          break
        default:
          this.langLevelMessage = ''
          break
      }
    }
  }
}
</script>
<style lang="sass">
.-times
  border: 1px solid red
  .b-radio
    width: 100%
    .control-label
      margin-left: auto
</style>
