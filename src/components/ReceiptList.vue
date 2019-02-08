<template>
  <table>
    <thead>
      <tr>
        <th>ORDER ID</th>
        <th>DATE</th>
        <th>TOTAL</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="receipts.length > 0">
        <tr v-for="receipt in receipts" :key="receipt.orderId">
          <td class="receipt-list__link" @click="showReceipt(receipt.orderId)">
            {{ receipt.orderId }}
          </td>
          <td>{{ receipt.date.toLocaleString() }}</td>
          <td>{{ receipt.total }}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td></td>
          <td>No Data</td>
          <td></td>
        </tr>
      </template>
    </tbody>
    <Modal v-if="showModal" @close="showModal = false">
      <Receipt
        slot="body"
        :date="selectedReceipt.date"
        :discount="selectedReceipt.discount"
        :pay="selectedReceipt.pay"
        :change="selectedReceipt.change"
        :subTotal="selectedReceipt.subTotal"
        :total="selectedReceipt.total"
        :items="selectedReceipt.items"
      />
    </Modal>
  </table>
</template>

<script>
import { mapState } from 'vuex';
import Modal from './Modal';
import Receipt from './Receipt';

export default {
  name: 'ReceiptList',
  components: {
    Modal,
    Receipt
  },
  data() {
    return {
      showModal: false,
      selectedReceipt: {}
    };
  },
  computed: {
    ...mapState(['receipts'])
  },
  methods: {
    showReceipt(orderId) {
      const receipt = this.receipts.find(
        receipt => receipt.orderId === orderId
      );

      if (receipt) {
        this.selectedReceipt = receipt;
        this.showModal = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';

table {
  width: 100%;
  margin: 1em 0;
  border: 1px solid $secondaryLightColor;
  box-shadow: none;
  border-radius: 0.3rem;
  text-align: left;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    tr {
      text-align: left;

      th {
        background: $secondaryLighterColor;
        padding: 1em 1em;
        font-weight: 700;
        text-transform: none;
        border-bottom: 1px solid $secondaryLightColor;
        border-left: none;
      }
    }
  }

  tbody {
    tr {
      text-align: left;
    }
  }

  td {
    padding: 0.8em 0.8em;

    &.receipt-list__link {
      cursor: pointer;
      text-decoration: underline;

      @include textEffect;
    }
  }
}
</style>
