<template>
  <div class="product-item">
    <!-- <img class="product-item__cover" height="60" width="40" alt="product-item" :src="cover"> -->
    <span class="product-item__title">{{ title }}</span>
    <span class="product-item__price">{{ formattedPrice }}</span>
  </div>
</template>

<script>
import { formatPrice } from '../utils.js';

export default {
  name: 'ProductItemList',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    cover: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedPrice() {
      return formatPrice('฿')(this.price);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.product-item {
  cursor: pointer;
  font-size: 1rem;
  border: 1px solid $primaryColor;
  width: 100%;
  padding: 10px;
  display: flex;

  .product-item__title {
    width: 80%;
  }

  .product-item__price {
    text-align: right;
    width: 20%;
  }
}
</style>
