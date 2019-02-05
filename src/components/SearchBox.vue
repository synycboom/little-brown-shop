<template>
  <div class="searchbox">
    <input type="text" class="searchbox__input" />
    <FontAwesomeIcon icon="barcode" size="3x" class="searchbox__icon" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.searchbox {
  display: flex;
  width: 40%;
  min-width: 230px;
  max-width: 380px;
  height: 2.5rem;

  .searchbox__input {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    border-top: 1px solid $primaryColor;
    border-left: 1px solid $primaryColor;
    border-right: 0px;
    border-bottom: 1px solid $primaryColor;
    border-radius: 0px;
  }

  .searchbox__icon {
    border-left: 0px;
    border-top: 1px solid $primaryColor;
    border-right: 1px solid $primaryColor;
    border-bottom: 1px solid $primaryColor;
    padding-left: 5px;
    padding-right: 5px;
    height: 2.5rem;
  }
}
</style>
