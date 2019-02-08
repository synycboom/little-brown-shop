<template>
  <div class="searchbox">
    <input
      type="text"
      class="searchbox__input"
      :placeholder="placeholder"
      v-model="value"
      @keyup.enter="search"
      @click="selectAll"
      ref="input"
    />
    <div class="searchbox__cart-button">
      <FontAwesomeIcon
        :icon="icon"
        class="searchbox__cart-icon"
        :spin="loadingByBarcode"
        @click="search"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BarcodeSearchBox',
  props: {
    placeholder: {
      type: String,
      default() {
        return 'Enter a barcode (Book ID)';
      }
    }
  },
  computed: {
    icon() {
      return this.loadingByBarcode ? 'circle-notch' : 'cart-arrow-down';
    },
    ...mapState(['loadingByBarcode'])
  },
  data() {
    return {
      value: ''
    };
  },
  methods: {
    search() {
      if (this.value) {
        this.$store.dispatch('getProductByBarcode', this.value);
      }
    },
    selectAll() {
      // Select all text
      this.$nextTick(() => {
        this.$refs.input.setSelectionRange(0, this.value.length);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.searchbox {
  display: flex;
  width: 100%;
  height: 2.5rem;

  .searchbox__barcode-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: grey;
  }

  .searchbox__input {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    border-top: 1px solid $primaryColor;
    border-left: 1px solid $primaryColor;
    border-right: 0px;
    border-bottom: 1px solid $primaryColor;
    border-radius: 0px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;

    &:focus {
      box-shadow: $primaryColor 0px 0px 3px 0px;
      outline: 0px;
    }
  }

  .searchbox__cart-button {
    cursor: pointer;
    border-left: 0px;
    border-top: 1px solid $primaryColor;
    border-right: 1px solid $primaryColor;
    border-bottom: 1px solid $primaryColor;
    width: 3rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    .searchbox__cart-icon {
      width: 1.6rem;
      height: 1.6rem;

      @include iconEffect;
    }
  }
}
</style>
