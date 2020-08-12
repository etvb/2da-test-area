<template>
  <div class="hero">
    <div class="hero-body">
      <h4 class="subtitle is-4">
        <!-- Student Panel -->
      </h4>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'panel',
  mounted() {
    this.$router.push('/panel/student/classes')
  }
}
</script>
