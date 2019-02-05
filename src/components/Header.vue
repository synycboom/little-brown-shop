<template>
  <nav class="header">
    <span class="header__brand">Little Brown Shop</span>
    <div class="header__shopping-cart">
      <FontAwesomeIcon icon="shopping-cart" size="lg"/>
      <span class="header__total-items">8</span>
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

.header {
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

  .header__brand {
    margin-left: 10px;
  }

  .header__shopping-cart {
    margin-left: auto;

    .header__total-items {
      margin-left: 5px;
    }
  }
}
</style>
