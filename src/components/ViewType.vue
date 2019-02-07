<template>
  <div class="view-type">
    <FontAwesomeIcon
      icon="th"
      class="view-type__grid"
      :class="gridClasses"
      @click="$emit('change', 'GRID')"
    />
    <FontAwesomeIcon
      icon="list"
      class="view-type__list"
      :class="listClasses"
      @click="$emit('change', 'LIST')"
    />
  </div>
</template>

<script>
export default {
  name: 'ViewType',
  props: {
    type: {
      // The choice be limited to 'GRID' or 'LIST'
      type: String,
      required: true
    }
  },
  computed: {
    gridClasses() {
      return {
        'view-type__grid--active': this.type === 'GRID'
      };
    },
    listClasses() {
      return {
        'view-type__list--active': this.type === 'LIST'
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.view-type {
  display: inline-block;
  border: 1px solid $primaryColor;
  height: 2.5rem;
  min-width: 100px;
  max-width: 100px;

  .view-type__grid {
    padding: 8px;
    height: inherit;
    width: 50%;

    &.view-type__grid--active {
      background-color: $primaryColor;
      color: white;
    }
  }

  .view-type__list {
    padding: 8px;
    height: inherit;
    width: 50%;

    &.view-type__list--active {
      background-color: $primaryColor;
      color: white;
    }
  }
}
</style>
