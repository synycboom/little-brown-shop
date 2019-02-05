<template>
  <div
    class="product-list"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
    :infinite-scroll-immediate-check="false"
  >
    <ProductItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :cover="item.cover"
      :price="item.price"
      :title="item.title"
    />
  </div>
</template>

<script>
import ProductItem from './ProductItem';
import InfiniteScroll from 'vue-infinite-scroll';

// Use https://github.com/ElemeFE/vue-infinite-scroll to make an ininite scroll
// Since in this test the backend has no pagination feature, we will do client side pagination instead

export default {
  name: 'ProductList',
  directives: { InfiniteScroll },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    ProductItem
  },
  data() {
    return {
      busy: false
    };
  },
  watch: {
    items() {
      this.busy = false;
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

<style lang="scss">
.product-list {
  overflow: auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
</style>
