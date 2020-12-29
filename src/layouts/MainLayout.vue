<template>
  <q-layout view="hHh LpR lFf" class="q-ma-lg-lg">
    <!--模拟系统栏-->
<!--    <q-header elevated class="bg-primary text-white" height-hint="98">-->
<!--      <q-bar class="mobile">-->
<!--        <q-icon name="laptop_chromebook" />-->
<!--        <div>Google Chrome</div>-->

<!--        <q-space />-->

<!--        <q-btn dense flat icon="minimize" />-->
<!--        <q-btn dense flat icon="crop_square" />-->
<!--        <q-btn dense flat icon="close" />-->
<!--      </q-bar>-->
<!--      <q-toolbar>-->
<!--        <q-toolbar-title>-->
<!--          <q-avatar>-->
<!--            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" alt="avatar">-->
<!--          </q-avatar>-->
<!--          WebMall-->
<!--        </q-toolbar-title>-->
<!--        <q-btn flat round dense icon="search"/>-->
<!--        <q-btn dense flat round icon="chat" @click="right = !right" />-->
<!--      </q-toolbar>-->
<!--    </q-header>-->
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58" id="header">
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            icon="mdi-menu"
        />

        <q-btn v-if="$q.screen.gt.xs" to="/" flat no-caps no-wrap class="q-ml-xs" >
<!--          <q-icon :name="fabYoutube" color="red" size="28px" />-->
          <q-icon name="img:http://img.aruoxi.top/webmall/logo.png" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            WebMall
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="WM__toolbar-input-container row no-wrap">
          <q-input rounded outlined dense placeholder="Search" class="bg-white col" v-model="search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn to="cart" round dense flat color="blue-8" icon="mdi-cart-variant">
            <q-badge color="red" text-color="white" floating transparent>
              2
            </q-badge>
            <q-tooltip content-class="bg-indigo" transition-show="rotate" transition-hide="rotate">
              Cart
            </q-tooltip>
          </q-btn>
          <q-btn round dense flat color="blue-8" icon="mdi-bell-outline">
            <q-badge color="red" text-color="white" floating transparent>
              2
            </q-badge>
            <q-tooltip content-class="bg-indigo" transition-show="rotate" transition-hide="rotate">
              Notifications
            </q-tooltip>
          </q-btn>
          <q-btn
              round
              dense
              flat
              color="blue-8"
              icon="mdi-message-text"
              @click="right = !right">
            <q-badge color="blue" text-color="white" floating transparent>
              1
            </q-badge>
            <q-tooltip content-class="bg-indigo" transition-show="rotate" transition-hide="rotate">
              Messages
            </q-tooltip>
          </q-btn>
          <q-btn :to="$q.screen.gt.xs? $route.path : 'user'" round flat >
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="avatar">
            </q-avatar>
            <q-menu v-if="$q.screen.gt.xs" transition-show="rotate" transition-hide="rotate">
                <q-btn to="user" icon="mdi-account" label="个人中心" class="full-width" no-caps unelevated />
                <q-separator />
                <q-btn to="user/setting" icon="mail" label="账户设置" class="full-width" no-caps unelevated />
                <q-separator />
                <q-btn to="user/login" color="negative" icon="mail" label="登出" class="full-width" align="left" no-caps @click="$store.dispatch('auth/logout');"/>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-footer v-if="$q.screen.lt.sm" reveal elevated class="bg-primary text-white" height-hint="98">
      <q-tabs class="center justify-evenly items-center">
        <q-route-tab to="/index" replace label="Index" icon="mdi-home" />
        <q-route-tab to="/category" replace label="Category" icon="mdi-menu" />
        <q-route-tab to="/cart" replace label="Cart" icon="mdi-cart-variant" />
        <q-route-tab to="/user" replace label="Mine" icon="mdi-account" />
      </q-tabs>
    </q-footer>
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above

        :mini="!leftDrawerOpen || miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay

        :width="200"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3">
      <q-list>
        <essential-link
            v-for="(link, index) in essentialLinks"
            :key="index"
            v-bind="link"
        />
      </q-list>
    </q-drawer>
    <q-drawer v-model="right" side="right" overlay elevated>
      <q-toolbar-title>Right</q-toolbar-title>
    </q-drawer>
    <q-page-container v-scroll="scrolled">
      <router-view />
    </q-page-container>
    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-fab
          icon="keyboard_arrow_up"
          direction="up"
          color="blue"
          :disable="draggingFab"
          v-touch-pan.prevent.mouse="moveFab"
      >
        <q-fab-action to="/user" color="primary" icon="person" :disable="draggingFab" external-label label-position="left" label="账户" />
        <q-fab-action @click="right=!right" color="primary" icon="message" :disable="draggingFab" external-label label-position="left" label="消息" />
        <q-fab-action
            color="primary"
            @click="$q.fullscreen.toggle()"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            :disable="draggingFab"
            external-label
            label-position="left"
            :label="$q.fullscreen.isActive ? '退出全屏' : '全屏'"
        />
      </q-fab>
    </q-page-sticky>
  </q-layout>
</template>

<script>
import { fabYoutube, fabGithub } from '@quasar/extras/fontawesome-v5'
import { debounce } from 'quasar'
import EssentialLink from '../components/EssentialLink'
const linksData = [
  {
    title: 'Home',
    caption: '主页',
    icon: 'mdi-home',
    to: 'index'
  },
  {
    title: 'Category',
    caption: '分类',
    icon: 'mdi-menu',
    to: 'category'
  },
  {
    title: 'Cart',
    caption: '购物车',
    icon: 'mdi-cart-variant',
    to: 'cart'
  },
  {
    title: 'Mine',
    caption: '我的',
    icon: 'mdi-account',
    to: 'user'
  },
  {
    title: 'About',
    caption: '关于',
    icon: 'mdi-information-variant',
    to: 'about'
  },
  {
    title: 'Help',
    caption: '帮助',
    icon: 'help',
    to: 'help'
  }
]

export default {
  components: { EssentialLink },
  data() {
    return {
      search: '',
      right: false,
      leftDrawerOpen: false,
      essentialLinks: linksData,
      miniState: true,
      fabPos: [18, 18],
      draggingFab: false
    }
  },
  methods: {
    scrolled: debounce(function(position) {
    }, 200),

    onClick() {
      // console.log('Clicked it')
    },

    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    }
  },
  created() {
    this.fabYoutube = fabYoutube
    this.fabGithub = fabGithub
  }
}
</script>

<style lang="sass">
.WM
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000

.play-backtotop
  color: white
  top: 30%
  padding: 15px
  width: 90px
  background-color: $secondary
  border-radius: 0 15px 15px 0
  &:hover
    color: #9E9E9E

@media (min-width: 768px)
.carouselInput .title
  font-size: 48px

.carouselInput .subtitle
  font-size: 24px

@media (max-width: 768px)
.carouselInput .title
  font-size: 24px

.carouselInput .subtitle
  font-size: 16px
</style>
