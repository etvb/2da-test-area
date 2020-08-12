<template>
  <div class="section mybg contenedor-principal">
    <b-modal :active.sync="isCardModalIntroductionVideo" :width="560" scroll="keep">
      <div>
        <iframe
          :src="videoUrl"
          width="560"
          height="315"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          style="height: 315px"
          allowfullscreen
        />
      </div>
    </b-modal>
    <div id="prueba" class="container">
      <a @click.prevent="goBack" href="#" class="-has-text-primary">Back to results</a>
      <div class="columns is-centered">
        <div class="column is-6">
          <div id="prueba" class="box is-radiusless -card-details-instructor">
            <!-- In case have course picture -->
            <!-- <div v-if="instructor.course.img"> -->
            <!-- <div v-if="instructor.course"> -->
            <!-- <div class="columns"> -->
            <!-- <div class="column is-7 -column-profile -vertical-flex-align -is-borderless-mobile"> -->
            <!-- <div class="-has-margin-auto"> -->
            <!-- <div class="-is-relative -container-profile-picture -is-fullwidth">
                      <div class="-profile-picture is-inline-block -is-absolute" />
                    </div>
                    <h5 class="title is-5 has-text-centered -name -is-spaced-top">
                      Georg B.
                    </h5> -->
            <!-- <div v-if="instructor.video_url" class="has-text-centered">
                      <button class="button is-small -is-primary-outlined is-rounded">
                        <span>
                          Watch the introduction video 555555
                        </span>
                      </button>
                    </div> -->
            <!-- </div> -->
            <!-- </div> -->
            <!-- <div class="column is-hidden-mobile">
                  <figure class="image">
                    HOLA HOLA
                    <img :src="instructor.course.img">
                  </figure>
                </div> -->
            <!-- </div> -->
            <!-- <hr> -->
            <!-- </div> -->
            <!-- In case only have profile picture -->
            <div class="inlineBlock">
              <div v-show="instructor.user" class="-is-relative -container-profile-picture2 -is-fullwidth has-text-centered">
                <!-- nueva vista -->
                <div class="container-profile-info">
                  <!-- changed the img tag fot div, if the user has image show  -->
                  <div
                    v-if="instructor.user.profile_picture"
                    class="-profile-picture"
                  >
                    <div
                      id="container-profile-img"
                      :style="'background-image: url(' + instructor.user.profile_picture + '); background-size: cover; background-repeat: no-repeat'"
                      class="-is-circle -profile-picture is-inline-block "
                    />
                  </div>
                  <!-- if the user don´t have imege show this -->
                  <img
                    v-else
                    style="opacity: .2;"
                    src="/profile.png"
                    class="-is-circle -profile-picture"
                  >
                  <!-- <div v-else class="-profile-picture is-inline-block" /> -->
                  <div class="container-profile-main">
                    <div class="container-profile-name">
                      <h5 class="title is-marginless is-5 has-text-weight-bold has-text-black">
                        {{ instructor.user.name + ' ' + instructor.user.lastname[0] + '.' }}
                      </h5>   
                    </div>
                    <p class="-has-text-gray newSize">
                      Native Language: <span>{{ instructor.user.language.english }}</span>
                    </p><br>
                    <p v-show="instructor.average_rating" class="container-profile-raiting -has-text-gray">
                      Raiting: <rating :rating="instructor.average_rating ? instructor.average_rating : 0" />
                    </p>
                  </div>
                  <!-- flag -->
                  <span class="container-profile-flag">
                    <div class="borde" />
                    <img :src="pais(instructor.user.country)">
                  </span>
                  <div class="conteiner-like">
                    <like />
                  </div>
                </div>
                <!-- nueva vista FIN -->
                <hr>
                <!-- <div
                  :style="'background-image: url(' + instructor.user.profile_picture + ')'"
                  class="-profile-picture is-inline-block -is-absolute"
                /> -->
                <!-- <img
                  v-if="instructor.user.profile_picture"
                  :src="instructor.user.profile_picture"
                  class="-is-circle -profile-picture -is-absolute"
                > -->
                <!-- <hr> -->
              </div>
              <!-- <h5 class="title is-5 has-text-centered -name">
                {{ adaptedName }}
              </h5> -->
              <!-- <div v-if="instructor.video_url" class="has-text-centered">
                <button @click="openVideo" class="button is-small -is-primary-outlined is-rounded">
                  <span>
                    Watch the introduction video
                  </span>
                </button>
              </div> -->
            </div>

            <!-- <div class="-is-spaced-top">
              <b-tag class="is-rounded -top-badge">
                &nbsp; Top &nbsp;
              </b-tag>
              <rating :rating="4" class="is-pulled-right" />
            </div> -->
            <p class="-is-spaced-top title is-6 description profile-description">
              {{ instructor.description }}
            </p>
            <!-- <div
              id="sticky"
              v-if="!isCalendarModalActive"
              class="box is-radiusless -sticky-data -has-bg-primary"
            >
              <h6 class="title is-6 is-inline-block is-marginless has-text-white">
                Price: ${{ instructor.price_by_class }}/45 Minutes
              </h6>
              <button
                @click="activateCalendarModal"
                class="button is-pulled-right -button-book -is-transparent has-text-white"
              >
                Book
              </button>
              <like class="-like" />
            </div> -->
            <hr>
            <h6 class=" is-6 -is-marginless-bottom -has-text-gray">
              About {{ adaptedName }}
            </h6>
            <div class=" is-6 profile-description">
              {{ instructor.bio }}
            </div>
            <hr>
            <h6 class="-is-spaced-top -is-marginless-bottom -has-text-gray  littleMore">
              Teaches:
            </h6>
            <p v-for="(language, index) in instructorLanguages" :key="index" class="title has-text-weight-normal mb-6 is-6 ">
              {{ language }}
            </p>
            <!-- <h6 class="title is-6 -is-spaced-top -is-marginless-bottom">
              Native language
            </h6> -->
            <p>
              <!-- {{ instructorLanguage.english }} -->
            </p>
            <!-- <h6 class="title is-6 -is-spaced-top -is-marginless-bottom">
              Location
            </h6>
            <p>
              {{ instructor.user.country }}
            </p> -->
            <div class="container-profile-teacher">
              <div>
                <p class="-has-text-gray littleMore">
                  Lesson Price:
                </p>
                <p class="title has-text-weight-normal is-6 ">
                  USD {{ instructor.price_by_class }}
                </p>
                <button
                  @click="activateCalendarModal"
                  class="button is-expand is-fullwidth colorButton size12"
                >
                  Book
                </button>
              </div>
              <div class="marginado">
                <p class="-has-text-gray littleMore">
                  Location:
                </p>
                <p class="title has-text-weight-normal is-6 ">
                  {{ instructor.user.country }}
                </p>
                <button 
                  @click="activateCalendarModal"
                  class="button is-expand is-fullwidth colorButton size12"
                >
                  Schedule
                </button>
              </div>
              <div>
                <!-- <p class="is-size-7 has-text-grey-lighter has-text-weight-bold">
                  Teaches55555555:
                </p>
                <p class="has-text-weight-semibold">
                  put lengugages
                </p> -->
                <button
                  :disabled="!instructor.video_url"
                  @click="openVideo(instructor.video_url)"
                  :value="instructor.video_url"
                  class="button is-expand is-fullwidth colorButton size12"
                > 
                  Video
                </button>
              </div>
            </div>
          </div>
          <!-- End box -->

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
<style lang="sass" scoped>
@import '~/assets/css/_media-queries.sass'
.button:hover
  color: #363636

.borde
  position: absolute
  width: 40px
  height: 26px
  top:  7px
  border: 1px #f9f7f6 solid
.size12
  font-size: 1.2rem
  letter-spacing: 2px;
.profile-description
  // margin-left: 10px
  // margin-right: 30px
  // font-weight: 600
  color: black
.littleMore
  font-size: 17px !important
.colorButton
    background-color: #e84660
    border-color: #e84660
    color: white
    font-weight: 600
    margin-top: 5px
.colorButton:disabled
    color: black
    border-color: #dbdbdb
    background-color: white
    
.newSize
  font-size: 1.25rem
  line-height: 1
  position: relative
  top: -6px
  margin-top: 7px

.container-profile-main
  flex: 1 1 auto
  margin-left: 20px
  margin-right: 20px
  text-align: initial


.container-profile-name  
  display: flex
  justify-content: space-between
  align-items: center
  line-height: 1
  margin-top: 0
  padding-bottom: 0
.-box-schedule
  margin: 0 1rem
  .-times
    +tablet
      margin-top: 140px

.container-profile-info, 
.container-profile-teacher
  display: flex
  justify-content: space-between
  margin-left: 10px

.container-profile-teacher
  margin: 0

.container-profile-flag
  position: relative
  margin-right: 10px
  // border: 1px solid hsl(0, 0%, 96%)
  width: 40px
  align-self: flex-start
  // border: 1px #f9f7f6 solid
  flex: 0 0 auto

.conteiner-like
  // padding-right: 22px
  margin-top: 7px
  font-size: 22px

.container-profile-raiting
  margin-top: -31px
  font-size: 1.25rem
  
.container-profile-teacher
  div
    display: flex
    flex-direction: column
    justify-content: flex-end
    flex: 1 1 168px

.marginado
    margin: 0 30px


.-card-details-instructor
  .-column-profile
    border-right: solid 2px whitesmoke
  .-container-profile-picture2
    height: 80px
    .-profile-picture
      height: 80px
      width: 80px
      left: 0
      right: 0
      margin: auto
      background: white
      z-index: 9

      // background-position: center
      background-repeat: no-repeat
      background-size: cover
    hr2
      position: absolute
      width: 100%
      top: 25%
  .-name
    margin-bottom: 0.2rem!important
  .-sticky-data
    // background-color: #343a40
    margin: 1rem -1.25rem
    .-like
      margin-right: 10px
    .-button-book
      top: -5px
    &.sticky /* The sticky class is added to the header with JS when it reaches its scroll position */
      position: fixed
      top: 0
      width: 100%
      margin: 0
      left: 0
      z-index: 99
      .-button-book
        top: 0

  hr
    margin-top: 10px
    margin-bottom: 10px
  .description
    padding-top: 20px
  
@media screen and (max-width: 500px)

  .marginado
    margin: 0 20px

  .inlineBlock
    display: inline-block
  .description
    padding-top: 0
    margin-top: 0
  .-is-spaced-top 
    margin-top: 0 !important
  .contenedor-principal
    padding-left: 10px
    padding-right: 10px

  #prueba
    // background-color: red
    padding-left: 10px
    padding-right: 10px

  #container-profile-img
    // width: 60px
    // height: 60px
    margin-right: 0

  .littleMore
    font-size: 15px !important
  .size12
    font-size: 1rem
    // letter-spacing: 2px;
  .newSize
    line-height: 1
    font-size: 1.25rem
    position: relative
    top: -12px
    margin-top: 10px

  .mybg, .container-profile, .container-profile-main
    // background-color: red
    padding-left: 5px
    padding-right: 5px
  .container-profile-main
    flex: 1 1 auto
    margin-left: 5px
    margin-right: 5px
    font-size: 14px
  .conteiner-like
    padding: 0 5px 22px 5px
  .container-profile-description
    min-height: 60px
    max-height: 80px
  #container-profile-img
    margin-right: 0


</style>
<script>
import Rating from '~/components/web/general/Rating.vue'
import Like from '~/components/general/Like.vue'
import axios from 'axios'
import Countries from '@/mixins/countries'
import { mapGetters } from 'vuex'
// import moment from 'moment'
export default {
  components: {
    Rating,
    Like
  },
  mixins: [Countries],
  data() {
    const today = new Date()
    return {
      isCalendarModalActive: false,
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
    ...mapGetters({
      user: 'auth/loggedUser',
      loggedIn: 'auth/loggedIn'
    }),
    videoUrl() {
      const video = this.instructor.video_url
      let stringVideo = `https://www.youtube.com/embed/`
      if (!video) return stringVideo
      if (video.includes('=')) {
        const split = video.split('=')
        // stringVideo = `https://www.youtube.com/embed/${split[1]}`
        stringVideo += split[1]
      } else if (video.includes('.be')) {
        const split = video.split('/')
        stringVideo += split[split.length - 1]
      }
      return stringVideo
    },
    adaptedName() {
      const name = this.instructor.user.name
      const lastname = this.instructor.user.lastname
      return name + ' ' + lastname[0] + '.'
    },
    // Languages that can teach the instructor
    instructorLanguages() {
      // eslint-disable-next-line no-console
      console.log('entre al lenguaje')
      const languages = this.instructor.languages
      // eslint-disable-next-line no-console
      console.log(languages)
      const nameLanguages = []
      languages.forEach(language => {
        const nameLanguage = language.english
        // const levelsLanguage = language.pivot.levels
        const levels = language.pivot.levels
        const levelsLanguage = levels.replace('"Begginer",', '')

        // Remove unnecesary characteres
        const cleanedLevels = levelsLanguage.replace(/\[|\]|"/g, '')
        // replce commas with comma and space
        const removedComasLevels = cleanedLevels.split(',').join(', ')
        // Parse data as will be shown
        const parsedData = nameLanguage + ' (' + removedComasLevels + ')'
        nameLanguages.push(parsedData)
        // nameLanguages.push(language.english)
      })
      return nameLanguages
      // return nameLanguages.join(', ')
    },
    unselectableDays() {
      const schedules = this.schedules
      const days = [1, 2, 3, 4, 5, 6, 0]
      const selectableDays = this.selectableDays(schedules)
      const unselectableDays = days.filter(x => !selectableDays.includes(x))
      return unselectableDays
    }
  },
  async asyncData({ params, query }) {
    // eslint-disable-next-line no-console
    // console.log(query.isCalendarModalActive)
    const idInstructor = params.id
    const { data } = await axios.get(
      `${process.env.apiUrl}instructor/${idInstructor}`
    )
    // eslint-disable-next-line no-console
    console.log('data de un VATO')
    // eslint-disable-next-line no-console
    console.log(data)
    return {
      instructor: data,
      isCalendarModalActive: query.isCalendarModalActive
    }
  },
  mounted() {
    if (this.isCalendarModalActive) {
      this.setFieldLevelWidth()
    }
    // window.addEventListener('scroll', this.handleScroll)
    this.getLanguage()
    this.getTimezone()
    this.getInstructorSchedules()
    this.unselectableDates()
    this.getLanguageToTeach()
  },
  destroyed() {
    // window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    pais(country) {
      const paises = this.countries[0]
      for (const pa in paises) {
        if (paises[pa] === country) {
          return `https://www.countryflags.io/${pa}/flat/64.png`
        }
      }
    },
    openVideo() {
      this.isCardModalIntroductionVideo = true
    },
    goBack() {
      this.$router.back()
    },
    setFieldLevelWidth() {
      const fields = document.querySelectorAll('.-field-level')
      const calendarWidth = document.getElementById('calendar-box').offsetWidth
      fields.forEach(field => {
        field.style.maxWidth = calendarWidth + 'px'
      })
    },
    activateCalendarModal() {
      this.isCalendarModalActive = true
      setTimeout(() => {
        this.setFieldLevelWidth()
      }, 100)
    },
    getLanguageToTeach(idLanguage) {
      idLanguage = this.$route.params.lang
      const url = `${process.env.apiUrl}languages/${idLanguage}`
      // eslint-disable-next-line no-console
      console.log('id del language')

      // eslint-disable-next-line no-console
      console.log(idLanguage)
      axios.get(url).then(response => {
        // eslint-disable-next-line no-console
        console.log('obteniendo los le guajes a enseñas')
        // eslint-disable-next-line no-console
        console.log(response.data)
        this.languageToTeach = response.data
      })
    },
    // handleScroll(event) {
    //   const elementSticky = document.getElementById('sticky')
    //   // Get the offset position of the sticky
    //   const sticky = elementSticky.offsetTop

    //   if (window.pageYOffset > sticky) {
    //     elementSticky.classList.add('sticky')
    //   } else {
    //     elementSticky.classList.remove('sticky')
    //   }
    // },
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
    getInstructorSchedules() {
      const url = `${process.env.apiUrl}instructors/${
        this.instructor.id
      }/schedules`
      axios.get(url).then(response => {
        const schedules = response.data
        this.schedules = schedules
      })
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
          // eslint-disable-next-line no-console
          console.log('lenguajes TODOS')
          // eslint-disable-next-line no-console
          console.log(response.data)

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
  .b-radio
    width: 100%
    .control-label
      margin-left: auto
</style>
