import Vue from 'vue';
import Vuex from 'vuex';
import ProductService from './services/ProductService.js';
import { formatThaiBath, formatComma } from './utils.js';

Vue.use(Vuex);

const productService = new ProductService();

export const state = {
  // Loading flag of get product by barcode
  loadingByBarcode: false,
  // Loading flag of list products
  loading: false,
  // Store all products which will be lazily loaded
  products: [],
  /* Used to check whether there are still more products in the backend */
  hasRemainingProducts: true,
  /* Current page of products */
  page: 1,
  /* Page size of products */
  pageSize: 10,
  // Store in-cart product counts which are indexed by product ids
  selectedProductCount: {},
  // Store list of in-cart product ids
  selectedProductIdList: [],
  // Store how much a customer pay
  pay: 0,
  /* Store default book ids which are discounted
   * All of the books are Harry Potter series
   */
  discountedBookIds: new Set([
    '9781408855652',
    '9781408855669',
    '9781408855676',
    '9781408855683',
    '9781408855690',
    '9781408855706',
    '9781408855713'
  ]),
  // Store percents of discount which are mapped by the number of books to percents
  // For example: { 5: 10 } means that if a customer buys 5 books, he gets 10% of discount
  discountPercentMap: {
    1: 0,
    2: 10,
    3: 11,
    4: 12,
    5: 13,
    6: 14,
    7: 15
  },
  // Store receipts of orders
  receipts: []
};

export const getters = {
  isInCart: state => id => {
    const product = state.selectedProductIdList.find(
      productId => productId === id
    );
    return typeof product !== 'undefined';
  },
  /* Products which are indexed by id */
  normalizedProducts(state) {
    const nomalized = {};

    for (const product of state.products) {
      nomalized[product.id] = product;
    }

    return nomalized;
  },
  billingItems(state, getters) {
    const items = [];

    for (const productId of state.selectedProductIdList) {
      items.push({
        ...getters.normalizedProducts[productId],
        count: state.selectedProductCount[productId]
      });
    }

    return items;
  },
  totalProductsInCart(state) {
    let count = 0;

    for (const productId of state.selectedProductIdList) {
      count += state.selectedProductCount[productId];
    }

    return count;
  },
  subTotal(state, getters) {
    let sum = 0;

    for (const productId of state.selectedProductIdList) {
      const price = Number(getters.normalizedProducts[productId].price);
      const count = state.selectedProductCount[productId];
      sum += price * count;
    }

    return sum;
  },
  discount(state, getters) {
    let numberOfUniqueSeries = 0;
    let sum = 0;

    for (const productId of state.selectedProductIdList) {
      // Check if the selected product id is in a discounted books set
      if (state.discountedBookIds.has(productId)) {
        numberOfUniqueSeries += 1;
        sum += Number(getters.normalizedProducts[productId].price);
      }
    }

    const percent = state.discountPercentMap[numberOfUniqueSeries] || 0;
    return sum * (percent / 100);
  },
  total(state, getters) {
    return Math.max(getters.subTotal - getters.discount, 0);
  },
  change(state, getters) {
    return Math.max(state.pay - getters.total, 0);
  },
  formattedSubTotal(state, getters) {
    return formatThaiBath(getters.subTotal);
  },
  formattedDiscount(state, getters) {
    return formatThaiBath(getters.discount);
  },
  formattedTotal(state, getters) {
    return formatThaiBath(getters.total);
  },
  formattedChange(state, getters) {
    return formatThaiBath(getters.change);
  }
};

export const mutations = {
  fetchProductsRequest(state) {
    state.loading = true;
  },
  fetchProductsSuccess(state, { products }) {
    // Increase a page number only if there are still remaining products on the next page
    if (products.length > 0) {
      state.page += 1;
    } else {
      state.hasRemainingProducts = false;
    }

    state.products = [...state.products, ...products];
    state.loading = false;
  },
  fetchProductsFailure(state, { error }) {
    state.loading = false;
    // TODO: Show error messages
    console.error(error);
  },
  getProductByBarcodeRequest(state) {
    state.loadingByBarcode = true;
    console.log(state.loadingByBarcode);
  },
  getProductByBarcodeSuccess(state, { product }) {
    if (product) {
      this.commit('addToCart', { id: product.id });
    }
    state.loadingByBarcode = false;
  },
  getProductByBarcodeFailure(state, { error }) {
    state.loadingByBarcode = false;
    // TODO: Show error messages
    console.error(error);
  },
  clearCart(state) {
    state.selectedProductCount = {};
    state.selectedProductIdList = [];
    state.pay = 0;
  },
  addToCart(state, { id }) {
    if (this.getters.isInCart(id)) {
      // TODO: Notify a user that this product is already in cart
      return;
    }

    // Add productId to selectedProductIdList
    state.selectedProductIdList.push(id);

    // Set selectedProductCount
    Vue.set(state.selectedProductCount, id, 1);
  },
  removeFromCart(state, { id }) {
    if (this.getters.isInCart(id)) {
      // Remove the product out of selectedProductIdList
      state.selectedProductIdList = state.selectedProductIdList.filter(
        productId => productId !== id
      );

      // Remove the product out of selectedProductCount
      Vue.delete(state.selectedProductCount, id);
    }
  },
  increaseQuantity(state, { id }) {
    if (!this.getters.isInCart(id)) {
      this.commit('addToCart', { id });
    } else {
      Vue.set(
        state.selectedProductCount,
        id,
        state.selectedProductCount[id] + 1
      );
    }
  },
  decreaseQuantity(state, { id }) {
    if (this.getters.isInCart(id)) {
      if (state.selectedProductCount[id] - 1 === 0) {
        this.commit('removeFromCart', { id });
      } else {
        Vue.set(
          state.selectedProductCount,
          id,
          state.selectedProductCount[id] - 1
        );
      }
    }
  },
  updatePay(state, { pay }) {
    state.pay = pay;
  },
  finishPayment(state) {
    const normalizedProducts = this.getters.normalizedProducts;
    const items = state.selectedProductIdList.map(id => {
      return {
        ...normalizedProducts[id],
        count: formatComma(state.selectedProductCount[id]),
        total: formatThaiBath(
          state.selectedProductCount[id] * Number(normalizedProducts[id].price)
        )
      };
    });

    state.receipts.push({
      orderId: 'ORDER' + `${state.receipts.length}`.padStart(4, '0'),
      subTotal: this.getters.formattedSubTotal,
      discount: this.getters.formattedDiscount,
      total: this.getters.formattedTotal,
      change: this.getters.formattedChange,
      pay: formatThaiBath(state.pay),
      date: new Date(),
      items
    });

    // Clear data of this order
    state.selectedProductCount = {};
    state.selectedProductIdList = [];
    state.pay = 0;
  }
};

export const actions = {
  async loadMore({ state, commit }) {
    let products = [];

    // Check whether or not there are still remaining products on the next page
    if (!state.hasRemainingProducts) {
      return;
    }

    // Show loading before fetching products
    commit('fetchProductsRequest');

    try {
      products = await productService.getProductList(
        state.page,
        state.pageSize
      );
    } catch (error) {
      commit('fetchProductsFailure', { error });
    }

    commit('fetchProductsSuccess', { products });
  },
  async getProductByBarcode({ state, commit }, barcode) {
    let product = null;

    // Show loading
    commit('getProductByBarcodeRequest');

    try {
      product = await productService.getProductByBarcode(barcode);
    } catch (error) {
      commit('getProductByBarcodeFailure', { error });
    }

    commit('getProductByBarcodeSuccess', { product });
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
