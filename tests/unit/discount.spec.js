import { getters } from '../../src/store';

import { products, normalizedProducts } from './mockedData';

// For more information about 'discountedBookIds' and 'discountPercentMap'
// Please check the store.js file
const discountedBookIds = new Set(['1', '2', '3', '4', '5', '6', '7']);

const discountPercentMap = {
  1: 0,
  2: 10,
  3: 11,
  4: 12,
  5: 13,
  6: 14,
  7: 15
};

describe('getters', () => {
  it('can calculate discount correctly', () => {
    // Initial state
    let state = {
      products,
      discountedBookIds,
      discountPercentMap
    };

    // Other getters
    const otherGetters = { normalizedProducts };

    // Buy 2 books of Harry Potter, but thay are not unique series.
    // Discount should be 0
    state = {
      ...state,
      selectedProductCount: {
        '1': 2 // "Harry Potter and the Philosopher's Stone (I)", 350 x 2
      },
      selectedProductIdList: ['1']
    };

    expect(getters.discount(state, otherGetters)).toBe(0);

    // Buy 3 books of Harry Potter, and 2 of them are unique series
    // Discount should be 70
    state = {
      ...state,
      selectedProductCount: {
        '1': 2, // "Harry Potter and the Philosopher's Stone (I)", 350 x 2
        '2': 1, // 'Harry Potter and the Chamber of Secrets (II)' 350 x 1
        '9': 1 // 'The Fork, the Witch, and the Worm', 260 x 1
      },
      selectedProductIdList: ['1', '2', '9']
    };

    expect(getters.discount(state, otherGetters)).toBe(70);

    // Buy 14 books of Harry Potter, and 7 of them are unique series
    // Discount should be 384
    state = {
      ...state,
      selectedProductCount: {
        '1': 2, // "Harry Potter and the Philosopher's Stone (I)", 350 x 2
        '2': 2, // 'Harry Potter and the Chamber of Secrets (II)' 350 x 2
        '3': 2, // 'Harry Potter and the Prisoner of Azkaban (III)', 340 x 2
        '4': 2, // 'Harry Potter and the Goblet of Fire (IV)', 360 x 2
        '5': 2, // 'Harry Potter and the Order of the Phoenix (V)', 380 x 2
        '6': 2, // 'Harry Potter and the Half-Blood Prince (VI)', 380 x 2
        '7': 2 // 'Harry Potter and the Deathly Hallows (VII)', 400 x 2
      },
      selectedProductIdList: ['1', '2', '3', '4', '5', '6', '7']
    };

    expect(getters.discount(state, otherGetters)).toBe(384);
  });
});
