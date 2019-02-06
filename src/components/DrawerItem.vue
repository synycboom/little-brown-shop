<template>
  <RouterLink tag="li" :to="linkTo" class="drawer-item">
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
  padding: 25px;
  border-bottom: 1px solid #575757;

  &.router-link-active {
    background-color: #252525;
  }

  .drawer-item__icon {
    margin-right: 10px;
  }

  .drawer-item__link {
    font-weight: bold;
    text-decoration: none;
    color: white;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
