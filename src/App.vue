<template>
  <div id="app">
    <FontAwesomeIcon
      size="lg"
      class="toggle-button"
      :class="toggleClasses"
      :icon="toggleIcon"
      @click="toggleDrawer"
    />
    <NavBar :isDrawerOpen="isDrawerOpen" @toggleDrawer="toggleDrawer" />
    <Drawer :isDrawerOpen="isDrawerOpen">
      <DrawerItem
        title="Sale"
        :linkTo="{ name: 'sale' }"
        icon="dollar-sign"
        replace
      />
      <DrawerItem
        title="Receipts"
        :linkTo="{ name: 'receipts' }"
        icon="file-invoice-dollar"
        replace
      />
    </Drawer>
    <main>
      <router-view class="main" />
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
import Drawer from './components/Drawer';
import DrawerItem from './components/DrawerItem';

export default {
  name: 'app',
  components: {
    NavBar,
    Drawer,
    DrawerItem
  },
  data() {
    return {
      isDrawerOpen: false
    };
  },
  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    }
  },
  computed: {
    toggleIcon() {
      return this.isDrawerOpen ? 'times' : 'bars';
    },
    toggleClasses() {
      return {
        'toggle-button-active': this.isDrawerOpen
      };
    }
  }
};
</script>
<style lang="scss">
@import './assets/scss/vars.scss';
@import './assets/scss/global.scss';

* {
  box-sizing: border-box;
}

html,
body {
  font-size: 16px;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.toggle-button {
  top: 18px;
  left: 20px;
  z-index: $toggleButtonZIndex;
  position: fixed;

  &.toggle-button-active {
    color: white;
  }
}

#app {
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

main {
  margin-top: $navbarHeight;
  padding: 10px;
  /* Subtract unusable space from Header */
  height: calc(100% - #{$navbarHeight});
}
</style>
