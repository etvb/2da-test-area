<template>
  <div class="box is-radiusless -overflow-auto">
    <div class="columns is-mobile">
      <div class="column -vertical-flex-align">
        <div>
          <slot name="titleIcon" />
        </div>
        <h5 :class="'title is-' + titleSize + ' is-narrow'">
          {{ title }}
        </h5>
      </div>
      <div v-if="hasActionSlot" class="column has-text-right is-narrow">
        <slot name="action" />
      </div>
    </div>
    <hr v-if="lineTop" class="-is-marginless-top">
    <slot name="body" />
    <hr v-if="lineBottom">
    <slot name="help" />
    <div class="column is-paddingless">
      <slot name="footer-left-actions" />
    </div>
    <div class="column is-paddingless has-text-right">
      <slot name="footer-right-actions" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      // required: true
      default: ''
    },
    // Title size can be from 1 to 6 like bulma title classes
    titleSize: {
      type: String,
      default: '5'
    },
    lineBottom: {
      type: Boolean,
      default: true
    },
    lineTop: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hasActionSlot() {
      return !!this.$slots.action
    }
  }
}
</script>
