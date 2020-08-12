<template>
  <div>
    <navbar />
    <!-- <sidebar /> -->
    <main id="main-panel">
      <nuxt />
    </main>
  </div>
</template>
<style lang="sass">
  @import "~assets/css/_media-queries.sass"
  // $sidebar-size: 250px
  #navbar-panel
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)
    // +desktop
    //   margin-left: $sidebar-size
  // #sidebar
  //   width: $sidebar-size
  //   position: fixed
  //   top: 0
  //   bottom: 0
  //   z-index: 99
  #main-panel
    padding: 2rem 1rem
  //   +desktop
  //     margin-left: $sidebar-size
  // #-panel-info
  //   padding: .8rem
  //   +desktop
  //     margin-left: $sidebar-size
</style>
<script>
import Navbar from '~/components/panel/layout/Navbar.vue'
// import Sidebar from '~/components/panel/layout/Sidebar.vue'
export default {
  components: {
    Navbar
    // Sidebar
  },
  mounted() {
    this.verifyAuth()
  },
  methods: {
    verifyAuth() {
      const loginTokenExpires = this.$store.getters['auth/loginTokenExpires']
      const today = new Date()
      // eslint-disable-next-line no-console
      console.log(loginTokenExpires, today)
    }
  }
}
</script>
