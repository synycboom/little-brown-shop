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
        <h2 class="cart__title">Cart ({{ totalProductsIncart }})</h2>
      </template>
    </Header>

    <div class="cart__content">
      <BillingList :items="billingItems" />
    </div>

    <div class="cart__footer">
      <div class="cart__summary">
        <div class="cart__subtotal">
          <span class="cart__subtotal-label">Subtotal</span>
          <span class="cart__subtotal-number">{{ formattedSubTotal }}</span>
        </div>
        <div class="cart__discount">
          <span class="cart__discount-label">Discount</span>
          <span class="cart__discount-number">{{ formattedDiscount }}</span>
        </div>
        <div class="cart__total">
          <span class="cart__total-label">Total</span>
          <span class="cart__total-number">{{ formattedTotal }}</span>
        </div>
      </div>
      <div class="cart__buttons">
        <Button
          label="Clear"
          class="cart__clear-button"
          @click="clearCart"
          :disabled="totalProductsIncart === 0"
        />
        <Button
          label="Pay"
          class="cart__pay-button"
          @click="handlePayClick"
          :disabled="totalProductsIncart === 0"
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

export default {
  name: 'Cart',
  components: {
    TextButton,
    BillingList,
    Button,
    Header
  },
  computed: {
    ...mapGetters([
      'billingItems',
      'subTotal',
      'discount',
      'total',
      'formattedSubTotal',
      'formattedDiscount',
      'formattedTotal',
      'totalProductsIncart'
    ])
  },
  methods: {
    handleBackClick() {
      this.$emit('backClick');
      this.$router.go(-1);
    },
    handlePayClick() {
      if (this.totalProductsIncart > 0) {
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
    /* To make a smooth scrolling */
    -webkit-overflow-scrolling: touch;
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

        .cart__subtotal-label {
        }
        .cart__subtotal-number {
        }
      }

      .cart__discount {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        font-size: 1.25rem;
        border-bottom: 1px solid $primaryColor;

        .cart__discount-label {
        }
        .cart__discount-number {
        }
      }

      .cart__total {
        display: flex;
        justify-content: space-between;
        margin: 7px 0px;
        font-size: 1.5rem;

        .cart__total-label {
        }
        .cart__total-number {
        }
      }
    }

    .cart__buttons {
      width: 100%;

      .cart__clear-button {
        width: 50%;
      }
      .cart__pay-button {
        width: 50%;
      }
    }
  }
}
</style>
