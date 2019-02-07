<template>
  <div class="loading" :class="loadingClasses">
    <FontAwesomeIcon icon="circle-notch" spin class="loading__icon"/>
  </div>
</template>

<script>
// *** Note that an ancestor element should set its position to 'relative'

export default {
  name: 'Loading',
  props: {
    loading: {
      type: Boolean
    }
  },
  computed: {
    loadingClasses() {
      return {
        'loading--active': this.loading
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.loading {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  display: none;

  &.loading--active {
    display: block;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .loading__icon {
    position: absolute;
    height: 50px;
    width: 50px;
    left: 50%;
    top: 50%;
    margin-left: -25px;
    margin-top: -25px;
  }
}
</style>
