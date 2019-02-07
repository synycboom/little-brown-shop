<template>
  <div class="product-item" @click="$store.commit({ type: 'addToCart', id })">
    <span class="product-item__title">{{ title }}</span>
    <span class="product-item__price">{{ formattedPrice }}</span>
  </div>
</template>

<script>
import { formatThaiBath } from '../utils.js';

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
      return formatThaiBath(this.price);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.product-item {
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  padding: 10px;
  display: flex;

  &:nth-of-type(even) {
    background-color: #80808036;
  }

  &:hover {
    background-color: $primaryLightColor;
  }

  &:active {
    background-color: $primaryColor;
  }

  .product-item__title {
    width: 80%;
  }

  .product-item__price {
    text-align: right;
    width: 20%;
  }
}
</style>
