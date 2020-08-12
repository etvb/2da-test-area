<template>
  <div class="columns is-centered">
    <div class="column is-10">
      <card title="Classes">
        <template v-slot:action>
          <div class="field is-grouped is-pulled-right">
            <p class="control">
              <nuxt-link to="/panel/instructor/classes/schedule" class="button -is-primary-outlined">
                Schedule
              </nuxt-link>
            </p>
            <p class="control">
              <nuxt-link to="/panel/instructor/classes/languages" class="button -is-primary-outlined">
                Languages
              </nuxt-link>
            </p>
          </div>
        </template>
        <template v-slot:body>
          <!-- <b-table :data="classes" :columns="columns">
            <template slot="empty">
              <section class="section">
                <div class="content has-text-grey has-text-centered">
                  <p>
                    <b-icon
                      icon="emoticon-sad"
                      size="is-large"
                    />
                  </p>
                  <p>No classes booked yet.</p>
                </div>
              </section>
            </template>
          </b-table> -->
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Booked Language Class</th>
                <th>Student native language</th>
                <th>Class Level</th>
                <th>Student</th>
                <th>Date and Time</th>
                <th>Class Url</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lesson in classes" :key="lesson.id">
                <td>{{ lesson.language.english }}</td>
                <td>{{ lesson.student.user.language.english }}</td>
                <td>{{ lesson.level }}</td>
                <td>{{ lesson.student.user.parsed_name }}</td>
                <td>{{ parsedDate(lesson.date) }}</td>
                <td>
                  <a :href="'https://zoom.us/j/' + instructor.zoom_id" target="_blank">
                    https://zoom.us/j/{{ instructor.zoom_id }}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </card>
      <b-pagination
        :total="pagination.total"
        :current.sync="pagination.current_page"
        :per-page="pagination.per_page"
        @change="getClasses"
        order="is-centered"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      />
    </div>
  </div>
</template>
<script>
import Card from '~/components/general/Card.vue'
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  layout: 'panel',
  components: {
    Card
  },
  data() {
    return {
      classes: [],
      instructor: [],
      pagination: []
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/loggedUser'
    })
  },
  mounted() {
    this.getClasses()
    this.getInstructor()
  },
  methods: {
    getClasses(number = null) {
      let url = ''
      if (number) {
        url = this.pagination.path + '?page=' + number
      } else {
        const user = this.$store.getters['auth/loggedUser']
        url = `${process.env.apiUrl}instructors/${user.id}/lessons`
      }
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.classes = response.data.data
          this.pagination = response.data
        })
        .catch(() => {
          alert('Could not load your data')
        })
    },
    getInstructor() {
      const user = this.$store.getters['auth/loggedUser']
      const url = `${process.env.apiUrl}instructors/${user.id}`
      axios
        .get(url)
        .then(response => {
          this.instructor = response.data
        })
        .catch(() => {
          alert('Could not retrieve all data')
        })
    },
    parsedDate(date) {
      /* const localDate = new Date(date)
      return localDate.toString().substring(0, 25) */
      const timezone = this.user.timezone
      const momentDate = this.$moment_timezone(date).tz(timezone)
      const string = momentDate.toString()
      return string.toString().substring(0, 25)
    }
  }
}
</script>
