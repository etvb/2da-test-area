<template>
  <b-modal :active.sync="isCardModalIntroductionVideo" :width="560" scroll="keep">
    <div>
      <iframe
        :src="videoUrl"
        width="560"
        height="315"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        style="height: 315px"
        allowfullscreen
      />
    </div>
  </b-modal>
</template>
<script>
export default {
  props: {
    isCardModalIntroductionVideo: {
      type: Boolean,
      default: false
    },
    videoData: {
      type: String,
      default: ''
    }
  },
  computed: {
    videoUrl() {
      // eslint-disable-next-line no-console
      console.log('VIDEO')
      // eslint-disable-next-line no-console
      console.log(this.videoData)
      const video = this.videoData
      let stringVideo = `https://www.youtube.com/embed/`
      if (!video) return stringVideo
      if (video.includes('=')) {
        const split = video.split('=')
        // stringVideo = `https://www.youtube.com/embed/${split[1]}`
        stringVideo += split[1]
      } else if (video.includes('.be')) {
        const split = video.split('/')
        stringVideo += split[split.length - 1]
      }
      return stringVideo
    }
  }
}
</script>
