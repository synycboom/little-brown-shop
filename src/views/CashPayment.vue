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
        <h4>Total</h4>
        <h4>{{ formattedTotal }}</h4>
      </div>
      <div class="cash-payment__pay">
        <h4>Pay</h4>
        <PayTextBox :value="pay" @input="updatePay" />
      </div>
    </div>

    <div class="cash-payment__footer">
      <div class="cash-payment__change">
        <h3>Change</h3>
        <h3>{{ formattedChange }}</h3>
      </div>
      <Button
        type="PRIMARY"
        label="Done"
        class="cash-payment__done-button"
        :disabled="!canFinish"
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
    canFinish() {
      return this.totalProductsInCart > 0 && this.pay >= this.total;
    },
    ...mapState({
      pay: state => state.pay
    }),
    ...mapGetters([
      'total',
      'totalProductsInCart',
      'formattedTotal',
      'formattedChange'
    ])
  },
  methods: {
    updatePay(pay) {
      this.$store.commit('updatePay', { pay });
    },
    navigateToBilling() {
      this.$router.go(-1);
    },
    finishPayment() {
      if (this.canFinish) {
        this.$eventBus.$emit('finishPayment');
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
      background-color: $primaryColor;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 1rem;
    }

    .cash-payment__pay {
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 1rem;
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
      background-color: $primaryColor;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 1rem;
    }

    .cash-payment__done-button {
      width: 50%;
    }
  }
}
</style>
