<template>
  <div>
    <payment :instructor="instructor" />
    <zoom :instructor="instructor" />
    <div class="has-text-right">
      <button
        @click="success"
        :class="{'is-loading': loading}"
        class="button -has-bg-primary has-text-white"
      >
        Finish
      </button>
    </div>
  </div>
</template>
<style lang="sass" scoped>
  // Remove box shadow from card
  .box
    box-shadow: none
</style>
<script>
import Payment from '~/components/panel/instructor/settings/Payments.vue'
import Zoom from '~/components/panel/instructor/settings/Zoom.vue'
import axios from 'axios'

export default {
  layout: 'panel',
  components: {
    Payment,
    Zoom
  },
  data() {
    return {
      instructor: []
    }
  },
  mounted() {
    this.setInstructor()
  },
  methods: {
    setInstructor() {
      const user = this.$store.getters['auth/loggedUser']
      const url = process.env.apiUrl + 'instructor/' + user.id
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
    success() {
      this.$emit('completed')
    }
  }
}
</script>
