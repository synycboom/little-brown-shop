import 'normalize.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faBars,
  faShoppingCart,
  faDollarSign,
  faFileInvoiceDollar,
  faQuestionCircle,
  faTimes,
  faBarcode,
  faTh,
  faList,
  faCircleNotch,
  faChevronLeft,
  faPlusSquare,
  faMinusSquare,
  faTrash,
  faCartArrowDown
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBars,
  faShoppingCart,
  faDollarSign,
  faFileInvoiceDollar,
  faQuestionCircle,
  faTimes,
  faBarcode,
  faTh,
  faList,
  faCircleNotch,
  faChevronLeft,
  faPlusSquare,
  faMinusSquare,
  faTrash,
  faCartArrowDown
);

// Define EventBus in Vue prototype
const eventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get: function() {
      return eventBus;
    }
  }
});

Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
