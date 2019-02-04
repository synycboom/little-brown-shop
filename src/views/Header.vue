<template>
  <nav>
    <FontAwesomeIcon
      size="lg"
      class="toggle-button"
      :class="toggleClasses"
      :icon="toggleIcon"
      @click="toggleDrawer"
    />
    <span class="brand">Little Brown Shop</span>
    <div class="shopping-cart">
      <FontAwesomeIcon icon="shopping-cart" size="lg" />
      <span class="total-items">8</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isDrawerOpen: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleDrawer() {
      this.$emit('toggleDrawer');
    }
  },
  computed: {
    toggleIcon() {
      return this.isDrawerOpen ? 'times' : 'bars';
    },
    toggleClasses() {
      return {
        'toggle-button-active': this.isDrawerOpen
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid black;

  .toggle-button {
    &.toggle-button-active {
      color: white;
      z-index: 21;
    }
  }

  .brand {
    margin-left: 10px;
  }
  .shopping-cart {
    margin-left: auto;
  }
  .shopping-cart .total-items {
    margin-left: 5px;
  }
}
</style>
