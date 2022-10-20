<template>
  <button @click="sendToModalWindow('success')" class="btn green">Success</button>
  |
  <button @click="sendToModalWindow('error')" class="btn red">Error</button>
  |
  <button @click="sendToModalWindow('warning')" class="btn yellow black-text">Warning</button>

  <modul-window
      :message="message.type"
      :is-open="isPopapOpen"
      @close="isPopapOpen = false"
      @ok="sendToServer">
    <template #body>
      {{ message.text }}
    </template>
    <template v-slot:footer="{ confirm }">
      <input type="text" class="footer__input" v-model="text" :placeholder="$options.CONFIRM__TEXT">
      <button :disabled="!currentConfirm" class="footer__apply btn" @click="confirm">Ok</button>
    </template>
  </modul-window>

  <hr>





</template>

<script>
import modulWindow from './components/modulWindow.vue'

import {MessageReceived, getJsonData} from "@/api";

export default {
  name: 'App',
  CONFIRM__TEXT: 'ПОДТВЕРЖДАЮ',
  data() {
    return {
      messages: {
        'error': 'This text about error',
        'success': 'This text about success',
        'warning': 'this text about warning'
      },
      message: {type: '', text: ''},
      isPopapOpen: false,
      text: '',
      data: [],
      checkedInput: [],
    }

  },
  components: {
    modulWindow,

  },
  methods: {
    sendToModalWindow(msg) {
      this.isPopapOpen = true
      this.message.type = msg;
      this.message.text = this.messages[msg]
    },
    sendToServer() {
      this.text = '';
      MessageReceived();
      this.isPopapOpen = false
    }
  },
  computed: {
    currentConfirm() {
      return this.$options.CONFIRM__TEXT === this.text
    }
  },
  async mounted() {
    this.data = await getJsonData();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.list {
  text-align: left;

  &__item {
    margin-left: 40px;
  }
}
</style>
