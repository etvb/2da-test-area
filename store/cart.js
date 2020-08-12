export const strict = false
export const state = () => ({
  cart: {
    lessons: [] // Courses added to shopping cart
  }
})

export const mutations = {
  addClassToCart(state, lesson) {
    state.cart.lessons = lesson
  },
  cleanCartLessons(state) {
    state.cart.lessons = []
  }
}

export const getters = {
  // loggedUser: state => {
  //   return state.auth.user
  // }
  lessons: state => {
    return state.cart.lessons
  }
}
