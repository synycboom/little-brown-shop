<template>
  <div class="drawer" :class="drawerClasses">
    <ul>
      <RouterLink tag="li" to="/sale">
        <FontAwesomeIcon icon="dollar-sign" size="lg"/>
        <a>Sale</a>
      </RouterLink>
      <RouterLink tag="li" to="/receipts">
        <FontAwesomeIcon icon="file-invoice-dollar" size="lg"/>
        <a>Receipts</a>
      </RouterLink>
      <!-- <RouterLink tag="li" to="/help">
        <FontAwesomeIcon icon="question-circle" size="lg" />
        <a>Help</a>
      </RouterLink>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  props: {
    isDrawerOpen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    drawerClasses() {
      return {
        'drawer-active': this.isDrawerOpen
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.drawer {
  position: fixed;
  max-width: 280px;
  top: 0px;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: $primary-color;
  color: white;
  left: -100%;
  z-index: 20;

  &.drawer-active {
    left: 0px;
  }
}

ul {
  margin: 0px;
  padding: 40px 0px;
}

li {
  list-style-type: none;
  padding: 25px;
  border-bottom: 1px solid white;
  svg {
    margin-right: 10px;
  }
}

a {
  font-weight: bold;
  text-decoration: none;
  color: white;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
