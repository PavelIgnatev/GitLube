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

  async post(url, body) {
    const response = await this.fetch(API + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    this.items = response;
  }

  async delete(url) {
    const response = await this.fetch(API + url, {
      method: 'DELETE',
    });
    this.items = response;
  }
}
module.exports = { Api };
