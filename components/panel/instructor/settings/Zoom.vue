<template>
  <card title="Zoom">
    <template v-slot:body>
      <b-message type="is-info">
        <!-- Enter your zoom ID https://zoom.us/j/YOURNUMBER (10-digit number from your Zoom profile).<br>
        If you do not have a Zoom ID yet, please create one -->
        Enter your Zoom Personal Meeting ID (10-digit number from your Zoom profile).
        If you do not have a Zoom ID yet, please create one
        <a href="https://zoom.us/" target="_blank">here</a>.
      </b-message>
      <b-message
        v-if="validateZoomId"
        type="is-danger"
        class="-is-spaced"
      >
        {{ errors.zoom_id[0] }}
      </b-message>
      <form @submit.prevent="submit" action="#">
        <b-field grouped>
          <b-input
            v-model="instructor.zoom_id"
            expanded
            required
            placeholder="9834524580"
          />
          <p class="control">
            <button
              :class="{'is-loading': loading}"
              class="button -has-bg-primary has-text-white"
            >
              Save
            </button>
          </p>
        </b-field>
      </form>
    </template>
  </card>
</template>
<script>
import Card from '~/components/general/Card.vue'
import axios from 'axios'
export default {
  components: {
    Card
  },
  props: {
    instructor: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      errors: '',
      validateZoomId: false
    }
  },
  methods: {
    submit() {
      this.validateZoomId = false
      this.loading = true
      const instructor = this.instructor
      const url =
        process.env.apiUrl + 'instructors/' + instructor.id + '/zoom-id'
      const data = { zoom_id: this.instructor.zoom_id }
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .put(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          this.success()
        })
        .catch(error => {
          this.loading = false
          if (error.response.status === 422) {
            this.errors = error.response.data.errors
            this.validateZoomId = true
            // alert('Your Zoom id is already taken')
          }
          alert('We have an error trying to update your data')
        })
    },
    success() {
      this.$snackbar.open({
        message: `Data was updated succesfully`,
        position: 'is-top-right'
      })
    }
  }
}
</script>
