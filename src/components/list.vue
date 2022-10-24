<template>
  <ul>
    <li v-for="item of items"
        :key="item.id"
    >
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: "list-app",
  props: {
    items: {
      type: Array,
      require: true
    }
  },
  emits: {

  },
  data() {
    return {

    }

  }
}
</script>

<style scoped lang="scss">
ul {
  width: max-content;
  text-align: left;
  li {
    padding: 0 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
