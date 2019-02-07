<template>
  <div class="history">
    <ReceiptList />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ReceiptList from '../components/ReceiptList';

export default {
  name: 'History',
  components: {
    ReceiptList
  },
  computed: {
    ...mapState(['receipts'])
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

.history {
  height: 100%;
  width: 100%;
}
</style>
