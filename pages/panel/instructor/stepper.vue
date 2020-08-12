<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-8">
        <div class="box is-radiusless">
          <b-tabs v-model="activeTab" position="is-centered" class="block">
            <b-tab-item label="Profile">
              <profile @completed="changeTab(1)" />
            </b-tab-item>
            <b-tab-item :disabled="!enabled1" label="Schedules">
              <b-message type="is-info">
                Select the days and times that you will be available to teach.
              </b-message>
              <c-schedule2 @completed="changeTab(2)" />
              <!-- <schedule @completed="changeTab(2)" /> -->
            </b-tab-item>
            <b-tab-item :disabled="!enabled2" label="Languages">
              <languages @completed="changeTab(3)" />
            </b-tab-item>
            <b-tab-item :disabled="!enabled3" label="Settings">
              <settings @completed="finished" />
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CSchedule2 from '~/components/panel/instructor/steps/CSchedule2.vue'
import Profile from '~/components/panel/instructor/steps/Profile.vue'
// import Schedule from '~/components/panel/instructor/steps/Schedule.vue'
import Languages from '~/components/panel/instructor/steps/Languages.vue'
import Settings from '~/components/panel/instructor/steps/Settings.vue'
export default {
  layout: 'panel',
  components: {
    CSchedule2,
    Profile,
    // Schedule,
    Languages,
    Settings
  },
  data() {
    return {
      activeTab: 0,
      enabled1: false,
      enabled2: false,
      enabled3: false
    }
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab
      this.enabled = tab
      if (tab === 1) {
        this.enabled1 = true
      } else if (tab === 2) {
        this.enabled2 = true
      } else if (tab === 3) {
        this.enabled3 = true
      }
    },
    finished() {
      /* alert('has terminado') */
      this.$snackbar.open({
        message: `Your data was saved succesfully`,
        position: 'is-top-right'
      })
      this.$router.push('/panel/instructor')
    }
  }
}
</script>
<style lang="sass">
  .tab-item
    overflow: auto
</style>
