<template>
  <div>
    <card>
      <template v-slot:body>
        <b-message type="is-info">
          Switch to your {{ loggedAs == 'instructor' ? 'student' : 'teacher' }} account.
        </b-message>
        <div class="has-text-centered">
          <button
            @click="switchAccount"
            :class="{'is-loading': loading}"
            class="button is-medium is-info"
          >
            Switch to {{ roleToSwitch }}
          </button>
        </div>
      </template>
    </card>
  </div>
</template>
<script>
import Card from '~/components/general/Card.vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  components: {
    Card
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      loggedAs: 'auth/loggedAs'
    }),
    roleToSwitch() {
      const role = this.loggedAs === 'instructor' ? 'student' : 'teacher'
      return role
    }
  },
  methods: {
    switchAccount() {
      const roleToAssign = this.roleToSwitch
      const user = this.$store.getters['auth/loggedUser']
      const userRoles = user.roles
      let hasAlreadyRole = false
      userRoles.forEach(role => {
        if (role.name === roleToAssign) {
          hasAlreadyRole = true
        }
      })
      if (hasAlreadyRole) {
        this.$store.commit('auth/setLoggedAs', roleToAssign)
        this.$router.push('/panel/' + roleToAssign)
      } else {
        this.assignNewRol(roleToAssign, user.id)
      }
    },
    assignNewRol(role, userId) {
      const url = process.env.apiUrl + 'users/' + userId + '/roles'
      const authorization = this.$store.getters['auth/headerAuthorization']
      if (role === 'teacher') {
        role = 'instructor'
      }
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
          this.$router.push('/panel/' + role)
        })
    }
  }
}
</script>
