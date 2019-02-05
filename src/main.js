import 'normalize.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { library } from '@fortawesome/fontawesome-svg-core';
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
  faCircleNotch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
  faCircleNotch
);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
