<template>
  <div>
    <download-excel
      :fetch="fetchData"
      :fields="json_fields"
      :before-generate="startDownload"
      :before-finish="finishDownload"
      :class="loading?'is-loading' : ''"
      class="button -has-bg-primary has-text-white"
      name="users.xls"
    >
      Download
    </download-excel>
  </div>
</template>
<script>
import axios from 'axios'
import dateMixin from '~/mixins/dateMixin.js'
export default {
  mixins: [dateMixin],
  data() {
    return {
      loading: false,
      json_fields: {
        Name: 'parsed_name',
        Email: 'email',
        'Registered as': {
          field: 'roles',
          callback: value => this.roles(value)
        },
        'User since': {
          field: 'created_at',
          callback: value => this.utcToUserDate(value)
        },
        'PayPal Account': 'paypal_email',
        'Zoom ID': 'zoom_id',
        'First Name': 'name',
        'Last Name': 'lastname',
        'My motivation': 'instructor.description',
        'About me': 'instructor.bio',
        'Native Language': 'language.english',
        'Location/Timezone': 'timezone',
        'Price per class': 'instructor.price_by_class',
        'Video Url': 'instructor.video_url'
      }
    }
  },
  methods: {
    async fetchData() {
      const url = process.env.apiUrl + 'users'
      const authorization = this.$store.getters['auth/headerAuthorization']
      const response = await axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + authorization
        },
        params: {
          pagination: false
        }
      })
      return response.data
    },
    startDownload() {
      this.loading = true
    },
    finishDownload() {
      this.loading = false
    },
    roles(roles) {
      const arrayRoles = roles.map(role => {
        return role.name
      })
      return arrayRoles.join(', ')
    }
  }
}
</script>
