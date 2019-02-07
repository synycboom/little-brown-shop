<template>
  <div class="drawer" :class="drawerClasses">
    <div class="drawer__item-container">
      <slot></slot>
    </div>
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
  background-color: #fff;
  left: -100%;
  z-index: $drawerZIndex;
  padding-top: $navbarHeight;
  box-shadow: 7px 0px 30px -2px rgba(0, 0, 0, 0.41);

  &.drawer-active {
    left: 0px;
  }

  .drawer__item-container {
    margin: 0px;
    padding: 0px;
  }
}
</style>
