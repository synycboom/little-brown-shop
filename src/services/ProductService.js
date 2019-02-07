import BaseService from './BaseService';

class ProductService extends BaseService {
  /**
   * Since the backend has no pagination, we will do it here.
   * Note: we don't need to fetch data every time when this function is called, but this is for simulation.
   *
   * @param {*} page - (number) start at 1
   * @param {*} pageSize (number) start at 1
   */
  async getProductList(page, pageSize) {
    if (page < 1 || pageSize < 1) {
      throw new Error('Please check the parameters');
    }

    try {
      const response = await this.client.get('/b/5c52a1be15735a25423d3540');
      const books = response.data.books;
      const start = page === 1 ? 0 : (page - 1) * pageSize;

      return books.splice(start, pageSize);
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject({ detail: 'Something has gone wrong!' });
      }
    }
  }

  /**
   * We will use an id instead of barcode to simulate this api
   *
   * @param {*} barcode
   */
  async getProductByBarcode(barcode) {
    try {
      const response = await this.client.get('/b/5c52a1be15735a25423d3540');
      const product = response.data.books.find(book => book.id === barcode);
      return product;
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject({ detail: 'Something has gone wrong!' });
      }
    }
  }
}

export default ProductService;
