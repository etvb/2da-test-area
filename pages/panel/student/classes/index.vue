<template>
  <div class="columns is-centered">
    <div class="column is-10">
      <card title="Classes">
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
                <th>Instructor</th>
                <th>Instructor's Native Language</th>
                <th>Class Level</th>
                <th>Date and Time</th>
                <th>Lesson in Zoom</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lesson in classes" :key="lesson.id">
                <td> {{ lesson.language.english }} </td>
                <td> {{ lesson.instructor.user.parsed_name }} </td>
                <td> {{ lesson.instructor.user.language.english }} </td>
                <td> {{ lesson.level }} </td>
                <td> {{ parsedDate(lesson.date) }} </td>
                <td>
                  <a :href="'https://zoom.us/j/' + lesson.instructor.zoom_id" target="_blank">
                    Join Class
                  </a>
                </td>
                <td class="-text-nowrap">
                  <rate-instructor :instructor="lesson.instructor" @ratingUpdated="getClasses" />
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
import RateInstructor from '~/components/panel/student/classes/RateInstructor'
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  layout: 'panel',
  components: {
    Card,
    RateInstructor
  },
  data() {
    return {
      classes: [],
      pagination: []
      // columns: [
      //   {
      //     field: 'language.english',
      //     label: 'Language class'
      //   },
      //   {
      //     field: 'instructor.user.parsed_name',
      //     label: 'Instructor'
      //   },
      //   {
      //     field: 'instructor.user.language.english',
      //     label: 'Instructor native language'
      //   },
      //   {
      //     field: 'level',
      //     label: 'Level class'
      //   },
      //   {
      //     field: 'date',
      //     label: 'Date and Time'
      //   },
      //   {
      //     field: 'instructor.zoom_id',
      //     label: 'Class url'
      //   }
      // ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/loggedUser'
    })
  },
  mounted() {
    this.getClasses()
    const role = this.$store.getters['auth/loggedAs']
    if (role !== 'student') {
      const user = this.$store.getters['auth/loggedUser']
      this.assignNewRol('student', user.id)
    }
  },
  methods: {
    getClasses(number = null) {
      let url = ''
      if (number) {
        url = this.pagination.path + '?page=' + number
        // const url = `${process.env.apiUrl}students/${user.id}/lessons`
      } else {
        const user = this.$store.getters['auth/loggedUser']
        url = `${process.env.apiUrl}students/${user.id}/lessons`
      }
      // const user = this.$store.getters['auth/loggedUser']
      // const url = `${process.env.apiUrl}students/${user.id}/lessons`
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
    assignNewRol(role, userId) {
      const url = process.env.apiUrl + 'users/' + userId + '/roles'
      const authorization = this.$store.getters['auth/headerAuthorization']
      const data = { role: role }
      axios
        .put(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          const user = response.data
          this.$store.commit('auth/logInUser', user)
          this.$store.commit('auth/setLoggedAs', role)
          // this.$router.push('/panel/' + role)
        })
    },
    parsedDate(date) {
      const timezone = this.user.timezone
      const momentDate = this.$moment_timezone(date).tz(timezone)
      const string = momentDate.toString()
      return string.toString().substring(0, 25)
    }
  }
}
</script>
