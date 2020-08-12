<template>
  <a
    @click.prevent="like"
    href="javascript:void(0)"
    class="is-pulled-right"
  >
    <!-- class="has-text-black" -->

    <b-icon
      :pack="liked ? 'fas -has-text-log' : 'far'"
      icon="heart"
      class=""
      size=""
    />
  </a>  
</template>
<style lang="sass" scoped>
  .fas
    color: pink
  .icon
    color: #7a7a7a

</style>
<script>
import axios from 'axios'
export default {
  props: ['idTeacher'],
  data() {
    return {
      liked: false
    }
  },
  methods: {
    like() {
      if (this.liked) this.liked = false
      else this.liked = true
      if (!this.isLoggedin) return
      this.storeLike()
    },
    storeLike() {
      let idInstructor
      if (this.idTeacher) {
        idInstructor = this.idTeacher
      } else {
        idInstructor = this.$route.params.id
      }
      const user = this.$store.getters['auth/loggedUser']
      const url = `${process.env.apiUrl}instructors/${idInstructor}/like`
      const data = {
        liked: this.liked,
        studentId: user.id
      }
      axios.post(url, data)
      // .then(response => {
      //   // eslint-disable-next-line
      //   console.log(response.data)
      // })
      // .catch(error => {
      //   // eslint-disable-next-line
      //   console.log(error.response)
      // })
    },
    isLoggedin() {
      const loggedIn = this.$store.getters['auth/loggedIn']
      return loggedIn
    }
  }
}
</script>
