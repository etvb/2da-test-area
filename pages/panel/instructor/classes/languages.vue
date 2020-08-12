<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-10">
        <card title="Languages">
          <template v-slot:body>
            <b-field
              label="Enter the languages that you will be available to teach"
            >
              <b-taginput
                v-model="tags"
                :data="filteredTags"
                @typing="getFilteredTags"
                autocomplete
                field="english"
                icon="label"
                placeholder="Add a language"
              >
                <template slot-scope="props">
                  <strong>{{ props.option.id }}</strong>: {{ props.option.english }}
                </template>
                <template slot="empty">
                  There are no languages
                </template>
              </b-taginput>
            </b-field>

            <b-message v-if="tags.length" type="is-info">
              Select the levels you want to teach
            </b-message>

            <!-- levels -->
            <div v-for="tag in tags" :key="tag.id">
              <label class="label">
                {{ tag.english }}
              </label>
              <div
                v-for="option in optionsLevel"
                :key="option.id"
                class="field"
              >
                <b-checkbox
                  v-model="tag.pivot.levels"
                  :native-value="option.level"
                >
                  {{ option.level }}
                </b-checkbox>
              </div>
            </div>
          </template>
          <template v-slot:footer-right-actions>
            <div>
              <div
                @click.prevent="updateLanguages"
                :class="{'is-loading': loading}"
                class="button -has-bg-primary has-text-white"
              >
                Save
              </div>
            </div>
          </template>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import Card from '~/components/general/Card.vue'
import axios from 'axios'
export default {
  layout: 'panel',
  components: {
    Card
  },
  data() {
    return {
      loading: false,
      filteredTags: [],
      isSelectOnly: false,
      tags: [],
      data: [],
      user: [],
      optionsLevel: [
        { level: 'Proficient', id: 1 },
        { level: 'Advanced', id: 2 },
        { level: 'Upper-intermediate', id: 3 },
        { level: 'Intermediate', id: 4 },
        { level: 'Pre-intermediate', id: 5 },
        { level: 'Elementary', id: 6 },
        { level: 'Beginner', id: 7 }
      ]
    }
  },
  mounted() {
    this.setLanguages()
    this.getInstructorLanguages()
  },
  methods: {
    getFilteredTags(text) {
      this.filteredTags = this.data.filter(option => {
        const tags =
          // option.user.first_name
          option.english
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        return tags
      })
    },
    setLanguages() {
      const url = process.env.apiUrl + 'languages'
      axios.get(url).then(response => {
        // this.data = response.data
        const languages = response.data
        languages.forEach(language => {
          // language.level = ['Begginer']
          language.pivot = {
            // levels: ['Begginer']
            levels: ['Beginner']
          }
        })
        this.data = languages
      })
    },
    getInstructorLanguages() {
      const user = this.$store.getters['auth/loggedUser']
      const authorization = this.$store.getters['auth/headerAuthorization']
      const url = process.env.apiUrl + 'instructors/' + user.id + '/languages'

      axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          // this.tags = response.data
          const languages = response.data
          languages.forEach(language => {
            language.pivot.levels = JSON.parse(language.pivot.levels)
          })
          this.tags = languages
        })
    },
    updateLanguages() {
      const user = this.$store.getters['auth/loggedUser']
      const authorization = this.$store.getters['auth/headerAuthorization']
      const url = process.env.apiUrl + 'instructors/' + user.id + '/languages'
      const data = this.prepareIds()
      this.loading = true

      axios
        .post(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          this.loading = false
          this.success()
        })
        .catch(() => {
          alert('We had an error updating yuour data')
          this.loading = false
        })
    },
    success() {
      this.$snackbar.open({
        message: `Data was saved succesfully`,
        position: 'is-top-right'
      })
    },
    prepareIds() {
      const languages = this.tags
      const ids = {}
      languages.forEach(language => {
        // Parse data in laravel sync() format --> sync([1 => ['levels' => 'Begginer']])
        ids[language.id] = { levels: JSON.stringify(language.pivot.levels) }
      })
      return ids
    }
  }
}
</script>
