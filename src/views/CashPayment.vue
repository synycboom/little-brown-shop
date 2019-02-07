<template>
  <div class="cash-payment">
    <Header>
      <template slot="left">
        <TextButton
          label="Back"
          icon="chevron-left"
          @click="navigateToBilling"
        />
      </template>
    </Header>

    <div class="cash-payment__content">
      <div class="cash-payment__total">
        <span class="cash-payment__total-label">Total</span>
        <span class="cash-payment__total-number">{{ formattedTotal }}</span>
      </div>
      <div class="cash-payment__pay">
        <span class="cash-payment__pay-label">Pay</span>
        <PayTextBox
          class="cash-payment__pay-number"
          :value="pay"
          @input="updatePay"
        />
      </div>
    </div>

    <div class="cash-payment__footer">
      <div class="cash-payment__change">
        <span class="cash-payment__change-label">Change</span>
        <span class="cash-payment__change-number">{{ formattedChange }}</span>
      </div>
      <Button
        label="Done"
        class="cash-payment__done-button"
        @click="finishPayment"
      />
    </div>
  </div>
</template>

<script>
import TextButton from '../components/TextButton';
import PayTextBox from '../components/PayTextBox';
import Button from '../components/Button';
import Header from '../components/Header';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'CashPayment',
  components: {
    TextButton,
    Button,
    PayTextBox,
    Header
  },
  computed: {
    ...mapState({
      pay: state => state.pay
    }),
    ...mapGetters(['total', 'formattedTotal', 'formattedChange'])
  },
  methods: {
    updatePay(pay) {
      this.$store.commit('updatePay', { pay });
    },
    navigateToBilling() {
      this.$router.go(-1);
    },
    finishPayment() {
      if (this.pay >= this.total) {
        this.$eventBus.$emit('finishPayment');
      } else {
        throw new Error('User pays less than total!');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

$footerHeight: 150px;

.cash-payment {
  height: 100%;
  position: relative;

  .cash-payment__content {
    height: calc(100% - #{$headerHeight + $footerHeight});

    .cash-payment__total {
      height: 3rem;
      background-color: lightgray;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .cash-payment__total-label {
      }
      .cash-payment__total-number {
      }
    }

    .cash-payment__pay {
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .cash-payment__pay-label {
      }
      .cash-payment__pay-number {
      }
    }
  }

  .cash-payment__footer {
    height: $footerHeight;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .cash-payment__change {
      height: 80px;
      width: 100%;
      background-color: lightgray;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .cash-payment__change-label {
      }

      .cash-payment__change-number {
      }
    }

    .cash-payment__done-button {
      width: 50%;
    }
  }
}
</style>
