<template>
  <div id="navbar-web">
    <div>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <nuxt-link
            to="/"
            class="navbar-item"
          >
            <!-- <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> -->
            <img v-if="$route.path == '/'" src="/logo_skillzzbox_headline.png" class="logo-with-headline">
            <img v-else src="/logo_skillzzbox.jpg" width="112" height="28">
          </nuxt-link>
          <div
            @click="openMenu"
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
        </div>
        <div id="navbar" class="navbar-menu">
          <div class="navbar-end">
            <div
              v-show="$store.state.auth.auth.loggedIn"
              class="navbar-item"
            >
              <b-dropdown position="is-bottom-left">
                <button
                  slot="trigger"
                  class="button -has-bg-primary has-text-white"
                >
                  <span>Account</span>
                  <b-icon
                    icon="menu-down"
                    class="has-text-white"
                  />
                </button>
                <b-dropdown-item has-link>
                  <a
                    @click.prevent="goToPanel"
                    class="has-text-black"
                  >
                    Panel
                  </a>
                </b-dropdown-item>
                <hr class="dropdown-divider">
                <b-dropdown-item has-link>
                  <a
                    @click.prevent="logOut"
                    class="has-text-black"
                  >
                    Log out
                  </a>
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div
              v-show="!$store.state.auth.auth.loggedIn"
              class="navbar-item"
            >
              <div class="buttons">
                <nuxt-link to="/auth/signup" class="button -has-bg-primary has-text-white">
                  <strong>Sign up</strong>
                </nuxt-link>
                <nuxt-link
                  to="/auth/login"
                  class="button is-light"
                >
                  Login
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<style lang="sass">
#navbar-web
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)
</style>

<script>
export default {
  methods: {
    openMenu(event) {
      const element = event.target
      const trigger = element.closest('div')

      const target = trigger.dataset.target
      const $target = document.getElementById(target)

      trigger.classList.toggle('is-active')
      $target.classList.toggle('is-active')
    },
    goToPanel() {
      const loggedAs = this.$store.getters['auth/loggedAs']
      if (loggedAs === 'instructor') {
        this.$router.push('/panel/instructor')
      } else {
        this.$router.push('/panel/student')
      }
    },
    logOut() {
      this.$store.commit('auth/logOutUser')
    }
  }
}
</script>
