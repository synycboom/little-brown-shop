<template>
  <div class="billing-list">
    <BillingItem
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :count="item.count"
      :cover="item.cover"
      :price="item.price"
      :title="item.title"
    />
  </div>
</template>

<script>
import BillingItem from './BillingItem';

export default {
  name: 'BillingList',
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    BillingItem
  }
};
</script>

<style lang="scss" scoped>
.billing-list {
  overflow: auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
</style>
