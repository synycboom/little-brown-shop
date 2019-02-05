<template>
  <div id="app">
    <FontAwesomeIcon
      size="lg"
      class="toggle-button"
      :class="toggleClasses"
      :icon="toggleIcon"
      @click="toggleDrawer"
    />
    <Header :isDrawerOpen="isDrawerOpen" @toggleDrawer="toggleDrawer" />
    <Drawer :isDrawerOpen="isDrawerOpen">
      <DrawerItem title="Sale" linkTo="/sale" icon="dollar-sign" />
      <DrawerItem
        title="Receipts"
        linkTo="/receipts"
        icon="file-invoice-dollar"
      />
    </Drawer>
    <main>
      <router-view class="main" />
    </main>
  </div>
</template>

<script>
import Header from './components/Header';
import Drawer from './components/Drawer';
import DrawerItem from './components/DrawerItem';

export default {
  name: 'app',
  components: {
    Header,
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
  z-index: 21;
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
  margin-top: $headerHeight;
}
</style>
