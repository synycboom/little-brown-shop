<template>
  <div class="product-item" @click="$eventBus.$emit('addToCart', id)">
    <div class="product-item__content">
      <img
        class="product-item__cover"
        height="240"
        width="160"
        alt="product-item"
        :src="cover"
      />
      <div class="product-item__details">
        <p class="product-item__title two-lines-ellipsis">{{ title }}</p>
        <p class="product-item__price">{{ formattedPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '../utils.js';

export default {
  name: 'ProductItem',
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
.product-item {
  width: 48%;
  margin: 1%;
  border: 1px solid red;
  font-size: 0.9rem;
  cursor: pointer;

  .product-item__content {
    width: 161px;
    border: 1px solid grey;
    margin: 0px auto;

    .product-item__cover {
      display: inline-block;
    }

    .product-item__details {
      display: inline-block;
      width: 100%;
      height: 100%;
      height: 100px;
      padding: 0px 5px;

      .product-item__title {
      }

      .product-item__price {
      }
    }
  }
}
</style>
