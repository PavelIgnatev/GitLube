const API = 'shri.yandex/hw/api';

class Api {
  constructor(items) {
    this.items = items;
    this.fetch = global.fetch;
  }

  async get(url, params) {
    let fullUrl = API + url;
    if (params) {
      fullUrl += '?' + new URLSearchParams(params).toString();
    }
    const response = await this.fetch(fullUrl);
    this.items = response;
  }
}
module.exports = { Api };
