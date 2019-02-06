<template>
  <div class="sale">
    <section class="sale__product-section" :class="productSelectClasses">
      <div class="sale__search-bar">
        <SearchBox/>
        <ViewType :type="type" @change="handleTypeChange"/>
      </div>

      <ProductList :items="products" :type="type" class="sale__product-list" @loadMore="loadMore"/>

      <Loading :loading="loading"/>
    </section>

    <section class="sale__billing-section" :class="billingClasses">
      <router-view
        name="sale-billing"
        @showProductSection="showProductSection"
        :subTotal="subTotal"
        :discount="discount"
        :total="total"
        :billingItems="billingItems"
      />
      <router-view name="cash-payment" :total="total"/>
    </section>
  </div>
</template>

<script>
import router from '../router.js';
import ProductService from '../services/ProductService.js';
import Loading from '../components/Loading';
import SearchBox from '../components/SearchBox';
import ViewType from '../components/ViewType';
import ProductList from '../components/ProductList';

const productService = new ProductService();

export default {
  name: 'Sale',
  created() {
    this.$eventBus.$on('shoppingCartClick', () => {
      this.showBillingSection();
    });
    this.$eventBus.$on('addToCart', id => {
      this.addToCart(id);
    });
    this.$eventBus.$on('increaseQuantity', id => {
      this.increaseQuantity(id);
    });
    this.$eventBus.$on('decreaseQuantity', id => {
      this.decreaseQuantity(id);
    });
    this.$eventBus.$on('removeFromCart', id => {
      this.removeFromCart(id);
    });
    this.$eventBus.$on('paymentSuccess', () => {
      this.paymentSuccess();
    });
  },
  beforeDestroy() {
    this.$eventBus.$off('shoppingCartClick');
    this.$eventBus.$off('addToCart');
    this.$eventBus.$off('increaseQuantity');
    this.$eventBus.$off('decreaseQuantity');
    this.$eventBus.$off('removeFromCart');
    this.$eventBus.$off('paymentSuccess');
  },
  data() {
    return {
      loading: false,

      /* Used for determining whether or not billing section should be shown */
      isBillingSectionShown: false,

      /* For using in ProductList component */
      hasRemainingProducts: true,
      page: 1,
      pageSize: 10,
      products: [],

      /* For using in ViewType component */
      type: 'GRID',

      /* For using in Billing component */
      selectedProductCount: {},
      selectedProductIdList: []
    };
  },
  components: {
    SearchBox,
    ViewType,
    ProductList,
    Loading
  },
  computed: {
    /* Computed CSS classes */
    productSelectClasses() {
      return {
        'sale__product-section--active': !this.isBillingSectionShown
      };
    },
    billingClasses() {
      return {
        'sale__billing-section--active': this.isBillingSectionShown
      };
    },
    /* Computed product associated */
    normalizedProducts() {
      const nomalized = {};

      for (const product of this.products) {
        nomalized[product.id] = product;
      }

      return nomalized;
    },
    subTotal() {
      let sum = 0;

      for (const productId of this.selectedProductIdList) {
        const price = this.normalizedProducts[productId].price;
        const count = this.selectedProductCount[productId];
        sum += price * count;
      }

      return sum;
    },
    discount() {
      return 5;
    },
    total() {
      return Math.max(this.subTotal - this.discount, 0);
    },
    billingItems() {
      const items = [];

      for (const productId of this.selectedProductIdList) {
        items.push({
          ...this.normalizedProducts[productId],
          count: this.selectedProductCount[productId]
        });
      }

      return items;
    }
  },
  methods: {
    handleTypeChange(type) {
      this.type = type;
    },
    showBillingSection() {
      this.isBillingSectionShown = true;
    },
    showProductSection() {
      this.isBillingSectionShown = false;
    },
    async loadMore() {
      let fetchedProducts = [];

      // Check whether or not there are still remaining products on the next page
      if (!this.hasRemainingProducts) {
        return;
      }
      // Show loading before fetching products
      this.loading = true;

      try {
        fetchedProducts = await productService.getProductList(
          this.page,
          this.pageSize
        );
      } catch (response) {
        // TODO: Show error messages
        console.log(response);
      }

      // Increase a page number only if there are still remaining products on the next page
      if (fetchedProducts.length > 0) {
        this.page += 1;
      } else {
        this.hasRemainingProducts = false;
      }

      this.products = [...this.products, ...fetchedProducts];
      this.loading = false;
    },
    paymentSuccess() {
      // Clear data of this order
      this.selectedProductCount = {};
      this.selectedProductIdList = [];

      // For small screen devices, the billing section should be hidden.
      this.showProductSection();
      router.replace({ name: 'sale-billing' });
    },
    isInCart(id) {
      const product = this.selectedProductIdList.find(
        productId => productId === id
      );
      return typeof product !== 'undefined';
    },
    addToCart(id) {
      if (this.isInCart(id)) {
        // TODO: Notify a user that this product is already in cart
        return;
      }

      // Add productId to selectedProductIdList
      this.selectedProductIdList.push(id);

      // Set selectedProductCount
      this.$set(this.selectedProductCount, id, 1);
    },
    removeFromCart(id) {
      if (this.isInCart(id)) {
        // Remove the product out of selectedProductIdList
        this.selectedProductIdList = this.selectedProductIdList.filter(
          productId => productId !== id
        );

        // Remove the product out of selectedProductCount
        this.$delete(this.selectedProductCount, id);
      }
    },
    increaseQuantity(id) {
      if (!this.isInCart(id)) {
        this.addToCart(id);
      } else {
        this.$set(
          this.selectedProductCount,
          id,
          this.selectedProductCount[id] + 1
        );
      }
    },
    decreaseQuantity(id) {
      if (this.isInCart(id)) {
        if (this.selectedProductCount[id] - 1 === 0) {
          this.removeFromCart(id);
        } else {
          this.$set(
            this.selectedProductCount,
            id,
            this.selectedProductCount[id] - 1
          );
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

$searchBarHeight: 50px;
$productListHeight: calc(100% - #{$searchBarHeight});

.sale {
  height: 100%;
  position: relative;

  .sale__product-section {
    position: absolute;
    height: 100%;
    width: 100%;
    /* We move it away 110%. 100% is not enough because there are paddings in <main></main> */
    left: -110%;

    &.sale__product-section--active {
      left: 0%;
    }

    .sale__search-bar {
      display: flex;
      height: $searchBarHeight;
      width: 100%;
      justify-content: space-between;
    }

    .sale__product-list {
      overflow: auto;
      max-height: $productListHeight;
    }
  }

  .sale__billing-section {
    position: absolute;
    height: 100%;
    width: 100%;
    /* We move it away roughly 110%. 100% is not enough because there are paddings in <main></main> */
    right: 110%;

    &.sale__billing-section--active {
      right: 0%;
    }
  }
}
</style>
