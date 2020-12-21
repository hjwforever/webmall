<template>
  <div class="sc-design">
    <div class="q-px-md">
      <q-form ref="form" @submit="onSubmit" @reset="onReset">
        <div class="q-gutter-y-md">
          <div class="row">
            <div class="col-12 q-gutter-y-sm">
              <q-input
                  outlined
                  clearable
                  clear-icon="cancel"
                  v-model="username"
                  dense
                  debounce="500"
                  placeholder="*用户名"
                  :lazy-rules="lazy"
                  square
                  :rules="[
                      (val) => (val && /^.{4,10}$/.test(val)) || '请输入4至10位的用户名'
                    ]"
              >
                <template v-slot:prepend>
                  <q-icon name="mdi-account" />
                </template>
              </q-input>
              <q-input
                  outlined
                  clearable
                  clear-icon="cancel"
                  v-model="email"
                  dense
                  label="*邮箱"
                  maxlength="128"
                  type="email"
                  :lazy-rules="lazy"
                  square
                  :rules="[(val) => (val && /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/.test(val)) || '请输入有效邮箱格式, 如test@test.com']"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
              <q-input
                  outlined
                  clearable
                  clear-icon="cancel"
                  :type="isPwd ? 'password' : 'text'"
                  v-model="password"
                  dense
                  label="*密码"
                  maxlength="32"
                  :lazy-rules="lazy"
                  square
                  :rules="[(val) => (val && /^[A-Za-z0-9_]{6,16}$/.test(val)) || '请输入由字母及下划线组成的6至16位密码']"
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
              <q-input
                  outlined
                  clearable
                  clear-icon="cancel"
                  :type="isPwd ? 'password' : 'text'"
                  v-model="confirmPassword"
                  dense
                  label="*确认密码"
                  maxlength="32"
                  :lazy-rules="lazy"
                  square
                  :rules="[
                  val => (val && val.length > 0) || '请输入确认密码',
                  val => passwordValida || '两次密码不一致'
                ]"
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
              <div class="row">
                <div class="col text-left">
                  <q-btn
                      class="no-border-radius"
                      unelevated
                      type="submit"
                      :loading="loading"
                      color="primary full-width"
                      label="注 册"
                      size="md"
                  >
                    <template v-slot:loading>
                      <q-spinner-hourglass class="on-left" />
                      注册...
                    </template>
                  </q-btn>
                </div>
                <div class="col text-right">
                  <q-btn
                      to="/user/login"
                      color="primary"
                      flat
                      label="使用已有账户登录"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import User from 'src/models/user'

export default {
  name: 'Register',
  data () {
    return {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      isPwd: true,
      autoLogin: true,
      dense: false,
      loading: false,
      lazy: true
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate().then(isValid => {
        if (isValid) {
          const notif = this.$q.notify({
            type: 'ongoing',
            spinner: true,
            message: '注册中...'
          })
          this.$store.dispatch('auth/register', new User(this.username, this.password, this.email))
            .then(() => {
              setTimeout(() => {
                notif({
                  type: 'positive',
                  message: '用户' + this.username + '注册成功! ',
                  textColor: 'white',
                  spinner: null,
                  timeout: 1000
                })
                this.$router.push('/user/login')
              }, 1000)
            })
            .catch(err => {
              setTimeout(() => {
                notif({
                  type: 'negative',
                  message: '用户' + this.username + '注册失败!' + err.toString(),
                  textColor: 'white',
                  spinner: null,
                  timeout: 1000
                })
              }, 1000)
            })
        }
      })
    },
    onReset () {
      this.username = ''
      this.password = ''
      this.email = ''
    }
  },
  computed: {
    passwordValida: function () {
      return this.password === this.confirmPassword
    }
  }
}
</script>
