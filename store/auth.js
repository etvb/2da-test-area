export const strict = false
export const state = () => ({
  auth: {
    // isActiveModalSignUp: false,
    // isActiveModalLogIn: false,
    loggedIn: false,
    loggedAs: null,
    user: '',
    access: ''
  },
  isActiveModalSignUp: false,
  isActiveModalLogIn: false
})

export const mutations = {
  logInUser(state, user) {
    state.auth.loggedIn = true
    state.auth.user = user
    state.auth.loggedAs = user.roles[0].name
  },
  logOutUser(state) {
    state.auth.loggedIn = false
    state.auth.user = ''
    state.auth.loggedAs = null
    state.auth.access = ''
  },
  openModalSignUp(state) {
    state.isActiveModalLogIn = false
    state.isActiveModalSignUp = true
  },
  closeModalSignUp(state) {
    state.isActiveModalSignUp = false
  },
  openModalLogIn(state) {
    state.isActiveModalLogIn = true
    state.isActiveModalSignUp = false
  },
  closeModalLogIn(state) {
    state.isActiveModalLogIn = false
  },
  setLoggedAs(state, role) {
    state.auth.loggedAs = role
  },
  access(state, data) {
    state.auth.access = data
  },
  timezone(state, { timezone, offsetMinutesTimezone }) {
    state.auth.user.timezone = timezone
    state.auth.user.offset_minutes_timezone = offsetMinutesTimezone
  }
}

export const getters = {
  loggedUser: state => {
    return state.auth.user
  },
  headerAuthorization: state => {
    return state.auth.access.access_token
  },
  loggedAs: state => {
    return state.auth.loggedAs
  },
  loggedIn: state => {
    return state.auth.loggedIn
  },
  loginTokenExpires: state => {
    return state.auth.access.expires_at
  },
  userIsSudo: state => {
    const isSudo =
      state.auth.user.email === 'c.hanimann@bluewin.ch' ||
      state.auth.user.email === 'corinnehoney@gmail.com' ||
      state.auth.user.email === 'erik_al1@hotmail.com' ||
      state.auth.user.email === 'raffaella.straehl@gmail.com' ||
      state.auth.user.email === 'gdfberger@gmail.com'
    return isSudo
  }
}
