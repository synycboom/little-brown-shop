import { mutations } from '../../src/store';
import Vue from 'vue';

// Mock notify function
Vue.notify = jest.fn(x => null);

// Mock commit method
mutations.commit = jest.fn((type, payload) => null);

describe('product mutations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('clearCart', () => {
    const state = {
      selectedProductCount: { 1: {}, 2: {} },
      selectedProductIdList: [1, 2],
      pay: 555
    };
    mutations.clearCart(state);
    expect(state.selectedProductCount).toEqual({});
    expect(state.selectedProductIdList).toEqual([]);
    expect(state.pay).toBe(0);
  });

  test('addToCart (Not in cart)', () => {
    const state = {
      selectedProductCount: {},
      selectedProductIdList: []
    };

    // Mock 'isInCart' getters method
    mutations.getters = {
      isInCart: jest.fn(id => false)
    };

    mutations.addToCart(state, { id: 1 });
    expect(state.selectedProductCount).toEqual({ 1: 1 });
    expect(state.selectedProductIdList).toEqual([1]);
    expect(mutations.getters.isInCart.mock.calls.length).toBe(1);
  });

  test('addToCart (In cart)', () => {
    const state = {
      selectedProductCount: {},
      selectedProductIdList: []
    };
    const product = { id: 1 };

    // Mock 'isInCart' getters method
    mutations.getters = {
      isInCart: jest.fn(id => true)
    };

    mutations.addToCart(state, product);
    expect(mutations.getters.isInCart.mock.calls.length).toBe(1);
    expect(mutations.commit.mock.calls.length).toBe(1);
    expect(mutations.commit.mock.calls[0][0]).toBe('increaseQuantity');
  });

  test('removeFromCart (Not in cart)', () => {
    const state = {
      selectedProductCount: { 1: 1, 2: 2 },
      selectedProductIdList: [1, 2]
    };
    const product = { id: 5 };

    // Mock 'isInCart' getters method
    mutations.getters = {
      isInCart: jest.fn(id => false)
    };

    mutations.removeFromCart(state, product);
    expect(state.selectedProductCount).toEqual({ 1: 1, 2: 2 });
    expect(state.selectedProductIdList).toEqual([1, 2]);
    expect(mutations.getters.isInCart.mock.calls[0][0]).toBe(product.id);
  });

  test('removeFromCart (In cart)', () => {
    const state = {
      selectedProductCount: { 1: 1, 2: 2 },
      selectedProductIdList: [1, 2]
    };
    const product = { id: 1 };

    // Mock 'isInCart' getters method
    mutations.getters = {
      isInCart: jest.fn(id => true)
    };

    mutations.removeFromCart(state, product);
    expect(state.selectedProductCount).toEqual({ 2: 2 });
    expect(state.selectedProductIdList).toEqual([2]);
    expect(mutations.getters.isInCart.mock.calls[0][0]).toBe(product.id);
  });

  test('increaseQuantity (Not in cart)', () => {
    const state = {};
    const product = { id: 1 };

    // Mock 'isInCart' getters method
    mutations.getters = {
      isInCart: jest.fn(id => false)
    };

    mutations.increaseQuantity(state, product);
    expect(mutations.commit.mock.calls.length).toBe(1);
    expect(mutations.commit.mock.calls[0][0]).toBe('addToCart');
    expect(mutations.commit.mock.calls[0][1]).toEqual(product);
  });

  test('increaseQuantity (in cart)', () => {
    const state = {
      selectedProductCount: { 1: 1 }
    };
    const product = { id: 1 };

    // Mock 'isInCart' getters method
    mutations.getters = {
      isInCart: jest.fn(id => true)
    };

    mutations.increaseQuantity(state, product);
    expect(state.selectedProductCount).toEqual({ 1: 2 });
  });

  test('decreaseQuantity (one item left)', () => {
    const state = {
      selectedProductCount: { 1: 1 }
    };
    const product = { id: 1 };

    // Mock 'isInCart' getters method
    mutations.getters = {
      isInCart: jest.fn(id => true)
    };

    // It should do nothing because there is only one item left
    mutations.decreaseQuantity(state, product);
    expect(state.selectedProductCount).toEqual({ 1: 1 });
  });

  test('decreaseQuantity (>= 2 items left)', () => {
    const state = {
      selectedProductCount: { 1: 5 }
    };
    const product = { id: 1 };

    // Mock 'isInCart' getters method
    mutations.getters = {
      isInCart: jest.fn(id => true)
    };

    // It should do nothing because there is only one item left
    mutations.decreaseQuantity(state, product);
    expect(state.selectedProductCount).toEqual({ 1: 4 });
  });

  test('updatePay', () => {
    const state = {
      pay: 0
    };
    const pay = { pay: 5 };

    mutations.updatePay(state, pay);
    expect(state.pay).toBe(pay.pay);
  });

  test('finishPayment', () => {
    const state = {
      selectedProductIdList: [1],
      selectedProductCount: { 1: 1 },
      receipts: [],
      pay: 500
    };

    // Mock getters method
    mutations.getters = {
      normalizedProducts: { 1: { price: 500 } },
      formattedSubTotal: '฿500.00',
      formattedDiscount: '฿0.00',
      formattedTotal: '฿500.00',
      formattedChange: '฿0.00'
    };

    mutations.finishPayment(state);
    expect(state.selectedProductCount).toEqual({});
    expect(state.selectedProductIdList).toEqual([]);
    expect(state.pay).toBe(0);
  });
});
