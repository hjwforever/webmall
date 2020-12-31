<template>
  <div>
    <q-layout view="hHh LpR fff" style="font-family: 微软雅黑">
      <q-header class="bg-white text-primary shadow-1">
        <q-toolbar class="fit row wrap justify-between items-center">
          <q-btn to="/index" replace flat no-caps no-wrap class="q-ml-xs">
            <q-icon name="img:https://s3.ax1x.com/2020/12/29/rqe6fS.png" color="red" size="28px" />
            <q-toolbar-title shrink class="text-weight-bold">
              WebMall
            </q-toolbar-title>
          </q-btn>
          <q-toolbar-title class="absolute-right">webmall v1.0.0</q-toolbar-title>
          <q-space />
        </q-toolbar>
      </q-header>
      <q-footer class="bg-white text-blue-grey-4">
        <div class="q-mb-lg">
          <div class="text-center q-mb-sm">
            <span class="inline-block">Web Mall Pro</span>
            <q-btn
                type="a"
                target="_blank"
                unelevated
                size="12px"
                dense
                href="https://github.com/hjwforever/webmall/tree/dev">
              <q-icon name="ti-github q-mx-md" />
            </q-btn>
            <span class="inline-block">Web Mall</span>
          </div>
          <div class="text-center">Copyright@2020 Web Mall 技术小组出品</div>
        </div>
      </q-footer>
      <q-page-container>
        <div class="q-pa-sm row justify-center" :class="topMarginClass">
          <div class="col text-center" style="width: 100%; max-width: 400px">
            <div class="q-mb-xl">
              <h4 class="q-ma-sm">
                <q-avatar class="q-mr-md">
                  <img alt="Web Mall logo" src="http://img.aruoxi.top/webmall/logo.png" />
                </q-avatar>
                <strong>Web Mall</strong>
              </h4>
              <p class="text-grey">
                Web Mall 是一个简易的网上商城
              </p>
            </div>
            <router-view />
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'UserLayout',
  props: {},
  data() {
    return {
      topMarginClass: 'q-mt-lg'
    }
  },
  methods: {
    topMargin() {
    }
  },
  mounted: function() {
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {
    if (this.loggedIn) {
      // this.$q.notify('已登录')
      this.$router.push('/user')
    }
  }
}
</script>
