<template>
  <button class="button" :class="buttonClasses" @click="$emit('click')">
    <FontAwesomeIcon v-if="icon" size="lg" :icon="icon" class="button__icon" />
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

  &:focus {
    outline: 0px;
  }

  &.button--primary:not(:disabled) {
    .button__label {
      color: $primaryColor;
    }
  }

  &.button--primary:hover:not(:disabled) {
    background-image: $primatyGradientImage;

    .button__label {
      color: white;
    }
  }

  &.button--primary:active:not(:disabled) {
    background-image: $primaryLightGradientImage;
  }

  &.button--secondary {
    .button__label {
      color: $secondaryColor;
    }
  }

  &.button--secondary:not(:disabled) {
    border: 1px solid $secondaryColor;
  }

  &.button--secondary:hover:not(:disabled) {
    background-image: $secondaryGradientImage;

    .button__label {
      color: white;
    }
  }

  &.button--secondary:active:not(:disabled) {
    background-image: $secondaryLightGradientImage;
  }

  &:disabled {
    border: 1px solid $secondaryLighterColor;
    background-color: $secondaryLighterColor;
  }

  .button__icon {
    margin-right: 5px;
  }
}
</style>
