<template>
  <div>
    {{ $route.query.price }}
    <b-field>
      <b-select
        v-model="search"
        placeholder="Select language"
        icon="earth"
        size="is-medium"
        expanded
      >
        <option
          v-for="language in languages"
          :value="language.id"
          :key="language.id"
        >
          {{ language.english }}
        </option>
        <option value="others">
          Other languages
        </option>
      </b-select>
      <p class="control">
        <button
          @click="searchInstructors"
          :class="{'is-loading': loading}"
          class="button -has-bg-primary has-text-white is-medium -is-borderless"
        >
          Search
        </button>
      </p>
    </b-field>
    <div v-if="daysFilter" class="box is-radiusless -is-spaced-top">
      <h6 class="title is-6">
        Availability
        <!-- {{ daysChecked }} -->
        <!-- {{ days }} -->
      </h6>
      <div
        v-for="day in days"
        :key="day.id"
        class="field"
      >
        <b-checkbox
          v-model="daysChecked"
          :native-value="day.id"
        >
          {{ day.name }}
        </b-checkbox>
      </div>
    </div>
    <div v-if="rangeFilter" class="box is-radiusless -is-spaced-top">
      <h6 class="title is-6 -price-filter">
        Price
      </h6>
      {{ range }}
      <vue-slider
        v-model="range"
        :min-range="5"
        :max="50"
        :tooltip="'always'"
        class="-is-spaced-top"
      />
    </div>
  </div>
</template>
<style lang="sass">
.-price-filter
  margin-bottom: 2.5rem!important
</style>

<script>
import axios from 'axios'
// import VueSlider from 'vue-slider-component'
// import 'vue-slider-component/theme/default.css'
// import component
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'

// import theme
import 'vue-slider-component/theme/default.css'
export default {
  components: {
    VueSlider
  },
  props: {
    selected: {
      type: String,
      default: ''
    },
    daysFilter: {
      type: Boolean,
      default: false
    },
    daysChecked: {
      type: Array,
      default: () => []
    },
    rangeFilter: {
      type: Boolean,
      default: false
    },
    range: {
      type: Array,
      default: () => [0, 50]
    }
  },
  data() {
    return {
      search: '',
      languages: '',
      days: [
        { name: 'Sunday', id: 0 },
        { name: 'Monday', id: 1 },
        { name: 'Tuesday', id: 2 },
        { name: 'Wednesday', id: 3 },
        { name: 'Thursday', id: 4 },
        { name: 'Friday', id: 5 },
        { name: 'Saturday', id: 6 }
      ],
      loading: false
      // range: [0, 50]
      // daysChecked: []
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log('al cargar SEARCH' + this.search)

    // eslint-disable-next-line no-console
    console.log('al cargar SEARCH' + this.selected)
    this.setLanguages()
    if (this.selected) {
      this.search = this.selected
    }
  },
  methods: {
    prueba() {
      // eslint-disable-next-line no-console
      console.log(this.search)
    },
    searchInstructors() {
      // eslint-disable-next-line no-console
      console.log('desde el boton dias checados' + this.daysChecked)
      if (this.search === '') {
        alert('Please select a language')
        return
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
      const days = this.getDaysFiltereds()
      // const rangePrice = this.getRangePrice()
      // this.$router.push('/' + this.search + '/instructors')
      this.$router.push('/' + this.search + '/instructors?' + days)
    },
    setLanguages() {
      // eslint-disable-next-line no-console
      console.log('desde los props' + this.selected)
      // const url = process.env.apiUrl + 'languages'
      const url = process.env.apiUrl + 'languages/availables'
      axios.get(url).then(response => {
        this.languages = response.data
      })
    },
    getDaysFiltereds() {
      const days = this.daysChecked
      // si esta vacio devuelve el arreglo vacio
      // if (!days.length) return ''
      // si viene desde la búsqueda principal(donde no se puede filttrar por días) devolvemos todos los días, si ya se encuentra en
      // la parte donde se puede filtrar por días respetamos la busqueda aunque este vacía
      if (!days.length) {
        const fromLangPage = this.$route.params.lang
        if (fromLangPage) {
          return ''
        } else {
          return 'days=0,1,2,3,4,5,6'
        }
      }
      alert(days)
      // eslint-disable-next-line no-console
      console.log('desde getDaysFiltereds' + days)
      return 'days=' + days
    },
    getRangePrice() {
      const range = this.range
      return '&price=' + range[0] + '-' + range[1]
    }
  }
}
</script>
