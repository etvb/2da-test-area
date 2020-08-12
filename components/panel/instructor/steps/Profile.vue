<template>
  <div class="-is-spaced-top">
    <form @submit.prevent="next" action="">
      <b-field label="First Name">
        <b-input v-model="user.name" required />
      </b-field>

      <b-field label="Last Name">
        <b-input v-model="user.lastname" required />
      </b-field>

      <b-field label="My motivation">
        <b-input v-model="instructor.description" type="textarea" />
      </b-field>

      <b-field label="About me">
        <b-input v-model="instructor.bio" type="textarea" />
      </b-field>

      <b-field label="Native Language">
        <b-select
          v-model="user.language_id"
          placeholder="Select a language"
          expanded
          required
        >
          <option
            v-for="language in languages"
            :value="language.id"
            :key="language.id"
          >
            {{ language.english }}
          </option>
        </b-select>
      </b-field>

      <b-field label="Timezone">
        <b-select
          v-model="user.timezone"
          placeholder="Select your location"
          expanded
          required
        >
          <option
            v-for="timezone in timezones"
            :value="timezone"
            :key="timezone.id"
          >
            {{ timezone }}
          </option>
        </b-select>
      </b-field>

      <b-field label="Location">
        <b-select
          v-model="user.country"
          placeholder="Select your location"
          expanded
        >
          <option
            v-for="(value, country) in countries[0]"
            :value="value"
            :key="country"
          >
            {{ value }}
          </option>
        </b-select>
      </b-field>

      <b-field label="Price per class in USD (45 minutes)">
        <b-input v-model="instructor.price_by_class" required />
      </b-field>

      <b-field label="Video Url">
        <b-input
          v-model="instructor.video_url"
          placeholder="https://www.youtube.com/watch?v=fwZ3xtiWKAo"
        />
      </b-field>
      <button
        :class="{'is-loading': loading}"
        class="button -has-bg-primary has-text-white is-pulled-right"
      >
        Next
      </button>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
import Countries from '@/mixins/countries'
export default {
  mixins: [Countries],
  data() {
    return {
      loading: false,
      // user: '',
      user: [],
      instructor: [],
      title: '',
      timezones: '',
      languages: ''
      // profilePicture: false
    }
  },
  mounted() {
    this.getUser()
    this.getInstructor()
    this.getLanguages()
    this.getTimezones()
  },
  methods: {
    next() {
      // alert('siguiente')
      this.updateUser()
    },
    getLanguages() {
      const url = process.env.apiUrl + 'languages'
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.languages = response.data
        })
    },
    getTimezones() {
      const url = process.env.apiUrl + 'timezones'
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.timezones = response.data
        })
    },
    updateUser() {
      this.loading = true
      const url = process.env.apiUrl + 'instructor/' + this.user.id
      const data = { user: this.user, instructor: this.instructor }
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .put(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          const user = response.data
          this.$store.commit('auth/logInUser', user)
          this.getUser()
          this.getInstructor()
          this.success()
        })
        .catch(error => {
          this.loading = false
          /* if (error.response.status === 422) {
            alert('error 422')
          } */
          // eslint-disable-next-line no-console
          console.log(error)
          alert('We have an error trying to update your data')
        })
    },
    getInstructor() {
      const url = process.env.apiUrl + 'instructor/' + this.user.id
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
    },
    getUser() {
      this.user = this.$store.getters['auth/loggedUser']
      this.title = this.user.name
    },
    success() {
      this.$emit('completed')
    }
  }
}
</script>
