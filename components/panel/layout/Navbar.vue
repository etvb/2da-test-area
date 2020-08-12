<template>
  <!-- <nav
    id="navbar-panel"
    class="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand -is-fullwidth">
      <div
        id="panel-burguer"
        @click="openSideMenu"
        role="button"
        class="navbar-burger is-block is-marginless is-hidden-desktop"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </div>
      <div
        class="navbar-item is-pulled-right"
        style="margin-left: auto"
      >
        <b-dropdown position="is-bottom-left">
          <button
            slot="trigger"
            class="button -has-bg-primary has-text-white"
          >
            <span>
              Account
            </span>
            <b-icon icon="menu-down" class="has-text-white" />
          </button>
          <b-dropdown-item has-link>
            <nuxt-link
              class="has-text-black"
              to="/panel/instructor/profile"
            >
              Profile
            </nuxt-link>
          </b-dropdown-item>
          <hr class="dropdown-divider">
          <b-dropdown-item has-link>
            <a
              @click.prevent="logOut"
              class="has-text-black"
            >
              Logout
            </a>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav> -->
  <div>
    <nav
      id="navbar-panel"
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link
          to="/"
          class="navbar-item -logo"
        >
          <img src="/logo_skillzzbox.jpg" width="112" height="28">
        </nuxt-link>

        <div
          @click="openMenu"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarPanel"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </div>
      </div>

      <div id="navbarPanel" class="navbar-menu">
        <div
          v-show="$store.state.auth.auth.loggedAs === 'instructor'"
          class="navbar-start"
        >
          <nuxt-link to="/panel/instructor" class="navbar-item">
            Dashboard
          </nuxt-link>

          <nuxt-link to="/panel/instructor/profile" class="navbar-item">
            Profile
          </nuxt-link>

          <nuxt-link to="/panel/instructor/settings" class="navbar-item">
            Settings
          </nuxt-link>

          <nuxt-link to="/panel/instructor/classes" class="navbar-item">
            Classes
          </nuxt-link>
          <nuxt-link to="/contact" target="_blank" class="navbar-item">
            Contact us
          </nuxt-link>
          <b-dropdown v-show="$store.getters['auth/userIsSudo']" aria-role="list" class="navbar-item">
            <button
              slot="trigger"
              class="button tag is-success"
              role="button"
            >
              Sudo
            </button>
            <b-dropdown-item has-link aria-role="listitem">
              <nuxt-link to="/panel/sudo/users">
                Users
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role="listitem">
              <nuxt-link to="/panel/sudo/bookings">
                Bookings
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role="listitem">
              <nuxt-link to="/panel/sudo">
                Payments
              </nuxt-link>
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <div
          v-show="$store.state.auth.auth.loggedAs !== 'instructor'"
          class="navbar-start"
        >
          <!-- <nuxt-link to="/panel/student" class="navbar-item">
            Dashboard
          </nuxt-link> -->
          <nuxt-link to="/panel/student/profile" class="navbar-item">
            Profile
          </nuxt-link>
          <nuxt-link
            class="navbar-item"
            to="/panel/student/settings"
          >
            Settings
          </nuxt-link>
          <nuxt-link to="/panel/student/classes" class="navbar-item">
            Classes
          </nuxt-link>
          <nuxt-link to="/panel/student/liked-instructors" class="navbar-item">
            <b-icon
              pack="fas"
              icon="heart"
              class="has-text-danger"
            />
            &nbsp; Saved teachers
          </nuxt-link>
          <nuxt-link to="/contact" target="_blank" class="navbar-item">
            Contact us
          </nuxt-link>
          <b-dropdown v-show="$store.getters['auth/userIsSudo']" aria-role="list" class="navbar-item">
            <button
              slot="trigger"
              class="button tag is-success"
              role="button"
            >
              Sudo
            </button>

            <b-dropdown-item has-link aria-role="listitem">
              <nuxt-link to="/panel/sudo/users">
                Users
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role="listitem">
              <nuxt-link to="/panel/sudo/bookings">
                Bookings
              </nuxt-link>
            </b-dropdown-item>
            <b-dropdown-item has-link aria-role="listitem">
              <nuxt-link to="/panel/sudo">
                Payments
              </nuxt-link>
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <b-dropdown position="is-bottom-left">
              <button
                slot="trigger"
                class="button -has-bg-primary has-text-white -is-circle"
              >
                <b-icon icon="account" class="has-text-white" />
              </button>
              <b-dropdown-item has-link>
                <template v-if="$store.state.auth.auth.loggedAs === 'instructor'">
                  <nuxt-link
                    class="has-text-black"
                    to="/panel/instructor/profile"
                  >
                    Profile
                  </nuxt-link>
                  <nuxt-link
                    class="has-text-black"
                    to="/panel/instructor/settings"
                  >
                    Settings
                  </nuxt-link>
                </template>
                <template v-if="$store.state.auth.auth.loggedAs === 'student'">
                  <nuxt-link
                    class="has-text-black"
                    to="/panel/student/profile"
                  >
                    Profile
                  </nuxt-link>
                </template>
              </b-dropdown-item>
              <hr class="dropdown-divider">
              <b-dropdown-item has-link>
                <a
                  @click.prevent="logOut"
                  class="has-text-black"
                >
                  Logout
                </a>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<style lang="sass" scoped>
@import "~/assets/css/_vars.sass"
.nuxt-link-exact-active.navbar-item
  border-bottom: solid 2px $secondary-color
  &.-logo
    border-bottom: none
</style>

<script>
// import axios from 'axios'
export default {
  methods: {
    // openSideMenu() {
    //   const sidebar = document.getElementById('sidebar')
    //   const burguer = document.getElementById('panel-burguer')
    //   sidebar.classList.toggle('-is-active')
    //   burguer.classList.toggle('is-active')
    // },
    openMenu(event) {
      const element = event.target
      const trigger = element.closest('div')

      const target = trigger.dataset.target
      const $target = document.getElementById(target)

      trigger.classList.toggle('is-active')
      $target.classList.toggle('is-active')
    },
    logOut() {
      this.$store.commit('auth/logOutUser')
      this.$router.push('/')
    }
    /* changeRole(roleToAssign) {
      const user = this.$store.getters['auth/loggedUser']
      const userRoles = user.roles
      let hasAlreadyRole = false
      userRoles.forEach(role => {
        if (role.name === roleToAssign) {
          hasAlreadyRole = true
        }
      })
      if (hasAlreadyRole) {
        this.$store.commit('auth/setLoggedAs', roleToAssign)
        this.$router.push('/panel/' + roleToAssign)
      } else {
        this.assignNewRol(roleToAssign, user.id)
      }
    },
    assignNewRol(role, userId) {
      const url = process.env.apiUrl + 'users/' + userId + '/roles'
      const authorization = this.$store.getters['auth/headerAuthorization']
      const data = { role: role }
      axios
        .put(url, data, {
          headers: {
            Authorization: 'Bearer ' + authorization
          }
        })
        .then(response => {
          const user = response.data
          this.$store.commit('auth/logInUser', user)
          this.$store.commit('auth/setLoggedAs', role)
          this.$router.push('/panel/' + role)
        })
    } */
  }
}
</script>
