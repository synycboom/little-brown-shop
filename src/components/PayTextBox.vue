<template>
  <input
    type="text"
    class="pay-text-box"
    v-model="displayValue"
    @blur="isInputActive = false"
    @focus="isInputActive = true"
    @click="selectAll"
  >
</template>

<script>
import { formatThaiBath } from '../utils';

// Suggested by: https://jsfiddle.net/mani04/bgzhw68m/
export default {
  name: 'PayTextBox',
  props: {
    value: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data: function() {
    return {
      isInputActive: false
    };
  },
  methods: {
    selectAll() {
      // Select all text in the input
      this.$nextTick(() => {
        this.$el.setSelectionRange(0, this.displayValue.length);
      });
    }
  },
  computed: {
    displayValue: {
      get() {
        if (this.isInputActive) {
          // The cursor is inside the input field. unformat display value for a user
          return this.value.toString();
        } else {
          // A user is not modifying now. Format display value for user interface
          return formatThaiBath(this.value);
        }
      },
      set(modifiedValue) {
        // Recalculate value after ignoring "฿" and "," in user input
        let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''));
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
          newValue = 0;
        }
        // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        this.$emit('input', newValue);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.pay-text-box {
  text-align: right;
  height: 2.5rem;
  border: 1px solid $primaryColor;
  border-radius: 5px;

  &:focus {
    box-shadow: $primaryColor 0px 0px 3px 0px;
  }
}
</style>
