<template>
  <div class="product-item" @click="$store.commit({ type: 'addToCart', id })">
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
$twoItemsWidth: (100% / 2);
$threeItemsWidth: (100% / 3);
$fourItemsWidth: (100% / 4);
$fiveItemsWidth: (100% / 5);

.product-item {
  width: $twoItemsWidth;
  margin-bottom: 20px;
  font-size: 0.9rem;

  @media (max-width: 370px) {
    width: 100%;
    margin-bottom: 20px;
  }

  @media (min-width: 600px) {
    width: $threeItemsWidth;
    margin-bottom: 20px;
  }

  @media (min-width: 750px) {
    // At 750px and more there should be only 2 items per rows
    // becuase there is a right section
    width: $twoItemsWidth;
    margin-bottom: 20px;
  }

  @media (min-width: 1200px) {
    width: $threeItemsWidth;
    margin-bottom: 30px;
  }

  @media (min-width: 1500px) {
    width: $fourItemsWidth;
    margin-bottom: 30px;
  }

  @media (min-width: 1700px) {
    width: $fiveItemsWidth;
    margin-bottom: 30px;
  }

  .product-item__content {
    cursor: pointer;
    width: 161px;
    border: 1px solid grey;
    margin: 0px auto;

    .product-item__cover {
    }

    .product-item__details {
      display: inline-block;
      position: relative;
      width: 100%;
      height: 90px;
      padding: 0px 5px;

      .product-item__title {
      }

      .product-item__price {
        position: absolute;
        bottom: 0px;
      }
    }
  }
}
</style>
