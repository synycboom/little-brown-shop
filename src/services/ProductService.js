import BaseService from './BaseService';

class ProductService extends BaseService {
  /**
   *
   * @param {*} page - (number) start at 1
   * @param {*} pageSize (number) start at 1
   */
  async getProductList(page, pageSize) {
    // Since the backend has no pagination, we will do it here.
    // Note: we don't need to fetch data every time this function is called, but this is for simulation.

    if (page < 1 || pageSize < 1) {
      console.error('Please check the parameters');
    }

    try {
      const response = await this.client.get('/b/5c52a1be15735a25423d3540');
      const books = response.data.books;
      const start = page === 1 ? 0 : (page - 1) * pageSize;

      return books.splice(start, pageSize);
    } catch (error) {
      Promise.reject(error.response);
    }
  }
}

export default ProductService;
