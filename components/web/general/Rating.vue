<template>
  <div class="block is-inline-block">
    <!-- :class="star" does nothing, it's only used to prevent unused 'star' error -->
    <b-icon
      v-for="(star, index) in parseInt(rating)"
      :class="star"
      :key="index"
      icon="star"
      class="-rating"
    />
  </div>
</template>
<style lang="sass">
  .-rating
    color: #FFC107
</style>
<script>
export default {
  props: {
    rating: {
      type: Number,
      // required: true
      default: 0
    }
  }
}
</script>
