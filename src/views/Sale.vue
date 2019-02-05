<template>
  <div class="sale">
    <section class="sale__items">
      <div class="sale__search-bar">
        <SearchBox />
        <ViewType />
      </div>

      <div class="sale__content">
        <ProductList
          :items="products"
          class="sale__product-list"
          @loadMore="loadMore"
        />
        <Loading :loading="loading" />
      </div>
    </section>
    <section></section>
  </div>
</template>

<script>
import Loading from '../components/Loading';
import SearchBox from '../components/SearchBox';
import ViewType from '../components/ViewType';
import ProductList from '../components/ProductList';
import ProductService from '../services/ProductService.js';

const productService = new ProductService();

export default {
  name: 'Sale',
  data() {
    return {
      hasRemainingProducts: true,
      loading: false,
      page: 1,
      pageSize: 10,
      products: []
    };
  },
  components: {
    SearchBox,
    ViewType,
    ProductList,
    Loading
  },
  methods: {
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
        console.log(response);
      }

      // Increase page number only if there are still remaining products on the next page
      if (fetchedProducts.length > 0) {
        this.page += 1;
      } else {
        this.hasRemainingProducts = false;
      }

      this.products = [...this.products, ...fetchedProducts];
      // console.log(this.products);
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

$containerPadding: 15px;
$productListMarginTop: 50px;
$productListUnusableHeight: (
  $headerHeight + $productListMarginTop + ($containerPadding * 2)
);

.sale {
  display: flex;
  padding: $containerPadding;

  .sale__items {
    position: relative;
    flex-basis: 100%;

    .sale__search-bar {
      width: 100%;
      position: absolute;
      top: 0px;
      display: flex;
      justify-content: space-between;
    }

    .sale__content {
      position: relative;

      .sale__product-list {
        margin-top: $productListMarginTop;
        overflow: auto;
        max-height: calc(100vh - #{$productListUnusableHeight});
      }
    }
  }
}
</style>
