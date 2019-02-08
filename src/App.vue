<template>
  <div id="app">
    <FontAwesomeIcon size="lg" class="toggle-button" :icon="toggleIcon" @click="toggleDrawer"/>
    <notifications position="top center" classes="vue-notification"/>
    <NavBar :isDrawerOpen="isDrawerOpen" @toggleDrawer="toggleDrawer"/>
    <Drawer :isDrawerOpen="isDrawerOpen">
      <DrawerItem title="Sale" :linkTo="{ name: 'sale' }" icon="dollar-sign" replace/>
      <DrawerItem title="History" :linkTo="{ name: 'history' }" icon="file-invoice-dollar" replace/>
    </Drawer>
    <main>
      <router-view class="main"/>
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
    }
  }
};
</script>
<style lang="scss">
@import './assets/scss/vars.scss';
@import './assets/scss/global.scss';

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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Montserrat', sans-serif;
}

.toggle-button {
  top: 20px;
  left: 20px;
  z-index: $toggleButtonZIndex;
  position: fixed;
  cursor: pointer;

  @include iconEffect;
}

/* Override default Vue Notification styles */
.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;
  border-radius: 5px;

  font-size: 1.2rem;

  background: #44a4fc;
  border-left: 0px;

  &.warn {
    background: #ffb648;
  }

  &.error {
    background: #e54d42;
  }

  &.success {
    background: $primaryLightColor;
  }

  .notification-title {
    margin-bottom: 1rem;
  }
}

#app {
  height: 100%;
  width: 100%;
}

main {
  margin-top: $navbarHeight;
  padding: 10px;
  /* Subtract unusable space from Header */
  height: calc(100% - #{$navbarHeight});
}
</style>
