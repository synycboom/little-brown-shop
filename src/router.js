import Vue from 'vue';
import Router from 'vue-router';
import Sale from './views/Sale.vue';
import Receipts from './views/Receipts.vue';
import Cart from './views/Cart.vue';
import CashPayment from './views/CashPayment.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/sale'
    },
    {
      path: '/sale',
      component: Sale,
      children: [
        {
          /*
            - On large screen devices this route shows a product section on the left handside,
              and a show cart section on the right hand side
            - On small screen devices this route shows only a product section
          */
          path: '',
          name: 'sale',
          components: {
            'sale-cart': Cart
          }
        },
        {
          /* 
            - On large screen devices this route shows like the default route '/sale'
            - On small screen devices this route shows only a cart section
          */
          path: 'cart',
          name: 'sale-cart',
          components: {
            'sale-cart': Cart
          }
        },
        {
          /* 
            - On large screen devices this route shows a product section on the left handside,
              and a show cash payment section on the right hand side
            - On small screen devices this route shows only a cash payment section
          */
          path: 'cash-payment',
          name: 'sale-cash-payment',
          beforeEnter: (to, from, next) => {
            // Allow only routes which comes from 'sale' or 'sale-cart'
            // Others route will be forced redirecting to index
            const allowedRoutes = new Set(['sale-cart', 'sale']);

            if (allowedRoutes.has(from.name)) {
              next();
            } else {
              next('/');
            }
          },
          components: { 'cash-payment': CashPayment }
        }
      ]
    },
    {
      path: '/receipts',
      name: 'receipts',
      component: Receipts
    }
  ]
});
