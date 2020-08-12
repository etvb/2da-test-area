<template>
  <div>
    <!-- <message-disabled-until-january /> -->
    <timezone-notification />
    <sign-up-modal />
    <log-in-modal />
    <navbar />
    <nuxt />
    <foot />
  </div>
</template>

<script>
import Navbar from '~/components/web/layout/Navbar.vue'
import Foot from '~/components/web/layout/Footer.vue'
import SignUpModal from '~/components/web/auth/SignUpModal.vue'
import LogInModal from '~/components/web/auth/LoginModal.vue'
import TimezoneNotification from '~/components/general/Notifications/Timezone.vue'
// import MessageDisabledUntilJanuary from '~/components/general/Notifications/Message.vue'
export default {
  components: {
    SignUpModal,
    Navbar,
    LogInModal,
    Foot,
    TimezoneNotification
    // MessageDisabledUntilJanuary
  }
}
</script>
