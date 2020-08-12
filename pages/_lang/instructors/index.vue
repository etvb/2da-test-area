<template>
  <div class="section mybg">
    <CVideo 
      :isCardModalIntroductionVideo="isCardModalIntroductionVideo"
      :videoData="video"
    />
    <div class="container">
      <!-- navbar -->
      <!-- :range="range"  y ano se lo paso para que pueda funcionar el boton del precio -->
      <search2
        :locationsIndex="getLocationsIndex"
        :nativeSpeaker="native.toString()"
        :languageSelected="languageSelected"
        :selected="selectedLang"
        :daysChecked="daysChecked"
        :mostrar="false"
        :range="range"
        :countryPasada="countryParaPasar"
        :dataPrueba="infoInstructors"
        :prueba="language"
        @changeDays="changeDays"
        @prueba="infoComponente"
      />

      <h4 v-if="language.instructors" class="title is-4 has-text-centered">
        We've  found {{ language.instructors.length }} teachers
      </h4>
      <h4 v-else class="title is-4 has-text-centered">
        We've  found {{ suma() }} teachers
      </h4>
      <div class="columns">
        <div class="column is-3">
          <div>
            <!-- <search
              :selected="selectedLang"
              :daysFilter="true"
              :rangeFilter="true"
              :daysChecked="daysChecked"
              :range="range"
            /> -->
          </div>
        </div>
        <div v-if="language.instructors" class="column">
          <nuxt-link
            :to="'/'+$route.params.lang+'/instructors/' + instructor.id"
            v-for="(instructor, index) in language.instructors"
            v-if="instructor.user"
            :key="instructor.id"
          >
            <!-- <nuxt-link
            :to="'/'+$route.params.lang+'/instructors/' + instructor.id"
            v-for="(instructor, index) in language.instructors"
            v-if="instructor.user"
            :key="instructor.id"
            > -->
            <div
              :class="index != 0 ? '-is-spaced-top': ''"
              class="box is-radiusless -card-vertical container-profile "
            >
              <div class="container-profile-info">
                <!-- changed the img tag fot div, if the user has image show  -->
                <div v-if="instructor.user.profile_picture" class="-profile-picture">
                  <div
                    id="container-profile-img"
                    
                    :style="'background-image: url(' + instructor.user.profile_picture + '); background-size: cover; background-repeat: no-repeat'"
                    class="-is-circle is-inline-block -profile-picture"
                  />
                </div>
                
                <!-- if the user don´t have imege show this -->
                <img
                  v-else
                  style="opacity: .2;"
                  src="/profile.png"
                  class="-is-circle -profile-picture"
                >
                <!-- <div v-else class="-profile-picture is-inline-block" /> -->
                <div class="container-profile-main">
                  <div class="container-profile-name">
                    <h5 class="title is-marginless is-5 has-text-weight-bold has-text-black">
                      {{ instructor.user.name + ' ' + instructor.user.lastname[0] + '.' }}
                    </h5>
                  </div>
                  <p class="has-text-grey newSize">
                    Native Language: <span>{{ instructor.user.language.english }}</span>
                  </p><br>
                  <p v-show="instructor.average_rating" class="container-profile-raiting has-text-grey">
                    Raiting: <rating :rating="instructor.average_rating ? instructor.average_rating : 0" />
                  </p>
                </div>
                <!-- flag -->   
                <span class="container-profile-flag">
                  <div class="borde" />
                  <img :src="pais(instructor.user.country)">
                </span>
                <div class="conteiner-like">
                  <like 
                    :idTeacher="instructor.id"
                  />
                </div>
              </div>
              <hr>
              <div class="is-inline-block -description container-profile-description">
                <p class="subtitle is-6 profile-description">
                  {{ instructor.description | truncate2(150) }}  
                  <nuxt-link
                    :to="'/'+$route.params.lang+'/instructors/' + instructor.id"
                  >
                    <span v-show="readMore(instructor.description) >= 150" class="colorReadMore"> read more.</span> 
                  </nuxt-link>
                </p>
              </div>
              <hr>
              <div class="container-profile-teacher">
                <!-- <b-tag class="is-rounded -top-badge">
                  &nbsp; Top &nbsp;
                </b-tag>
                <rating :rating="instructor.average_rating ? instructor.average_rating : 0" class="is-pulled-right" /> -->
                <div>
                  <p class=" has-text-grey has-text-weight-bold littleMore">
                    Lesson Price:
                  </p>
                  <p class="has-text-weight-bold has-text-black mb-6 littleMore">
                    USD {{ instructor.price_by_class }}
                  </p>
                  <nuxt-link
                    :to="'/'+$route.params.lang+'/instructors/' + instructor.id + '?isCalendarModalActive=true'"
                  >
                    <!-- @click="activateCalendarModal" -->
                    <button 
                      class="button is-expand is-fullwidth colorButton size12"
                    >
                      Book
                    </button>
                  </nuxt-link>
                </div>
                <div class="marginado">
                  <p class=" has-text-grey has-text-weight-bold littleMore">
                    Location:
                  </p>
                  <p class="has-text-weight-bold has-text-black mb-6 littleMore">
                    {{ instructor.user.country }}
                  </p>
                  <nuxt-link
                    :to="'/'+$route.params.lang+'/instructors/' + instructor.id + '?isCalendarModalActive=true'"
                  >
                    <!-- <nuxt-link
                    :to="'/'+$route.params.lang+'/instructors/' + instructor.id"
                  >  -->
                    <button class="button is-expand is-fullwidth colorButton size12">
                      Schedule
                    </button>
                  </nuxt-link>
                </div>
                <div>
                  <p class="is-size-6 has-text-grey has-text-weight-bold littleMore">
                    Teaches:
                  </p>
                  <p class="has-text-weight-bold has-text-black littleMore">
                    <span v-for="(languageTeach, index) in instructor.languages" :key="index">

                      <span v-if="index+1 < instructor.languages.length">
                        {{ languageTeach.english +',' }}
                        
                      </span>
                      <span v-else>
                        {{ languageTeach.english }}
                        
                      </span>
            
                    </span>
                  </p>
                  <button
                    :disabled="!instructor.video_url"
                    @click.prevent="openVideo(instructor.video_url)"
                    :value="instructor.video_url"
                    class="button is-expand is-fullwidth colorButton size12 "
                  > 
                    Video
                  </button>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
        <!-- insertar aqui -->
        <div v-else class="column">
          <template v-for="(lang, indexLang) in language">
            <nuxt-link
              v-for="(instructorL, index) in lang.instructors"
              :to="'/'+lang.id+'/instructors/' + instructorL.id"
              v-if="instructorL.user"
              :key="index"
              :class="indexLang != 0 ? '-is-spaced-top': ''"
              class="is-block"
            >
              <!-- <nuxt-link
              :to="'/'+lang.id+'/instructors/' + instructor.id"
              v-for="(instructor, index) in lang.instructors"
              v-if="instructor.user"
              :key="instructor.id"
              :class="indexLang != 0 ? '-is-spaced-top': ''"
              class="is-block"
              > -->
              <!-- <div
                :class="index != 0 ? '-is-spaced-top': ''"
                class="box is-radiusless -card-vertical"
              > -->
              <div
                :class="index != 0 ? '-is-spaced-top': ''"
                class="box is-radiusless -card-vertical container-profile "
              >
                <div class="container-profile-info">
                  <div
                    v-if="instructorL.user.profile_picture"
                    :style="'background-image: url(' + instructorL.user.profile_picture + '); background-size: cover; background-repeat: no-repeat'"
                    class="-is-circle -profile-picture is-inline-block"
                  />

                  <!-- <div v-else class="-profile-picture is-inline-block" /> -->
                  
                  <img
                    v-else
                    style="opacity: .2;"
                    src="/profile.png"
                    class="-is-circle -profile-picture"
                  >
                  <div class="container-profile-main">
                    <div class="container-profile-name">
                      <h5 class="title is-marginless is-5 has-text-weight-bold has-text-black">
                        {{ instructorL.user.name + ' ' + instructorL.user.lastname[0] + '.' }}
                      </h5>       
                    </div>
                    <p class="has-text-grey newSize">
                      Native Language: <span>{{ instructorL.user.language.english }}</span>
                    </p><br>
                    <p v-show="instructorL.average_rating" class="container-profile-raiting has-text-grey ">
                      Raiting: <rating :rating="instructorL.average_rating ? instructorL.average_rating : 0" />
                    </p>
                  </div>
                  <!-- flag -->
                  <span class="container-profile-flag">
                    <div class="borde" />
                    <img :src="pais(instructorL.user.country)">
                  </span>
                  <div class="conteiner-like">
                    <like
                      :idTeacher="instructorL.id"
                    />
                  </div>
                  <!-- <div class="is-inline-block -description">
                    <h5 class="title is-6 is-marginless">
                      {{ instructor.user.name + ' ' + instructor.user.lastname[0] + '.' }}
                    </h5>
                    <h5 class="title is-6">
                      {{ lang.english }}
                    </h5>
                    <p class="subtitle is-6">
                      {{ instructor.description }}
                    </p>
                  </div> -->
                </div>
                <hr>
                <div class="is-inline-block -description container-profile-description">
                  <p class="subtitle is-6 profile-description">
                    {{ instructorL.description | truncate2(150) }}  
                    <nuxt-link
                      :to="'/'+lang.id+'/instructors/' + instructorL.id"
                    >
                      <span v-show="readMore(instructorL.description) >= 150" class="colorReadMore"> read more.</span> 
                    </nuxt-link>
                  </p>
                </div>
                <hr>
                <div class="container-profile-teacher">
                  <!-- <b-tag class="is-rounded -top-badge">
                    &nbsp; Top &nbsp;
                  </b-tag>
                  <rating :rating="instructor.average_rating ? instructor.average_rating : 0" class="is-pulled-right" /> -->
                  <div>
                    <p class="has-text-grey has-text-weight-bold littleMore">
                      Lesson Price:
                    </p>
                    <p class="has-text-weight-bold has-text-black littleMore">
                      USD {{ instructorL.price_by_class }}
                    </p>
                    <nuxt-link
                      :to="'/'+$route.params.lang+'/instructors/' + instructorL.id + '?isCalendarModalActive=true'"
                    >
                      <!-- @click="activateCalendarModal" -->
                      <button 
                        class="button is-expand is-fullwidth colorButton size12"
                      >
                        Book
                      </button>
                    </nuxt-link>
                  </div>
                  <div class="marginado">
                    <p class="is-size-6 has-text-grey has-text-weight-bold littleMore">
                      Location:
                    </p>
                    <p class="has-text-weight-bold has-text-black littleMore">
                      {{ instructorL.user.country }}
                    </p>
                    <!-- <nuxt-link
                      :to="'/'+lang.id+'/instructors/' + instructorL.id"
                    >  -->
                    <nuxt-link
                      :to="'/'+$route.params.lang+'/instructors/' + instructorL.id + '?isCalendarModalActive=true'"
                    >
                      <button class="button is-expand is-fullwidth colorButton size12">
                        Schedule
                      </button>
                    </nuxt-link>
                  </div>
                  <div>
                    <p class="is-size-6 has-text-grey has-text-weight-bold littleMore">
                      Teaches:
                    </p>
                    <p class="has-text-weight-bold has-text-black littleMore">
                      <span v-for="(languageTeach, index) in instructorL.languages" :key="index">
                        <span v-if="index+1 < instructorL.languages.length">
                          {{ languageTeach.english +',' }}
                        
                        </span>
                        <span v-else>
                          {{ languageTeach.english }}
                        
                        </span>
                      </span>
                    </p>
                    <button
                      :disabled="!instructorL.video_url"
                      @click.prevent="openVideo(instructorL.video_url)"
                      :value="instructorL.video_url"
                      class="button is-expand is-fullwidth colorButton size12"
                    > 
                      Video
                    </button>
                  </div>
                </div>
                <!-- <div class="">
                  <b-tag class="is-rounded -top-badge">
                    &nbsp; Top &nbsp;
                  </b-tag>
                  <rating :rating="instructor.average_rating ? instructor.average_rating : 0" class="is-pulled-right" />
                </div> -->
              </div>
            </nuxt-link>
          </template>
        </div>
        <div class=" column is-3" />
      </div>
    </div>
  </div>
</template>
<style lang="sass">
  .borde
    position: absolute
    width: 40px
    height: 26px
    top:  7px
    border: 1px #f9f7f6 solid
    // background-color: red
    // #f9f7f6
  .littleMore
    font-size: 17px !important
    // letter-spacing: .5px

  .size12
    font-size: 1.2rem
    letter-spacing: 2px;
  .newSize
    line-height: 1
    font-size: 1.25rem
    position: relative
    top: -12px
    margin-top: 7px

  .button:disabled
    color:black

  .colorReadMore
    color: #e84660
  .colorButton
    background-color: #e84660
    border-color: #e84660
    color: white
    // font-weight: 600
    margin-top: 5px
  .colorButton:disabled
    color: black
  hr
    margin: 10px 0

  rating
    float: none !important
  .container-card
    
  .container-profile
    // border: 2px solid red
    padding-left: 30px
    padding-right: 30px
  
  .container-profile-main
    flex: 1 1 auto
    margin-left: 20px
    margin-right: 20px
    text-align: initial

  .container-profile-name  
    display: flex
    justify-content: space-between
    align-items: center
    line-height: 1
    margin-top: 10px
    padding-bottom: 11px

  .container-profile-info, 
  .container-profile-teacher
    display: flex
    justify-content: space-between
    margin-left: 10px

  
  .container-profile-teacher
    div
      display: flex
      flex-direction: column
      justify-content: flex-end
      flex: 1 1 168px

  .marginado
    margin: 0 30px

  .container-profile-raiting
    margin-top: -36px
    font-size: 1.25rem
    // line-height: 0


  .container-profile-flag
    position: relative
    margin-right: 10px
    // border: 1px solid hsl(0, 0%, 96%)
    width: 40px
    align-self: flex-start
    // border: 1px #f9f7f6 solid
    flex: 0 0 auto
  
  .conteiner-like
    // padding-right: 22px
    margin-top: 7px
    font-size: 22px

    
  // .conteiner-like2
  //   margin-top: 7px
  //   font-size: 22px


  .container-profile-description
    min-height: 60px
    max-height: 80px
    .profile-description
      margin-left: 10px
      // margin-right: 30px
      font-weight: 600
      color: black

  // .container-profile-name
  //   flex: 1 1 auto

  #search
    background-color: white;
    margin-bottom: 1em
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 10
  @media screen and (min-width: 1024px)
    #search nav .navbar-menu
      justify-content: center
      text-align: center
    #search nav .navbar-menu .navbar-start
      margin-right: 0
    #search nav .navbar-menu .navbar-end
      margin-left: 0
  .mySize
    width: 150px;
    flex-wrap: wrap;
    height: 55px;
  .moreSpeaker, .morePrice
    width: 180px

  .lessRating
    width: 120px
  .mybg
    background-color: #f5f9fc;

  .-card-vertical
    .-profile-picture
      // margin-right: 1rem
      height: 80px
      width: 80px
    .-description
      vertical-align: super
    &:hover
      // cursor: pointer
      box-shadow: 0 10px 8px rgba(0, 0, 0, 0.15), 0 1px 10px rgba(0, 0, 0, 0.2)
  
  @media screen and (max-width: 500px)
    .littleMore
      font-size: 15px !important
    .size12
      font-size: 1rem
      // letter-spacing: 2px;
    .newSize
      line-height: 1
      font-size: 1.25rem
      position: relative
      top: -12px
      margin-top: 10px

    #prueba
      padding-left: 10px
      padding-right: 10px
    .mybg, .container-profile, .container-profile-main
      // background-color: red
      padding-left: 5px
      padding-right: 5px
    .container-profile-main
      flex: 1 1 auto
      margin-left: 5px
      margin-right: 5px
      font-size: 14px
    .conteiner-like
      padding: 0 5px 22px 5px
    .container-profile-description
      min-height: 60px
      max-height: 80px
    #container-profile-img
      margin-right: 0
    
</style>

<script>
// import CBook from '~/components/web/general/CBook.vue'
import CVideo from '~/components/web/general/CVideo.vue'
import Like from '~/components/general/Like.vue'
// import Search from '~/components/web/general/Search.vue'
import Search2 from '~/components/web/general/Search2.vue'
import Rating from '~/components/web/general/Rating.vue'
import Countries from '@/mixins/countries'
import axios from 'axios'
export default {
  components: {
    // CBook,
    CVideo,
    Like,
    // Search,
    Search2,
    Rating
  },
  filters: {
    truncate2: function(text, limit) {
      if (String(text).length > limit) {
        for (let i = limit; i > 0; i--) {
          if (
            text.charAt(i) === ' ' &&
            (text.charAt(i - 1) !== ',' ||
              text.charAt(i - 1) !== '.' ||
              text.charAt(i - 1) !== ';')
          ) {
            return text.substring(0, i) + '...'
          }
        }
        return text.substring(0, limit) + '...'
      } else return text
    },

    truncate: function(value, limit) {
      // eslint-disable-next-line no-console
      // console.log(value)
      if (String(value).length > limit) {
        value = value.substring(0, limit - 3) + '... '
      }

      return value
    }
  },
  mixins: [Countries],
  // watchQuery: ['days', 'price', 'country', 'native'],
  watchQuery: true,
  data() {
    return {
      // locations: [],
      // idTeacher: '',
      teach: '',
      count: 0,
      video: '',
      isCalendarModalActive: false,
      isCardModalIntroductionVideo: false,
      instructor: [],
      nuevo: [],
      // instructors: [],
      // total: parseInt(this.instructors) + parseInt(this.total),
      url: 'https://www.countryflags.io',
      selectedLang: this.$route.params.lang,
      language: {
        instructors: []
      },
      totalInstructors: 0
      // daysChecked: [],
      // range: []
      // prueba: {}
      // countryParaPasar: []
    }
  },
  async asyncData({ params, query }) {
    const langId = params.lang
    // let days = ['0', '1', '2', '3', '4', '5', '6']
    let days = []
    let range = [0, '50']
    // 5 es por un valor diferente de 0 y 1, por que null, 0 o '' es lo mismo
    let native = 5
    let rating = null
    let location = ''
    // const location = ''
    // eslint-disable-next-line no-console
    console.log('ASYNC ' + query.location)
    if (query.days) {
      days = query.days.split(',')
    }
    if (query.price) {
      range = query.price.split('-')
    }
    if (query.native) {
      native = query.native
    }
    if (query.location) {
      location = query.location
    }
    if (query.rating) {
      rating = query.rating
    }

    const url = `${process.env.apiUrl}languages/${langId}/instructors`
    const filters = {
      days: days,
      price_range: range,
      country: location,
      native,
      rating,
      location
    }
    const { data } = await axios.post(url, filters)
    // eslint-disable-next-line no-console
    console.log('data de ESTE INDX')
    // eslint-disable-next-line no-console
    console.log(data)

    const getLocationsIndex = []

    if (data.language.instructors) {
      data.language.instructors.forEach(element => {
        if (
          getLocationsIndex.indexOf(element.user.country) === -1 &&
          element.user.country !== null
        ) {
          getLocationsIndex.push(element.user.country)
        }
      })
    } else {
      data.language.forEach(element => {
        element.instructors.forEach(element => {
          if (
            getLocationsIndex.indexOf(element.user.country) === -1 &&
            element.user.country !== null
          ) {
            getLocationsIndex.push(element.user.country)
          }
        })
      })
    }

    // eslint-disable-next-line no-console
    // console.log(borrarLocations)
    // eslint-disable-next-line no-console
    // console.log(langId)
    // Filter by rating
    if (query.rating) {
      if (langId !== 'others') {
        data.language.instructors = data.language.instructors.filter(
          instructor => {
            return parseInt(instructor.average_rating) === parseInt(rating)
          }
        )
      } else {
        // eslint-disable-next-line no-console
        console.log('DNTRO')
        for (const data2 of data.language) {
          // eslint-disable-next-line no-console
          // console.log(data2)
          data.language.instructors = data2.instructors.filter(
            elementoActual => {
              return (
                parseInt(elementoActual.average_rating) === parseInt(rating)
              )
            }
          )
          // eslint-disable-next-line no-console
          // console.log(data.)
          // eslint-disable-next-line no-console
          // console.log(data.language.instructors)
        }
        // data.language = nuevo
        // data.language.instructors = nuevo
      }
    }
    if (langId === 'others') {
      return {
        language: data.language,
        daysChecked: days,
        totalInstructors: data.totalInstructors,
        range,
        infoInstructors: data.language,
        countryParaPasar: location,
        native,
        location,
        rating,
        languageSelected: 'Others languages',
        getLocationsIndex
      }
    }
    return {
      language: data.language,
      daysChecked: days,
      totalInstructors: data.totalInstructors,
      range,
      infoInstructors: data.language,
      countryParaPasar: location,
      native,
      location,
      rating,
      languageSelected: data.language.english,
      getLocationsIndex
    }
  },
  mounted() {
    // this.pais('Mexico')
    // this.suma()
    // eslint-disable-next-line no-console
    console.log('alcargar INDEX')
    // this.getLocations()
    // eslint-disable-next-line no-console
    console.log(this.borrarLocations)
  },
  methods: {
    borrame() {
      // this.datosBorrar = data.language.english
      // eslint-disable-next-line no-console
      console.log('HOLA')
    },
    // getIdTeacher(id) {
    //   this.idTeacher = id
    // },
    readMore(value) {
      // show read more if description is more than 180 charcters and have to be used whit truncate
      if (value === null) {
        return 0
      }
      return value.length
    },
    activateCalendarModal() {
      this.isCalendarModalActive = true
      setTimeout(() => {
        this.setFieldLevelWidth()
      }, 100)
    },
    setFieldLevelWidth() {
      // put this inside of the CBook compinent and tray to auto exec when component is visible
      const fields = document.querySelectorAll('.-field-level')
      const calendarWidth = document.getElementById('calendar-box').offsetWidth
      fields.forEach(field => {
        field.style.maxWidth = calendarWidth + 'px'
      })
    },
    // prueba() {
    //   const bottomVideo2 = document.getElementById('buttomVideo')
    //   alert(bottomVideo2.dataset.url)
    // },
    openVideo(video) {
      this.video = video
      this.isCardModalIntroductionVideo = true
    },
    suma() {
      let total = 0
      for (const instructor of this.language) {
        const acumulador = parseInt(instructor.instructors.length)
        total = total + acumulador
      }
      return total
    },
    changeDays(days = []) {
      this.daysChecked = days
      const newDays = days.toString()
      this.$router.push({
        path: this.$route.fullPath,
        query: { days: newDays }
      })
    },
    infoComponente(language) {
      // eslint-disable-next-line no-console
      // console.log('dentro del PADRE')
      // eslint-disable-next-line no-console
      // console.log(language)
      // this.$router.push({
      //   path: '/' + language + '/instructors/' + this.$router.query.rating
      // })
    },
    pais(country) {
      const paises = this.countries[0]
      for (const pa in paises) {
        if (paises[pa] === country) {
          return `https://www.countryflags.io/${pa}/flat/64.png`
        }
      }
    }
  }
  // methods: {
  //   truncString(str, max, add) {
  //     // eslint-disable-next-line no-console
  //     console.log(this.language)
  //     add = add || '...'
  //     return typeof str === 'string' && str.length > max
  //       ? str.substring(0, max) + add
  //       : str
  //   }
  // }
}
</script>
