<template>
  <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      :arrows="arrows"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false; arrows = true"
      @mouseleave="autoplay = 2500; arrows = false"
  >
    <q-carousel-slide :name="1" img-src="http://img.aruoxi.top/webmall/banner1.png" />
    <q-carousel-slide :name="2" img-src="http://img.aruoxi.top/webmall/banner2.png" />
<!--    <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/mountains.jpg" />-->
<!--    <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />-->
<!--    <q-carousel-slide :name="5" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />-->
<!--    <q-carousel-slide :name="6" img-src="https://cdn.quasar.dev/img/quasar.jpg" />-->
  </q-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  data() {
    return {
      slide: 1,
      autoplay: 2500,
      arrows: false
    }
  }
}
</script>

<style scoped>

</style>
