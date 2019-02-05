<template>
  <RouterLink tag="li" :to="linkTo">
    <FontAwesomeIcon :icon="icon" size="lg" />
    <a>{{ title }}</a>
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
      type: String,
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

li {
  list-style-type: none;
  padding: 25px;
  border-bottom: 1px solid #575757;

  &.router-link-active {
    background-color: #252525;
  }

  svg {
    margin-right: 10px;
  }

  a {
    font-weight: bold;
    text-decoration: none;
    color: white;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
