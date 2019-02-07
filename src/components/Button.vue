<template>
  <button class="button" :class="buttonClasses" @click="$emit('click')">
    <FontAwesomeIcon v-if="icon" size="lg" :icon="icon" class="button__icon"/>
    <span class="button__label">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String
    },
    label: {
      type: String
    },
    icon: {
      type: String
    }
  },
  computed: {
    buttonClasses() {
      return {
        'button--primary': this.type === 'PRIMARY' ? true : false,
        'button--secondary': this.type === 'SECONDARY' ? true : false
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.button {
  cursor: pointer;
  text-transform: uppercase;
  border: 1px solid $primaryColor;
  background-color: transparent;
  position: relative;
  padding: 10px;
  border-radius: 5px;

  &:disabled {
    border: 1px solid #4444440d;
    background-color: #4444440d;
  }

  &.button--primary:hover:not(:disabled) {
    background-image: $primatyGradientImage;
  }

  &.button--primary:active:not(:disabled) {
    // background-image: linear-gradient(
    //   to right top,
    //   #00b900,
    //   #22bf00,
    //   #34c500,
    //   #42cb00,
    //   #4fd100
    // );
    background-image: linear-gradient(
      to right top,
      #03be03,
      #24c302,
      #35c801,
      #43cc01,
      #4fd100
    );
  }

  &.button--secondary:not(:disabled) {
    border: 1px solid $secondaryColor;
  }

  &.button--secondary:hover:not(:disabled) {
    background-image: $secondaryGradientImage;

    span {
      color: white;
    }
  }

  &.button--secondary:active:not(:disabled) {
    background-image: $secondaryLightGradientImage;
  }

  .button__icon {
    margin-right: 5px;
  }

  .button__label {
  }
}
</style>
