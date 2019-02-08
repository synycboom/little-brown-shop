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

  test('fetchProductsRequest', () => {
    const state = { loading: false };
    mutations.fetchProductsRequest(state);
    expect(state.loading).toBe(true);
  });

  test('fetchProductsSuccess (receive products from backend)', () => {
    const state = {
      loading: true,
      page: 1,
      hasRemainingProducts: true,
      products: []
    };

    mutations.fetchProductsSuccess(state, { products: [{}, {}] });

    expect(state.loading).toBe(false);
    expect(state.products.length).toBe(2);
    expect(state.page).toBe(2);
    expect(state.hasRemainingProducts).toBe(true);
  });

  test('fetchProductsSuccess (no remaining products)', () => {
    const state = {
      loading: true,
      page: 1,
      hasRemainingProducts: true,
      products: []
    };

    mutations.fetchProductsSuccess(state, { products: [] });

    expect(state.loading).toBe(false);
    expect(state.products.length).toBe(0);
    expect(state.page).toBe(1);
    expect(state.hasRemainingProducts).toBe(false);
  });

  test('fetchProductsFailure', () => {
    const state = { loading: true };
    const error = { error: 'error' };
    const expectedError = { title: 'Error', text: 'error', type: 'error' };
    mutations.fetchProductsFailure(state, error);

    expect(state.loading).toBe(false);
    expect(Vue.notify.mock.calls.length).toBe(1);
    expect(Vue.notify.mock.calls[0][0]).toEqual(expectedError);
  });

  test('getProductByBarcodeRequest', () => {
    const state = { loadingByBarcode: false };
    mutations.getProductByBarcodeRequest(state);
    expect(state.loadingByBarcode).toBe(true);
  });

  test('getProductByBarcodeSuccess (receive product)', () => {
    const state = { loadingByBarcode: true };
    const product = { id: 1 };
    const expectedProdcut = { id: 1 };
    mutations.getProductByBarcodeSuccess(state, { product });
    expect(state.loadingByBarcode).toBe(false);
    expect(mutations.commit.mock.calls.length).toBe(1);
    expect(mutations.commit.mock.calls[0][0]).toBe('addToCart');
    expect(mutations.commit.mock.calls[0][1]).toEqual(expectedProdcut);
  });

  test('getProductByBarcodeSuccess (no product)', () => {
    const state = { loadingByBarcode: true };
    const product = null;

    mutations.getProductByBarcodeSuccess(state, { product });
    expect(state.loadingByBarcode).toBe(false);
    expect(mutations.commit.mock.calls.length).toBe(0);
  });

  test('getProductByBarcodeFailure (receive product)', () => {
    const state = { loadingByBarcode: true };
    const error = { error: 'error' };
    const expectedError = { title: 'Error', text: 'error', type: 'error' };
    mutations.getProductByBarcodeFailure(state, error);

    expect(state.loadingByBarcode).toBe(false);
    expect(Vue.notify.mock.calls.length).toBe(1);
    expect(Vue.notify.mock.calls[0][0]).toEqual(expectedError);
  });
});
