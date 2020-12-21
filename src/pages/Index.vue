<template>
  <q-page>
    <Carousel />
    <GoodsList />
  </q-page>
</template>

<script>
import Carousel from 'components/Home/Carousel'
import GoodsList from 'pages/home/GoodsList'

export default {
  name: 'Index',
  components: {
    Carousel,
    GoodsList
  }
}
</script>
