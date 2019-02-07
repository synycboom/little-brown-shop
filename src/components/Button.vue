<template>
  <button class="button" @click="$emit('click')">
    <FontAwesomeIcon v-if="icon" size="lg" :icon="icon" class="button__icon" />
    <span class="button__label">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'Botton',
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
  border: 1px solid $primaryColor;
  background-color: transparent;
  position: relative;
  padding: 10px;

  .button__icon {
    margin-right: 5px;
  }

  .button__label {
  }
}
</style>
