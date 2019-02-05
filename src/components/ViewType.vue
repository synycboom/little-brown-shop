<template>
  <div class="view-type">
    <FontAwesomeIcon icon="th" size="3x" class="grid-view" />
    <FontAwesomeIcon icon="list" size="3x" class="list-view" />
  </div>
</template>

<script>
export default {
  name: 'ViewType'
};
</script>

<style lang="scss">
@import '../assets/scss/vars.scss';

.view-type {
  display: inline-block;
  border: 1px solid $primaryColor;
  height: 2.5rem;
  min-width: 100px;

  .grid-view {
    padding: 8px;
    height: inherit;
  }

  .list-view {
    padding: 8px;
    height: inherit;
  }
}
</style>
