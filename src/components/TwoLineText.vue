<template>
  <div class="two-line-text">{{ value }}</div>
</template>

<script>
export default {
  name: 'TwoLineText',
  props: {
    value: {
      type: String,
      default() {
        return '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// styles below is suggested by https://codepen.io/natonischuk/pen/KpNKQZ
// to workaround text overflow ellipsis on 2 lines

.two-line-text {
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

.two-line-text:before {
  /* points in the end */
  content: '...';
  /* absolute position */
  position: absolute;
  /* set position to right bottom corner of block */
  right: 0;
  bottom: 0;
}

.two-line-text:after {
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
</style>
