<template>
  <RouterLink tag="div" :to="linkTo" class="drawer-item">
    <FontAwesomeIcon :icon="icon" size="lg" class="drawer-item__icon" />
    <a class="drawer-item__link">{{ title }}</a>
  </RouterLink>
</template>
<script>
export default {
  name: 'DrawerItem',
  props: {
    title: {
      type: String,
      required: true
    },
    linkTo: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.drawer-item {
  list-style-type: none;
  height: 5rem;

  .drawer-item__icon {
    margin-left: 20px;
    display: inline-block;
    width: 1rem;
    vertical-align: middle;
    height: 100%;
    color: $fontColorGrey;
  }

  .drawer-item__link {
    font-weight: bold;
    text-decoration: none;
    display: inline-block;
    margin-left: 1rem;
    // calc(100% - 2rem - 20px) comes from
    // - 2rem (one from margin-left the other one from width of drawer-item__icon)
    // - 20px drawer-item__icon's margin-left
    width: calc(100% - 2rem - 20px);
    vertical-align: middle;
    padding: 2rem 0px;

    @include textEffect;
  }

  &.router-link-active {
    background-image: $primatyGradientImage;

    .drawer-item__link {
      color: $fontColorBlack;
    }
  }
}
</style>
