<template>
  <div>RegisterResult-{{ email }}</div>
</template>

<script>
export default {
  name: 'RegisterResult',
  data () {
    return {
      email: ''
    }
  },
  mounted () {
    // this.email = this.$q.localStorage.getItem('name')
    this.getParams()
  },
  methods: {
    getParams () {
      this.email = this.$route.query.email
    }
  },
  watch: {
    $route: 'getParams'
  }
}
</script>

<style scoped></style>
