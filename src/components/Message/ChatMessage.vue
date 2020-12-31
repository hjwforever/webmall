<template>
  <div>
    <q-chat-message
        v-for="(item,index) in items"
        :key="index"
        :name="item.name"
        :avatar="item.avatar"
        :text="item.text"
        :sent="item.sent || isCurrentUser(item)"
        :text-color="item.textColor || 'white'"
        :bg-color="item.bgColor || 'primary'"
        :stamp="item.stamp || 'now'"
    />
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  components: {
  },
  props: {
    items: {
      type: [Array],
      required: true
    },
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
    }
  },
  methods: {
    isCurrentUser(item) {
      // console.log('currentUser', this.currentUser)
      console.log('item', item.name)
      return item.name === this.currentUser.username
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['auth/getUser']
    }
  },
  mounted() {
  }
}
</script>

<style lang="sass" scoped>

</style>
