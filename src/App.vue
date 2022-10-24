<template>
  <button @click="sendToModalWindow('success')" class="btn green">Success</button>
  |
  <button @click="sendToModalWindow('error')" class="btn red">Error</button>
  |
  <button @click="sendToModalWindow('warning')" class="btn yellow black-text">Warning</button>

  <modul-window
      ref="PopapElement"
      :message="message.type"
  >
    <template #body>
      {{ message.text }}
    </template>
    <template v-slot:footer="{ confirm }">
      <input type="text" class="footer__input" v-model="text" :placeholder="$options.CONFIRM__TEXT">
      <button :disabled="currentConfirm" class="footer__apply btn" @click="confirm">Ok</button>
    </template>
  </modul-window>

  <hr>
  <div class="wrapper__list">
    <vue-list :items="data" v-slot:default="{ item }">
      <span>{{item.id}}</span><i>{{item.title}}</i>
    </vue-list>

    <vue-list :items="dataNew" v-slot:default="{ item }">
      <i>{{item.num}}</i> <span>{{item.text}}</span>
    </vue-list>
  </div>


</template>

<script>
import modulWindow from './components/modulWindow.vue'
import vueList from "@/components/list";

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
      dataNew: [{num: 1, text: 'hello'}, {num: 2, text: 'hi'}, {num: 3, text: 'buy'}, {num: 4, text: 'by'},],
      message: {type: '', text: ''},
      text: '',
      data: [],
      checkedInput: [],
    }

  },
  components: {
    modulWindow,
    vueList

  },
  methods: {
    async sendToModalWindow(msg) {
      this.message.type = msg;
      this.message.text = this.messages[msg]
      const resultPopup = await this.$refs.PopapElement.open()
      if (resultPopup) {
        this.sendToServer()
      }
    },
    sendToServer() {
      this.text = '';
      MessageReceived();
    },

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
.wrapper__list {
  display: flex;
  justify-content: space-around;
}
</style>
