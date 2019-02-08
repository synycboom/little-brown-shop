import { getters } from '../../src/store';

describe('product mutations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('isInCart', () => {
    const state = { selectedProductIdList: [1] };

    // In cart
    expect(getters.isInCart(state)(1)).toBe(true);

    // Not in cart
    expect(getters.isInCart(state)(2)).toBe(false);
  });

  test('normalizedProducts', () => {
    const state = { products: [{ id: 1 }] };
    const expectedResult = { 1: { id: 1 } };
    expect(getters.normalizedProducts(state)).toEqual(expectedResult);
  });

  test('billingItems', () => {
    const state = {
      products: [{ id: 1 }],
      selectedProductCount: { 1: 1 },
      selectedProductIdList: [1]
    };
    const mockGetters = {
      normalizedProducts: { 1: { id: 1 } }
    };
    expect(getters.billingItems(state, mockGetters)).toEqual([
      { id: 1, count: 1 }
    ]);
  });

  test('totalProductsInCart', () => {
    const state = {
      selectedProductCount: { 1: 1, 2: 1 },
      selectedProductIdList: [1, 2]
    };
    expect(getters.totalProductsInCart(state)).toEqual(2);
  });

  test('subTotal', () => {
    const state = {
      products: [{ id: 1 }],
      selectedProductCount: { 1: 1 },
      selectedProductIdList: [1]
    };
    const mockGetters = {
      normalizedProducts: { 1: { id: 1, price: '500' } }
    };
    expect(getters.subTotal(state, mockGetters)).toEqual(500);
  });

  test('total', () => {
    const state = {};
    const mockGetters = {
      subTotal: 100,
      discount: 50
    };
    expect(getters.total(state, mockGetters)).toEqual(50);
  });

  test('change', () => {
    const state = { pay: 100 };
    const mockGetters = {
      total: 50
    };
    expect(getters.change(state, mockGetters)).toEqual(50);
  });
});
