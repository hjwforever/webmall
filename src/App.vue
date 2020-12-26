<template>
  <div id="q-app">
    <router-view />
    <q-ajax-bar
        ref="bar"
        position="bottom"
        color="accent"
        size="10px"
        skip-hijack
    />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
