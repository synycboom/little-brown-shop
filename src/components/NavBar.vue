<template>
  <nav class="navbar">
    <span class="navbar__brand">Little Brown Shop</span>
    <div class="navbar__shopping-cart">
      <FontAwesomeIcon
        icon="shopping-cart"
        size="lg"
        @click="handleCartClick"
      />
      <span class="navbar__total-items">
        {{ formattedTotalProductsInCart }}
      </span>
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
  border: 1px solid $primaryColor;
  position: fixed;
  top: 0px;
  width: 100%;
  height: $navbarHeight;
  background-color: white;
  z-index: $navBarZIndex;

  .navbar__brand {
    margin-left: 10px;
  }

  .navbar__shopping-cart {
    margin-left: auto;

    @include breakpoint(mediumDevices) {
      display: none;
    }

    .navbar__total-items {
      margin-left: 5px;
    }
  }
}
</style>
