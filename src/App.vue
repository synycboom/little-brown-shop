<template>
  <div id="app">
    <FontAwesomeIcon
      size="lg"
      class="toggle-button"
      :class="toggleClasses"
      :icon="toggleIcon"
      @click="toggleDrawer"
    />
    <notifications position="top center" classes="vue-notification" />
    <NavBar :isDrawerOpen="isDrawerOpen" @toggleDrawer="toggleDrawer" />
    <Drawer :isDrawerOpen="isDrawerOpen">
      <DrawerItem
        title="Sale"
        :linkTo="{ name: 'sale' }"
        icon="dollar-sign"
        replace
      />
      <DrawerItem
        title="History"
        :linkTo="{ name: 'history' }"
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
    toggleIcon(event) {
      console.log(event);
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
@import './assets/scss/vue-notification.scss';

* {
  box-sizing: border-box;
  /* To make a smooth scrolling */
  -webkit-overflow-scrolling: touch;

  color: $fontColorBlack;
}

html,
body {
  font-size: 15px;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.toggle-button {
  top: 20px;
  left: 20px;
  z-index: $toggleButtonZIndex;
  position: fixed;
  cursor: pointer;

  @include iconEffect;
}

#app {
  height: 100%;
  width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Montserrat', sans-serif;
}

main {
  margin-top: $navbarHeight;
  padding: 10px;
  /* Subtract unusable space from Header */
  height: calc(100% - #{$navbarHeight});
}
</style>
