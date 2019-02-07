<template>
  <div class="sale">
    <section class="sale__product-section" :class="productSelectClasses">
      <div class="sale__search-bar">
        <BarcodeSearchBox class="sale__search-box" />
        <ViewType
          class="sale__view-type"
          :type="type"
          @change="handleTypeChange"
        />
      </div>

      <ProductList
        :type="type"
        class="sale__product-list"
        @loadMore="$store.dispatch('loadMore')"
      />

      <Loading :loading="loading" />
    </section>

    <section class="sale__cart-section" :class="billingClasses">
      <router-view name="sale-cart" @backClick="hideRightSection" />
      <router-view name="cash-payment" />
    </section>

    <Modal v-if="showModal" @close="showModal = false">
      <Receipt
        slot="body"
        :date="receipt.date"
        :discount="receipt.discount"
        :pay="receipt.pay"
        :change="receipt.change"
        :subTotal="receipt.subTotal"
        :total="receipt.total"
        :items="receipt.items"
      />
    </Modal>
  </div>
</template>

<script>
import Loading from '../components/Loading';
import BarcodeSearchBox from '../components/BarcodeSearchBox';
import ViewType from '../components/ViewType';
import ProductList from '../components/ProductList';
import Modal from '../components/Modal';
import Receipt from '../components/Receipt';
import { mapState } from 'vuex';

export default {
  name: 'Sale',
  components: {
    BarcodeSearchBox,
    ViewType,
    ProductList,
    Loading,
    Modal,
    Receipt
  },
  created() {
    this.$eventBus.$on('finishPayment', () => {
      this.$store.commit('finishPayment');
      // Show the latest receipt
      if (this.receipts.length > 0) {
        console.log(this.receipts);
        this.receipt = this.receipts[this.receipts.length - 1];
        this.showModal = true;
      }

      this.$router.replace({ name: 'sale' });
    });
  },
  beforeDestroy() {
    this.$eventBus.$off('finishPayment');
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.showRightSectionIfNeeded(to.name);
    });
  },
  watch: {
    $route(to) {
      this.showRightSectionIfNeeded(to.name);
    }
  },
  data() {
    return {
      /* Used for determining whether or not billing section should be shown */
      isRightSectionShown: false,
      /* For using in ViewType component */
      type: 'GRID',
      /* For determining whether the receipt modal should be shown */
      showModal: false,
      /* For using in the receript modal */
      receipt: {}
    };
  },
  computed: {
    /* Computed CSS classes */
    productSelectClasses() {
      return {
        'sale__product-section--active': !this.isRightSectionShown
      };
    },
    billingClasses() {
      return {
        'sale__cart-section--active': this.isRightSectionShown
      };
    },
    /* Computed props associated to products */
    ...mapState(['normalizedProducts', 'loading', 'receipts'])
  },
  methods: {
    showRightSectionIfNeeded(routeName) {
      // On small screen devices the right section (Cart, Payment) will be hidden as a default
      // We have to call showRightSection to show them
      const routesShowingRightSection = new Set([
        'sale-cart',
        'sale-cash-payment'
      ]);

      if (routesShowingRightSection.has(routeName)) {
        this.showRightSection();
      } else {
        this.hideRightSection();
      }
    },
    handleTypeChange(type) {
      this.type = type;
    },
    showRightSection() {
      this.isRightSectionShown = true;
    },
    hideRightSection() {
      this.isRightSectionShown = false;
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

  @include breakpoint(mediumDevices) {
    display: flex;
  }

  .sale__product-section {
    position: absolute;
    height: 100%;
    width: 100%;
    /* We move it away 110%. 100% is not enough because there are paddings in <main></main> */
    left: -110%;

    @include breakpoint(mediumDevices) {
      position: relative;
      display: block;
      flex-grow: 1;
      left: 0%;
    }

    &.sale__product-section--active {
      left: 0%;
    }

    .sale__search-bar {
      display: flex;
      height: $searchBarHeight;
      justify-content: flex-end;
      width: 100%;

      .sale__search-box {
        flex-grow: 1;
        max-width: 500px;
      }
      .sale__view-type {
        flex-grow: 1;
        margin-left: 10px;
      }
    }

    .sale__product-list {
      overflow: auto;
      max-height: $productListHeight;
    }
  }

  .sale__cart-section {
    position: absolute;
    height: 100%;
    width: 100%;
    /* We move it away roughly 110%. 100% is not enough because there are paddings in <main></main> */
    right: 110%;

    @include breakpoint(mediumDevices) {
      position: relative;
      display: block;
      max-width: 570px;
      min-width: 375px;
      flex-grow: 1;
      right: 0%;
    }

    &.sale__cart-section--active {
      right: 0%;
    }
  }
}
</style>
