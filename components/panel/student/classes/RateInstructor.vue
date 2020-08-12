<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="is-inline">
    <!--<b-tooltip label="Rate teacher" type="is-light">
      <a @click.prevent="rate" class="button is-small">
        <span class="icon is-small">
          <i class="fas fa-thumbs-up" />
        </span>
      </a>
    </b-tooltip>
    <b-modal :active.sync="isModalActive">
      <card
        :title="'Rate '+ instructor.user.name "
      >
        <template v-slot:body>
          <p>
            Tell us how was your class with {{ instructor.user.name }}
          </p>
          <rating @rateChange="setNewRating" :rating="getInstructorRating(instructor.ratings )" />
        </template>
        <template v-slot:footer-right-actions>
          <button
            @click.prevent="saveRating"
            class="button -has-bg-primary has-text-white"
            :class="{'is-loading': loading}"
          >
            Save
          </button>
        </template>
      </card>
    </b-modal>-->
    <rating @rateChange="setNewRating" :rating="getInstructorRating(instructor.ratings)" :instructorId="instructor.id" />
  </div>
</template>
<script>
// import Card from '~/components/general/Card.vue'
import Rating from '~/components/general/Rating.vue'
import axios from 'axios'
export default {
  components: {
    // Card,
    Rating
  },
  props: {
    instructor: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isModalActive: false,
      rating: 0,
      loading: false
    }
  },
  methods: {
    rate() {
      this.isModalActive = true
    },
    setNewRating(rating) {
      this.rating = rating
      this.saveRating()
    },
    getInstructorRating(ratings) {
      const user = this.$store.getters['auth/loggedUser']
      const result = ratings.filter(
        rating => rating.pivot.student_id === user.id
      )
      // Only retrieve the rating if exists
      if (result.length) {
        return result[0].pivot.rating
      }
      // Else return 0 as rating
      return 0
    },
    saveRating() {
      const user = this.$store.getters['auth/loggedUser']
      const url = `${process.env.apiUrl}ratings`
      const authorization = this.$store.getters['auth/headerAuthorization']
      const data = {
        rating: this.rating,
        student_id: user.id,
        instructor_id: this.instructor.id
      }
      this.loading = true
      axios
        .post(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          this.isModalActive = false
          this.success()
          this.$emit('ratingUpdated')
        })
        .catch(() => {
          alert('Could not save your data')
          this.loading = false
        })
    },
    success() {
      this.$snackbar.open({
        message: `Rating saved succesfully`,
        position: 'is-top-right'
      })
    }
  }
}
</script>
