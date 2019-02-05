import axios from 'axios';

export default class BaseService {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.VUE_BASE_URL || 'https://api.jsonbin.io'
    });
  }
}
