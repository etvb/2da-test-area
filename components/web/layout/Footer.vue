<template>
  <footer class="footer -has-bg-light">
    <div class="content">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h6 class="title is-6 has-text-white">
              Support
            </h6>
            <ul class="is-marginless">
              <li>
                <nuxt-link
                  to="/contact"
                  class="has-text-white"
                >
                  Contact Us
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/pricing-terms" class="has-text-white">
                  Pricing Terms
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/teachers-guidelines" class="has-text-white">
                  Guideline for Teachers
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/faqs" class="has-text-white">
                  FAQs
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="column">
            <h6 class="title is-6 has-text-white">
              Company
            </h6>
            <ul class="is-marginless">
              <li>
                <nuxt-link 
                  to="/about-us"
                  class="has-text-white"
                >
                  About Us
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  to="/terms-and-conditions"
                  class="has-text-white"
                >
                  Terms
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="column" />
          <div class="column" />
        </div>
      </div>
    </div>
    <div class="-copyright box is-radiusless -is-spaced-top">
      <div class="container has-text-white has-text-right">
        <small class="is-size-7">&copy; Copyright {{ year }}, <strong class="has-text-white">Skillzzbox</strong></small>
      </div>
    </div>
  </footer>
</template>
<style lang="sass">
  .footer
    background-color: #343a40
    color: white
    padding-bottom: 0
    hr
      height: 1px
    .icon
      color: white
    ul
      list-style-type: none
    .-copyright
      background: #212529
      margin-right: -1.5rem
      margin-left: -1.5rem
      padding: 0.3rem 0
</style>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
