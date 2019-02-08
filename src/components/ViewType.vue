<template>
  <div class="view-type">
    <div class="view-type__grid" :class="gridClasses">
      <FontAwesomeIcon icon="th" @click="$emit('change', 'GRID')"/>
    </div>
    <div class="view-type__list" :class="listClasses">
      <FontAwesomeIcon icon="list" @click="$emit('change', 'LIST')"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewType',
  props: {
    type: {
      // The choice should be limited to 'GRID' or 'LIST'
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
  border-radius: 5px;
  overflow: hidden;
  height: 2.5rem;
  width: 100%;
  min-width: 100px;
  max-width: 100px;
  cursor: pointer;

  .view-type__grid {
    height: 100%;
    width: 50%;
    display: inline-block;

    & > svg {
      width: 100%;
      height: 100%;
      padding: 5px;
    }

    &.view-type__grid--active {
      background-color: $primaryColor;
      color: white;
    }
  }

  .view-type__list {
    height: 100%;
    width: 50%;
    display: inline-block;

    & > svg {
      width: 100%;
      height: 100%;
      padding: 5px;
    }

    &.view-type__list--active {
      background-color: $primaryColor;
      color: white;
    }
  }
}
</style>
