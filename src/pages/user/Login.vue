<template>
  <div class="sc-design">
    <div>
      <q-form @submit="onSubmit" @reset="onReset" ref="loginForm">
        <q-tabs
            v-model="tab"
            active-color="primary"
            indicator-color="primary"
            align="left"
            :breakpoint="0"
            narrow-indicator
            class="text-black"
        >
          <q-tab type="reset" name="mails" label="用户密码登录" @click="onReset" />
          <q-tab type="reset" name="alarms" label="手机号登录" @click="onReset" />
        </q-tabs>
        <div class="q-gutter-y-sm">
          <q-tab-panels v-model="tab" class="text-center">
            <q-tab-panel name="mails" class="q-col-gutter-y-sm">
              <div class="row">
                <div class="col">
                  <q-input
                      outlined
                      clearable
                      clear-icon="cancel"
                      v-model="username"
                      dense
                      debounce="500"
                      placeholder="用户名或邮箱:test"
                      :lazy-rules="lazy"
                      square
                      :rules="[
                      (val) => (val && val.length > 0) || '请输入用户名'
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mdi-account" />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <q-input
                      outlined
                      clearable
                      clear-icon="cancel"
                      :type="isPwd ? 'password' : 'text'"
                      v-model="password"
                      dense
                      debounce="500"
                      placeholder="密码:test"
                      :lazy-rules="lazy"
                      square
                      :rules="[(val) => (val && val.length > 0) || '请输入密码']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="vpn_key" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="alarms" class="q-col-gutter-y-sm">
              <div class="row">
                <div class="col">
                  <q-input
                      outlined
                      clearable
                      clear-icon="cancel"
                      v-model="phone"
                      dense
                      debounce="500"
                      placeholder="手机号"
                      :lazy-rules="lazy"
                      square
                      :rules="[
                      (val) => (val && val.length > 0) || '请输入用户名'
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mdi-phone" />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <q-input
                      outlined
                      :type="isPwd ? 'password' : 'text'"
                      v-model="password"
                      dense
                      debounce="500"
                      placeholder="验证码"
                      :lazy-rules="lazy"
                      square
                      :rules="[(val) => (val && val.length > 0) || '请输入密码']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mdi-mail" />
                    </template>
                    <template v-slot:after>
                      <q-btn
                          unelevated
                          color="secondary"
                          class="no-border-radius"
                          label="获取验证码"
                      />
                    </template>
                  </q-input>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
          <div class="q-mx-md">
            <div class="row">
              <div class="col text-left">
                <q-checkbox v-model="autoLogin" label="自动登录" />
              </div>
              <div class="col text-right">
                <q-btn color="primary" flat label="忘记密码" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-btn
                    dense
                    unelevated
                    label="登 录"
                    size="17px"
                    color="primary q-mt-sm"
                    class="full-width no-border-radius"
                    type="submit"
                    :loading="loginLogin"
                >
                  <template v-slot:loading>
                    <q-spinner-ios class="on-left" />
                    登录...
                  </template>
                </q-btn>
              </div>
            </div>
            <div class="row q-pt-md">
              <div class="col-auto text-left q-pt-sm">
                <span>其他登录方式</span>
                <q-icon
                    v-for="(val, key) in loginIcon"
                    v-bind:key="key"
                    :size="val.size"
                    :class="[val.class.iconName, val.class.color]"
                    @click="thirdLogin(key)"
                    @mouseover="mouseOver(key, $event)"
                    @mouseleave="mouseLeave(key, $event)"
                    style="cursor: pointer"
                    class="iconfont q-ml-sm"
                />
              </div>
              <div class="col text-right">
                <q-btn
                    to="/user/register"
                    color="primary"
                    flat
                    label="注册用户"
                />
              </div>
            </div>
          </div>
        </div>
      </q-form>
    </div>
    <q-dialog
        v-model="currentLogin.login"
        persistent
        transition-show="scale"
        transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Persistent</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ currentLogin.obj }}
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import User from 'src/models/user'

export default {
  name: 'Login',
  data() {
    return {
      iconObject: {
        weixin: {
          class: { iconName: 'iconweixin', color: 'text-grey' },
          size: '22px'
        },
        zhifubao: {
          class: {
            iconName: 'iconzhifubao',
            color: 'text-grey'
          },
          size: '20px'
        },
        taobao: {
          class: { iconName: 'icontaobao', color: 'text-grey' },
          size: '22px'
        },
        weibo: {
          class: { iconName: 'iconweibo', color: 'text-grey' },
          size: '20px'
        },
        github: {
          class: { iconName: 'iconhuaban88', color: 'text-grey' },
          size: '23px',
          type: 'link'
        }
      },
      iconActive: {
        weibo: 'grey'
      },
      lazy: true,
      tab: 'mails',
      username: null,
      phone: null,
      password: null,
      isPwd: true,
      autoLogin: true,
      card: false,
      loginLogin: false,
      currentLogin: {
        login: false,
        obj: {}
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.username && this.password) {
        const notif = this.$q.notify({
          type: 'ongoing',
          spinner: true,
          message: '登录中...'
        })
        this.$store.dispatch('auth/login', new User(this.username, this.password)).then(
          () => {
            setTimeout(() => {
              notif({
                type: 'positive',
                message: '用户' + this.username + '登录成功!',
                textColor: 'white',
                spinner: null,
                timeout: 1000
              })
              this.$router.push('/user') // login successfully, go to the user module
            }, 1000)
          },
          error => {
            setTimeout(() => {
              notif({
                type: 'negative',
                message: '用户' + this.username + '登录失败! ' + error.toString(),
                textColor: 'white',
                spinner: null,
                timeout: 1000
              })
            }, 1000)
          }
        )
      }
    },
    onReset() {
      this.username = ''
      this.password = ''
      this.email = ''
      // this.phone = ''
    },
    mouseOver(iconKey, event) {
      this.activeForLoginType(iconKey, 'text-primary')
    },
    mouseLeave(iconKey, event) {
      this.activeForLoginType(iconKey, 'text-grey')
    },
    activeForLoginType(iconKey, targetColor) {
      this.iconObject[iconKey].class.color = targetColor
    },
    thirdLogin(iconKey, event) {
      this.currentLogin.login = true
      this.currentLogin.obj = this.iconObject[iconKey]
    }
  },
  computed: {
    loginIcon: function() {
      return this.iconObject
    }
  }
}
</script>

<style scoped>
@import '../../assets/icons/social_platform_icons.css';

.q-tab-panel {
}
.flip-list-move {
  transition: transform 1s;
}
</style>
