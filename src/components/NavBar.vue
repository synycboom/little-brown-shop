<template>
  <nav class="navbar">
    <span class="navbar__brand">Little Brown Shop</span>
    <div class="navbar__shopping-cart">
      <FontAwesomeIcon
        icon="shopping-cart"
        size="lg"
        @click="$eventBus.$emit('shoppingCartClick')"
      />
      <span class="navbar__total-items">
        {{ Number(0).toLocaleString('en') }}
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
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

  .navbar__brand {
    margin-left: 10px;
  }

  .navbar__shopping-cart {
    margin-left: auto;

    .navbar__total-items {
      margin-left: 5px;
    }
  }
}
</style>
