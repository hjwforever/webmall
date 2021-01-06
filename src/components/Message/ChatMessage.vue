<template>
  <div class="no-scroll overflow-auto">
    <q-header>
      <q-toolbar class="bg-primary glossy text-white">
        <q-btn flat round dense icon="keyboard_arrow_left" class="q-mr-sm" @click="$emit('hideRight')"/>
        <q-spinner-comment color="green" size="sm"/>
        <q-toolbar-title>WM聊天室({{ count }})</q-toolbar-title>
        <q-btn flat round dense icon="menu" class="q-mr-sm" />
      </q-toolbar>
    </q-header>
    <q-page-container style="padding-left: 0">
      <q-scroll-area
          ref="msgBox"
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          class="window-height"
          :delay="1200"
          @scroll="onScroll"
      >
        <q-scroll-observer @scroll="scrollHandler" />
        <q-chat-message
            v-for="(item,index) in chatItems"
            :key="index"
            :name="item.name"
            :avatar="item.avatar"
            :text="item.text"
            :sent="item.sent || isCurrentUser(item)"
            :text-color="item.textColor || 'white'"
            :bg-color="item.bgColor || isCurrentUser(item) ? 'primary' : 'amber'"
            :stamp="item.stamp || 'now'"
        />
      </q-scroll-area>
    </q-page-container>
    <q-footer class="bg-white justify-start" style="left: 0">
      <q-slide-transition>
        <q-card v-show="emoji" class="text-black">
          <q-list v-for="(emojis,index) in emojis" :key="index" class="justify-between" >
            <q-item v-for="(list,index1) in emojis" :key="index1">
              <q-item-section v-for="item in list" :key="item.name">
                <q-btn @click="contentText += item.emoji; emoji = false" dense unelevated>{{ item.emoji }}</q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-slide-transition>
      <q-toolbar class="justify-between">
          <q-icon class="q-pa-none" round size="md" color="orange" name="mdi-emoticon-happy-outline" @click="emoji = !emoji" />
          <q-input ref="sendMsg" v-model="contentText" @keyup.enter.ctrl="contentText+'2\n'" square outlined autogrow dense clearable clear-icon="close" class="q-mx-sm"/>
          <q-icon class="q-pa-none" round size="md" color="secondary" name="send" @click="sendText()" />
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script>
import { debounce } from 'quasar'
import dateUtil from 'src/utils/dateUtil'
import { emojis } from 'components/Message/emoji'

export default {
  name: 'ChatMessage',
  components: {
  },
  props: {
    // items: {
    //   type: [Array],
    //   required: true
    // },
    anotherItems: {
      type: [Array],
      required: false
    },
    chatClass: {
      type: String,
      required: false,
      default: 'bg-blue-2'
    },
    itemClass: {
      type: String,
      required: false,
      default: ''
    },
    anotherItemClass: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      emojis: emojis,
      chatItems: [],
      ws: null,
      count: 0,
      contentText: '', // input输入的值
      emoji: false,
      contentStyle: {
        // backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      },
      contentActiveStyle: {
        backgroundColor: '#eee',
        color: 'black'
      },
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      }
    }
  },
  methods: {
    // 发送聊天信息
    sendText() {
      this.$refs.sendMsg.focus()
      if (!this.contentText) {
        return
      }
      const params = {
        userId: this.currentUser.id,
        name: this.currentUser.username,
        avatar: this.currentUser.avatar,
        text: [this.contentText],
        time: new Date()
      }
      this.ws.send(JSON.stringify(params)) // 调用WebSocket send()发送信息的方法
      this.contentText = ''
      setTimeout(() => {
        this.scrollToBottom()
      }, 500)
    },

    // 初始化websocket连接
    initWebSocket() {
      // const _this = this
      // 判断页面有没有存在websocket连接
      if (window.WebSocket) {
        const ws = new WebSocket('ws://localhost:8181/ws')
        this.ws = ws
        ws.onopen = this.onopen
        ws.onclose = this.onclose
        ws.onerror = this.onerror
        ws.onmessage = this.onmessage
      } else { // 如果不支持WebSocket
        this.$q.notify({
          type: 'negative',
          message: 'This browser does not supports WebSocket'
        })
      }
    },

    onopen() {
      this.status = '成功'
      console.log('WebSocket连接成功')
    },

    onerror() {
      this.status = '失败'
      console.log('WebSocket连接出错')
      this.initWebSocket()
    },

    onmessage(e) {
      // 接收服务器返回的数据
      const resData = JSON.parse(e.data)
      // console.log(resData)
      // console.log(resData.chat)
      if (resData.funName === 'userCount') {
        if (this.count !== resData.userCount) {
          this.$q.notify({
            color: 'primary',
            icon: 'contactless',
            message: `当前聊天室人数: ${resData.userCount}`,
            timeout: 3000
          })
          this.count = resData.userCount
        }
        this.chatItems = resData.chat
        this.chatItems.forEach(function(item) {
          item.stamp = dateUtil.diffTime(new Date(item.time))
        })
      } else {
        if (this.chatItems.length > 0 && this.chatItems[this.chatItems.length - 1].userId === resData.userId) {
          this.chatItems[this.chatItems.length - 1].text.push(...resData.text)
        } else {
          // const item = { name: resData.name, userId: resData.userId, avatar: resData.avatar, text: [resData.text] }
          this.chatItems.push(resData)
        }
        this.chatItems[this.chatItems.length - 1].stamp = dateUtil.diffTime(new Date(resData.time))
      }
    },

    onclose() {
      this.status = '断开'
      console.log('WebSocket连接关闭')
    },
    close() {
      this.ws.close()
    },
    // 滚动监听
    onScroll: debounce(function(details) {
      // console.log('onScroll', details)
    }, 200),

    // 滚动监听
    scrollHandler: debounce(function(detail) {
      // this.position = detail.position
      // console.log('scrollHandler', detail)
    }, 200),

    // 判断id与当前登录用户的id是否相同
    isCurrentUser(item) {
      // console.log('currentUser', this.currentUser)
      // console.log('item', item)
      return item.userId === this.currentUser.id
    },

    // 滚动条到底部
    scrollToBottom() {
      this.$refs.msgBox.setScrollPercentage(1, 300)
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['auth/getUser']
    }
  },
  created() {
    // this.initWebSocket()
  },
  mounted() {
  },
  updated() {
    // this.scrollToBottom()
  },
  destroyed() {
    close()
  }
}
</script>

<style lang="sass" scoped>

</style>
