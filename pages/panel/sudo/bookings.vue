<template>
  <div class="section">
    <div class="container">
      <card :lineBottom="false" title="Bookings">
        <template v-slot:action>
          <download-excel :data="lessons" :fields="json_fields" name="bookings.xls">
            <button class="button -has-bg-primary has-text-white">
              Download
            </button>
          </download-excel>
        </template>
        <template v-slot:body>
          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
                <tr class="-text-nowrap">
                  <th>Instructor</th>
                  <th>PayPal Account Instructor</th>
                  <th>E-Mail Address Instructor</th>
                  <th>Time and date of booking</th>
                  <th>Booked Lesson Language</th>
                  <th>Booked Lesson Date and Time</th>
                  <th>Booked By</th>
                  <th>PayPal Account Student</th>
                  <th>E-Mail Address Student</th>
                  <th>Paid</th>
                  <th>Language level</th>
                  <th>Topic</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="lesson in lessons"
                  v-if="lesson.instructor && lesson.instructor.user && lesson.student && lesson.student.user"
                  :key="lesson.id"
                >
                  <td>
                    {{ lesson.instructor.user.parsed_name }}
                  </td>
                  <td>
                    {{ lesson.instructor.paypal_email }}
                  </td>
                  <td>
                    {{ lesson.instructor.user.email }}
                  </td>
                  <td>
                    <!-- {{ lesson.created_at }} -->
                    {{ utcToUserDate(lesson.created_at) }}
                  </td>
                  <td>
                    {{ lesson.language.english }}
                  </td>
                  <td>
                    {{ utcToUserDate(lesson.date) }}
                  </td>
                  <td>
                    {{ lesson.student.user.parsed_name }}
                  </td>
                  <td>
                    {{ lesson.student.user.paypal_email }}
                  </td>
                  <td>
                    {{ lesson.student.user.email }}
                  </td>
                  <td>
                    ${{ lesson.price }}
                  </td>
                  <td>
                    {{ lesson.level }}
                  </td>
                  <td>
                    {{ lesson.topic }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </card>
    </div>
  </div>
</template>
<script>
import Card from '~/components/general/Card.vue'
import dateMixin from '~/mixins/dateMixin.js'
import axios from 'axios'
export default {
  layout: 'panel',
  components: {
    Card
  },
  mixins: [dateMixin],
  data() {
    return {
      json_fields: {
        Instructor: 'instructor.user.parsed_name',
        'PayPal Account Instructor': 'instructor.paypal_email',
        'E-Mail Address Instructor': 'instructor.user.email',
        'Time and date of booking	': {
          field: 'created_at',
          callback: value => this.utcToUserDate(value)
        },
        'Booked Lesson Language': 'language.english',
        'Booked Lesson Date and Time': {
          field: 'date',
          callback: value => this.utcToUserDate(value)
        },
        'Booked By': 'student.user.parsed_name',
        'PayPal Account Student': 'student.user.paypal_email',
        'E-Mail Address Student': 'student.user.email',
        Paid: 'price',
        'Language level': 'level',
        Topic: 'topic'
      },
      lessons: []
    }
  },
  mounted() {
    this.getLessons()
  },
  methods: {
    getLessons() {
      const url = process.env.apiUrl + 'lessons'
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.lessons = response.data
        })
        .catch(() => {
          alert('We could not load the data')
        })
    }
  }
}
</script>
