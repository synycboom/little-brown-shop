<template>
  <div class="drawer" :class="drawerClasses">
    <ul class="drawer__item-container">
      <slot></slot>
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
  background-color: $primaryColor;
  color: white;
  left: -100%;
  z-index: 20;
  padding-top: $navbarHeight;

  &.drawer-active {
    left: 0px;
  }

  .drawer__item-container {
    margin: 0px;
    padding: 0px;
  }
}
</style>
