<template>
  <nav class="navbar">
    <h2 class="navbar__brand">Little Brown Shop</h2>
    <div class="navbar__shopping-cart">
      <FontAwesomeIcon
        icon="shopping-cart"
        size="lg"
        class="navbar__shopping-cart-icon"
        @click="handleCartClick"
      />
      <span class="navbar__total-items">{{ formattedTotalProductsInCart }}</span>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatComma } from '../utils';

export default {
  name: 'NavBar',
  computed: {
    formattedTotalProductsInCart() {
      return formatComma(this.totalProductsInCart);
    },
    ...mapGetters(['totalProductsInCart'])
  },
  methods: {
    handleCartClick() {
      this.$router.push({
        name: 'sale-cart'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px 10px 40px;
  position: fixed;
  top: 0px;
  width: 100%;
  height: $navbarHeight;
  background-color: white;
  z-index: $navBarZIndex;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 0px;

  .navbar__brand {
    margin-left: 10px;
  }

  .navbar__shopping-cart {
    cursor: pointer;
    margin-left: auto;

    @include breakpoint(mediumDevices) {
      display: none;
    }

    .navbar__shopping-cart-icon {
      @include iconEffect;
    }

    .navbar__total-items {
      margin-left: 5px;
    }
  }
}
</style>
