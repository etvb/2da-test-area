<template>
  <div id="navbar-web2 search">
    <div>
      <nav class="navbar2" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <!-- nuxt-imagen -->
          <!-- start button hamburger -->
          <div
            @click="openMenu2"
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target2="navbar2"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
          <!-- end button hamburger -->
        </div>
        <div id="navbar2" class="navbar-menu">
          <!-- aqui poner los botones -->

          <!-- <div class="layerSearchSelect">
            <span class="layerSearchTitle">
              Location
            </span>
          </div> -->


          <!--start buttom language -->
          <!-- <div class="button-search-pink"> -->
          <!-- <i class="fas fa-globe" /> -->
          <!-- {{ search }} -->
          <b-field class="field">
            <span class="titleButtomLanguage">Language</span>
            <!-- :input="searchInstructors()" -->
            <div class="optionButtomLanguage">
              {{ languageSelected }}
            </div>
            <select
              id="language"
              v-model="search"
              @change="changeLanguage(search)"
              class="searchSelect-pink pointer"
            >
              <option
                v-for="language in languages"
                :value="language.id"
                :key="language.id"
              >
                &nbsp;&nbsp;{{ language.english }}
              </option>
              <option value="others">
                &nbsp;&nbsp;Other languages
              </option>
            </select>
            <i class="fas fa-angle-down arrow" />
          </b-field>
          <!-- </div> -->
          <!--end buttom language -->

          <!-- button-Availability -->
          <b-field class="field">
            <div
              :class="[daysChecked.length == 0 ? layerSearchSelect='' : 'layerSearchSelectNone']"
              class="layerSearchSelectAvailability"
            >
              <span class="layerSearchTitle">
                Availability
              </span>
            </div>
            <div @click="showMe()" :class="[daysChecked.length !== 0 ? used='used' : '']" class="button-search pointer">
              <!-- <i class="far fa-calendar-alt" /> -->

              <span class="titleButtom2">Availability</span>
              <!-- <br> -->
              <div class="lineHeight">
                <!-- {{ daysComponent }} -->
                <span id="su" class="sizeSmall has-text-weight-bold  ">Su</span>
                <span id="mo" class="sizeSmall has-text-weight-bold  ">Mo</span>
                <span id="tu" class="sizeSmall has-text-weight-bold  ">Tu</span>
                <span id="we" class="sizeSmall has-text-weight-bold  ">We</span>
                <span id="th" class="sizeSmall has-text-weight-bold  ">Th</span>
                <span id="fr" class="sizeSmall has-text-weight-bold  ">Fr</span>
                <span id="sa" class="sizeSmall has-text-weight-bold  ">Sa</span>
                <i class="fas fa-angle-down arrow" />
              </div>
              <div id="menu" class="days">
                <div
                  v-for="day in days"
                  :key="day.id"
                  class="field"
                >
                  <!-- <b-checkbox
                  v-model="daysChecked"
                  :native-value="day.id"
                  :input="searchInstructors()"
                >
                  {{ day.name }}
                </b-checkbox> -->
                 
                  <b-checkbox
                    :id="day.id"
                    v-model="daysChecked"
                    :native-value="day.id"
                    @input="changeDays(day.id)"
                    type="is-algo"
                  >
                    {{ day.name }}
                  </b-checkbox>
                  <!-- 
                  <input v-model="daysComponent" type="checkbox" value="day.id">
                  <label for="">
                    {{ day.name }}
                  </label> -->
                </div>
              </div>
            </div>
          </b-field>
          <!-- end button-Availability -->

          <!-- button-Speaker -->
          <!-- <div class="button-search-pink"> -->
          <!-- <i class="fas fa-chalkboard-teacher" /> -->
          <b-field class="field">
            <div
              :class="[native == '5' ? layerSearchSelect='layerSearchSelectShow' : 'layerSearchSelectNone']"
              class="layerSearchSelect"
            >
              <span class="layerSearchTitle">
                Native Speaker
              </span>
            </div>
            <span class="titleButtomSpeaker">Native Speaker</span>
            <!-- <div id="NO">
              No
            </div> -->
            <!-- if you want disable the native speaker button, put this like a param= :disabled="disableNative" -->
            <select
              v-model="native"
              @change="changeNativeSpeaker(native)"
              class="searchSelect-pink pointer"
            >
              <option value="5">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option value="1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Yes
              </option>
              <option value="0">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No
              </option>
            </select>
            <i class="fas fa-angle-down arrow" />
          </b-field>
          <!-- </div> -->
          <!--end button-Speaker -->

          <!-- Lesson Price -->
          <b-field :class="[range[1] !== '50' ? used='used' : '']" class="button-search hasPositionRelative">
            <span class="titleButtomPrice">Lesson Price</span>
            <div class="contentNumber">
              <vue-slider
                v-model="range[1]"
                :tooltip="'always'"
                :tooltip-placement="['bottom']"
                @change="changeRangePrice"
                
                :min="min"
                :max="max"
              /> 

                
              <!-- fin slide -->
            </div>
            <!-- </div> -->
          </b-field>
          <!--end Lesson Price -->

          <!-- localtion -->
          <!-- <div :class="[locationSelected !== '' ? used ='used': '', ]" class="button-search"> -->
          <!-- <i class="fas fa-chalkboard-teacher" /> -->
          <!-- <div class="titleButtomLocation">
            <p>
              Location
            </p>
          </div> -->
          <b-field class="field">
            <div
              :class="[locationSelected == '' ? layerSearchSelect='layerSearchSelectShow' : 'layerSearchSelectNone']"
              class="layerSearchSelect"
            >
              <span class="layerSearchTitle">
                Location
              </span>
            </div>
            <span class="titleButtomLocation">Location</span>
            <div 
              :class="[locationSelected !== '' ? optionButtomLanguagePink='optionButtomLanguagePink' : '']"
              class="optionButtomLocation"
            >
              {{ countryPasada }}
            </div>
            
            <!-- lo que se seleccione en el option se almacena en la data locationSelected esto es por el v-model, por defecto el valor del option  -->
            <select
              v-model="locationSelected" 
              @change="changeLocation(locationSelected)"
              :class="[locationSelected !== '' ? used='used' : '']"
              class="searchSelect pointer"
            >
              <option id="ALL" value="">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option
                v-for="$location in locationsIndex"
                :key="$location"
                :value="$location"
              >
                &nbsp;&nbsp;{{ $location }}
              </option>
            </select>
            <i class="fas fa-angle-down arrow" />
          </b-field>
          <!-- </div> -->
          <!--end localtion -->

          <!-- rating -->
          
          <!-- <i class="fas fa-chalkboard-teacher" /> -->

          <b-field class="field ocultar">
            <div
              :class="[rating == '' ? layerSearchSelect='layerSearchSelectShow' : 'layerSearchSelectNone']"
              class="layerSearchSelect"
            >
              <span class="layerSearchTitle">
                Rating
              </span>
            </div>
            <span class="titleButtomRating">Rating</span>
            <select
              v-model="rating"
              @change="changeRating(rating)"
              :class="[rating !== '' ? used='used' : '']"
              class="searchSelect pointer"
            >
              <!-- :expanded="true"
                placeholder=""
                size="is-small" -->
              <option value="">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All
              </option>
              <option value="1">
                &nbsp;&nbsp;*
              </option>
              <option value="2">
                &nbsp;&nbsp;* *
              </option>
              <option value="3">
                &nbsp;&nbsp;* * *
              </option>
              <option value="4">
                &nbsp;&nbsp;* * * *
              </option>
            </select>
            <i class="fas fa-angle-down arrow" />
          </b-field>
          <!--end rating -->
        </div>
      </nav>
    </div>
  </div>
</template>
<style lang="sass" scoped>

  .ocultar
    display: none !important

  .lineHeight
    line-height: 12px

  .hasPositionRelative
    // position: relative
    line-height: 19px


  .navbar-menu
      line-height: 1.3

  select option
    background-color: white
    -moz-background-color: white
    text-align: center
    

  .pointer
    cursor: pointer
    &:hover
      box-shadow: 0 10px 8px rgba(0, 0, 0, 0.15), 0 1px 10px rgba(0, 0, 0, 0.2)

  select:focus
    outline:none !important

  .used
    background-color: #f8d0da !important
    border: 3px solid #df4661 !important 
  // #fb05bb
  .searchSelect, .searchSelect-pink
    max-width: 160px 
    // text-align: center
    padding-top: 20px
    border: 1px solid lightgrey
    // display: inline-block
    // height: 55px
    border-radius: 10px
    // min-width: 150px
    // cursor: pointer
    // background-color: white
    font-family: calibri  
    // text-align-last: center
    background-color: white
    min-width: 160px
    height: 50px
    appearance: none
    -webkit-appearance: none
    // padding-left: 8px
    border-color: #dbdbdb
    border-width: 2px
    border-style: solid
    color: darkgrey
    // font-weight: bold
    font-size: 18px
  .searchSelect-pink
    background-color: #ffc0cbb3
    border-color: #df4661
    border-width: 3px

  .layerSearchSelect, .layerSearchSelectAvailability
    position: absolute
    max-width: 160px 
    min-width: 160px
    height: 50px
    // padding-top: 20px
    border: 1px solid lightgrey
    border-radius: 10px
    font-family: calibri  
    background-color: white
    border-color: #dbdbdb
    border-width: 2px
    border-style: solid
    color: black
    font-size: 18px
    font-weight: bold
    display: table
    text-align: center
    z-index: 1
    pointer-events: none
  .layerSearchSelectAvailability
    min-width: 162px
    top: 0
    left: 0
  .layerSearchTitle
    vertical-align: middle
    display: table-cell
  .layerSearchSelectNone
    visibility: hidden
  





  .field
    margin: 0 5px 5px 5px
    position: relative
    display: inline-block
  .arrow
    position: absolute
    top: 30px
    left: 143px
    z-index: 10
    pointer-events: none
  .colorDays
    visibility: hidden
    // color: #df4661
  #NO
    font-family: calibri 
    font-size: 18px
    pointer-events: none
    position: absolute
    z-index: 1
    margin-top: 22px
    margin-left: 74px
    // font-family: 'sans-serif'
    // font-size: 13px
    color: darkgrey
    // font-weight: bold
  i.fas,
  i.far
    color: hsl(204, 86%, 53%)
  .fa-angle-down
    color: #df4661 !important
  .navbar-menu2
    // background-color: #f5f9fc
    // height: 80px
    // width: 100%
    display: -webkit-box
    display: -webkit-flex
    display: -ms-flexbox
    display: flex
    justify-content: center
    align-items: center
    flex-wrap: wrap
    // background-color: #34495e
  #navbar2
    justify-content: center
    margin-bottom: 1rem
  #search
    background-color: #f5f9fc;
    margin-bottom: 1em
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 10
  .days
    width: 150px
    border: 1px solid lightgrey
    position: absolute
    top: 120px
    background-color: white
    padding: 3px
    display: none
    z-index: 20
    text-align: initial;
  @media screen and (min-width: 230px)
    .days
      top: 54px
  // @media screen and (min-width: 373px)
  //   .days
  //     top: 120px

  .days.show
    display: block
  .sizeSmall
    font-family: calibri
    margin-top: 5px
    font-size: 10px
    color: darkgrey
  @media screen and (min-width: 1024px)
    #search nav .navbar-menu
      line-height: normal
      font-family: calibri 
      font-size: 18px
      justify-content: center
    #search nav .navbar-menu .navbar-start
      margin-right: 0
    #search nav .navbar-menu .navbar-end
      margin-left: 0
  .button-search, 
  .button-search-pink
    text-align: center
    padding: 0 5px
    // margin: 0 5px 5px 5px
    border: 2px solid lightgrey
    display: inline-block
    height: 50px
    border-radius: 10px
    min-width: 160px
    // cursor: pointer
    background-color: white
  .button-search-pink
    background-color: #f8d0da
    border-color: #fb05bb


  .button-search .fiel .control span select
    border: 0
  .titleButtom,.titleButtomLanguage, .titleButtomSpeaker, .titleButtomLocation, .titleButtomRating, .titleButtom2, .titleButtomPrice 
    font-family: calibri 
    font-size: 20px
    color: black
    // font-size: 14px
    font-weight: bold
    // width: 100%
    pointer-events: none
    // text-align-last: center
  .titleButtom 
    position: absolute
    margin-top: 3px
  .titleButtomLanguage,
    position: absolute
    margin-top: 2px
    left: 26%
    z-index: 1
  .titleButtomSpeaker
    position: absolute
    margin-top: 2px
    left: 9%
  .titleButtomLocation
    position: absolute
    margin-top: 3px
    left: 28%
  .titleButtomPrice
    position: relative
    top: 2px
  .titleButtomRating
    position: absolute
    margin-top: 3px
    left: 32%
  // fondo del boton #f8d0da
  .optionButtomLanguage, .optionButtomLocation
    position: absolute
    color: darkgrey
    font-size: 18px
    font-family: calibri
    top: 24px
    left: 9px
    // background-color: #f8d0da
    width: 90%
    text-align: center
    pointer-events: none
    height: 23px
    overflow: hidden
  .optionButtomLanguage
    background-color: #f8d0da
  .optionButtomLanguagePink
    background-color: #f8d0da




  .mySize
    width: 150px
    flex-wrap: wrap
    height: 55px
  .moreSpeaker, .morePrice
    width: 180px

  .lessRating
    width: 120px
  .contentNumber
    display: grid
    text-align: center
    font-family: calibri 
    font-size: 18px
    position: relative
    top: 7px
    
  .sizeNumber
    width: 137px
    height: 24px
</style>

<script>
import axios from 'axios'
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'

export default {
  components: {
    VueSlider
  },
  props: {
    locationsIndex: {
      type: Array,
      default: () => []
    },
    languageSelected: {
      type: String,
      default: ''
    },
    // search: {
    //   type: String,
    //   default: ''
    // },
    dataPrueba: {
      type: Object,
      default: () => {}
    },
    countryPasada: {
      type: String,
      default: ''
    },
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
      default: () => [0, '50']
    },
    nativeSpeaker: {
      type: String,
      default: '5'
    }
    // activateGetLocation: {
    //   type: Boolean,
    //   defaylt: false
    // }
  },
  data() {
    return {
      // idioma: '',
      // marks: [0, 50],
      usado: true,
      disableNative: false,
      min: 0,
      max: 50,
      native: this.nativeSpeaker,
      rating: '',
      locationSelected: this.countryPasada,
      locations: [],
      // prueba: 0,
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
      // daysComponent: []
      // this.daysChecked.slice()
    }
  },
  // computed: {
  //   lenguaje() {
  //     const id = parseInt(this.search)
  //     // eslint-disable-next-line no-console
  //     console.log('id' + id)
  //     return this.languages.find(language => {
  //       return language.id === id
  //     })
  //   }
  // },
  // whit this no error alert, this is called firt
  beforeMount() {
    if (this.selected) {
      this.search = this.selected
    }
    // eslint-disable-next-line no-console
    console.log('Antes de cargar EN SEARCH2')
    // if (this.dataPrueba.instructors) {
    //   this.locationsFunctionInstructors()
    // } else {
    //   this.locationFunctionOther()
    // }
    // this.getLocations()
  },
  mounted() {
    this.getLocations()

    // this.changeColorDays()
    this.changeColorVueSlider()
    this.changeColor()
    this.setLanguages()
    this.changeColorCheckboxClick()
    // this.changeColorDays()
    // this.locationsFunction()
    // this.getLocation()
    // eslint-disable-next-line no-console
    console.log('alcargar EN SEARCH"')
    if (this.search === 'others') {
      this.disableNative = true
    }
  },
  methods: {
    prueba() {
      alert('hola')
    },

    changeColorVueSlider() {
      const vueSliderProcess = document.getElementsByClassName(
        'vue-slider-process'
      )
      const tooltip = document.getElementsByClassName(
        'vue-slider-dot-tooltip-inner'
      )
      const vueSliderRail = document.getElementsByClassName('vue-slider-rail')
      vueSliderProcess[0].style.backgroundColor = '#df4661'
      vueSliderRail[0].style.backgroundColor = '#df4661'
      tooltip[0].style.backgroundColor = '#f8d0da'
      tooltip[0].style.borderColor = '#f8d0da'
      tooltip[0].style.color = 'black'
      tooltip[0].style.fontSize = '11px'
      tooltip[0].style.padding = 0
    },
    // changeColorDays(dia) {
    // show or hide the days in the view, put this in the changeColorCheckboxClick function
    //   switch (dia) {
    //     case 0:
    //       const sunday = document.getElementById('su')
    //       sunday.classList.toggle('colorDays')
    //       break
    //     case 1:
    //       const monday = document.getElementById('mo')
    //       monday.classList.toggle('colorDays')
    //       break
    //     case 2:
    //       const tuesday = document.getElementById('tu')
    //       tuesday.classList.toggle('colorDays')
    //       break
    //     case 3:
    //       const wednesday = document.getElementById('we')
    //       wednesday.classList.toggle('colorDays')
    //       break
    //     case 4:
    //       const thurday = document.getElementById('th')
    //       thurday.classList.toggle('colorDays')
    //       break
    //     case 5:
    //       const friday = document.getElementById('fr')
    //       friday.classList.toggle('colorDays')
    //       break
    //     case 6:
    //       const saturday = document.getElementById('sa')
    //       saturday.classList.toggle('colorDays')
    //   }
    // },
    openMenu2(event) {
      const element = event.target
      const trigger = element.closest('div')

      const target = trigger.dataset.target2
      const $target = document.getElementById(target)

      trigger.classList.toggle('is-active')
      $target.classList.toggle('is-active')
    },
    showMe() {
      const menu = document.getElementById('menu')
      menu.classList.toggle('show')
    },
    delete() {
      const border = document.querySelectorAll('select')
      for (const item of border) {
        item.style.border = 0
      }
    },
    /* searchInstructors() {
      // eslint-disable-next-line no-console
      console.log('ejecutando desde SE2')
      // if (this.search === '') {
      //   alert('Please select a language5')
      //   return
      // }
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
      const days = this.getDaysFiltereds()
      const rangePrice = this.getRangePrice()
      const locationes = this.getLocation()
      // this.$router.push('/' + this.search + '/instructors')
      // this.$router.push(
      //   '/' + this.search + '/instructors?' + days + rangePrice + locationes
      // )
      this.$router.push(
        `/${this.search}/instructors?${days +
          rangePrice +
          locationes}&test='33ss'`
      )
    }, */
    setLanguages() {
      // const url = process.env.apiUrl + 'languages'
      const url = process.env.apiUrl + 'languages/availables'
      axios.get(url).then(response => {
        this.languages = response.data
        // eslint-disable-next-line no-console
      })
    },
    /* getDaysFiltereds() {
      const days = this.daysChecked
      // si esta vacio devuelve el arreglo vacio
      if (!days.length) return ''

      return 'days=' + days
    }, */
    getRangePrice() {
      const range = this.range
      return '&price=' + range[0] + '-' + range[1]
    },
    /* getLocation() {
      const location = this.locationSelected
      // eslint-disable-next-line no-console
      console.log(location)
      return '&location=' + location
    }, */
    getLocations() {
      // eslint-disable-next-line no-console
      console.log('obteniendo las locaciones')
      if (this.dataPrueba.instructors) {
        const instructors = this.dataPrueba.instructors
        const locations = []
        instructors.forEach(element => {
          // this if filter the data, do not save the same info and data null in the array locations
          if (
            locations.indexOf(element.user.country) === -1 &&
            element.user.country !== null
          ) {
            locations.push(element.user.country)
          }
        })
        // this.locationes = locations
        this.locations = locations
      } else {
        const instructors = this.dataPrueba
        const locations = []
        instructors.forEach(element => {
          element.instructors.forEach(element => {
            if (
              locations.indexOf(element.user.country) === -1 &&
              element.user.country !== null
            ) {
              locations.push(element.user.country)
            }
          })
        })
        this.locations = locations
      }
    },
    changeNativeSpeaker(value) {
      // this.hideNO()
      this.$router.push({
        path: this.$route.fullPath,
        query: { native: value }
      })
    },
    // hideNO() {
    //   // add 'NO' in the buttom native spiker
    //   const element = document.getElementById('NO')
    //   element.style.display = 'none'
    // },
    changeDays(dia) {
      this.$emit('changeDays', this.daysChecked)
      // this.changeColorDays(dia)
      this.changeColorCheckboxClick()
    },
    changeLocation(value) {
      if (value === '') {
        // eslint-disable-next-line no-console
        console.log('EJECUTANDOLA DSD EL BOTON')
        setTimeout(() => {
          // this.getLocations()
        }, 2000)
      }
      this.$router.push({
        path: this.$route.fullPath,
        query: { location: value }
      })
    },
    changeRating(value) {
      this.$router.push({
        path: this.$route.fullPath,
        query: { rating: value }
      })
    },
    changeLanguage(value) {
      // this.$emit('prueba', value)
      // eslint-disable-next-line no-console
      // console.log('YE ESTRE')
      // eslint-disable-next-line no-console
      // console.log(value)
      // this.$router.push('/' + this.search + '/instructors')
      // const path = this.$route.fullPath
      // const newPath = path.replace(this.selected, value)
      // this.$router.push({
      //   path: newPath
      // })
      // this.changeRating()
      // this.$router.pa
      // this.$route.params.lang = this.search
      // otra forma de hacerlo

      // eslint-disable-next-line no-console
      console.log('MIRAME')
      // eslint-disable-next-line no-console
      console.log()
      this.$router.push({
        path: '/' + value + '/instructors',
        query: {
          days: '0,1,2,3,4,5,6'
        }
      })
    },
    changeRangePrice() {
      // const price = this.range[0] + '-' + this.range[1]
      this.$router.push({
        path: this.$route.fullPath,
        query: { price: this.range[0] + '-' + this.range[1] }
      })
    },
    layerSearchSelect() {
      // eslint-disable-next-line no-console
      console.log('askdflk')
    },
    changeColor() {
      // Put backgroun and border color to the checbox in the begining
      const chechBox = document.getElementsByClassName('is-algo')
      // eslint-disable-next-line no-console
      // console.log(chechBox)

      for (const iterator of chechBox) {
        iterator.style.backgroundColor = '#f8d0da'
        iterator.style.borderColor = '#f8d0da'
      }
      // chechBox.style.backgroundColor = '#f8d0da'
    },
    changeColorCheckboxClick() {
      const isChecked0 = document.querySelector('input[value="0"]').checked
      const isChecked1 = document.querySelector('input[value="1"]').checked
      const isChecked2 = document.querySelector('input[value="2"]').checked
      const isChecked3 = document.querySelector('input[value="3"]').checked
      const isChecked4 = document.querySelector('input[value="4"]').checked
      const isChecked5 = document.querySelector('input[value="5"]').checked
      const isChecked6 = document.querySelector('input[value="6"]').checked
      const sunday = document.getElementById('su')
      const monday = document.getElementById('mo')
      const tuesday = document.getElementById('tu')
      const wednesday = document.getElementById('we')
      const thurday = document.getElementById('th')
      const friday = document.getElementById('fr')
      const saturday = document.getElementById('sa')
      const chechBoxSunday = document.querySelector('input[value="0"] + span')
      const chechBoxMonday = document.querySelector('input[value="1"] + span')
      const chechBoxTuesday = document.querySelector('input[value="2"] + span')
      const chechBoxWednesday = document.querySelector(
        'input[value="3"] + span'
      )
      const chechBoxThursday = document.querySelector('input[value="4"] + span')
      const chechBoxFriday = document.querySelector('input[value="5"] + span')
      const chechBoxSaturday = document.querySelector('input[value="6"] + span')

      // eslint-disable-next-line no-console
      console.log('DENTRO')
      if (!isChecked0) {
        // Cuando no esta checado entra aqui
        chechBoxSunday.style.backgroundColor = '#fff'
        sunday.classList.add('colorDays')
      } else {
        chechBoxSunday.style.backgroundColor = '#f8d0da'
        sunday.classList.remove('colorDays')
      }
      if (!isChecked1) {
        chechBoxMonday.style.backgroundColor = '#fff'
        monday.classList.add('colorDays')
      } else {
        chechBoxMonday.style.backgroundColor = '#f8d0da'
        monday.classList.remove('colorDays')
      }
      if (!isChecked2) {
        chechBoxTuesday.style.backgroundColor = '#fff'
        tuesday.classList.add('colorDays')
      } else {
        chechBoxTuesday.style.backgroundColor = '#f8d0da'
        tuesday.classList.remove('colorDays')
      }
      if (!isChecked3) {
        chechBoxWednesday.style.backgroundColor = '#fff '
        wednesday.classList.add('colorDays')
      } else {
        chechBoxWednesday.style.backgroundColor = '#f8d0da'
        wednesday.classList.remove('colorDays')
      }
      if (!isChecked4) {
        chechBoxThursday.style.backgroundColor = '#fff'
        thurday.classList.add('colorDays')
      } else {
        chechBoxThursday.style.backgroundColor = '#f8d0da'
        thurday.classList.remove('colorDays')
      }
      if (!isChecked5) {
        chechBoxFriday.style.backgroundColor = '#fff'
        friday.classList.add('colorDays')
      } else {
        chechBoxFriday.style.backgroundColor = '#f8d0da'
        friday.classList.remove('colorDays')
      }
      if (!isChecked6) {
        chechBoxSaturday.style.backgroundColor = '#fff'
        saturday.classList.add('colorDays')
      } else {
        chechBoxSaturday.style.backgroundColor = '#f8d0da'
        saturday.classList.remove('colorDays')
      }
    }

    // getLanguageSelected() {
    //   // alert('hola')
    //   const language = document.getElementById('language')
    //   const languageSelected = language.options[language.selectedIndex].text
    //   this.idioma2 = languageSelected
    // }
  }
}
</script>
