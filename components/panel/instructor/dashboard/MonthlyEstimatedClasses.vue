<template>
  <div>
    <card
      :lineBottom="false"
      title="Number of booked classes for this month"
      title-size="6"
    >
      <template v-slot:titleIcon>
        <b-icon
          pack="fas"
          icon="calendar-alt"
          size="is-large"
          custom-class="-has-text-secondary"
        />
      </template>
      <template v-slot:action>
        <h4 class="title is-4 -has-text-secondary">
          <!-- {{ quantity }} -->
          {{ classes }}
        </h4>
      </template>
      <template v-slot:body>
        <div class="columns">
          <div class="column">
            <span class="subtitle is-6">
              ...thereof already taken place
            </span>
          </div>
          <div class="column is-narrow">
            <h4 class="title is-4 -has-text-secondary">
              {{ takenClasses }}
            </h4>
          </div>
        </div>
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
  // props: {
  //   quantity: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  data() {
    return {
      classes: 0,
      takenClasses: 0
    }
  },
  mounted() {
    this.getEstimatedClasses()
    this.getTakenClasses()
  },
  methods: {
    getTakenClasses() {
      const user = this.$store.getters['auth/loggedUser']
      const url = process.env.apiUrl + 'instructors/' + user.id + '/lessons'
      const authorization = this.$store.getters['auth/headerAuthorization']
      const date = new Date()
      const month = date.getMonth()
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          },
          params: {
            month: month + 1,
            beforeDateTime: new Date()
              .toJSON()
              .slice(0, 19)
              .replace('T', ' ')
          }
        })
        .then(response => {
          this.takenClasses = response.data.total
        })
    },
    getEstimatedClasses() {
      const user = this.$store.getters['auth/loggedUser']
      const url = process.env.apiUrl + 'instructors/' + user.id + '/lessons'
      const authorization = this.$store.getters['auth/headerAuthorization']
      const date = new Date()
      const month = date.getMonth()
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          },
          params: { month: month + 1 }
        })
        .then(response => {
          this.classes = response.data.total
        })
    }
  }
}
</script>
