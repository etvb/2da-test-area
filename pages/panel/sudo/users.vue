<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="section">
    <div class="container">
      <card :lineBottom="false" title="Users">
        <template v-slot:action>
          <download-users />
        </template>
        <template v-slot:body>
          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
                <tr class="-text-nowrap">
                  <th>
                    Name
                  </th>
                  <th>
                    Email
                  </th>
                  <th>
                    Registered as
                  </th>
                  <th>
                    User since
                  </th>
                  <th>
                    PayPal Account
                  </th>
                  <th>
                    Zoom id
                  </th>
                  <th>
                    First Name
                  </th>
                  <th>
                    Lastname
                  </th>
                  <th>
                    My motivation
                  </th>
                  <th>
                    About me
                  </th>
                  <th>
                    Native Language
                  </th>
                  <th>
                    Location Timezone
                  </th>
                  <th>
                    Price per class
                  </th>
                  <th>
                    Video Url
                  </th>
                  <th>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users">
                  <td>
                    {{ user.parsed_name }}
                  </td>
                  <td>
                    {{ user.email }}
                  </td>
                  <td>
                    {{ roles(user.roles) }}
                  </td>
                  <td>
                    {{ utcToUserDate(user.created_at) }}
                  </td>
                  <td>
                    {{ user.paypal_email }}
                  </td>
                  <td>
                    {{ user.zoom_id }}
                  </td>
                  <td>
                    {{ user.name }}
                  </td>
                  <td>
                    {{ user.lastname }}
                  </td>
                  <td>
                    <!-- {{ user.instructor.description }} -->
                    {{ user.instructor ? user.instructor.description : '' }}
                  </td>
                  <td>
                    <!-- {{ user.instructor.bio }} -->
                    {{ user.instructor ? user.instructor.bio : '' }}
                  </td>
                  <td>
                    {{ user.language ? user.language.english : '' }}
                  </td>
                  <td>
                    {{ user.timezone }}
                  </td>
                  <td>
                    <!-- {{ user.instructor.price_by_class }} -->
                    {{ user.instructor ? user.instructor.price_by_class : '' }}
                  </td>
                  <td>
                    <!-- {{ user.instructor.video_url }} -->
                    {{ user.instructor ? user.instructor.video_url : '' }}
                  </td>
                  <td>
                    <button
                      v-if="user.id != $store.state.auth.auth.user.id"
                      @click.prevent="deleteUser(user.id)"
                      :class="{'is-loading': loading}"
                      class="button is-danger text-white"
                      title="delete"
                    >
                      <i class="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </card>
      <b-pagination
        :total="pagination.total"
        :current.sync="pagination.current_page"
        :per-page="pagination.per_page"
        @change="getUsers"
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
import DownloadUsers from '~/components/panel/sudo/users/download.vue'
import axios from 'axios'
import dateMixin from '~/mixins/dateMixin.js'
export default {
  layout: 'panel',
  components: {
    Card,
    DownloadUsers
  },
  mixins: [dateMixin],
  data() {
    return {
      users: [],
      pagination: [],
      loading: false
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    roles(roles) {
      const arrayRoles = roles.map(role => {
        return role.name
      })
      return arrayRoles.join(', ')
    },
    // We only get a number when use pagination
    getUsers(number = null) {
      let url = ''
      if (number) {
        url = this.pagination.path + '?page=' + number
      } else {
        url = process.env.apiUrl + 'users'
      }
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.users = response.data.data
          this.pagination = response.data
        })
    },
    deleteUser(userId) {
      const confirmation = confirm('Are your sure you want to delete the user')
      if (!confirmation) {
        return
      }
      const url = process.env.apiUrl + 'users/' + userId
      const authorization = this.$store.getters['auth/headerAuthorization']
      this.loading = true
      axios
        .delete(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          this.getUsers()
          this.success()
        })
        .catch(() => {
          this.loading = false
          alert('We could not delete the user')
        })
    },
    success() {
      this.$snackbar.open({
        message: `User was deleted successfully`,
        position: 'is-top-right'
      })
    }
  }
}
</script>
