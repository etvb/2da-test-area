<template>
  <div @mouseleave="cleanStars($event)" :class="`rating${instructorId}`" class="is-inline-block">
    <span v-for="(index) in 5" @mouseover="fillIconsMouseOver(index, $event)" @click="rate(index)" class="icon start-rating">
      <i class="far fa-star" />
    </span>
  </div>
</template>
<style lang="sass">
  .start-rating
    cursor: pointer
</style>
<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true
    },
    instructorId: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.fillIcon(this.rating)
  },
  methods: {
    fillIcon(index) {
      const parents = document.getElementsByClassName(
        `rating${this.instructorId}`
      )
      for (const parent of parents) {
        const icons = parent.getElementsByClassName('fa-star')
        for (let i = 0; i < index; i++) {
          icons[i].classList.add('fas')
        }
        for (let j = index; j < icons.length; j++) {
          icons[j].classList.remove('fas')
        }
      }
    },
    fillIconsMouseOver(index, event) {
      const target = event.target
      const parent = target.closest('div')
      const icons = parent.getElementsByClassName('fa-star')

      for (let i = 0; i < index; i++) {
        icons[i].classList.add('fas')
      }
      for (let j = index; j < icons.length; j++) {
        icons[j].classList.remove('fas')
      }
    },
    rate(rating) {
      // alert('rate is ' + rating)
      this.$emit('rateChange', rating)
      this.rating = rating
    },
    cleanStars(event) {
      const parent = event.target
      const icons = parent.getElementsByClassName('fa-star')
      const rating = this.rating
      for (let i = 0; i < icons.length; i++) {
        if (i < rating) {
          icons[i].classList.add('fas')
        } else {
          icons[i].classList.remove('fas')
        }
      }
    }
  }
}
</script>
