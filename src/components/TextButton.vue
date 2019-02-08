<template>
  <button class="button" @click="$emit('click')">
    <FontAwesomeIcon v-if="icon" size="lg" :icon="icon" class="button__icon" />
    <span class="button__label">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'TextButton',
  props: {
    label: {
      type: String
    },
    icon: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.button {
  cursor: pointer;
  text-transform: uppercase;
  border: 0px;
  background-color: transparent;
  position: relative;
  padding: 0px;

  .button__icon {
    margin-right: 5px;
  }

  &:focus {
    outline: 0px;
  }

  &:hover > {
    .button__icon > path {
      color: $primaryColor;
    }

    .button__label {
      @include textEffect;
    }
  }

  &:active {
    .button__icon > path {
      color: $primaryLightColor;
    }
    .button__label {
      @include textEffect;
    }
  }
}
</style>
