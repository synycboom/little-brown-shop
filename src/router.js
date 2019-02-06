import Vue from 'vue';
import Router from 'vue-router';
import Sale from './views/Sale.vue';
import Receipts from './views/Receipts.vue';
import Billing from './views/Billing.vue';
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
          path: '',
          name: 'sale-billing',
          components: { 'sale-billing': Billing }
        },
        {
          path: '/cash-payment',
          name: 'cash-payment',
          beforeEnter: (to, from, next) => {
            if (from.name !== 'sale-billing') {
              next('/');
            } else {
              next();
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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
});
