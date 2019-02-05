<template>
  <div class="view-type">
    <FontAwesomeIcon
      icon="th"
      size="3x"
      class="view-type__grid"
      :class="gridClasses"
      @click="$emit('change', 'grid')"
    />
    <FontAwesomeIcon
      icon="list"
      size="3x"
      class="view-type__list"
      :class="listClasses"
      @click="$emit('change', 'list')"
    />
  </div>
</template>

<script>
export default {
  name: 'ViewType',
  props: {
    type: {
      // The choice be limited to 'grid' or 'list'
      type: String,
      required: true
    }
  },
  computed: {
    gridClasses() {
      return {
        'view-type__grid--active': this.type === 'grid'
      };
    },
    listClasses() {
      return {
        'view-type__list--active': this.type === 'list'
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
  min-width: 98px;

  .view-type__grid {
    padding: 8px;
    height: inherit;

    &.view-type__grid--active {
      background-color: $primaryColor;
      color: white;
    }
  }

  .view-type__list {
    padding: 8px;
    height: inherit;

    &.view-type__list--active {
      background-color: $primaryColor;
      color: white;
    }
  }
}
</style>
