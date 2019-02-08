<template>
  <div class="product-item">
    <div
      class="product-item__content"
      @click="$store.commit({ type: 'addToCart', id })"
    >
      <img height="240" width="160" alt="product-item" :src="cover" />
      <div class="product-item__details">
        <p class="product-item__title">{{ title }}</p>
        <p class="product-item__price">{{ formattedPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatThaiBath } from '../utils.js';
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
      return formatThaiBath(this.price);
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
    margin: 0px auto;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 20px 0px;
    border-radius: 5px;
    overflow: hidden;
    top: 0px;
    position: relative;
    transition: top 0.1s ease-out, box-shadow 0.1s ease-out;

    &:hover {
      top: 3px;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 20px 0px;
    }

    &:active {
      top: 7px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 20px 0px;
    }

    .product-item__details {
      display: inline-block;
      position: relative;
      width: 100%;
      height: 100px;

      .product-item__title {
        margin: 1em 10px;
      }

      .product-item__price {
        text-align: center;
        border-top: 1px solid rgb(216, 216, 216);
        width: 100%;
        height: 1.2rem;
        padding-top: 7px;
        position: absolute;
        bottom: 0px;
        background-color: white;
      }
    }
  }
}
</style>
