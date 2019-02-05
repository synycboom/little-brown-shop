<template>
  <nav>
    <span class="brand">Little Brown Shop</span>
    <div class="shopping-cart">
      <FontAwesomeIcon icon="shopping-cart" size="lg"/>
      <span class="total-items">8</span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 40px;
  border: 1px solid $primaryColor;
  position: fixed;
  top: 0px;
  width: 100%;
  height: $headerHeight;
  background-color: white;

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
