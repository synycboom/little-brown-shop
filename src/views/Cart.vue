<template>
  <div class="cart">
    <Header>
      <template slot="left">
        <TextButton
          class="cart__back-button"
          label="Back"
          icon="chevron-left"
          @click="handleBackClick"
        />
      </template>
      <template slot="center">
        <h2 class="cart__title">Cart ({{ formattedTotalProductsInCart }})</h2>
      </template>
    </Header>

    <div class="cart__content">
      <BillingList :items="billingItems"/>
    </div>

    <div class="cart__footer">
      <div class="cart__summary">
        <div class="cart__subtotal">
          <span>Subtotal</span>
          <span>{{ formattedSubTotal }}</span>
        </div>
        <div class="cart__discount">
          <span>Discount</span>
          <span>{{ formattedDiscount }}</span>
        </div>
        <div class="cart__total">
          <span>Total</span>
          <span>{{ formattedTotal }}</span>
        </div>
      </div>
      <div class="cart__buttons">
        <Button
          type="SECONDARY"
          label="Clear"
          class="cart__clear-button"
          @click="clearCart"
          :disabled="totalProductsInCart === 0"
        />
        <Button
          type="PRIMARY"
          label="Pay"
          class="cart__pay-button"
          @click="handlePayClick"
          :disabled="totalProductsInCart === 0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TextButton from '../components/TextButton';
import Button from '../components/Button';
import BillingList from '../components/BillingList';
import Header from '../components/Header';
import { formatComma } from '../utils';

export default {
  name: 'Cart',
  components: {
    TextButton,
    BillingList,
    Button,
    Header
  },
  computed: {
    formattedTotalProductsInCart() {
      return formatComma(this.totalProductsInCart);
    },
    ...mapGetters([
      'billingItems',
      'subTotal',
      'discount',
      'total',
      'formattedSubTotal',
      'formattedDiscount',
      'formattedTotal',
      'totalProductsInCart'
    ])
  },
  methods: {
    handleBackClick() {
      this.$emit('backClick');
      this.$router.go(-1);
    },
    handlePayClick() {
      if (this.totalProductsInCart > 0) {
        this.$router.push({ name: 'sale-cash-payment' });
      }
    },
    clearCart() {
      this.$store.commit('clearCart');
      this.$router.push({ name: 'sale' });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

$footerHeight: 150px;

.cart {
  height: 100%;
  position: relative;

  .cart__back-button {
    @include breakpoint(mediumDevices) {
      display: none;
    }
  }

  .cart__title {
    margin: 0px;
    padding: 10px;
    text-align: center;
  }

  .cart__content {
    height: calc(100% - #{$headerHeight + $footerHeight});
    overflow: auto;
  }

  .cart__footer {
    background-color: white;
    height: $footerHeight;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .cart__summary {
      .cart__subtotal {
        margin-top: 10px;
        font-size: 1.25rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $primaryColor;
      }

      .cart__discount {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        font-size: 1.25rem;
        border-bottom: 1px solid $primaryColor;
      }

      .cart__total {
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 1.5rem;
      }
    }

    .cart__buttons {
      width: 100%;

      .cart__clear-button {
        width: 49%;
        margin-right: 1%;
      }
      .cart__pay-button {
        width: 49%;
        margin-left: 1%;
      }
    }
  }
}
</style>
