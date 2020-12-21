<template>
  <q-layout view="hHh LpR fFf" class="q-ma-lg-lg">
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
            @click="leftDrawerOpen = !leftDrawerOpen; $store.dispatch('auth/logout')"
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
          <q-btn
              round
              dense
              flat
              color="blue-8"
              icon="mdi-message-text"
              v-if="$q.screen.gt.sm"
              @click="right = !right">
            <q-badge color="blue" text-color="white" floating>
              1
            </q-badge>
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="blue-8" icon="mdi-bell-outline">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat to="/user/login" >
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="avatar">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
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
    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated>
      <q-toolbar-title>Left</q-toolbar-title>
    </q-drawer>
    <q-drawer v-model="right" side="right" overlay elevated>
      <q-toolbar-title>Right</q-toolbar-title>
    </q-drawer>
    <q-page-container v-scroll="scrolled">
      <router-view />
<!--      <q-page padding style="padding-top: 66px">-->
<!--        <p v-for="n in 100" :key="n">-->
<!--          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?-->
<!--        </p>-->

<!--        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">-->
<!--          <q-btn fab icon="keyboard_arrow_up" color="blue" />-->
<!--        </q-page-scroller>-->

<!--     </q-page>-->
    </q-page-container>
  </q-layout>
</template>

<script>
import { fabYoutube, fabGithub } from '@quasar/extras/fontawesome-v5'
import { debounce } from 'quasar'

export default {
  data () {
    return {
      search: '',
      right: false,
      leftDrawerOpen: false
    }
  },
  methods: {
    scrolled: debounce(function (position) {
    }, 200)
  },
  created () {
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
