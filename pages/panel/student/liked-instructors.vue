<template>
  <div class="container">
    <div class="columns is-multiple wrap">
      <div
        v-for="instructor in instructors"
        :key="instructor.id"
        class="column is-6"
      >
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{ instructor.user.parsed_name }}
            </p>
          </header>
          <div class="card-content fix-card-content">
            <div class="content">
              <p v-if="instructor.bio">
                {{ instructor.bio }}
              </p>
              <p v-else>
                Profile instructor is incomplete
              </p>
            </div>
          </div>
          <footer class="card-footer">
            <!-- <a href="#" class="card-footer-item">Full profile</a> -->
            <nuxt-link
              :to="`/${instructor.languages[0].id}/instructors/${instructor.id}`"
              class="card-footer-item"
              target="_blank"
            >
              Full profile
            </nuxt-link>
            <!-- <a href="#" class="card-footer-item">Edit</a> -->
            <a
              @click.prevent="unlike(instructor.id)"
              href="#"
              class="card-footer-item"
            >
              Unlike
            </a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.wrap
  flex-wrap: wrap
.fix-card-content
  height: 110px
  overflow: auto
</style>
<script>
import axios from 'axios'
export default {
  layout: 'panel',
  data() {
    return {
      instructors: []
    }
  },
  mounted() {
    this.getInstructors()
  },
  methods: {
    getInstructors() {
      const user = this.$store.getters['auth/loggedUser']
      const url = `${process.env.apiUrl}students/${user.id}/liked`
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.instructors = response.data
        })
        // .catch(error => {
        //   // eslint-disable-next-line
        //   console.log(error.response)
        // })
        .catch(() => {
          alert('Could not load your data')
        })
    },
    unlike(idInstructor) {
      const user = this.$store.getters['auth/loggedUser']
      const url = `${process.env.apiUrl}instructors/${idInstructor}/like`
      const data = {
        liked: false,
        studentId: user.id
      }
      axios.post(url, data).then(() => {
        this.getInstructors()
      })
    }
  }
}
</script>
