<template>
  <div id="app">
    <Header :isDrawerOpen="isDrawerOpen" @toggleDrawer="toggleDrawer" />
    <Drawer :isDrawerOpen="isDrawerOpen" />
    <router-view />
  </div>
</template>

<script>
import Header from './views/Header';
import Drawer from './views/Drawer';

export default {
  name: 'app',
  components: {
    Header,
    Drawer
  },
  data() {
    return {
      isDrawerOpen: true
    };
  },
  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    }
  }
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
  width: 100%;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
</style>
