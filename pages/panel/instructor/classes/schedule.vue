<template>
  <div class="columns is-centered mybg">
    <div class="column is-10">
      <b-message type="is-info">
        <!-- NORMAL -->
        Select the days and times that you will be available to teach.
      </b-message>
      <card :lineBottom="false" title="Schedule">
        <template v-slot:body>          
          <c-schedule2 />
        </template>
      </card>

      <disable-dates />
    </div>
  </div>
</template>
<script>
import CSchedule2 from '~/components/panel/instructor/steps/CSchedule2.vue'
import Card from '~/components/general/Card.vue'
import DisableDates from '~/components/panel/instructor/classes/schedule/DisableDates.vue'
// import axios from 'axios'
// import moment from 'moment'
// const midnight = new Date(new Date().setHours(0, 0, 0, 0))
// const midnight = new Date()
// const midnight = '00:00:00'
export default {
  layout: 'panel',
  components: {
    CSchedule2,
    Card,
    DisableDates
  },
  data() {
    return {}
  }
}
</script>
