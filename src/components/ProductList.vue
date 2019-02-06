<template>
  <div
    class="product-list"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
    infinite-scroll-listen-for-event="checkRemainingProduct"
  >
    <template v-if="type === 'GRID'">
      <ProductItemGrid
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :cover="item.cover"
        :price="item.price"
        :title="item.title"
      />
    </template>
    <template v-else>
      <ProductItemList
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :cover="item.cover"
        :price="item.price"
        :title="item.title"
      />
    </template>
  </div>
</template>

<script>
import Vue from 'vue';
import ProductItemList from './ProductItemList';
import ProductItemGrid from './ProductItemGrid';
import InfiniteScroll from 'vue-infinite-scroll';

export default {
  name: 'ProductList',
  directives: { InfiniteScroll },
  props: {
    type: {
      type: String,
      default() {
        return 'GRID';
      }
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    ProductItemGrid,
    ProductItemList
  },
  data() {
    return {
      busy: false
    };
  },
  watch: {
    items() {
      this.busy = false;
    },
    type() {
      // We have to wait until the doms are completely rendered on screen;
      // Otherwise, InfiniteScroll can't check the height.
      Vue.nextTick(() => {
        this.$emit('checkRemainingProduct');
      });
    }
  },
  methods: {
    loadMore: function() {
      this.busy = true;
      this.$emit('loadMore');
    }
  }
};
</script>

<style lang="scss" scoped>
.product-list {
  overflow: scroll;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  /* To make a smooth scrolling */
  -webkit-overflow-scrolling: touch;
}
</style>
