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
.button {
  text-transform: uppercase;
  border: 0px;
  background-color: transparent;
  position: relative;
  padding: 0px;

  .button__icon {
    margin-right: 5px;
  }

  .button__label {
  }
}
</style>
