<template>
  <div class="product-item">
    <div class="product-item__content">
      <img
        class="product-item__cover"
        height="240"
        width="160"
        alt="product-item"
        :src="cover"
      />
      <div class="product-item__details">
        <p class="product-item__title">{{ title }}</p>
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

<style lang="scss">
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

      // styles below is suggested by https://codepen.io/natonischuk/pen/KpNKQZ
      // to workaround text overflow ellipsis on 2 lines
      .product-item__title {
        max-width: 100%;
        /* hide text if it more than N lines  */
        overflow: hidden;
        /* for set '...' in absolute position */
        position: relative;
        /* use this value to count block height */
        line-height: 1.2em;
        /* max-height = line-height (1.2) * lines max number (2) */
        max-height: 2.4em;
        /* fix problem when last visible word doesn't adjoin right side  */
        text-align: justify;

        /* */
        margin-right: -1em;
        padding-right: 1em;
      }
      .product-item__title:before {
        /* points in the end */
        content: '...';
        /* absolute position */
        position: absolute;
        /* set position to right bottom corner of block */
        right: 0;
        bottom: 0;
      }
      .product-item__title:after {
        /* points in the end */
        content: '';
        /* absolute position */
        position: absolute;
        /* set position to right bottom corner of text */
        right: 0;
        width: 1em;
        /* set width and height */
        height: 1em;
        margin-top: 0.2em;
        background: white;
      }

      .product-item__price {
      }
    }

    // .product-item__cover {
    //   display: inline-block;
    //   width: 30%;
    //   max-width: 160px;
    //   max-height: 240px;
    // }
    // .product-item__details {
    //   display: inline-block;
    //   width: 70%;
    // }
  }
}
</style>
