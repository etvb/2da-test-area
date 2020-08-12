<template>
  <div
    id="sidebar"
    class="box is-marginless is-radiusless -is-paddingless-top is-hidden-touch"
  >
    <div class="-panel-logo">
      <figure class="image">
        <img
          src="https://www3.assets.heroku.com/assets/logo-purple-08fb38cebb99e3aac5202df018eb337c5be74d5214768c90a8198c97420e4201.svg"
          alt="Academlo, find experts in your city"
          style="height: 2rem; width: auto;"
        >
      </figure>
    </div>
    <aside class="menu">
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/panel/instructor">
            Dashboard
          </nuxt-link>
        </li>
      </ul>
      <p class="menu-label">
        Classes
      </p>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/panel/instructor/classes">
            Classes
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/panel/instructor">
            Completed
          </nuxt-link>
        </li>
      </ul>
      <p class="menu-label">
        Payments
      </p>
      <ul class="menu-list">
        <li>
          <nuxt-link to="/panel/instructor">
            Account
          </nuxt-link>
        </li>
      </ul>
    </aside>
  </div>
</template>
<style lang="sass">
  @import "~assets/css/_media-queries.sass"
  #sidebar
    background-color: #212529
    a
      color: white
      &:hover
        background-color: rgba(0, 0, 0, 0.6)
    .menu-label
      color: #9E9E9E
    .-panel-logo
      padding: 1rem
    &.-is-active
      display: block!important
      top: 3.25rem!important

</style>
