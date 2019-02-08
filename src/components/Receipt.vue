<template>
  <div class="receipt">
    <h1 class="receipt__brand">LITTLE BROWN SHOP</h1>
    <p>{{ formattedDate }}</p>
    <hr class="receipt__divider" />
    <h2 class="receipt__header">*** RECEIPT ***</h2>
    <hr class="receipt__divider" />
    <br />
    <div class="receipt__item" v-for="item in items" :key="item.id">
      <div class="receipt__item-left">
        <div class="receipt__title">{{ item.title }}</div>
        <div class="receipt__detail">{{ `${item.price} x ${item.count}` }}</div>
      </div>
      <div class="receipt__item-right">{{ item.total }}</div>
    </div>
    <hr class="receipt__divider" />
    <div class="receipt__line">
      <p class="receipt__line-label">Subtotal</p>
      <p class="receipt__line-number">{{ subTotal }}</p>
    </div>
    <div class="receipt__line">
      <p class="receipt__line-label">Discount</p>
      <p class="receipt__line-number">{{ discount }}</p>
    </div>
    <hr class="receipt__divider" />
    <div class="receipt__line">
      <h3 class="receipt__line-label">Total</h3>
      <h3 class="receipt__line-number">{{ total }}</h3>
    </div>
    <div class="receipt__line">
      <p class="receipt__line-label">Cash</p>
      <p class="receipt__line-number">{{ pay }}</p>
    </div>
    <div class="receipt__line">
      <p class="receipt__line-label">Change</p>
      <p class="receipt__line-number">{{ change }}</p>
    </div>
    <hr class="receipt__divider" />
    <h3>Thank You</h3>
  </div>
</template>

<script>
export default {
  name: 'Receipt',
  props: {
    date: {
      type: Date,
      required: true
    },
    discount: {
      type: String,
      required: true
    },
    pay: {
      type: String,
      required: true
    },
    change: {
      type: String,
      required: true
    },
    subTotal: {
      type: String,
      required: true
    },
    total: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    formattedDate() {
      return this.date.toLocaleString();
    }
  }
};
</script>

<style lang="scss" scoped>
.receipt {
  text-align: center;
  padding: 1em;
  border: 1px solid black;

  .receipt__divider {
    border-top: 2px dashed black;
  }

  .receipt__header {
    font-weight: normal;
  }

  .receipt__brand {
  }

  .receipt__item {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem;

    .receipt__item-left {
      width: 80%;
      text-align: left;

      .receipt__title {
      }

      .receipt__detail {
        text-indent: 1rem;
        margin-top: 0.3rem;
      }
    }

    .receipt__item-right {
    }
  }

  .receipt__line {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem;

    .receipt__line-label {
      margin: 0.5rem 0px;
    }
    .receipt__line-number {
      margin: 0.5rem 0px;
    }
  }
}
</style>
