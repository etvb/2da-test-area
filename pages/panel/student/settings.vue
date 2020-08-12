<template>
  <div class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8">
          <b-collapse
            :open="false"
            class="panel"
          >
            <div
              slot="trigger"
              class="panel-heading"
              role="button"
            >
              <strong>Switch Profile</strong>
            </div>
            <switch-account />
          </b-collapse>
          <b-collapse
            :open="false"
            aria-id="contentIdForA11y2"
            class="panel"
          >
            <div
              slot="trigger"
              class="panel-heading"
              role="button"
              aria-controls="contentIdForA11y2"
            >
              <strong>Delete Account</strong>
            </div>
            <delete-account />
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DeleteAccount from '~/components/panel/shared/settings/DeleteAccount.vue'
import SwitchAccount from '~/components/panel/shared/settings/SwitchAccount.vue'
export default {
  layout: 'panel',
  components: {
    DeleteAccount,
    SwitchAccount
  }
}
</script>
