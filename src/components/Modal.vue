<template>
  <!-- This code comes from https://vuejs.org/v2/examples/modal.html -->
  <transition name="modal">
    <div class="modal" @click="modalClick">
      <div class="modal__wrapper" ref="modalWrapper">
        <div class="modal__container">
          <span class="modal__close" @click="$emit('close')">&times;</span>

          <div class="modal__header">
            <slot name="header"></slot>
          </div>

          <div class="modal__body">
            <slot name="body"></slot>
          </div>

          <div class="modal__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    modalClick(event) {
      if (event.target === this.$refs.modalWrapper) {
        this.$emit('close');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

// This code comes from https://vuejs.org/v2/examples/modal.html
.modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  .modal__wrapper {
    display: table-cell;
    vertical-align: middle;

    .modal__container {
      max-height: 100vh;
      overflow: auto;
      width: 80%;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      position: relative;

      .modal__close {
        position: absolute;
        top: -5px;
        right: 5px;
        font-weight: bold;
        font-size: 3rem;
        cursor: pointer;

        @include textEffect;
      }

      .modal__header h3 {
        margin-top: 0;
        color: #42b983;
      }

      .modal__body {
        margin: 20px 0;
      }

      .modal__default-button {
        float: right;
      }
    }
  }
}

/* Transition */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal__container,
.modal-leave-active .modal__container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
