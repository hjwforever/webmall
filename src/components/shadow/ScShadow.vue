<template>
  <div
      class="cursor-pointer"
      :class="{'sc-shadow-blue text-primary ': active,'shadow-24': active, 'text-grey-8': !active,'shadow-3': !active}"
      @mouseover="select()"
      @mouseleave="clear()">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ScShadow',
  data() {
    return {
      active: false
    }
  },
  props: {
  },
  methods: {
    select() {
      this.active = true
    },
    clear() {
      this.active = false
    }
  }
}
</script>

<style scoped>

</style>
