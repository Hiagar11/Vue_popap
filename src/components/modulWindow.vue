<template>
  <div class="bcDrop" @click.self="close" v-if="isOpen">
    <div class="module">
      <div class="module__header header" :style="{backgroundColor: colors[message]}">
        <h3 class="header__title"> {{ message }} </h3>
        <button @click.self="close" class="header__cross btn red">x</button>
      </div>
      <div class="module__body body">
        <div class="body__text">
          <slot name="body"></slot>
        </div>
      </div>

      <div class="module__footer footer">
        <h4 class="footer__title">Внимание</h4>
        <span class="footer__text">Чтобы выполнить операцию, наберите ПОДТВЕРЖДАЮ</span>
        <div class="footer__wrapper">
          <slot name="footer" :confirm="confirm"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    message: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    ok: null,
    close: null
  },
  name: 'modul-window',
  data() {
    return {
      colors: {
        'success': 'rgba(0,300,0,0.3)',
        'error': 'rgba(300,0,0,0.3)',
        'warning': 'rgba(300,300,0,0.3)'
      },
    }
  },
  methods: {
    keyDownESC(e) {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    },
    close() {
      this.$emit('close');

    },
    confirm() {
      this.$emit('ok')
    }
  },
  mounted() {
    document.addEventListener('keydown', this.keyDownESC)
  },
  beforeMount() {
    document.removeEventListener('keydown', this.keyDownESC)
  }

}
</script>

<style lang="scss">
.bcDrop {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, 0.6);
}

.module {
  position: relative;
  top: 10%;
  left: 25%;
  z-index: 2;

  width: 50%;
  min-height: 60%;
  background-color: white;

  display: flex;
  flex-direction: column;

  border: 2px solid grey;
  border-radius: 13px;

  overflow: hidden;

  &__body {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__header {
    height: 60px;
  }

  .header {
    display: flex;
    justify-content: space-between;

    &__title {
      padding: 0;
      margin: 0 0 0 20px;
      display: flex;
      width: max-content;
    }

    &__cross {
      margin: 10px;
    }
  }

  .body {
    background-color: rgba(10, 10, 10, 0.3);
    box-shadow: 0 0 2px 2px inset;
  }
}

.footer {
  &__wrapper {
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin: 40px auto;
  }
  &__title {
    margin: 0;
    padding: 0;
  }
  &__text {
    font-size: 20px;
  }
  &__input {
    width: 60% !important;
  }

  &__apply {
    width: 30%;
  }

}

</style>
