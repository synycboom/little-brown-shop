<template>
  <div class="billing">
    <Header>
      <template slot="left">
        <TextButton label="Back" icon="chevron-left" @click="$emit('showProductSection')"/>
      </template>
      <template slot="center">
        <h2 class="billing__title">Cart ({{ '5' }})</h2>
      </template>
    </Header>

    <div class="billing__content">
      <BillingList :items="billingItems"/>
    </div>

    <div class="billing__footer">
      <div class="billing__summary">
        <div class="billing__subtotal">
          <span class="billing__subtotal-label">Subtotal</span>
          <span class="billing__subtotal-number">{{ formattedSubTotal }}</span>
        </div>
        <div class="billing__discount">
          <span class="billing__discount-label">Discount</span>
          <span class="billing__discount-number">{{ formattedDiscount }}</span>
        </div>
        <div class="billing__total">
          <span class="billing__total-label">Total</span>
          <span class="billing__total-number">{{ formattedTotal }}</span>
        </div>
      </div>
      <div class="billing__buttons">
        <Button label="Clear" class="billing__clear-button"/>
        <Button label="Pay" class="billing__pay-button" @click="handlePayClick"/>
      </div>
    </div>
  </div>
</template>

<script>
import { formatThaiBath } from '../utils.js';
import TextButton from '../components/TextButton';
import Button from '../components/Button';
import BillingList from '../components/BillingList';
import Header from '../components/Header';

export default {
  name: 'Billing',
  components: {
    TextButton,
    BillingList,
    Button,
    Header
  },
  props: {
    billingItems: {
      type: Array,
      default() {
        return [];
      }
    },
    subTotal: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    formattedSubTotal() {
      return formatThaiBath(this.subTotal);
    },
    formattedDiscount() {
      return formatThaiBath(this.discount);
    },
    formattedTotal() {
      return formatThaiBath(this.total);
    }
  },
  methods: {
    handlePayClick() {
      this.$router.push({ name: 'cash-payment' });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

$footerHeight: 150px;

.billing {
  height: 100%;
  position: relative;

  .billing__title {
    margin: 0px;
    padding: 10px;
    text-align: center;
  }

  .billing__content {
    height: calc(100% - #{$headerHeight + $footerHeight});
    overflow: auto;
    /* To make a smooth scrolling */
    -webkit-overflow-scrolling: touch;
  }

  .billing__footer {
    background-color: white;
    height: $footerHeight;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .billing__summary {
      .billing__subtotal {
        margin-top: 10px;
        font-size: 1.25rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $primaryColor;

        .billing__subtotal-label {
        }
        .billing__subtotal-number {
        }
      }

      .billing__discount {
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
        font-size: 1.25rem;
        border-bottom: 1px solid $primaryColor;

        .billing__discount-label {
        }
        .billing__discount-number {
        }
      }

      .billing__total {
        display: flex;
        justify-content: space-between;
        margin: 7px 0px;
        font-size: 1.5rem;

        .billing__total-label {
        }
        .billing__total-number {
        }
      }
    }

    .billing__buttons {
      width: 100%;

      .billing__clear-button {
        width: 50%;
      }
      .billing__pay-button {
        width: 50%;
      }
    }
  }
}
</style>
