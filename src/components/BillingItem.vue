<template>
  <div class="item">
    <img class="item__cover" height="60" width="40" alt="item" :src="cover">
    <div class="item__content">
      <div class="item__title">
        <div class="two-lines-ellipsis">{{ title }}</div>
      </div>
      <FontAwesomeIcon
        class="item__remove-icon"
        size="lg"
        icon="trash"
        @click="$store.commit({ type: 'removeFromCart', id })"
      />
      <div class="item__button-groups">
        <FontAwesomeIcon
          class="item__minus-button"
          size="lg"
          icon="minus-square"
          @click="$store.commit({ type: 'decreaseQuantity', id })"
        />
        <span class="item__count">{{ count }}</span>
        <FontAwesomeIcon
          class="item__plus-button"
          size="lg"
          icon="plus-square"
          @click="$store.commit({ type: 'increaseQuantity', id })"
        />
      </div>
      <span class="item__price">{{ formattedPrice }}</span>
    </div>
  </div>
</template>

<script>
import { formatThaiBath } from '../utils.js';

export default {
  name: 'BillingItem',
  props: {
    id: {
      type: String,
      required: true
    },
    count: {
      type: Number,
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
      return formatThaiBath(this.price * this.count);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

$coverWidth: 50px;
$contentWidth: calc(100% - #{$coverWidth});

.item {
  font-size: 1rem;
  width: 100%;
  height: 70px;
  margin: 5px 0px;

  .item__cover {
    width: $coverWidth;
    display: inline-block;
    vertical-align: middle;
  }

  .item__content {
    width: $contentWidth;
    height: 65px;
    display: inline-block;
    vertical-align: middle;
    position: relative;

    .item__title {
      position: absolute;
      top: 0px;
      left: 5px;
      width: 80%;
      height: 100%;
    }

    .item__button-groups {
      position: absolute;
      bottom: 0px;
      left: 5px;

      .item__minus-button {
        cursor: pointer;
      }

      .item__count {
        margin: 0px 10px;
      }

      .item__plus-button {
        cursor: pointer;
      }
    }

    .item__remove-icon {
      cursor: pointer;
      position: absolute;
      top: 0px;
      right: 0px;
    }

    .item__price {
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
  }
}
</style>
