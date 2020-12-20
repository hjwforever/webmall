<template>
  <q-page
      class="window-width row justify-center items-center"
      style="background: linear-gradient(#8274C5, #5A4A9F);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:400px;height:540px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
          </q-card-section>
          <q-card-section>
            <q-fab
                color="primary" @click="switchTypeForm"
                ref="switch_bt"
                icon="add"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%);"
            >
              <q-tooltip>
                Register
              </q-tooltip>
            </q-fab>
            <q-form ref="form" class="q-px-sm q-pt-xl" @submit="onSubmit">
              <q-input
                  ref="username"
                  square
                  clearable
                  v-model="username"
                  :lazy-rules="lazy"
                  :rules="[this.required, this.short]"
                  type="username"
                  name="username"
                  label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                  ref="email"
                  v-if="register"
                  square
                  clearable
                  v-model="email"
                  type="email"
                  :lazy-rules="lazy"
                  :rules="[this.required,this.isEmail,this.short]"
                  name="email"
                  label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                  ref="password"
                  autocomplete
                  square
                  clearable
                  v-model="password"
                  :type="passwordFieldType"
                  :lazy-rules="lazy"
                  :rules="[this.required,this.short]"
                  label="Password"
                  name="Password" >

                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                      :name="visibilityIcon"
                      @click="switchVisibility"
                      class="cursor-pointer" />
                </template>
              </q-input>
              <q-input
                  ref="repassword"
                  v-if="register"
                  autocomplete
                  square
                  clearable
                  v-model="repassword"
                  :type="passwordFieldType"
                  :lazy-rules="lazy"
                  :rules="[this.required,this.short,this.diffPassword]"
                  label="Confirm Password"
                  name="Confirm Password" >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                      :name="visibilityIcon"
                      @click="switchVisibility"
                      class="cursor-pointer" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
                unelevated
                size="lg"
                color="secondary"
                type="submit"
                @click="onSubmit"
                class="full-width text-white"
                :label="btnLabel" />
          </q-card-actions>
          <q-card-section
              v-if="!register"
              class="text-center q-pa-sm">
            <p class="text-grey-6">forget password?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import User from '../../models/user'
import { QSpinnerGears } from 'quasar'

export default {
  name: 'Login',
  data () {
    return {
      title: 'Login',
      email: '',
      username: '',
      password: '',
      repassword: '',
      register: false,
      passwordFieldType: 'password',
      btnLabel: 'Login',
      visibility: false,
      visibilityIcon: 'visibility',
      rules: {
        short: val => (val && val.length > 3) || 'The length is too short'
      },
      lazy: true
    }
  },
  methods: {
    handleLogin () {
      if (this.username && this.password) {
        const notif = this.$q.notify({
          type: 'ongoing',
          spinner: QSpinnerGears,
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
                type: 'warning',
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
    handleRegister () {
      this.$refs.form.validate().then(isValid => {
        if (isValid) {
          const notif = this.$q.notify({
            type: 'ongoing',
            spinner: this.QSpinnerGears,
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
              }, 1000)
              this.switchTypeForm()
            })
            .catch(err => {
              setTimeout(() => {
                notif({
                  type: 'warning',
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
    reset () {
      this.username = ''
      this.password = ''
      this.email = ''
      this.repassword = ''
    },
    required (val) {
      return val => (val && val.length > 0) || 'The value cannot be empty!'
    },
    diffPassword (val) {
      const val2 = this.$refs.password.value
      return val => (val && val === val2) || 'Inconsistent passwords!'
    },
    short () {
      return val => (val && val.length > 3) || 'The length is too short'
    },
    isEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return val => (val && emailPattern.test(val)) || 'Please enter a valid email'
    },
    onSubmit () {
      // if (this.register) {
      //   this.$refs.email.validate()
      //   this.$refs.username.validate()
      //   this.$refs.password.validate()
      //   this.$refs.repassword.validate()
      // } else {
      //   this.$refs.email.validate()
      //   this.$refs.password.validate()
      // }

      if (!this.register) { // login
        this.handleLogin()
      } else {
        this.handleRegister()
      }
    },
    switchTypeForm () {
      this.reset()
      // this.$refs.form.validate().then(success => {
      //   if (success) {
      //     alert(1)
      //   } else {
      //   }
      // })
      this.register = !this.register
      this.title = this.register ? 'Register' : 'Login'
      this.btnLabel = this.register ? 'Register' : 'Login'
    },
    switchVisibility () {
      this.visibility = !this.visibility
      this.passwordFieldType = this.visibility ? 'text' : 'password'
      this.visibilityIcon = this.visibility ? 'visibility_off' : 'visibility'
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.$router.push('/user')
    }
  }
}
</script>

<style scoped>

</style>
