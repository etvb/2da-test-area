<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-6">
        <form @submit.prevent="updateUser" action="/">
          <card :lineTop="false">
            <template v-slot:body>
              <div class="-is-relative -container-profile-picture -is-fullwidth">
                <b-field class="file">
                  <b-upload
                    @change.native="uploadImage($event)"
                    name="photo"
                    accept="image/*"
                  >
                    <a>
                      <img
                        v-if="user.profile_picture"
                        :src="user.profile_picture"
                        width="70px"
                        height="70px"
                        class="-is-circle"
                      >
                      <span v-else class="box -profile-picture  -is-circle">
                        <b-icon
                          pack="fas"
                          size="is-medium"
                          type="is-grey-light"
                          icon="camera"
                        />
                      </span>
                    </a>
                  </b-upload>
                </b-field>
              </div>
              <div class="has-text-centered">
                <cropper
                  ref="cropper"
                  :defaultSize="defaultSize"
                  :stencil-component="$options.components.CircleStencil"
                  v-if="showCrup"  
                  :src="image"
                  :stencil-props="{
                                
                  }"
                  @change="change"
                  classname="cropper"
                />
                <button
                  v-if="show"
                  @click="crop"
                  class="button -has-bg-primary has-text-white"
                >
                  CUT
                </button>
              </div>

              <div class="-is-spaced-top">
                <b-field label="First Name">
                  <b-input v-model="user.name" required />
                </b-field>

                <b-field label="Last Name">
                  <b-input v-model="user.lastname" required />
                </b-field>

                <b-field label="Age">
                  <b-input v-model="student.age" />
                </b-field>

                <b-field label="About Me">
                  <b-input v-model="student.about" type="textarea" />
                </b-field>

                <b-field label="Native Language">
                  <b-select
                    v-model="user.language_id"
                    placeholder="Select a language"
                    expanded
                    required
                  >
                    <option
                      v-for="language in languages"
                      :value="language.id"
                      :key="language.id"
                    >
                      {{ language.english }}
                    </option>
                  </b-select>
                </b-field>

                <b-field label="Location/Timezone">
                  <b-select
                    v-model="user.timezone"
                    placeholder="Select your timezone/location"
                    expanded
                  >
                    <option
                      v-for="timezone in timezones"
                      :value="timezone"
                      :key="timezone.id"
                    >
                      <!-- {{ timezone.text }} -->
                      {{ timezone }}
                    </option>
                  </b-select>
                </b-field>
              </div>
            </template>

            <template v-slot:footer-right-actions>
              <div>
                <!-- <div
                  @click.prevent="updateUser"
                  :class="{'is-loading': loading}"
                  class="button -has-bg-primary has-text-white"
                >
                  Update
                </div> -->
                <button
                  :class="{'is-loading': loading}"
                  class="button -has-bg-primary has-text-white"
                >
                  Update
                </button>
              </div>
            </template>
          </card>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Card from '~/components/general/Card.vue'
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import axios from 'axios'
export default {
  layout: 'panel',
  components: {
    Card,
    Cropper,
    // eslint-disable-next-line vue/no-unused-components
    CircleStencil
  },
  data() {
    return {
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      showCrup: false,
      show: false,
      cutImage: '',
      image: '',
      loading: false,
      user: [],
      student: [],
      title: '',
      timezones: [],
      languages: []
    }
  },
  mounted() {
    this.setUser()
    this.setStudent()
    this.setTimezones()
    this.setLanguages()
  },
  methods: {
    change() {
      this.show = true
      this.showCrup = true
    },
    defaultSize() {
      return {
        width: 300,
        height: 300
      }
    },
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult()
      this.coordinates = coordinates
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image
      this.cutImage = canvas.toDataURL()
      this.user.profile_picture = this.cutImage
      this.show = false
      this.showCrup = false
    },
    setUser() {
      this.user = this.$store.getters['auth/loggedUser']
      this.title = this.user.name
    },
    setTimezones() {
      const url = process.env.apiUrl + 'timezones'
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.timezones = response.data
        })
    },
    setLanguages() {
      const url = process.env.apiUrl + 'languages'
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.languages = response.data
        })
    },
    setStudent() {
      const url = process.env.apiUrl + 'students/' + this.user.id
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.student = response.data
        })
    },
    updateUser() {
      this.loading = true
      const url = process.env.apiUrl + 'students/' + this.user.id
      // const data = { name: this.user.name, lastname: this.user.lastname }
      const data = { user: this.user, student: this.student }
      const authorization = this.$store.getters['auth/headerAuthorization']
      axios
        .put(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          const user = response.data
          this.$store.commit('auth/logInUser', user)
          this.setUser()
          this.success()
          this.image = false
          this.cutImage = false
        })
        .catch(() => {
          this.loading = false
          alert('We have an error trying to update your data')
        })
    },
    success() {
      this.$snackbar.open({
        message: `Data was updated succesfully`,
        position: 'is-top-right'
      })
    },
    uploadImage(e) {
      const files = e.target.files || e.dataTransfer.files

      if (!files.length) return

      const image = files[0]
      this.filename = image.name
      this.createImage(files[0])
      // if i have file, show
      if (image.length !== 0) {
        this.show = true
        this.showCrup = true
      }
    },
    createImage(file) {
      // const image = new Image()
      const reader = new FileReader()

      reader.onload = e => {
        // this.profilePicture = e.target.result
        this.user.profile_picture = e.target.result
        this.image = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
<style lang="sass">
.-container-profile-picture
  .upload
    margin: auto
</style>
