<template>
  <div class="header">
    <div class="header__left">
      <slot name="left"></slot>
    </div>
    <div class="header__center">
      <slot name="center"></slot>
    </div>
    <div class="header__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.header {
  height: $headerHeight;
  display: flex;
  align-items: center;

  .header__left {
    display: flex;
    justify-content: flex-start;
    width: 30%;
  }

  .header__center {
    display: flex;
    justify-content: center;
    width: 40%;
  }

  .header__right {
    display: flex;
    justify-content: flex-end;
    width: 30%;
  }
}
</style>
